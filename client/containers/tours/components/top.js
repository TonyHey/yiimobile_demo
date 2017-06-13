import React from "react"
import PropTypes from "prop-types"

import Banner from "../../../common/components/banner"
import styles from "./top.less"

const Component = props => (
    <div className={styles.productTop + " section-bottom"}>
        <section className={styles.gallery + " section-bottom"}>
            <Banner banners={props.banners}>
                <div className="swiper-pagination" />
            </Banner>
            <i className={styles.hotIcon + " iconfont"} >&#xe64d;</i>
        </section>
        <section className={styles.productInfo}>
            <p className={styles.productDes}>
                { props.title }
            </p>
            <p className={styles.productPrice}>
                <span>US</span>
                <span>${props.displayPrice}</span>
                <span>From</span>
                <span>${props.strikePrice}</span>
            </p>
            <div className={styles.productBar}>
                <p>
                    <i className={styles.barIcon + " iconfont"} >&#xe64d;</i>
                    <span> Small Group Tour</span>
                </p>
                <p>
                    <i className={styles.barIcon + " iconfont"} >&#xe64d;</i>
                    <span> Small Group Tour</span>
                </p>
                <p><i className={styles.barIcon + " iconfont"} >&#xe64d;</i></p>
            </div>
        </section>
    </div>
)

Component.propTypes = {
    title: PropTypes.string.isRequired,
    banners: PropTypes.oneOfType([PropTypes.array]).isRequired,
    displayPrice: PropTypes.string.isRequired,
    strikePrice: PropTypes.string.isRequired,
}

export default Component
