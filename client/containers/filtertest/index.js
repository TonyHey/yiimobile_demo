import React, { Component } from "react"
import * as Filter from "../../common/tool/filter"

class Filtertest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            test: ""
        }
    }

    render() {
        return (
            <div className="user">
                <h1>htmlFilter</h1>
                {Filter.htmlFilter("htmlFilter3br\n \n \n test ")}
                <h1>ucwords </h1>
                {Filter.ucwords("ucwOrdsTeSt")} <br />
                <h1>clearhtml </h1>
                {Filter.clearhtml("<p>P tag test</p>")} <br />
            </div>
        )
    }
}
export default Filtertest
