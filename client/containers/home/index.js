import React, { Component } from "react"

import NavBar from "../../common/components/nav-bar"
import Banner from "./components/banner"
import RecentlyViewed from "./components/recently-viewed"
import PopularCities from "./components/popular-cities"
import Footer from "./components/footer"
import styles from "./index.less"


if (typeof (window) !== "undefined") {
    require("../../common/lib/swiper.min")
}

class Home extends Component {
    render() {
        return (
            <div className={styles.main}>
                <NavBar
                    className={styles.topNav}
                    logoIcon="/public/img/logo.png"
                    userIcon="&#xe69d;"
                    menuIcon="/public/img/menu.png"
                    onlogoClick={this.handleNavLogoClick}
                    onUserClick={this.handleNavUserClick}
                    onMenuClick={this.handleNavMenuClick}
                />

                {/* banner */}
                <Banner />

                {/* recently viewed */}
                <RecentlyViewed />

                <PopularCities />

                <Footer />
            </div>
        )
    }
}

export default Home
