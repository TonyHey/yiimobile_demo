import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Counter from "./components/Counter"
import * as CounterActions from "../../redux/actions/CounterActions"

const CounterApp = props => {
    const { counter, dispatch } = props
    return (
        <Counter counter={counter}{...bindActionCreators(CounterActions, dispatch)} />
    )
}

CounterApp.propTypes = {
    counter: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
}

function select(state) {
    return {
        counter: state.counter
    }
}

export default connect(select)(CounterApp)
