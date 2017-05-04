import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter, Route } from "react-router-dom"

import configureStore from "./redux/store"
import routes from "./route"

import "./assets/less/style.less"

const store = configureStore(window.REDUX_STATE)

console.log("app starting")

render((
    <BrowserRouter>
        <Provider store={store}>
            <Route {...routes} />
        </Provider>
    </BrowserRouter>
), document.getElementById("APP"))
