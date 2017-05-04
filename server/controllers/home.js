const Banner = {
    init(router) {
        router.get("/banner", this.show)
    },

    async show(ctx) {
        ctx.body = {
            name: "123"
        }
    }
}

module.exports = Banner
