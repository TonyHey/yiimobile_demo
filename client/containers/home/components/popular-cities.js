import React from "react"
import { Link } from "react-router-dom"
import Slider from "react-slick"
import PropTypes from "prop-types"
import { get } from "../../../common/api"

import styles from "./popular-cities.less"
import { urlPrettify } from "../../../common/tool/filter"

const Component = props => {
    const { Cities } = props
    const settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2
    }
    let sliderHtml
    const handleNearBy = () => {
        if ("geolocation" in navigator) {
            let params
            navigator.geolocation.getCurrentPosition(
                position => {
                    params = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        rlon: 1,
                        rlat: 1,
                        sort_id: 3,
                        _v: 2,
                        _img_size: "302px"
                    }
                    get("/map/getNearByTours", params).then(
                        data => console.log("data: ", data)
                    ).catch(
                        err => console.log("fectch: ", err)
                    )
                }
            )
        }
    }
    if (Cities.length > 0) {
        sliderHtml = (<Slider {...settings}>
            {
                Cities.map((item, index) => (
                    <Link
                        key={index}
                        to={"/search/" + urlPrettify(item.name)}
                        className={styles.slideItem}
                    >
                        <div className={styles.content} >
                            <img src={item.image} alt="item img" />
                            <div className={styles.innerText}>
                                <p className={styles.country}>{item.name}</p>
                                <p className={styles.nomads}>500k nomads</p>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </Slider>)
    } else {
        sliderHtml = ""
    }

    return (
        <div className={styles.popularCities}>
            <header>
                <p>
                    Popular Cities
                    <span><Link to="">See all</Link></span>
                </p>
            </header>
            <section className={styles.contentWraper}>
                {sliderHtml}
            </section>
            <section className={styles.toDo} onClick={handleNearBy}>
                <i className="iconfont">&#xe67e;</i>
                THINGS TODO NEARBY
            </section>
            <section className={styles.sunnyDest}>
                <img src="/public/img/lazy.png" alt="item img" />
                <div className={styles.innerText}>
                    <p className={styles.sunnyTitle}>SUNNY DESTINARIONS</p>
                    <p className={styles.sunnyDes}>FOR <span>SPRING BREAK</span> ADVENTURE</p>
                </div>
            </section>
        </div>
    )
}

Component.propTypes = {
    Cities: PropTypes.oneOfType([PropTypes.array]).isRequired
}


Component.defaultProps = {
    Cities: []
}

export default Component
