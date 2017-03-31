// Hook for server
if (typeof require.ensure !== "function") {
    require.ensure = function(dependencies, callback) {
        callback(require)
    }
}

const routes = {
    childRoutes: [{
        path: "/",
        component: require("./common/root"),
        indexRoute: {
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require("./containers/home").default)
                }, "home")
            }
        },
        childRoutes: [{
            path: "user",
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require("./containers/user").default)
                }, "user")
            }
        }]
    }]
}

export default routes
