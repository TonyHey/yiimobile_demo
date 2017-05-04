/*
*   git hook 使用eslint代码检查
*/

const fs = require("fs")
const path = require("path")

let rootDir = ""

function CodeCheckPlugin(root) {
    rootDir = root
}

function shellCode() {
    const arr = [
        "#!/bin/bash",
        "",
        "echo -e '\\033[33m eslint check js code standard... \\033[0m'",
        "eslint . --ext .js",
        "",
        "if [ $? != 0 ]",
        "then",
        "echo -e '\\033[31m js code standard wrong, please check&update,then re-build \\033[0m'",
        "exit 1 # reject",
        "fi",
        "echo -e '\\033[32m eslint code checking ok \\033[0m'",
        "exit 0 # accept"
    ]

    return arr.join("\n")
}

CodeCheckPlugin.prototype.apply = function(compiler) {
    compiler.plugin("compile", () => {
        const hooksPath = path.join(rootDir, ".git/hooks")
        const filePath = path.join(hooksPath, "pre-commit")

        if (!fs.existsSync(hooksPath)) {
            fs.mkdirSync(hooksPath)
        }

        if (!fs.existsSync(filePath)) {
            console.log("create git pre-commit hook")
            fs.writeFileSync(filePath, shellCode())
            fs.chmodSync(filePath, 0o777)
        }
    })
}

module.exports = CodeCheckPlugin
