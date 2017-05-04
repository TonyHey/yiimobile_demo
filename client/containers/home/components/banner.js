import React, { Component } from "react"
import { Link } from "react-router-dom"

import { imgFilter } from "../../../common/tool/filter"
import styles from "../index.less"

class Banner extends Component {
    constructor() {
        super()

        this.state = {
            banner: [{
                name: "1",
                picture: "https://d3ne5s9fv9p81l.cloudfront.net/images/mb_mothersday_ban.jpg?imageView2/1/w/720/h/404/q/90/format/jpg"
            }, {
                name: "2",
                picture: "https://d3ne5s9fv9p81l.cloudfront.net/images/750x300_may_tg_ban.jpg?imageView2/1/w/720/h/404/q/90/format/jpg"
            }, {
                name: "3",
                picture: "https://d3ne5s9fv9p81l.cloudfront.net/images/750x300_galapagos_ban.jpg?imageView2/1/w/720/h/404/q/90/format/jpg"
            }, {
                name: "4",
                picture: "https://d3ne5s9fv9p81l.cloudfront.net/images/750x300_wanderlust2017_ban.jpg?imageView2/1/w/720/h/404/q/90/format/jpg"
            }],
            bannerText: {
                first: "THE WORLD'S",
                second: "LOCAL",
                third: "ADVENTURE",
                fourth: "FOR LESS"
            }
        }
    }

    componentDidMount() {
        Swiper(".swiper-container", {
            loop: true,
            effect: "fade",
            fade: { crossFade: true },
            preloadImages: true,
            lazyLoading: true,
            lazyLoadingInPrevNext: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false
        })
    }

    getBanners() {
        const list = this.state.banner
        if (list.length) {
            return list.map((item, index) => (
                <div
                    className="swiper-slide"
                    key={`banner_${index}`}
                >
                    <img className="swiper-lazy" data-src={imgFilter(item.picture, 360, 202)} alt="" />
                </div>
            ))
        }
        return (
            <div className="swiper-slide">loading...</div>
        )
    }

    render() {
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {this.getBanners()}
                </div>
                {/* search*/}
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
            </div>
        )
    }
}

export default Banner
