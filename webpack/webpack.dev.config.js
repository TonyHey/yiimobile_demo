const webpack = require("webpack")
const path = require("path")
const pxtorem = require("postcss-pxtorem")
// const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CopyFilePlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const BrowserSyncPlugin = require("browser-sync-webpack-plugin")
const browserSyncConfig = require("../config").browsersync
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
        loaders: [
            {
                test: /\.js?$/,
                loader: "babel",
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                loader: "babel",
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loaders: [
                    "style",
                    "css?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]",
                    "less"
                ]
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
        extensions: ["", ".web.js", ".js", ".jsx", ".json", ".less"],
        modulesDirectories: ["node_modules", path.join(__dirname, "../node_modules")]
    },
    postcss: [
        pxtorem({rootValue: 100, propWhiteList: []})
    ],
    plugins: [
        // new webpack.optimize.OccurenceOrderPlugin(), // allocation the ID to components
        new webpack.optimize.CommonsChunkPlugin({ // remove duplicated library dependencies
            names: ["vendor", "mainfest"],
            filename: "[name].js"
        }),
        new webpack.HotModuleReplacementPlugin(), // hot reload
        new webpack.NoErrorsPlugin(), // ignore the error while complie and log error
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new HtmlWebpackPlugin({
            filename: "../dist/client/views/index.html",
            template: "./views/tpl/index.tpl.html"
        }),
        // new CodeCheckPlugin(path.resolve(__dirname, "..")), // add git hook
        new ProgressBarPlugin({summary: false}), // build progress bar
        new CopyFilePlugin([
            {from: path.resolve(__dirname, "../client/public"), to: "./public"}
        ]),
        new BrowserSyncPlugin(browserSyncConfig)
        // new ExtractTextPlugin("[name].[contenthash:8].css", {allChunks: true})
    ]
}
