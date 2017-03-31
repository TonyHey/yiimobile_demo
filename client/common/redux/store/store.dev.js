import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import rootReducer from "../reducers"
import DevTools from "../../root/devtools"

const configureStore = preloadedState => {
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(thunk),
            DevTools.instrument()
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
