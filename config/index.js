import main from "./main"
import local from "./local"
import template from "./template"

let envConfig

// select environment config
if (process.env.NODE_ENV === "production") {
    envConfig = template
} else {
    envConfig = local
}

const configs = Object.assign(main, envConfig)
export default configs
