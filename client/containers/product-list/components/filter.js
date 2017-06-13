import React from "react"
import cx from "classnames"
import PropTypes from "prop-types"

import styles from "./filter.less"

const Component = props => {
    const { hidden, setHidden } = props
    const handleClick = () => setHidden(true)
    return (
        <div className={cx(styles.filterWraper, { disNone: hidden })}>
            <div className={styles.filterContent}>
                <section className={styles.filterHeader}>
                    <div onClick={handleClick}>
                        <i className={styles.cancelIcon + " iconfont"}>&#xe6da;</i>
                    </div>
                    <button>Filters</button>
                    <button>Reset</button>
                </section >
                <section className={styles.filtersWraper}>
                    <div className={cx(styles.filters, styles.active)}>
                        <p className={styles.hasChecked + " " + styles.dot}>●</p>
                        <p>Departure</p>
                    </div>
                    <div className={styles.filters}>
                        <p className={styles.hasChecked + " " + styles.dot}>●</p>
                        <p>Departure</p>
                    </div>
                    <div className={styles.filters}>
                        <p className={styles.dot}>●</p>
                        <p>Departure</p>
                    </div>
                    <div className={styles.filters}>
                        <p className={styles.dot}>●</p>
                        <p>Departure</p>
                    </div>
                </section>
                <section className={styles.filterItems}>
                    <div className={styles.filterItem}>
                        <text>Las Vgas</text>
                        <input type="checkbox" name="Las Vgas" value="Las Vgas" />
                    </div>
                    <div className={styles.filterItem}>
                        <text>Las Vgas</text>
                        <input type="checkbox" name="Las Vgas" value="Las Vgas" />
                    </div>
                    <div className={styles.filterItem}>
                        <text>Las Vgas</text>
                        <input type="checkbox" name="Las Vgas" value="Las Vgas" />
                    </div>
                    <div className={styles.filterItem}>
                        <text>Las Vgas</text>
                        <input type="checkbox" name="Las Vgas" value="Las Vgas" />
                    </div>
                    <div className={styles.filterItem}>
                        <text>Las Vgas</text>
                        <input type="checkbox" name="Las Vgas" value="Las Vgas" />
                    </div>
                </section>
                <section className={styles.applyBtn}>
                    APPLY FILTERS
                </section>
            </div>
        </div>
    )
}
Component.propTypes = {
    hidden: PropTypes.bool.isRequired,
    setHidden: PropTypes.func.isRequired
}

export default Component
