import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import configureStore from "./redux/store"
import Route from "./route"

import "./assets/less/style.less"
import "./public/style/normalize.min.css"

const store = configureStore()

render((
    <BrowserRouter>
        <Provider store={store}>
            <Route />
        </Provider>
    </BrowserRouter>
), document.getElementById("APP"))
