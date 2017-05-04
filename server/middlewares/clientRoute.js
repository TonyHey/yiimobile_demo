import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter, Route, redirect } from "react-router-dom"
import { Provider } from "react-redux"
import routes from "../../client/route"
import configureStore from "../../client/redux/store"

const store = configureStore()

async function clientRoute(ctx, next) {
    // response render to content-type /html|xhtml|xml/ only
    if (ctx.header.accept && /html|xhtml|xml/.test(ctx.header.accept)) {
        const context = {}
        const markup = renderToString(
            <StaticRouter context={context} location={ctx.url}>
                <Provider store={store}>
                    <Route {...routes} />
                </Provider>
            </StaticRouter>
        )

        if (context.url) {
            // Somewhere a `<Redirect>` was rendered
            redirect(301, context.url)
        } else {
            await ctx.render("index", {
                title: "M",
                root: markup,
                state: store.getState()
            })
        }
    } else {
        await next()
    }
}

export default clientRoute
