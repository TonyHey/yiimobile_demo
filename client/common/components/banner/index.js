import React, { Component } from "react"
import PropTypes from "prop-types"
import Slider from "react-slick"
import { imgFilter } from "../../tool/filter"
import styles from "./banner.less"


class Banner extends Component {

    getBanners() {
        const { banners, dotsBool } = this.props
        if (banners.length) {
            const settings = {
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: false,
                dots: dotsBool,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1
            }
            return (
                <Slider {...settings}>
                    {
                        banners.map((item, index) => (
                            <div key={`banner_${index}`} className={styles.bannerSlider}>
                                <img data-src={imgFilter(item, 360, 202)} alt="" />
                            </div>
                        ))
                    }
                </Slider>
            )
        }
        return (
            <div className={styles.loading}>loading...</div>
        )
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
    banners: PropTypes.oneOfType([PropTypes.array]).isRequired,
    dotsBool: PropTypes.bool.isRequired
}
Banner.defaultProps = {
    dotsBool: false
}

export default Banner
