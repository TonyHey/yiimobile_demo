import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import styles from "./popular-cities.less"
import { urlPrettify } from "../../../common/tool/filter"

const Component = props => {
    const { Cities } = props

    return (
        <div className={styles.popularCities}>
            <div className="container">
                <h2 className={styles.title}>Popular Destinations</h2>
                <section className={styles.contentWrapper + " row"}>
                    {Cities.map((item, index) => (
                        <Link
                            key={index}
                            to={`/tours/${urlPrettify(item.name)}`}
                            className="col-md-6"
                        >
                            <div className={styles.destBox} key={`popular_city_${index}`}>
                                <img src={item.image} alt="" title="" />
                                <h3>{item.name}</h3>
                            </div>
                        </Link>
                    ))}
                </section>
                <section className={styles.nearby}>
                    <Link className={styles.toDo} to="/tours/near-me">
                        <img src="public/img/nearby_icon.png" alt="" />
                        THINGS TODO NEARBY
                    </Link>
                </section>
            </div>
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
