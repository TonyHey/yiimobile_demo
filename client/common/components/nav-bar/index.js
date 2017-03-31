import React, {Component} from "react"

import styles from "./nav-bar.less"

class Nav extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { leftIcon, title, rightIcon, onLeftClick, onRightClick} = this.props

        return(
            <div className={styles.headerBar} >
                <div className={styles.leftIcon} onClick={onLeftClick} >
                    {leftIcon}
                </div>
                <div className={styles.navTitle}>
                    {title}
                </div>
                <div className={styles.rightIcon} onClick={onRightClick} >
                    {rightIcon}
                </div>
            </div>
        )
    }
}

export default Nav
