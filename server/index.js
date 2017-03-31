require("babel-polyfill")

require("babel-core/register")({
    presets: ["es2015", "react", "stage-0"],
    plugins: ["add-module-exports"]
})

require("./lib/ignore")([".less"])

let server

if(process.env.NODE_ENV === "production") {
    server = require("./server.prod")
}else {
    server = require("./server.dev")
}

module.exports = server
