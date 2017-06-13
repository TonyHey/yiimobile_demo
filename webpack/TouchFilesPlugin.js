/**
 * This plugin will create local configuration files if they do not exit.
 * This plugin basically useful only for the deploy in servers.
 *
 * @author Gihan S <gihanshp@gmail.com>
 */

const fs = require("fs")

let filesToTouch = []

function TouchFilesPlugin(files) {
    filesToTouch = files
}

TouchFilesPlugin.prototype.apply = compiler => {
    compiler.plugin("entry-option", () => {
        let file = {}
        for (let i = 0; i < filesToTouch.length; i += 1) {
            file = filesToTouch[i]
            // create config files only if they do not exist.
            if (!fs.existsSync(file.path)) {
                fs.writeFileSync(file.path, file.content)
                console.log("Created", file.path)
            } else {
                console.log("skipping...")
            }
        }
    })
}

module.exports = TouchFilesPlugin
