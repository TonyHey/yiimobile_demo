import fs from "fs"
import path from "path"
import Koa from "koa"
import logger from "koa-logger"
import server from "koa-static"
import convert from "koa-convert"
import views from "koa-views"
import webpack from "webpack"
import devMiddleware from "koa-webpack-dev-middleware"
import hotMiddleware from "koa-webpack-hot-middleware"

import config from "./config"
import webpackConfig from "../webpack/webpack.dev.config"
import routers from "./routers"
import clientRoute from "./middlewares/clientRoute"

const compiler = webpack(webpackConfig)

const app = new Koa()

// Logger
app.use(logger())

// Webpack hook event to write html file into `dist/client/views/`
// from `/views/tpl` due to server render
compiler.plugin("emit", (compilation, callback) => {
    const assets = compilation.assets
    let file
    let data

    // create folder for output index.html if folder dist/client/views not exist
    if (!fs.existsSync("dist")) {
        fs.mkdirSync("dist", 0o755)
        fs.mkdirSync("dist/client", 0o755)
        fs.mkdirSync("dist/client/views", 0o755)
    }

    Object.keys(assets).forEach(key => {
        if (key.match(/\.html$/)) {
            file = path.resolve(__dirname, key)
            data = assets[key].source()
            fs.writeFileSync(file, data)
        }
    })
    callback()
})

console.log(__dirname)
// Serve static files
app.use(server(path.resolve(__dirname, "..", "dist/client")))
app.use(views(path.resolve(__dirname, "../dist/client/views"), { map: { html: "ejs" } }))

// Routes
app.use(clientRoute)
routers(app)

console.log(`\n ==> Listening on port ${config.port}. Open up http://localhost:${config.port}/ in your browser.\n`)

// webpack dev
app.use(convert(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
})))
app.use(convert(hotMiddleware(compiler)))

app.listen(config.port)

app.on("error", err => {
    console.log("server error", err)
})

module.exports = app
