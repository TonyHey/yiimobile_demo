import "babel-polyfill"
import path from "path"
import Koa from "koa"
import logger from "koa-logger"
import server from "koa-static"
import views from "koa-views"

import config from "./config"
import routers from "./routers"
import clientRoute from "./middlewares/clientRoute"

const app = new Koa()

// Logger
app.use(logger())

// Serve static files
app.use(server(path.resolve(__dirname, "..", "dist/client")))
app.use(views(path.resolve(__dirname, "../dist/client/views"), { map: { html: "ejs" } }))

// Routes
app.use(clientRoute)
routers(app)

app.listen(config.port, () => {
    console.log("listen port " + config.port)
})

app.on("error", err => {
    console.log("server error", err)
})

module.exports = app
