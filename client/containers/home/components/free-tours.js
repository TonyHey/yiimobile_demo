import React from "react"
import { Link } from "react-router-dom"
import cx from "classnames"

import config from "../../../../config"
import styles from "./free-tours.less"

class Component extends React.Component {

    constructor(props) {
        super(props)

        this.state = { sharePannelHidden: true }
    }

    handleToggle = () => this.setState({
        sharePannelHidden: !this.state.sharePannelHidden
    })

    render() {
        const shareLink = config.host
        return (
            <section className="free_tourse_section">
                <div className="container">
                    <h2>FREE TOURS</h2>
                    <p>Invite your friends, get
                    free travel credits</p>
                    <div className="share_your_link_div">
                        <h3>SHARE YOUR LINKS</h3>
                        <div className="shareformdiv">
                            <input type="label" placeholder={shareLink} disabled className="inputtextcontrolshare" />
                            <button className="sharebutton" onClick={this.handleToggle} />
                        </div>
                        <Link to="">How invite works?</Link>
                    </div>
                </div>
                <section
                    className={cx(
                        styles.sharePannel,
                        { disNone: this.state.sharePannelHidden }
                    )}
                >
                    <div className={styles.content}>
                        <h3>Share</h3>
                        <ul>
                            <li>
                                <a href={`ailto:?subject=Check%20this%20out&body=Check%20out%20what%20I%20found%20at%20Tours4Fun%2C%20${shareLink}`}>
                                    <span className={styles.socialEmail}>{""}</span>
                                    <b>Email</b>
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={"http://www.facebook.com/sharer.php?u=" + shareLink}
                                >
                                    <span className={styles.socialFacebook}>{""}</span>
                                    <b>Facebook</b>
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={"https://twitter.com/intent/tweet?text=6-Day%20U.S.%20East%20Coast%20Vacation%20Economy%20Package**From%20New%20York%20With%20Airport%20Tra&url=" + shareLink + "&via=tours4fun"}
                                >
                                    <span className={styles.socialTwitter}>{""}</span>
                                    <b>Twitter</b>
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={"http://www.tumblr.com/share?v=3&u=http%3A%2F%2F" + shareLink}
                                >
                                    <span className={styles.socialTumblr}>{""}</span>
                                    <b>Tumblr</b>
                                </a>
                            </li>
                            <li>
                                <a target="_blank" rel="noopener noreferrer" href={"https://www.evernote.com/clip.action?url=http%3A%2F%2F" + shareLink}>
                                    <span className={styles.socialEvernote}>{""}</span>
                                    <b>Evernote</b>
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={"https://plus.google.com/share?url=http%3A%2F%2F" + shareLink}
                                >
                                    <span className={styles.socialGoogle}>{""}</span>
                                    <b>Google+</b>
                                </a>
                            </li>
                        </ul>
                        <a className={styles.cancelBtn} onClick={this.handleToggle}>Cancel</a>
                    </div>
                </section>
            </section>
        )
    }
}

export default Component
