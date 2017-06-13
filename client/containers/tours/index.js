import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroller"
import SubPageHeader from "../../common/components/header-subpage"
// import _ from "lodash/array"
import ToursAPI from "../../redux/actions/ToursActions"
import SearchAct from "../../redux/actions/SearchAction"
import LocalstorageAct from "../../redux/actions/LocalstorageAction"
import Search from "../../common/components/search"
import Filter from "./components/filter"

import { urlUnPrettify, urlPrettify } from "../../common/tool/filter"
import "./index.less"

function isDisplaySmallPrice(p, sp) {
    return p === sp ? "none" : ""
}

class Tours extends React.Component {
    constructor(props) {
        super(props)
        this.loadMore = this.loadMore.bind(this)
        this.setEntityType()
    }

    componentWillMount() {
        let keywords = this.props.match.params.searchKeyword
        keywords = urlUnPrettify(keywords)
        this.props.setFilter({ keywords })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.entityType !== this.props.match.params.entityType) {
            this.setEntityType(nextProps.match.params.entityType)
        }
        if (nextProps.match.params.searchKeyword !== this.props.match.params.searchKeyword) {
            this.props.openSearch(false)
            this.props.setRecentSearch(urlUnPrettify(nextProps.match.params.searchKeyword))
            this.props.setSuggestionValue(urlUnPrettify(nextProps.match.params.searchKeyword))
            this.props.setFilter({ keywords: urlUnPrettify(nextProps.match.params.searchKeyword) })
        }
    }

    setEntityType(entityType = this.props.match.params.entityType) {
        if (entityType) {
            let productEntityType = 0
            this.props.tabData.map(item => {
                if (urlPrettify(item.entity) === entityType) {
                    productEntityType = item.entityId
                }
            })
            this.props.setFilter({ product_entity_type: productEntityType })
        }
    }

    loadMore() {
        if (!this.props.isToursNotFound && !this.props.isToursFetching) {
            this.props.setNextPage()
            if (this.props.match.params.searchKeyword === "near-me") {
                this.props.searchToursNearBy()
            } else {
                this.props.searchToursByKeyword()
            }
        }
    }

    displayTours() {
        if (this.props.tours.length > 0) {
            return this.props.tours.map((item, index) =>
                (
                    <div className="list_product_box" key={index}>
                        <div className="list_product_img">
                            <img src={item.G} alt="" title="" />
                            <div className="discount_div">Buy 2 Get 3rd/4rd Discounted</div>
                            <div className="list_product_star">
                                <img src="../../public/img/recently_view_star.png" alt="" title="" /> <span>4</span>
                            </div>
                        </div>
                        <div className="list_product_content">
                            <div className="list_product_title">
                                <a className="heart_icon"><span /></a>
                                <h2><span>{item.N}</span></h2>
                                <div className="clear"><span /></div>
                            </div>
                            <div className="list_product_price">
                                <span className="product_list_bigprice">${item.SP}</span>
                                <span className="product_list_smallprice" style={{ display: isDisplaySmallPrice(item.P, item.SP) }}>${item.P}</span>
                                <div className="detaillink active_detail"><a >Details</a></div>
                            </div>
                        </div>

                        <div className="list_product_department">
                            <div className="list_product_department_main">
                                <div className="list_product_department_icon">
                                    <img src="../../public/img/departue_icon.png" alt="" title="" />
                                </div>
                                <div className="list_product_department_content">
                                    <span className="department_title">Departue: </span>
                                    <span className="department_text">New York </span>
                                </div>
                            </div>
                            <div className="list_product_department_main">
                                <div className="list_product_department_icon">
                                    <img src="../../public/img/hightlights_icon.png" alt="" title="" />
                                </div>
                                <div className="list_product_department_content">
                                    <span className="department_title">Hightlights: </span>
                                    <span className="department_text">Sea, Streets </span>
                                </div>
                            </div>
                            <div className="list_product_department_main">
                                <div className="list_product_department_icon">
                                    <img src="../../public/img/langueage_icon.png" alt="" title="" />
                                </div>
                                <div className="list_product_department_content">
                                    <span className="department_title">Language: </span>
                                    <span className="department_text">English </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )
        }
        return []
    }

    renderEntityType() {
        let selectedClass
        return this.props.tabData.map(item => {
            selectedClass = this.props.filter.product_entity_type === item.entityId ? "active" : ""
            return (
                <li key={item.entityId} className={selectedClass} ><Link to={`/tours/${this.props.match.params.searchKeyword}/${urlPrettify(item.entity)}`}>{item.entity}</Link></li>
            )
        })
    }

    render() {
        return (
            <div>
                <SubPageHeader />
                {
                    this.props.isSearchOpen ?
                        <Search
                            history={this.props.history}
                            searchValue={urlUnPrettify(this.props.match.params.searchKeyword)}
                        /> : <section className="list_search_section">
                            <div className="container">
                                <div className="list_search_component">
                                    <form onClick={() => this.props.openSearch(true)}>
                                        <input type="text" value={urlUnPrettify(this.props.match.params.searchKeyword)} readOnly className="inputsearchlist" />
                                        <input type="submit" value="" className="searchbtnlist" />
                                    </form>
                                </div>
                                <div className="list_cat_links">
                                    <ul>
                                        {this.renderEntityType()}
                                    </ul>
                                </div>
                            </div>
                        </section>
                }
                {
                    this.props.isFilterOpen ? <Filter /> : ""
                }
                {/* list product section */}
                <section className="list_product_section">
                    <div className="container">
                        <div className="filter_belt">
                            <div className="filter_record_counter"><span>{this.props.totalProducts}</span> tours found:</div>
                            <div className="filter_button" onClick={() => this.props.openFilter(true)}>
                                <img src="../../public/img/filter_icon.png" alt="" title="" />Filter (0)
                            </div>
                        </div>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadMore}
                            hasMore={!this.props.isToursNotFound}
                            loader={<div className="loader">Loading ...</div>}
                        >
                            {this.displayTours()}
                        </InfiniteScroll>
                    </div>
                </section>
            </div>
        )
    }
}

