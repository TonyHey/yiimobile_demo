import Constant from "../constants"
import { get } from "../../common/api"

function fetchTours() {
    return {
        type: Constant.FETCH_TOURS
    }
}

function fetchToursSuccess(payload) {
    return {
        type: Constant.FETCH_TOURS_SUCCESS,
        payload
    }
}

function openSearch(isSearchOpen) {
    return {
        type: Constant.CHANGED_SEARCH_VISIBILITY,
        isSearchOpen
    }
}

function openFilter(isFilterOpen) {
    return {
        type: Constant.CHANGED_FILTER_VISIBILITY,
        isFilterOpen
    }
}

function fetchToursError(err) {
    console.log(err)
    return {
        type: Constant.FETCH_TOURS_ERROR
    }
}

function nearByDataAdapter(data) {
    const result = []
    result.products = []
    let dataTotal = 0
    data.map(item => {
        item.products.map((product, index) => {
            result.products[dataTotal + index] = {}
            result.products[dataTotal + index].SP = product.specials_price
            result.products[dataTotal + index].P = product.product_price
            result.products[dataTotal + index].N = product.small_description
            result.products[dataTotal + index].G = product.product_image
        })
        dataTotal += item.products.length
    })
    result.total_products = dataTotal
    result.noMore = true
    return result
}

const searchToursNearBy = () =>
    dispatch => {
        dispatch(fetchTours())

        if ("geolocation" in navigator) {
            let params
            navigator.geolocation.getCurrentPosition(
                position => {
                    params = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        rlon: 1,
                        rlat: 1,
                        sort_id: 3,
                        _v: 2,
                        _img_size: "302px"
                    }
                    get("/map/getNearByTours", params).then(
                        data => {
                            if (data.length) {
                                dispatch(fetchToursSuccess(nearByDataAdapter(data)))
                            } else {
                                dispatch(fetchToursError(data.length))
                            }
                        }
                    ).catch(
                        err => dispatch(fetchToursError(err))
                    )
                }
            )
        }
    }

const searchToursByKeyword = () =>
    (dispatch, getState) => {
        dispatch(fetchTours())

        get("/product/getCityProducts", getState().ToursReducers.filter)
        .then(data => {
            dispatch(fetchToursSuccess(data))
        })
        .catch(err => dispatch(fetchToursError(err)))
    }

const setFilter = filter =>
    (dispatch, getState) => {
        const payload = getState().ToursReducers.filter
        let isEmptyTour = true
        Object.keys(filter).map(key => {
            payload[key] = filter[key]

            if (key === "page") {
                isEmptyTour = false
            }
        })
        dispatch({
            type: Constant.FILTER_RESET,
            payload,
            isEmptyTour
        })
    }

const setNextPage = () =>
    (dispatch, getState) => {
        const payload = getState().ToursReducers.filter
        payload.page += 1
        dispatch({
            type: Constant.FILTER_RESET,
            payload
        })
    }


const ToursAPI = {
    searchToursNearBy,
    searchToursByKeyword,
    setFilter,
    setNextPage,
    openSearch,
    openFilter
}

export default ToursAPI
