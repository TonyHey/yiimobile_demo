import React from "react"
import PropTypes from "prop-types"

import Banner from "../../../common/components/banner"
import styles from "./top.less"

const Component = props => (
    <div className={styles.productTop + " section-bottom"}>
        <section className={styles.gallery + " section-bottom"}>
            <Banner banners={props.banners} dotsBool>{""}</Banner>
            <i className={styles.hotIcon + " iconfont"} >&#xe64d;</i>
        </section>
        <section className={styles.productInfo}>
            <p className={styles.productTitle}>
                { props.title }
            </p>
            <p className={styles.productPrice}>
                <span className={styles.normal}>US</span>
                <span className={styles.special}>${props.displayPrice}</span>
                <span className={styles.normal}>From</span>
                <span className={styles.normal + " " + styles.strikePrice}>${props.strikePrice}</span>
            </p>
            <div className={styles.productBar}>
                <div className={styles.barItems}>
                    <p>
                        <i className={styles.barIcon + " iconfont"} >&#xe64d;</i>
                        <span> Small Group Tour</span>
                    </p>
                    <p>
                        <i className={styles.barIcon + " iconfont"} >&#xe64d;</i>
                        <span> Small Group Tour</span>
                    </p>
                </div>
                <p className={styles.lastItem}><i className={"iconfont " + styles.lastIcon}>&#xe683;</i></p>
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
