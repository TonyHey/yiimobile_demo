import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import API from "../../common/api"
import Text from "./components/Text"
import UserNotFound from "./components/user404"

class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            test: ""
        }
    }

    componentWillMount() {
        API.testGet().then(data => {
            console.log(data)
            this.setState({
                test: "execute_time: " + data.execute_time
            })
        })
    }

    render() {
        return (
            <div className="user">
                <Text test={this.state.test} />
                <Switch>
                    <Route path="/user" exact />
                    <Route component={UserNotFound} />
                </Switch>
            </div>
        )
    }
}

export default User
