import React from "react"
import PropTypes from "prop-types"

const Counter = props => {
    const { increment, incrementIfOdd, decrement, counter } = props
    return (
        <p>
            Clicked: {counter} times
            {" "}
            <button onClick={increment}>+</button>
            {" "}
            <button onClick={decrement}>-</button>
            {" "}
            <button onClick={incrementIfOdd}>Increment if odd</button>
        </p>
    )
}
Counter.propTypes = {
    increment: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired
}

export default Counter
