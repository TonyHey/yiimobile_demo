import { ADD_PUBLIC_DETAIL } from "../constants"


export default function addDetails(state = {}, action) {
    switch (action.type) {
    case ADD_PUBLIC_DETAIL:
        return Object.assign({}, action.text, ...state)
    default:
        return state
    }
}
