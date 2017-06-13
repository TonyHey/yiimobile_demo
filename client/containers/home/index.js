import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import NavBar from "../../common/components/nav-bar"
import Banner from "../../common/components/banner"
import RecentlyViewed from "./components/recently-viewed"
import PopularCities from "./components/popular-cities"
import Footer from "./components/footer"
import styles from "./index.less"
import configs from "../../../config/index"
import CityAPI from "../../redux/actions/CityActions"

class Home extends Component {
    constructor() {
        super()

        this.state = {
            bannerText: {
                first: "THE WORLD'S",
                second: "LOCAL",
                third: "ADVENTURE",
                fourth: "FOR LESS"
            }
        }
    }
    componentDidMount() {
        this.props.getPopularDestinations(185, 141)
    }
    onUserClick = e => {
        location.pathname = "login"
        console.log("user clicked: ", e)
    }
    onMenuClick = e => {
        console.log("menu clicked: ", e)
    }

    render() {
        return (
            <div className={styles.main}>
                <Helmet>
                    <title>Home</title>
                    <link rel="canonical" href={configs.desktop.url} />
                    <meta name="Description" content="Find affordable holiday vacation packages, sightseeing tours, things to do, city day trips in world-wide destinations. Book Today and Save!" />
                </Helmet>
                <NavBar className={styles.topNav}>
                    <i className="iconfont" onClick={this.onUserClick} >&#xe69d;</i>
                    <i className="iconfont" onClick={this.onMenuClick} >
                        <img src="/public/img/menu.png" alt="menu" />
                    </i>
                </NavBar>

                {/* banner */}
                <Banner banners={[]}>
                    <div className={styles.search}>
                        <div className={styles.searchDes}>
                            <p>{this.state.bannerText.first}</p>
                            <p>{this.state.bannerText.second}</p>
                            <p>{this.state.bannerText.third}</p>
                            <p>{this.state.bannerText.fourth}</p>
                        </div>
                        <div className={styles.searchBox}>
                            <Link className={styles.searchBtn} to="/search">
                                <i className={styles.searchIcon + " iconfont"}>&#xe69c;</i>
                                WHERE DO YOU WANT TO GO
                            </Link>
                        </div>
                    </div>
                </Banner>

                {/* recently viewed */}
                <RecentlyViewed />

                <PopularCities Cities={this.props.popularCities} />

                <Footer />
            </div>
        )
    }
}

Home.propTypes = {
    popularCities: PropTypes.oneOfType([PropTypes.array]).isRequired,
    getPopularDestinations: PropTypes.func.isRequired
}
Home.defaultProps = {
    popularCities: []
}

const mapStateToProps = state => ({
    popularCities: state.CityReducer.popularDestinations,
})

export default connect(mapStateToProps, {
    getPopularDestinations: CityAPI.getPopularDestinations
})(Home)
