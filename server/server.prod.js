import "babel-polyfill"
import path from "path"
import Koa from "koa"
import logger from "koa-logger"
import server from "koa-static"
import views from "koa-views"
import Router from "koa-router"

import config from "./config"
import clientRoute from "./middlewares/clientRoute"

const app = new Koa()
const router = new Router()

// Logger
app.use(logger())

// Serve static files
app.use(server(path.resolve(__dirname, "..", "dist/client")))
app.use(views(path.resolve(__dirname, "../dist/client/views"), { map: { html: "ejs" } }))

// Routes
app.use(clientRoute)
app.use(router.routes(), router.allowedMethods())

app.listen(config.port, () => {
    console.log("listen port " + config.port)
})

app.on("error", err => {
    console.log("server error", err)
})

module.exports = app
