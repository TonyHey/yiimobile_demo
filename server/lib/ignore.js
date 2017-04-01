/**
 * ignore files which do not load
 * @param {*File extension，Array} data
 */
function ignore(data) {
    if(typeof data === "object" && data.length) {
        let extensions = data
        for (let i = 0, len = extensions.length; i < len; i++) {
            require.extensions[extensions[i]] = function() {
                return false
            }
        }
    }
}

module.exports = ignore
