import { ADD_TODO, LOADING, ADD_PUBLIC_DETAIL } from "../constants"
import API from "../../common/api"

const addTodo = text => ({ type: ADD_TODO, text })

const requestPost = loading => ({
    type: LOADING,
    loading
})

const addPublicDetail = text => {
    const addPublicDetailAction = {
        type: ADD_PUBLIC_DETAIL,
        text
    }
    return addPublicDetailAction
}

const getFetch = () => dispatch => {
    dispatch(requestPost(true))
    API.home_banner().then(json => {
        if (json.code === 1) {
            dispatch(requestPost(false))
        }
    })
}

export default {
    addTodo,
    addPublicDetail,
    getFetch,
    requestPost
}
