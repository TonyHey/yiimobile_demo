import Constant from "../constants"
import { get } from "../../common/api"

function fetchProductSuccess(payload) {
    return {
        type: Constant.FETCH_PRODUCT_SUCCESS,
        payload
    }
}

function fetchProductError() {
    return {
        type: Constant.FETCH_PRODUCT_ERROR
    }
}

function apiProductFormatting(data) {
    return {
        productId: data.I,
        name: data.N,
        smallDescription: data.SDS,
        description: data.DS,
        displayPrice: (data.P !== data.SP && data.SP > 0) ? data.SP : data.P,
        strikePrice: (data.P !== data.SP && data.SP > 0) ? data.P : data.P,
        productEntityType: data.ET,
        duration: data.D,
        durationType: data.DT,
        code: data.M,
        satisfaction: data.S,
        commentsCount: data.CN,
        startCity: data.SC,
        endCity: data.EC,
        template: data.T,
        images: data.PG,
        tourTypeIcons: data.TTI,
        url: data.U,
        operatingLanguages: data.L,
        autoConfirm: data.AC,
        autoConfirmDescription: data.ACD,
        providerId: data.A,
    }
}

const fetchDetailsByProductId = productId => (
    dispatch => {
        get("/product/getProductInfo", { productID: productId })
            .then(data => {
                if (data.I === null) {
                    dispatch(fetchProductError("Product not found"))
                } else {
                    dispatch(fetchProductSuccess(apiProductFormatting(data)))
                }
            })
            .catch(err => dispatch(fetchProductError(err)))
    }
)


const search = params => get("/product/getCityProducts", params)

const getNearbyHotels = (latitude, longitude, checkIn, checkOut, adults, children, exclude) => {
    const queryParams = {
        latitude,
        longitude,
        check_in: checkIn,
        check_out: checkOut,
        adults,
        children,
        exclude,
    }
    return get("/product/getHotelsNearby", queryParams)
}

const ProductAPI = {
    fetchDetailsByProductId,
    search,
    getNearbyHotels
}

export default ProductAPI
