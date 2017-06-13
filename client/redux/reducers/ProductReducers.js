import Constant from "../constants"

const intialState = {
    product: {
        productId: "",
        name: "",
        smallDescription: "",
        description: "",
        shortDescription: "",
        displayPrice: "",
        strikePrice: "",
        productEntityType: "",
        duration: "",
        durationType: "",
        code: "",
        satisfaction: "",
        commentsCount: "",
        startCity: "",
        endCity: "",
        template: "",
        images: [],
        tourTypeIcons: [],
        mainURL: "",
        stockStatus: false,
        isPackage: false,
        operatingLanguages: [],
        autoConfirm: false,
        autoConfirmDescription: "",
        geo: [],

        // ids go here
        providerId: "",
    },
    isProductNotFound: false
}

export default function ProductReducers(state = intialState, action) {
    switch (action.type) {
    case Constant.FETCH_PRODUCT_SUCCESS:
        return { ...state, product: action.payload, isProductNotFound: false }
    case Constant.FETCH_PRODUCT_ERROR:
        return { ...state, isProductNotFound: true }
    default:
        return state
    }
}
