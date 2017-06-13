import React from "react"
import { connect } from "react-redux"

class Tours extends React.Component {

    componentDidMount() {
        console.log(this)
        console.log(this.props.match.params.searchKeyword)
        console.log(this.props.productList)
    }

    render() {
        console.log(this.props.location.pathname)
        console.log(this.props.match.params)
        let pageName
        if (this.props.match.params.cat) {
            pageName = "Category Page : " + this.props.match.params.cat
        } else {
            pageName = "Product Page : " + this.props.location.pathname
        }

        return (
            <div>
                <h1> {pageName} </h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps, null)(Tours)