Tours.propTypes = {
    match: PropTypes.oneOfType([PropTypes.object]),
    tours: PropTypes.oneOfType([PropTypes.array]),
    tabData: PropTypes.oneOfType([PropTypes.array]),
    searchToursByKeyword: PropTypes.func.isRequired,
    totalProducts: PropTypes.number.isRequired,
    isToursNotFound: PropTypes.bool.isRequired,
    isToursFetching: PropTypes.bool.isRequired,
    isSearchOpen: PropTypes.bool.isRequired
}
/*
const ENTITY_ONEDAY_TOUR = 0;
const ENTITY_MULTIDAY_TOUR = 1;
const ENTITY_CRUISE = 2;
const ENTIRY_HOTEL = 3;
const ENTIRY_TRANSPORTATION = 4;
const ENTIRY_SIM = 5;
const ENTITY_BUS_TOUR = 6;
*/
Tours.defaultProps = {
    tours: [],
    totalProducts: 0,
    tabData: [{
        entity: "OVERVIEW",
        entityId: "7"
    }, {
        entity: "THINGS TO DO",
        entityId: "0"
    }, {
        entity: "MULTIDAY TOURS",
        entityId: "1"
    }, {
        entity: "HOTELS",
        entityId: "3"
    }],
    match: {},
    isToursNotFound: false,
    isToursFetching: false,
    isSearchOpen: false,
    filterData: {}
}

function mapStateToProps(state) {
    return {
        ...state.ToursReducers,
        isToursNotFound: state.ToursReducers.isToursNotFound,
        isToursFetching: state.ToursReducers.isToursFetching
    }
}

export default connect(mapStateToProps, { ...ToursAPI, ...SearchAct, ...LocalstorageAct })(Tours)
