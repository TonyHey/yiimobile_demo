import constants from "../constants"

const initialState = {
    filtersHidden: true
}

export default function listReducers(state = initialState, action) {
    switch (action.type) {
    case constants.SET_FILTER_HIDDEN:
        return { filtersHidden: action.hidden }
    default:
        return state
    }
}
