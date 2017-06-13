import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import PropTypes from "prop-types"

import NavBar from "../../common/components/nav-bar"
import Header from "./components/header"
import List from "./components/list"
import Scroll from "../../common/components/scroll"
import Filter from "./components/filter"
// import API from "../../common/api"
import filtersHidden from "../../redux/actions/listActions"

import styles from "./index.less"

class ProductListView extends Component {
    static propTypes = {
        filterHidden: PropTypes.bool.isRequired,
        setHidden: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
            list_data: [],
            page: 1,
            loading: true
        }
    }

    componentWillMount() {
        this.getListData()
    }

    onListScroll = e => {
        console.log(e)
    }

    onListScrollComplete = () => {
        console.log("done")
    }

    getListData() {
        this.setState({ loading: false })
        // API.productList("multiday-tour", {
        //     page: this.state.page
        // }).then(rs => {
        //     const list = Object.assign({}, this.state).list_data
        //     this.setState({
        //         list_data: list.concat(rs.product_list),
        //         loading: rs.cur_page <= rs.total_page
        //     })
        // })
    }

    historyBack = () => {
        history.back()
    }

    render() {
        const { filterHidden, setHidden } = this.props
        return (
            <div className="product-list-view">
                <NavBar className={styles.topNav}>
                    <i className="iconfont" onClick={this.onUserClick} >&#xe69d;</i>
                    <i className="iconfont" onClick={this.onMenuClick} >
                        <img src="/public/img/menu.png" alt="menu" />
                    </i>
                </NavBar>
                <div>
                    <Header />
                    <Scroll
                        offset="200"
                        throttle="200"
                        onScroll={this.onListScroll}
                        onScrollComplete={this.onListScrollComplete}
                    >
                        <div>
                            <List data={this.state.list_data} hidden={false} switchSize="undefined" setHidden={setHidden} />
                            <div className="loading txt-center">loading ...</div>
                        </div>
                        <Filter hidden={filterHidden} setHidden={setHidden} />
                    </Scroll>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    filterHidden: state.listReducers.filtersHidden
})
const mapDispatchToProps = dispatch => ({
    setHidden: bindActionCreators(filtersHidden, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductListView)
