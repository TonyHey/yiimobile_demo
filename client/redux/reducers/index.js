import { routerReducer as routing } from "react-router-redux"
import { combineReducers } from "redux"
import fetch from "./fetch"
import ProductReducers from "./ProductReducers"
import { BannersReducer, CityReducer } from "./HomeReducer"
import ToursReducers from "./ToursReducers"
import SearchReducer from "./SearchReducer"
import listReducers from "./listReducers"

const rootReducer = combineReducers({
    fetch,
    routing,
    BannersReducer,
    CityReducer,
    ProductReducers,
    ToursReducers,
    SearchReducer,
    listReducers
})
export default rootReducer
