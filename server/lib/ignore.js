/**
 * ignore files which do not load
 * @param {*File extension，Array} data
 */
function ignore(data) {
    if (typeof data === "object" && data.length) {
        const extensions = data
        for (let i = 0, len = extensions.length; i < len; i += 1) {
            require.extensions[extensions[i]] = function() {
                return false
            }
        }
    }
}

module.exports = ignore
