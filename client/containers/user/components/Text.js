import React from "react"
import PropTypes from "prop-types"

const Component = props => {
    const { test } = props
    return (
        <p>{test}</p>
    )
}

Component.propTypes = {
    test: PropTypes.string.isRequired
}

export default Component
