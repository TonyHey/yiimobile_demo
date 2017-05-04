import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import rootReducer from "../reducers"

const configureStore = preloadedState => {
    const store = createStore(
        rootReducer,
        preloadedState,
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    )

    if (module.hot) {
        module.hot.accept("../reducers", () => {
            const nextRootReducer = require("../reducers")

            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}

export default configureStore
