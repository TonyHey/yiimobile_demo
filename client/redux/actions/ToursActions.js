import Constant from "../constants"
import { get } from "../../common/api"

function fetchToursSuccess(payload) {
    return {
        type: Constant.FETCH_TOURS_SUCCESS,
        payload
    }
}

function fetchToursError(err) {
    console.log(err)
    return {
        type: Constant.FETCH_TOURS_ERROR
    }
}

const searchToursByKeyword = keywords =>
dispatch => {
    get("/product/getCityProducts", keywords)
.then(data => {
    dispatch(fetchToursSuccess(data))
})
.catch(err => dispatch(fetchToursError(err)))
}


const ToursAPI = {
    searchToursByKeyword
}

export default ToursAPI
