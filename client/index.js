import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { Router, match, browserHistory } from "react-router"

import routes from "./routes"
import configureStore from "./common/redux/store"

import "./assets/less/style.less"

const store = configureStore(window.REDUX_STATE)

console.log("app starting")

console.log("sw cache test")

match({history: browserHistory, routes}, (error, redirectLocation, renderProps) => {
    render(
        <Provider store={store}>
            <Router {...renderProps} />
        </Provider>,
        document.getElementById("APP")
    )
})
