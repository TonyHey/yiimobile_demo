const fs = require("fs")
const webpack = require("webpack")
const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CopyFilePlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const pxtorem = require("postcss-pxtorem")
const autoprefixer = require("autoprefixer")
const CodeCheckPlugin = require("./CodeCheckPlugin")

// process.traceDeprecation = true

const clientConfig = {
    context: path.resolve(__dirname, ".."),
    entry: {
        bundle: "./client",
        vendor: [
            "react",
            "react-dom",
            "redux",
            "react-redux",
            "superagent"
        ]
    },
    output: {
        path: path.resolve(__dirname, "../dist/client/app"),
        filename: "[name].[chunkhash:8].js",
        chunkFilename: "chunk.[name].[chunkhash:8].js",
        publicPath: "/app/"
    },
    module: {
        noParse: [/moment-with-locales|moment/],
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [["react"], ["es2015", { modules: false }], ["stage-0"]]
                    }
                }]
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader?modules&camelCase&importLoaders=1&localIdentName=[hash:base64:8]",
                        "postcss-loader",
                        "less-loader"
                    ]
                })
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader?modules&camelCase&importLoaders=1&localIdentName=[hash:base64:8]",
                        "postcss-loader"
                    ]
                })
            }, {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                use: "url-loader?limit=8000&name=[name].[hash:base64:8].[ext]"
            }, {
                test: /\.html$/,
                use: "html-loader?minimize=false"
            }
        ]
    },
    resolve: {
        alias: {
            moment: "moment/min/moment-with-locales.min.js"
        },
        modules: [path.join(__dirname, "../node_modules"), "node_modules"],
        extensions: [".web.js", ".js", ".json", ".jsx"]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [
                    autoprefixer({
                        browsers: ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 8", "iOS >= 8", "Android >= 4"]
                    }),
                    pxtorem({ rootValue: 100, propWhiteList: [] })
                ]
            }
        }),
        // Extract the common/public code, convenient to do cache
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor", "manifest"],
            filename: "[name].[chunkhash:8].js"
        }),
        new ExtractTextPlugin({ filename: "[name].[contenthash:8].css", allChunks: false }),
        new OptimizeCssAssetsPlugin(),
        new webpack.optimize.UglifyJsPlugin({ // compress js
            compress: {
                warnings: false
            },
            output: {
                comments: false  // remove all comments
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")
            }
        }),
        new HtmlWebpackPlugin({
            filename: "../views/index.html",
            template: "./views/tpl/index.tpl.html",
            favicon: "./client/public/img/favicon.ico",
            chunks: ["manifest", "vendor", "bundle"]
            // chunksSortMode: (chunk1, chunk2) => {
            //     const order = ["manifest", "vendor", "bundle"]
            //     console.log(chunk1, chunk2)
            //     let order1 = order.indexOf(chunk1.names[0])
            //     let order2 = order.indexOf(chunk2.names[0])
            //     return order1 - order2
            // }
        }),
        new CodeCheckPlugin(path.resolve(__dirname, "..")), // add git hook
        new CopyFilePlugin([
            { from: path.resolve(__dirname, "../client/public"), to: "../public" }
        ])
    ]
}

// get the external libraries
function getExternals() {
    return fs.readdirSync(path.resolve(__dirname, "../node_modules"))
        .filter(filename => !filename.includes(".bin"))
        .reduce((externals, filename) => {
            const externalsResult = externals
            externalsResult[filename] = `commonjs ${filename}`
            return externalsResult
        }, {})
}

const serverConfig = {
    context: path.resolve(__dirname, ".."),
    entry: { server: "./server/server.prod" },
    output: {
        path: path.resolve(__dirname, "../dist/server"),
        filename: "[name].js",
        chunkFilename: "chunk.[name].js"
    },
    target: "node",
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: [["react"], ["es2015", { modules: false }], ["stage-0"]]
                }
            }]
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    "css-loader?modules&camelCase&importLoaders=1&localIdentName=[hash:base64:8]",
                    "postcss-loader",
                    "less-loader"
                ]
            })
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    "css-loader?modules&camelCase&importLoaders=1&localIdentName=[hash:base64:8]",
                    "postcss-loader"
                ]
            })
        }, {
            test: /\.(jpg|png|gif|webp)$/,
            use: "url-loader?limit=8000"
        }]
    },
    resolve: {
        extensions: [".web.js", ".js", ".jsx", ".json"],
        modules: [path.join(__dirname, "../node_modules"), "node_modules"]
    },
    externals: getExternals(),
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [
                    autoprefixer({
                        browsers: ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 8", "iOS >= 8", "Android >= 4"]
                    }),
                    pxtorem({ rootValue: 100, propWhiteList: [] })
                ]
            }
        }),
        new ExtractTextPlugin({ filename: "[name].[contenthash:8].css", allChunks: false }),
        new OptimizeCssAssetsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false
        }),
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV) })
    ]
}

// build service worker for PWA
const swConfig = {
    context: path.resolve(__dirname, ".."),
    entry: { sw: "./client/service-worker" },
    output: {
        path: path.resolve(__dirname, "../dist/client"),
        filename: "[name].js"
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: [["react"], ["es2015", { modules: false }], ["stage-0"]]
                }
            }]
        }]
    },
    target: "node",
    node: {
        __filename: true,
        __dirname: true
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false
        }),
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV) }),
        new CopyFilePlugin([
            { from: path.resolve(__dirname, "../node_modules/sw-toolbox/sw-toolbox.js"), to: "./sw-toolbox.js" }
        ])
    ]
}

module.exports = [clientConfig, serverConfig, swConfig]
