import Constant from "../constants"
import { get } from "../../common/api"

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    return dispatch => {
        dispatch({
            type: Constant.SUGGESTIONS_GET
        })
        get("/product/searchSuggestion", { keyword: inputValue })
            .then(data =>
                dispatch({
                    type: Constant.SUGGESTIONS_GET_SUCCESS,
                    payload: data.data,
                    searchValue: value
                })
            ).catch(err => {
                console.log(err)
                dispatch({
                    type: Constant.SUGGESTIONS_GET_ERROR
                })
            })
    }
}
const getPopular = () =>
    (dispatch, getState) => {
        dispatch({
            type: Constant.POPULAR_SEARCH
        })
        const popularSearch = getState().SearchReducer.popularSearch
        if (popularSearch.length > 0) {
            dispatch({
                type: Constant.POPULAR_SEARCH_SUCCESS,
                payload: popularSearch,
            })
        }
        get("/product/popularSearchKeywords")
        .then(data =>
            dispatch({
                type: Constant.POPULAR_SEARCH_SUCCESS,
                payload: data.data,
            })
        ).catch(err => {
            console.log(err)
            dispatch({
                type: Constant.POPULAR_SEARCH_ERROR
            })
        })
    }


const clearSuggestions = () =>
    dispatch => dispatch({
        type: Constant.SUGGESTIONS_SEARCH_VALUE_CLEAR,
        payload: []
    })

const getSuggestionValue = suggestion => suggestion.name

const setSuggestionValue = suggestion => dispatch => dispatch({
    type: Constant.SUGGESTIONS_SEARCH_VALUE_SET,
    suggestion
})

const SearchAct = {
    getSuggestionValue,
    getSuggestions,
    clearSuggestions,
    setSuggestionValue,
    getPopular
}
export default SearchAct
