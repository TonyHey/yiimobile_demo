import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter, redirect } from "react-router-dom"
import { Provider } from "react-redux"
import { Helmet } from "react-helmet"
import Route from "../../client/route"
import configureStore from "../../client/redux/store"

const store = configureStore()

async function clientRoute(ctx, next) {
    // response render to content-type /html|xhtml|xml/ only
    if (ctx.header.accept && /html|xhtml|xml/.test(ctx.header.accept)) {
        const context = {}
        const markup = renderToString(
            <StaticRouter context={context} location={ctx.url}>
                <Provider store={store}>
                    <Route />
                </Provider>
            </StaticRouter>
        )
        const helmet = Helmet.renderStatic()

        if (context.url) {
            // Somewhere a `<Redirect>` was rendered
            redirect(301, context.url)
        } else {
            await ctx.render("index", {
                root: markup,
                htmlAttributes: helmet.htmlAttributes ? helmet.htmlAttributes.toString() : "",
                meta: helmet.meta ? helmet.meta.toString() : "",
                link: helmet.link ? helmet.link.toString() : "",
                title: helmet.title ? helmet.title.toString() : "",
                bodyAttributes: helmet.bodyAttributes ? helmet.bodyAttributes.toString() : "",
                state: store.getState()
            })
        }
    } else {
        await next()
    }
}

export default clientRoute
