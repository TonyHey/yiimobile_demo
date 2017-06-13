import _ from "lodash/array"
import Constant from "../constants"
import { arrayAddUniqueRecent } from "../../common/tool/filter"

// recent serach
function setRecentSearch(newVal) {
    let recentSearch
    console.log(newVal)
    return (dispatch, getState) => {
        if (newVal === null || newVal === "" || newVal === undefined) {
            dispatch({
                type: Constant.RECENT_SEARCH_ERROR
            })
        }
        recentSearch = getState().SearchReducer.recentSearch
        _.reverse(recentSearch)
        arrayAddUniqueRecent(recentSearch, newVal)
        _.reverse(recentSearch)
        _.remove(recentSearch, (n, i) => i >= 5)
        console.log(recentSearch)
        localStorage.setItem("SearchData", JSON.stringify({ recentSearch }))
        dispatch({
            type: Constant.RECENT_SEARCH_SUCCESS,
            payload: recentSearch
        })
    }
}

const getRecentSearch = () => {
    let recentSearch
    if (localStorage.getItem("SearchData") === null) {
        recentSearch = []
    } else {
        recentSearch = localStorage.getItem("SearchData")
        recentSearch = JSON.parse(recentSearch)
        recentSearch = recentSearch.recentSearch
    }
    return dispatch => dispatch({
        type: Constant.RECENT_SEARCH_SUCCESS,
        payload: recentSearch
    })
}

const LocalstorageAction = {
    getRecentSearch,
    setRecentSearch
}
export default LocalstorageAction
