import React from "react"
import { Link } from "react-router-dom"

import styles from "./header.less"

const Component = () => (
    <div className={styles.header}>
        <div className={styles.searchBox}>
            <Link className={styles.searchBtn} to="/search">
                <i className={styles.searchIcon + " iconfont"}>&#xe67e;</i>
                <text>Grand Canyon</text>
            </Link>
        </div>
        <ul className={styles.navBar}>
            <li>Overview</li>
            <li className={styles.active}>Things to Do</li>
            <li>Multiday Tours</li>
            <li>Hotels</li>
        </ul>
    </div>
)


export default Component
