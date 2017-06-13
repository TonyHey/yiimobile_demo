import React, { Component } from "react"

import styles from "./recently-viewed.less"

class RecentlyViewed extends Component {
    componentDidMount() {
        Swiper(".recent-swiper-container", {
            slidesPerView: "auto",
            spaceBetween: 30
        })
    }

    getItems = recentViewed => {
        if (recentViewed.length) {
            return recentViewed.map((item, index) => (
                <div className={styles.itemWraper + " swiper-slide"} key={`item_${index}`}>
                    <div>
                        <img className={styles.itemImg} src={item.imgUrl} alt="item img" />
                    </div>
                    <div className={styles.desWraper}>
                        <h3 className={styles.itemDes}>{item.itemDes}</h3>
                        <div className={styles.priceBelt}>
                            <span className={styles.displayPrice}>{item.displayPrice}</span>
                            <span className={styles.itemPrice}>{item.itemPrice}</span>
                            <div className={styles.priceStar}>
                                <img src="public/img/recently_view_star.png" alt="" title="" />
                                <span>5</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }
        return (
            <p>no content</p>
        )
    }

    render() {
        let recentViewed = false
        if (typeof (LocalStorage) !== "undefined") {
            recentViewed = localStorage.getItem("RecentViewedProduct")
        }
        recentViewed = recentViewed || [
            {
                imgUrl: "/public/img/recent_view_img1.jpg",
                itemDes: "Lorem inpsum dolor slt amet conserctetur adipiscing",
                displayPrice: "$175",
                itemPrice: "$190"
            }, {
                imgUrl: "/public/img/recent_view_img1.jpg",
                itemDes: "Lorem inpsum dolor slt amet conserctetur adipiscing",
                displayPrice: "$120",
                itemPrice: "$180"
            }, {
                imgUrl: "/public/img/recent_view_img1.jpg",
                itemDes: "Lorem inpsum dolor slt amet conserctetur adipiscing",
                displayPrice: "$100",
                itemPrice: "$120"
            }, {
                imgUrl: "/public/img/recent_view_img1.jpg",
                itemDes: "Lorem inpsum dolor slt amet conserctetur adipiscing",
                displayPrice: "$100",
                itemPrice: "$120"
            }
        ] // for developmemt temporary
        if (recentViewed) {
            return (
                <div className={styles.recentlyViewed}>
                    <div className="container">
                        <h2 className={styles.title}>Recently Viewed</h2>
                        <div className="row recent-swiper-container">
                            <div className="swiper-wrapper">
                                {this.getItems(recentViewed)}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (<div className="disNone">{""}</div>)
    }
}

export default RecentlyViewed
