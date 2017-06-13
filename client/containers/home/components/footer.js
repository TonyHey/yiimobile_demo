import React from "react"
import { Link } from "react-router-dom"
import cx from "classnames"

import config from "../../../../config"
import styles from "./footer.less"

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
            <footer className={styles.footer + " padding-bottom-l"}>
                <section className={styles.footerContent + " padding-top-s padding-right-s padding-bottom-s padding-left-s"}>
                    <p className={styles.footerTitle + " padding-bottom-xs"}>Footer</p>
                    <p className={styles.footerIntro + " padding-bottom-s"}>Invite your friends, get free travel credits</p>
                    <div className={styles.footerCircle} />
                    <Link to="" className={styles.footerHow}>How Invites Work</Link>
                    <div className={styles.footerShare}>
                        <p className="padding-top-s padding-bottom-xs">Share Your Link</p>
                        <div className={styles.searchBtn}>
                            <text>{shareLink}</text>
                            <i className={styles.shareIcon + " iconfont"} onClick={this.handleToggle}>&#xe69f;</i>
                        </div>
                    </div>
                </section>
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
                                    <span className="social_email">{""}</span>
                                    <b>Email</b>
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={"http://www.facebook.com/sharer.php?u=http%3A%2F%2F" + shareLink}
                                >
                                    <span className="social_facebook">{""}</span>
                                    <b>Facebook</b>
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={"https://twitter.com/intent/tweet?text=6-Day%20U.S.%20East%20Coast%20Vacation%20Economy%20Package**From%20New%20York%20With%20Airport%20Tra&url=" + shareLink + "&via=tours4fun"}
                                >
                                    <span className="social_twitter">{""}</span>
                                    <b>Twitter</b>
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={"http://www.tumblr.com/share?v=3&u=http%3A%2F%2F" + shareLink}
                                >
                                    <span className="social_instagram">{""}</span>
                                    <b>Tumblr</b>
                                </a>
                            </li>
                            <li>
                                <a target="_blank" rel="noopener noreferrer" href={"https://www.evernote.com/clip.action?url=http%3A%2F%2F" + shareLink}>
                                    <span className="social_evernote">{""}</span>
                                    <b>Evernote</b>
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={"https://plus.google.com/share?url=http%3A%2F%2F" + shareLink}
                                >
                                    <span className="social_google">{""}</span>
                                    <b>Google+</b>
                                </a>
                            </li>
                        </ul>
                        <a className={styles.cancelBtn} onClick={this.handleToggle}>Cancel</a>
                    </div>
                </section>
            </footer>
        )
    }
}

export default Component
