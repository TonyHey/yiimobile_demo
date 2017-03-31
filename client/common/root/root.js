import React, {Children, Component, cloneElement} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import actions from "../redux/actions"

class Common extends Component {
    constructor() {
        super()
    }

    render() {
        const {children, ...props} = this.props

        return (
            <div>
                {Children.map(children, child =>
                    cloneElement(child, {...props})
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Common)
