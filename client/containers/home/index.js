import React, { Component } from "react"
import { Helmet } from "react-helmet"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import NavBar from "../../common/components/nav-bar"
import Banner from "../../common/components/banner"
import Landing from "./components/landing-container"
import Categrory from "./components/category"
import RecentlyViewed from "./components/recently-viewed"
import PopularCities from "./components/popular-cities"
import Experiences from "./components/experience"
import FreeTours from "./components/free-tours"
import Footer from "../../common/components/footer"
import configs from "../../../config/index"
import { getBanners, getPopularDestinations } from "../../redux/actions/HomeActions"

if (typeof (window) !== "undefined") {
    require("../../common/lib/swiper.min")
}

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bannerText: "The World’s Local Adventure for Less",
            searchKey: ""
        }
    }
    componentWillMount() {
        this.props.getPopularDestinations(320, 380)
        this.props.getBanners(640, 680)
    }

    render() {
        const { banners, history } = this.props

        return (
            <div>
                <Helmet>
                    <title>Home</title>
                    <link rel="canonical" href={configs.desktop.url} />
                    <meta name="Description" content="Find affordable holiday vacation packages, sightseeing tours, things to do, city day trips in world-wide destinations. Book Today and Save!" />
                </Helmet>
                {/* header nav bar */}
                <NavBar />
                {/* banner */}
                <Banner banners={banners}>
                    <Landing history={history} />
                </Banner>
                {/* category */}
                <Categrory />
                {/* recently viewed */}
                <RecentlyViewed />
                {/* popular cities */}
                <PopularCities Cities={this.props.popularCities} />
                {/* experience */}
                <Experiences />
                {/* free tours */}
                <FreeTours />
                {/* footer */}
                <Footer />
            </div>
        )
    }
}

Home.propTypes = {
    popularCities: PropTypes.oneOfType([PropTypes.array]).isRequired,
    getPopularDestinations: PropTypes.func.isRequired,
    getBanners: PropTypes.func.isRequired,
    history: PropTypes.oneOfType([PropTypes.object]).isRequired,
    banners: PropTypes.oneOfType([PropTypes.array]).isRequired,
}
Home.defaultProps = {
    popularCities: []
}

const mapStateToProps = state => ({
    popularCities: state.CityReducer.popularDestinations,
    banners: state.BannersReducer.banners
})

export default connect(mapStateToProps, {
    getPopularDestinations,
    getBanners
})(Home)
