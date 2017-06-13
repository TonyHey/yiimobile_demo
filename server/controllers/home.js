const Banner = {
    init(router) {
        router.get("/banner", this.show)
    },

    async show(ctx) {
        console.log("running banner")
        ctx.body = {
            name: "123"
        }
    }
}

module.exports = Banner
