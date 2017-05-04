import React from "react"
import { Link } from "react-router-dom"

import styles from "../index.less"

const Component = () => (
    <footer className={styles.footer + " padding-bottom-l"}>
        <section className={styles.footerContent + " padding-top-s padding-right-s padding-bottom-s padding-left-s"}>
            <p className={styles.footerTitle + " padding-bottom-xs"}>Footer</p>
            <p className={styles.footerIntro + " padding-bottom-s"}>Invite your friends, get free travel credits</p>
            <div className={styles.footerCircle} />
            <Link to="" className={styles.footerHow}>How Invites Work</Link>
            <div className={styles.footerShare}>
                <p className="padding-top-s padding-bottom-xs">Share Your Link</p>
                <Link className={styles.searchBtn} to="/search">
                    <text>WHERE DO YOU WANT TO GO</text>
                    <i className={styles.shareIcon + " iconfont"}>&#xe69f;</i>
                </Link>
            </div>
        </section>
    </footer>
)

export default Component
