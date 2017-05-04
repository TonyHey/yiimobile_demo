import React from "react"
import { Link } from "react-router-dom"

import styles from "../index.less"

const Component = () => (
    <div className={styles.popularCities}>
        <header>
            <p>
                Popular Cities
                <span><Link to="">See all</Link></span>
            </p>
        </header>
        <section className={styles.contentWraper}>
            <div className={styles.content}>
                <img src="/public/img/lazy.png" alt="item img" />
                <div className={styles.innerText}>
                    <p className={styles.country}>New York</p>
                    <p className={styles.nomads}>500k nomads</p>
                </div>
            </div>
            <div className={styles.content}>
                <img src="/public/img/lazy.png" alt="item img" />
                <div className={styles.innerText}>
                    <p className={styles.country}>Tokyo</p>
                    <p className={styles.nomads}>350k nomads</p>
                </div>
            </div>
        </section>
        <section className={styles.toDo}>
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

export default Component
