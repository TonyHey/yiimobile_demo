import React from "react"
import { Link } from "react-router-dom"

// Style section
import "./index.less"

const HeaderSubpage = () => (
    <header className="subheader_section">
        <div className="container">
            <div className="sub_logo">
                <Link to={"/"}>
                    <img src="../../../public/img/logo.png" alt="" title="" />
                </Link>
            </div>
            <div className="userlinks">

                <img src="../../../public/img/user-icon.png" alt="" title="" />

                <a>
                    <img src="../../../public/img/dots-nav-icon.png" alt="" title="" />
                </a>
            </div>
        </div>
    </header>
)

export default HeaderSubpage
