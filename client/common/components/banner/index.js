import React, { Component } from "react"
import PropTypes from "prop-types"

import styles from "./banner.less"

class Banner extends Component {
    componentWillUpdate() {
        Swiper(".banner-swiper", {
            pagination: ".swiper-pagination",
            loop: true,
            effect: "fade",
            fade: { crossFade: true },
            preloadImages: false,
            lazyLoading: true,
            lazyLoadingInPrevNext: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false
        })
    }

    getBanners() {
        const { banners } = this.props

        if (banners.length) {
            return (
                <div className="banner-swiper">
                    <div className="swiper-wrapper">
                        {banners.map(
                            (item, index) => (
                                <div key={`banner_${index}`} className="swiper-slide">
                                    <img src={item.G} alt="" />
                                </div>
                            )
                        )}
                    </div>
                    <div className="swiper-pagination">{""}</div>
                </div>
            )
        }
        return ""
    }

    render() {
        return (
            <div className={styles.bannerContainer}>
                { this.getBanners() }
                {/* search*/}
                { this.props.children }
            </div>
        )
    }
}

Banner.propTypes = {
    children: PropTypes.oneOfType(
        [PropTypes.array, PropTypes.element, PropTypes.string]
    ).isRequired,
    banners: PropTypes.oneOfType([PropTypes.array]).isRequired
}

export default Banner
