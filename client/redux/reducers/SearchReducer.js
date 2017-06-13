import Constant from "../constants"

const initialState = {
    suggestions: [],
    recentSearch: [],
    popularSearch: []
}
export default function SearchReducer(state = initialState, action) {
    switch (action.type) {
    case Constant.SUGGESTIONS_GET_SUCCESS:
        return { ...state, suggestions: action.payload }
    case Constant.SUGGESTIONS_SEARCH_VALUE_CLEAR:
        return { ...state, suggestions: action.payload }
    case Constant.SUGGESTIONS_SEARCH_VALUE_SET:
        return { ...state, searchValue: action.suggestion }
    case Constant.RECENT_SEARCH_SUCCESS:
        return { ...state, recentSearch: action.payload }
    case Constant.POPULAR_SEARCH:
        return { ...state }
    case Constant.POPULAR_SEARCH_ERROR:
        return { ...state }
    case Constant.POPULAR_SEARCH_SUCCESS:
        return { ...state, popularSearch: action.payload }
    case Constant.SUGGESTIONS_GET:
    default:
        return state
    }
}
