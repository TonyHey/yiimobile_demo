import { LOADING } from "../constants"

export default function fetch(state = {loading: false}, action) {
    switch(action.type) {
    case LOADING:
        return {
            loading: action.loading
        }
    default:
        return state
    }
}
