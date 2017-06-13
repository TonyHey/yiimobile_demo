import fs from "fs"
import path from "path"
import Router from "koa-router"

const router = new Router()

const routers = function(app) {
    const FS_CONTROLLER_PATH = path.join(__dirname, "../controllers/")
    let service
    fs.readdirSync(FS_CONTROLLER_PATH)
        .forEach(fileName => {
            service = require(`../controllers/${fileName}`)
            if (service.init) {
                service.init(router)
            }
            app.use(router.routes(), router.allowedMethods())
        })
}

module.exports = routers
