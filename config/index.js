import main from "./main"
import local from "./local"

let config

// merge configs
if (process.env.NODE_ENV === "production") {
    config = main
} else {
    config = local
}

const configs = config
export default configs
