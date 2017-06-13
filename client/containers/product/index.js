import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import Top from "./components/top"
import ProductAPI from "../../redux/actions/ProductActions"
import NotFound from "../../common/components/not-found"
import NavBar from "../../common/components/nav-bar"
import styles from "./index.less"

class ProductPage extends React.Component {

    componentDidMount() {
        this.props.fetchDetailsByProductId(this.props.match.params.productId)
    }

    render() {
        const { isProductNotFound, product } = this.props
        if (isProductNotFound) {
            return (<NotFound />)
        }
        return (
            <div>
                <NavBar className={styles.topNav}>
                    <Link to="/search"><i className="iconfont">&#xe69c;</i></Link>
                    <i className="iconfont" onClick={this.onUserClick} >&#xe69d;</i>
                    <i className="iconfont" onClick={this.onMenuClick} >
                        <img src="/public/img/menu.png" alt="menu" />
                    </i>
                </NavBar>
                <Top
                    banners={product.images}
                    title={product.name}
                    displayPrice={product.displayPrice}
                    strikePrice={product.strikePrice}
                />
            </div>
        )
    }
}

ProductPage.propTypes = {
    product: PropTypes.oneOfType([PropTypes.object]),
    match: PropTypes.oneOfType([PropTypes.object]),
    fetchDetailsByProductId: PropTypes.func.isRequired,
    isProductNotFound: PropTypes.bool.isRequired
}

ProductPage.defaultProps = {
    product: {},
    match: {}
}

function mapStateToProps(state) {
    const product = (typeof state.ProductReducers.product !== "undefined") ? state.ProductReducers.product : ProductAPI.Model
    return {
        isProductNotFound: state.ProductReducers.isProductNotFound,
        product
    }
}

export default connect(mapStateToProps, { ...ProductAPI })(ProductPage)
