const fs = require("fs")
const webpack = require("webpack")
const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CopyFilePlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const pxtorem = require("postcss-pxtorem")
const autoprefixer = require("autoprefixer")
const CodeCheckPlugin = require("./CodeCheckPlugin")

let clientConfig, serverConfig, swConfig


clientConfig = {
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
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ["es2015", "react", "stage-0"]
                }
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style", "css?camelCase&importLoaders=1&localIdentName=[hash:base64:8]!postcss!less")
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: "url?limit=8000"
            },
            {
                test: /\.html$/,
                loader: "html?minimize=false"
            }
        ]
    },
    resolve: {
        alias: {
            "react-router": path.join(path.resolve(__dirname, "../node_modules"), "/react-router/lib/index.js"),
            "moment": "moment/min/moment-with-locales.min.js"
        },
        modulesDirectories: ["node_modules", path.join(__dirname, "../node_modules")],
        extensions: ["", ".web.js", ".js", ".json", ".jsx"]
    },
    postcss: [
        autoprefixer({
            browsers: ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 8", "iOS >= 8", "Android >= 4"]
        }),
        pxtorem({rootValue: 100, propWhiteList: []})
    ],
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(), // allocation the ID to components
        new webpack.optimize.DedupePlugin(), // remove duplicated library dependencies
        new webpack.optimize.CommonsChunkPlugin({ // Extract the common/public code, convenient to do cache
            names: ["vendor", "manifest"],
            filename: "[name].[chunkhash:8].js"
        }),
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
            chunksSortMode: "none"
        }),
        new ExtractTextPlugin("[name].[contenthash:8].css", {allChunks: true}),
        new CodeCheckPlugin(path.resolve(__dirname, "..")), // add git hook
        new CopyFilePlugin([
            {from: path.resolve(__dirname, "../client/public"), to: "../public"}
        ])
    ]
}

// get the external libraries
function getExternals() {
    return fs.readdirSync(path.resolve(__dirname, "../node_modules"))
        .filter(filename => !filename.includes(".bin"))
        .reduce((externals, filename) => {
            externals[filename] = `commonjs ${filename}`

            return externals
        }, {})
}

serverConfig = {
    context: path.resolve(__dirname, ".."),
    entry: {server: "./server/server.prod"},
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
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel"
        }, {
            test: /\.less$/,
            loaders: [
                "css/locals?modules&camelCase&importLoaders=1&localIdentName=[hash:base64:8]",
                "less"
            ]
        }, {
            test: /\.(jpg|png|gif|webp)$/,
            loader: "url?limit=8000"
        }, {
            test: /\.json$/,
            loader: "json"
        }]
    },
    resolve: {
        extensions: ["", ".web.js", ".js", ".jsx", ".json"],
        modulesDirectories: ["node_modules", path.join(__dirname, "../node_modules")]
    },
    externals: getExternals(),
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            comments: false
        }),
        new webpack.DefinePlugin({"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)})
    ]
}

// build service worker for PWA
swConfig = {
    context: path.resolve(__dirname, ".."),
    entry: {sw: "./client/service-worker"},
    output: {
        path: path.resolve(__dirname, "../dist/client"),
        filename: "[name].js"
    },
    target: "node",
    node: {
        __filename: true,
        __dirname: true
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            comments: false
        }),
        new webpack.DefinePlugin({"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)}),
        new CopyFilePlugin([
            {from: path.resolve(__dirname, "../node_modules/sw-toolbox/sw-toolbox.js"), to: "./sw-toolbox.js"}
        ])
    ]
}

module.exports = [clientConfig, serverConfig, swConfig]
