import Constant from "../constants"
import { get } from "../../common/api"

function fetchPopularDestinationsSuccess(payload) {
    return {
        type: Constant.POPULAR_DESTINATIONS_SUCCESS,
        payload
    }
}

function fetchPopularDestinationsError(err) {
    console.log(err)
    return {
        type: Constant.POPULAR_DESTINATIONS_ERROR
    }
}

const getPopularDestinations = (width, height) =>
    dispatch => {
        get("/tourCity/getPopularDestinations", { _img_size: width + "x" + height })
            .then(data => dispatch(fetchPopularDestinationsSuccess(data)))
            .catch(err => dispatch(fetchPopularDestinationsError(err)))
    }

const CityAPI = {
    getPopularDestinations
}

export default CityAPI
