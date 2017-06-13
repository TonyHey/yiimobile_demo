const webpack = require("webpack")
const path = require("path")
const pxtorem = require("postcss-pxtorem")
const autoprefixer = require("autoprefixer")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CopyFilePlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// const BrowserSyncPlugin = require("browser-sync-webpack-plugin")
// const browserSyncConfig = require("../config").browsersync
const ProgressBarPlugin = require("progress-bar-webpack-plugin")
const CodeCheckPlugin = require("./CodeCheckPlugin")

module.exports = {
    devtool: "source-map",
    context: path.resolve(__dirname, ".."), // root path for entry(absolute path)
    entry: {
        bundle: [
            "./client",
            "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000"
        ],
        vendor: [
            "react",
            "react-dom",
            "redux",
            "react-redux",
            "superagent"
        ]
    },
    output: {
        path: path.resolve(__dirname, "../dist/client/"),
        filename: "[name].js",
        chunkFilename: "chunk.[name].js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    "react-hot-loader",
                    "babel-loader"
                ],
                exclude: /node_modules/

            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader?modules&camelCase&importLoaders=1&localIdentName=[hash:base64:8]",
                        "postcss-loader",
                        "less-loader"
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader?modules&camelCase&importLoaders=1&localIdentName=[hash:base64:8]",
                        "postcss-loader"
                    ]
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                use: "url-loader?limit=8000&name=[name].[hash:base64:8].[ext]"
            },
            {
                test: /\.html$/,
                loader: "html-loader?minimize=false"
            }
        ]
    },
    resolve: {
        extensions: [".web.js", ".js", ".jsx", ".json", ".less"],
        modules: ["node_modules", path.join(__dirname, "../node_modules")]
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
        // new webpack.optimize.OccurenceOrderPlugin(), // allocation the ID to components
        new webpack.optimize.CommonsChunkPlugin({ // remove duplicated library dependencies
            names: ["vendor", "mainfest"],
            filename: "[name].js"
        }),
        new webpack.HotModuleReplacementPlugin(), // hot reload
        new webpack.NoEmitOnErrorsPlugin(), // ignore the error while complie and log error
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new HtmlWebpackPlugin({
            filename: "../dist/client/views/index.html",
            template: "./views/tpl/index.tpl.html"
        }),
        new CodeCheckPlugin(path.resolve(__dirname, "..")), // add git hook
        new ProgressBarPlugin({ summary: false }), // build progress bar
        new CopyFilePlugin([
            { from: path.resolve(__dirname, "../client/public"), to: "./public" }
        ]),
        // new BrowserSyncPlugin(browserSyncConfig)
        new ExtractTextPlugin({ filename: "[name].[contenthash:8].css", allChunks: true })
    ]
}
