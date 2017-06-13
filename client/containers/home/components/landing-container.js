import React, { Component } from "react"
import PropTypes from "prop-types"

import { urlPrettify } from "../../../common/tool/filter"
import "./landing-container.less"


export default class Landing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchKey: ""
        }
    }

    handleSubmit = () => {
        const searchParam = (/\w+/).test(this.state.searchKey) ? this.state.searchKey : "new york"
        this.props.history.push(`/tours/${urlPrettify(searchParam)}`)
    }
    handleChange = e => {
        this.setState({ searchKey: e.target.value })
    }

    render() {
        return (
            <div className="container landing-banner-container">
                <div className="searchformdiv">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            value={this.state.searchKey}
                            placeholder="Where do you want to go?"
                            className="inputtextcontrol"
                            onChange={this.handleChange}
                        />
                        <input type="submit" value="" className="searchbtn" />
                    </form>
                </div>
            </div>
        )
    }
}

Landing.propTypes = {
    history: PropTypes.oneOfType([PropTypes.object]).isRequired
}
