// Hook for server
if (typeof require.ensure !== "function") {
    require.ensure = function(dependencies, callback) {
        callback(require)
    }
}

const routes = {
    childRoutes: [{
        path: "/",
        component: require("../common/devtool"),
        indexRoute: {
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require("../containers/home").default)
                }, "home")
            }
        },
        childRoutes: [
            {
                path: "user",
                getComponent(nextState, callback) {
                    require.ensure([], require => {
                        callback(null, require("../containers/user").default)
                    }, "user")
                }
            },
            {
                path: "list/**/all",
                getComponent(nextState, callback) {
                    require.ensure([], require => {
                        callback(null, require("../containers/counter/CounterApp").default)
                    }, "counter")
                }
            }
        ]
    }]
}

export default routes
