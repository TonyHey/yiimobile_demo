// Hook for server
if (typeof require.ensure !== "function") {
    require.ensure = function(dependencies, callback) {
        callback(require)
    }
}

const routes = {
    path: "/",
    component: require("./containers/app").default
}

export default routes
