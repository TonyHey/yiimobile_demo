import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
// import ReduxInfiniteScroll from "redux-infinite-scroll"
import ToursAPI from "../../redux/actions/ToursActions"
import Search from "../../common/components/search"
import { urlUnPrettify } from "../../common/tool/filter"

class Tours extends React.Component {

    componentDidMount() {
        let keywords = this.props.match.params.searchKeyword
        keywords = urlUnPrettify(keywords)
        const filterData = {
            keywords,
            pageSize: 15,
            page: 1,
            _img_size: "674x",
            filters: 1,
            product_entity_type: 1,
            start_date: "2017-05-19",
            checkout_date: "2017-05-20",
            room_adult_total: 2,
            room_child_total: 0,
            latitude: 34.0521019,
            longitude: -118.2436196
        }
        this.props.searchToursByKeyword(filterData)
    }

    displayTours() {
        if (this.props.products.length > 0 && this.props.products.length > 0) {
            return this.props.products.map((item, index) => (
                <Link to={"../detail/" + item.I} key={index}>
                    <h1>{item.I}_________{(item.N).substring(0, 8)} </h1>
                </Link>
            ))
        }
        return ""
    }

    render() {
        let itemsToDisplay
        if (this.props.isToursNotFound) {
            itemsToDisplay = <h1>Tours Not Found</h1>
        } else if (this.props.isToursFetching) {
            itemsToDisplay = <h1>Tours Fetching , Processing in Background</h1>
        } else {
            itemsToDisplay = this.displayTours()
        }
        return (
            <div>
                <Search value={this.props.match.params.searchKeyword} />
                {itemsToDisplay}
            </div>
        )
    }
}

Tours.propTypes = {
    match: PropTypes.oneOfType([PropTypes.object]),
    products: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    searchToursByKeyword: PropTypes.func.isRequired,
    isToursNotFound: PropTypes.bool.isRequired,
    isToursFetching: PropTypes.bool.isRequired
}

Tours.defaultProps = {
    products: [],
    match: {},
    isToursNotFound: false,
    isToursFetching: true,
}

const mapStateToProps = state => ({
    ...state.ToursReducers.tours,
    isToursNotFound: state.ToursReducers.isToursNotFound,
    isToursFetching: state.ToursReducers.isToursFetching
})

export default connect(mapStateToProps, { ...ToursAPI })(Tours)
