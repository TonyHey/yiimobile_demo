import React from "react"

import "./index.less"

const Component = () => (
    <footer className="footer_section">
        <div className="container">
            <div className="row display-flex">
                <div className="col-md-4">
                    <div className="footer_link">
                        <div className="footer_icon">
                            <span className="iconfooter1">{""}</span>
                        </div>
                        <h4>CONTACT US</h4>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="footer_link">
                        <div className="footer_icon">
                            <span className="iconfooter2">{""}</span>
                        </div>
                        <h4>DOWNLOAD APP</h4>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="footer_link">
                        <div className="footer_icon">
                            <span className="iconfooter3">{""}</span>
                        </div>
                        <h4>MY ACCOUNT</h4>
                    </div>
                </div>
            </div>
        </div>
    </footer>
)

export default Component
