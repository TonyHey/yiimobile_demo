import { ADD_TODO } from "../constants"

const init = [{
    text: "123"
}]

export default function todos(state = init, action) {
    switch (action.type) {
    case ADD_TODO:
        return [
                { text: action.text },
            ...state
        ]
    default:
        return state
    }
}
