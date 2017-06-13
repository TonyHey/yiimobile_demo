import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import styles from "./nav-bar.less"

const Nav = props => {
    const className = props.className ? (" " + props.className) : ""

    return (
        <div className={styles.headerBar + className} >
            <div className={styles.leftIcon} >
                <Link to="/"><img className={styles.logo} src="/public/img/logo.png" alt="logo" /></Link>
            </div>
            <div className={styles.rightIcon} >
                { props.children }
            </div>
        </div>
    )
}

Nav.propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired
}

Nav.defaultProps = {
    onLeftClick: () => false,
    onRightClick: () => false
}

export default Nav
