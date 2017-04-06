import React, {Component} from "react"
import { Link } from "react-router"

import NavBar from "../../common/components/nav-bar"
import { imgFilter } from "../../common/tool/filter"
import styles from "./index.less"


if (typeof (window) !== "undefined") {
    require("../../common/lib/swiper.min")
}

const nav_list = [{
    title: "多日游",
    img: "multiday"
}, {
    title: "一日游",
    img: "daytour"
}, {
    title: "票务",
    img: "ticket"
}, {
    title: "定制包团",
    img: "custom"
}]

const nav_second = [{
    title: "邮轮游",
    img: "cruises"
}, {
    title: "通讯",
    img: "sim"
}, {
    title: "签证",
    img: "visa"
}, {
    title: "接送",
    img: "car"
}]

class Home extends Component {
    constructor() {
        super()

        this.state = {
            banner: [{
                name: "1",
                picture: "http://dn-toursforfun.qbox.me/images/1080608_3.jpg?imageView2/1/w/720/h/404/q/90/format/jpg"
            }, {
                name: "2",
                picture: "http://dn-toursforfun.qbox.me/images/ppmoney0314.jpg?imageView2/1/w/720/h/404/q/90/format/jpg"
            }, {
                name: "3",
                picture: "http://dn-toursforfun.qbox.me/images/1080x608_7.jpg?imageView2/1/w/720/h/404/q/90/format/jpg"
            }]
        }
    }

    componentDidMount() {
        new Swiper(".swiper-container", {
            pagination: ".swiper-pagination",
            loop: true,
            effect: "fade",
            fade: { crossFade: true },
            preloadImages: true,
            lazyLoading: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false
        })
    }

    getNavDom(data) {
        return data.map((item, index) => (
            <Link key={index} to={"/list/" + item.img + "/all"}>
                <div className={styles.navItem}>
                    <img src={"/public/img/home/" + item.img + ".png"} alt="" />
                    <p className={styles.navItemTitle}>{item.title}</p>
                </div>
            </Link>
        ))
    }

    getBanners() {
        const list = this.state.banner
        if(list.length) {
            return this.state.banner.map((item, index) => (
                <div
                    className="swiper-slide"
                    key={`banner_${index}`}
                >

                    <img className="swiper-lazy" data-src={imgFilter(item.picture, 360, 202)} />
                </div>
            ))
        }else {
            return (
                <div className="swiper-slide">
                    loading ...
                </div>
            )
        }
    }

    render() {

        return (
            <div className={styles.main}>
                <NavBar
                    ref="navBar"
                    leftIcon={(<i className="iconfont" >&#xe69c;</i>)}
                    title="首页"
                    onLeftClick={this.handleNavLeftClick}
                    rightIcon={(<i className="iconfont">&#xe648;</i>)}
                />

                {/* banner*/}
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {this.getBanners()}
                    </div>
                    <div className="swiper-pagination" />
                </div>

                {/* search*/}
                <div className={styles.search}>
                    <div className={styles.searchBox}>
                        <div className="main">
                            <Link className={styles.searchBtn} to="/search">
                                <i className={styles.searchIcon + " iconfont"}>&#xe69c;</i>
                                搜索关键词、产品ID
                            </Link>
                        </div>
                    </div>
                </div>

                {/* nav link*/}
                <div className={styles.navBox + " main margin-top-m"}>
                    <div className={styles.navTr}>
                        {this.getNavDom(nav_list)}
                    </div>
                    <div className={styles.navTr}>
                        {this.getNavDom(nav_second)}
                    </div>
                </div>

                <div className="margin-top-s main nav-row">
                    <Link to={"/visa"}>
                        <img src="/public/img/home/boutique.png" alt="途风精品" />
                    </Link>
                </div>

            </div>
        )
    }
}

export default Home
