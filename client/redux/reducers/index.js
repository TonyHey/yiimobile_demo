import { routerReducer as routing } from "react-router-redux"
import { combineReducers } from "redux"
import fetch from "./fetch"
import ProductReducers from "./ProductReducers"
import CityReducer from "./CityReducer"
import ToursReducers from "./ToursReducers"
import listReducers from "./listReducers"


const rootReducer = combineReducers({
    fetch,
    routing,
    CityReducer,
    ProductReducers,
    ToursReducers,
    listReducers
})

export default rootReducer
