/*
*   git hook 使用eslint代码检查
*/

var fs = require("fs")
var path = require("path")
var root_dir = ""

function CodeCheckPlugin(root) {
    root_dir = root
}

function shellCode() {
    var arr = [
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
    compiler.plugin("compile", function(params) {
        var hooks_path = path.join(root_dir, ".git/hooks")
        var file_path = path.join(hooks_path, "pre-commit")

        if(!fs.existsSync(hooks_path)) {
            fs.mkdirSync(hooks_path)
        }

        if(!fs.existsSync(file_path)) {
            console.log("create git pre-commit hook")
            fs.writeFileSync(file_path, shellCode())
            fs.chmodSync(file_path, parseInt("0755", 8))
        }
    })
}

module.exports = CodeCheckPlugin
