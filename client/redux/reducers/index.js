import todos from "./todos"
import fetch from "./fetch"
import publicDetail from "./detail"
import counter from "./counter"
import { routerReducer as routing } from "react-router-redux"
import { combineReducers } from "redux"


const rootReducer = combineReducers({
    todos,
    fetch,
    publicDetail,
    routing,
    counter
})

export default rootReducer
