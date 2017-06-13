import Constant from "../constants"
import { get } from "../../common/api"

function fetchPopularDestinationsSuccess(payload) {
    return {
        type: Constant.POPULAR_DESTINATIONS_SUCCESS,
        payload
    }
}

function fetchPopularDestinationsError() {
    return {
        type: Constant.POPULAR_DESTINATIONS_ERROR
    }
}

export const getPopularDestinations = (width, height) =>
    dispatch => {
        get("/tourCity/getPopularDestinations", { _img_size: width + "x" + height })
            .then(data => dispatch(fetchPopularDestinationsSuccess(data)))
            .catch(err => dispatch(fetchPopularDestinationsError(err)))
    }


function fetchBannersSuccess(payload) {
    return {
        type: Constant.BANNERS_SUCCESS,
        payload
    }
}

function fetchBannersError() {
    return {
        type: Constant.BANNERS_ERROR
    }
}

export const getBanners = (width, height) => dispatch => {
    get("/common/getHomeBanners", { _v: 3, _img_size: width + "x" + height })
    .then(data => dispatch(fetchBannersSuccess(data)))
    .catch(err => dispatch(fetchBannersError(err)))
}
