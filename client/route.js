import React from "react"
import { Route, Switch } from "react-router-dom"

import Home from "./containers/home"
import Login from "./containers/login"
import Signup from "./containers/signup"
import Tours from "./containers/tours"
import Search from "./common/components/search"
import Filter from "./containers/tours/components/filter"
import List from "./containers/product-list"
import Product from "./containers/product"
import NotFound from "./common/components/not-found"

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
export const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes} />
        )}
    />
)

const configs = [{
    path: "/",
    exact: true,
    component: Home
}, {
    path: "/login",
    component: Login
}, {
    path: "/signup",
    component: Signup
}, {
    path: "/tours/:searchKeyword/:entityType*",
    component: Tours
}, {
    path: "/search/:searchKeyword*",
    component: Search
}, {
    path: "/filter",
    component: Filter
}, {
    path: "/list",
    component: List
}, {
    path: "/detail/:productId",
    component: Product
}, {
    component: NotFound
}]

const routes = () => (
    <Switch>
        {configs.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
        ))}
    </Switch>
)

export default routes
