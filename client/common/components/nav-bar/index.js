import React from "react"
import { Link } from "react-router-dom"

import "./nav-bar.less"

const Nav = () => (
    <header>
        <div className="container">
            <nav>
                <div className="stripmain">
                    <div className="bar">{""}</div>
                    <div className="bar bar2">{""}</div>
                    <div className="bar">{""}</div>
                    <span className="countertext">3</span>
                </div>
            </nav>
            <div className="logo">
                <Link to=""><img src="public/img/logo.png" alt="" title="" /></Link>
            </div>
        </div>
    </header>
)

export default Nav
