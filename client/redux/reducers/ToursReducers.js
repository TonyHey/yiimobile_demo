import _ from "lodash/array"
import Constant from "../constants"

const intialTours = {
    tours: [],
    filter: {
        keywords: "",
        pageSize: 15,
        page: 0,
        _img_size: "674x",
        filters: 1,
        product_entity_type: 0,
        start_date: "2017-05-19",
        checkout_date: "2017-05-20",
        room_adult_total: 2,
        room_child_total: 0,
        latitude: 34.0521019,
        longitude: -118.2436196
    },
    totalProducts: 0,
    isToursNotFound: false,
    isToursFetching: false,
    isSearchOpen: false,
    isFilterOpen: false
}

export default function ToursReducers(state = intialTours, action) {
    let isToursNotFound = false
    let tours = state.tours
    let filter = {}
    switch (action.type) {
    case Constant.FILTER_RESET:
        filter = action.payload
        if (action.isEmptyTour) {
            tours = []
            filter.page = 0
        }
        return { ...state,
            filter,
            isToursNotFound,
            tours,
            isToursFetching: false }
    case Constant.FETCH_TOURS:
        return { ...state, isToursNotFound, isToursFetching: true }
    case Constant.FETCH_TOURS_SUCCESS:
        tours = _.concat(tours, action.payload.products)
        isToursNotFound = !action.payload.products.length || action.payload.noMore
        return { ...state,
            tours,
            isToursNotFound,
            totalProducts: action.payload.total_products,
            isToursFetching: false }
    case Constant.FETCH_TOURS_ERROR:
        isToursNotFound = true
        return { ...state, isToursNotFound, isToursFetching: false }
    case Constant.CHANGED_SEARCH_VISIBILITY:
        return { ...state, isSearchOpen: action.isSearchOpen }
    case Constant.CHANGED_FILTER_VISIBILITY:
        return { ...state, isFilterOpen: action.isFilterOpen }
    default:
        return state
    }
}
