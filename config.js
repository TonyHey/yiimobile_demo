const devAssets = "../client/"

module.exports = {
    browsersync: {
        proxy: "http://localhost:8888/",
        // server: {
        // baseDir: ["../"]
        // },
        port: 9999,
        files: [
            devAssets + "**/*.*",
            devAssets + "/*.*"
        ]
    }
}
