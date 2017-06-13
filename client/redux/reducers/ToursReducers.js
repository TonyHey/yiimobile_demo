import Constant from "../constants"

const intialState = {
    tours: {
        filters: {},
        products: {}
    },
    isToursNotFound: false,
    isToursFetching: true
}

export default function ToursReducers(state = intialState, action) {
    switch (action.type) {
    case Constant.FETCH_TOURS_SUCCESS:
        return { ...state, tours: action.payload, isToursNotFound: false, isToursFetching: false }
    case Constant.FETCH_TOURS_ERROR:
        return { ...state, isToursNotFound: true, isToursFetching: false }
    default:
        return state
    }
}
