import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Route, Switch } from "react-router-dom"
import actions from "../redux/actions"
import Home from "./home"
import User from "./user"
import Counter from "./counter"
import Filtertest from "./filtertest"
import Search from "./search"
import NotFound from "../common/components/not-found"


const Common = () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user" component={User} />
        <Route path="/counter" exact component={Counter} />
        <Route path="/filtertest" component={Filtertest} />
        <Route path="/search" component={Search} />
        <Route component={NotFound} />

    </Switch>
)

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Common)
