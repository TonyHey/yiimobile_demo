import Constant from "../constants"

export function BannersReducer(state = { banners: [] }, action) {
    switch (action.type) {
    case Constant.BANNERS_SUCCESS:
        return { ...state, banners: action.payload }
    case Constant.BANNERS_ERROR:
        return { ...state, error: true }
    default:
        return state
    }
}

export function CityReducer(state = {}, action) {
    switch (action.type) {
    case Constant.POPULAR_DESTINATIONS_SUCCESS:
        return { ...state, popularDestinations: action.payload }
    case Constant.POPULAR_DESTINATIONS_ERROR:
        return { ...state, popularDestinations: [] }
    default:
        return state
    }
}
