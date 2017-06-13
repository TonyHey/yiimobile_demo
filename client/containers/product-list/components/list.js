import React from "react"
import PropTypes from "prop-types"
import Lazyload from "react-lazyload"
import { Link } from "react-router-dom"

import { imgFilter } from "../../../common/tool/filter"

import styles from "./list.less"

const Component = props => {
    const { data, hidden, switchSize, setHidden } = props
    const handleClick = () => setHidden(false)

    const doSwitch = switchSize === "undefined" ? "" : switchSize

    const imgLoad = item => {
        if (hidden) {
            return (
                <img className="list-img" src="/public/img/lazy.png" alt={item.product_name} />
            )
        }
        return (
            <Lazyload
                once={false}
                throttle={200}
                height={300}
                placeholder={<img className="list-img" src="/public/img/lazy.png" alt={item.product_name} />}
            >
                <img className="list-img" src={imgFilter(item.image, 360, 202)} alt={item.product_name} />
            </Lazyload>
        )
    }

    const filter = () => (
        <div className={styles.filterWraper}>
            <span>{data.length} tours found</span>
            <div className={styles.filter} onClick={handleClick}>
                <i className={styles.filterIcon + " iconfont"}>&#xe67f;</i>
                <text>Filter({data.length})</text>
            </div>
        </div>
    )

    const listItem = data.map(item => (
        <Link className="block" key={item.product_id} to={`/detail/${item.product_id}`} >
            <div className={styles.listItem}>
                <div className={styles.imgWraper}>
                    { imgLoad(item) }
                </div>
                <div className={styles.listInfo}>
                    <section className={styles.infoLeft}>
                        <h5 className={styles.listInfoTitle}>{item.product_name}</h5>
                        <p className={styles.from}>from New York</p>
                        <div className={styles.listInfoOther}>
                            <button>Instant Comfirm</button>
                            <button>Small Group Tour</button>
                        </div>
                    </section>
                    <section className={styles.infoRight}>
                        <p className={styles.showPrice}>
                            <em>$</em>
                            <span>
                                {item.special_price ? item.special_price : item.default_price}
                            </span>
                        </p>
                        <p className={styles.defaultPrice}>
                            <em>$</em>
                            <span>
                                {item.default_price}
                            </span>
                        </p>
                        <p>star</p>
                    </section>
                </div>
            </div>
        </Link>
    ))

    return (
        <div className={hidden ? "list" : "list active " + doSwitch}>
            { filter() }
            { listItem }
        </div>
    )
}

Component.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array]).isRequired,
    hidden: PropTypes.bool.isRequired,
    switchSize: PropTypes.string.isRequired,
    setHidden: PropTypes.func.isRequired
}

export default Component
