if (process.env.NODE_ENV === "production") {
    module.exports = require("./root").default
} else {
    module.exports = require("./root.dev").default
}
