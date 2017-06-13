import Constant from "../constants"

export default function CityReducer(state = {}, action) {
    switch (action.type) {
    case Constant.POPULAR_DESTINATIONS_FETCH:
        return state
    case Constant.POPULAR_DESTINATIONS_SUCCESS:
        return { ...state, popularDestinations: action.payload }
    case Constant.POPULAR_DESTINATIONS_ERROR:
        return { ...state, popularDestinations: [] }
    default:
        return state
    }
}
