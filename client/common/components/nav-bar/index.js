import React from "react"
import PropTypes from "prop-types"
import styles from "./nav-bar.less"

const Nav = props => {
    const { logoIcon, userIcon, menuIcon, onLogoClick, onUserClick, onMenuClick } = props
    const className = props.className ? " " + props.className : ""

    return (
        <div className={styles.headerBar + className} >
            <div className={styles.leftIcon} >
                <i className="iconfont" onClick={onLogoClick} >
                    <img className={styles.logo} src={logoIcon} alt="logo" />
                </i>
            </div>
            <div className={styles.rightIcon} >
                <i className="iconfont" onClick={onUserClick} >{userIcon}</i>
                <i className="iconfont" onClick={onMenuClick} >
                    <img src={menuIcon} alt="menu" />
                </i>
            </div>
        </div>
    )
}

Nav.propTypes = {
    logoIcon: PropTypes.string.isRequired,
    userIcon: PropTypes.string.isRequired,
    menuIcon: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    onLogoClick: PropTypes.func.isRequired,
    onUserClick: PropTypes.func.isRequired,
    onMenuClick: PropTypes.func.isRequired
}

Nav.defaultProps = {
    onLeftClick: () => false,
    onRightClick: () => false
}

export default Nav
