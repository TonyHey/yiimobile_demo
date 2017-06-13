import React, { Component } from "react"
import { Link } from "react-router-dom"
import cx from "classnames"

// import API from "../../common/api"
import styles from "./index.less"


class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mailWarning: "test msg",
            pwdWarning: "test msg",
            show: false,
            pwd: ""
        }
    }
    // handleShow = e => {
    //     console.log("test")
    //     e.preventDefault()
    //     this.state.show = true
    //     e.stopPropagation()
    //     console.log("s: ", this.state.show)
    // }
    // handleHidden = e => {
    //     e.preventDefault()
    //     this.state.show = false
    //     e.stopPropagation()
    //     console.log("h: ", this.state.show)
    // }
    // handlePwdChange = e => {
    //     this.setState({ pwd: e.target.value })
    //     e.stopPropagation()
    // }
    // handleSubmit = () => {
    //     API.testGet().then(res => {
    //         console.log(res)
    //     })
    // }
    render() {
        return (
            <div className={styles.main}>
                <div className={styles.content}>
                    <header className={styles.cancel}>
                        <Link to="">
                            <i className={styles.cancelIcon + " iconfont"} onClick={this.handleClear}>&#xe6da;</i>
                        </Link>
                    </header>
                    <section className={styles.logoWraper}>
                        <div className={styles.logo}>
                            <img src="/public/img/logo.png" alt="logo" />
                        </div>
                    </section>
                    <section className={styles.inputWraper}>
                        <form>
                            <section className={styles.mailWraper}>
                                <img className={styles.mail} src="/public/img/mail.png" alt="mail" />
                                <input type="text" placeholder="E-mail" />
                            </section>
                            <p className={styles.warningMsg}>{this.state.mailWarning}</p>
                            <section className={styles.pwdWraper}>
                                <input type="text" placeholder="Password" value={this.state.pwd} onChange={this.handlePwdChange} />
                                <input
                                    className={cx({ disNone: this.state.show })}
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.pwd}
                                    onChange={this.handlePwdChange}
                                />
                                <text onMouseDown={this.handleShow} onMouseUp={this.handleHidden}>
                                    Show
                                </text>
                                <img className={styles.password} src="/public/img/password.png" alt="password" />
                            </section>
                            <p className={styles.warningMsg}>
                                {this.state.pwdWarning}
                                <span><Link to="">Forget your Password</Link>?</span>
                            </p>
                            <input type="submit" value="Log in" onSubmit={this.handleSubmit} />
                        </form>
                    </section>
                </div>
                <footer className={styles.loginFooter}>
                    <div><p>Sign in with</p></div>
                    <section className={styles.socialItems}>
                        <div><img className={styles.mail} src="/public/img/mail.png" alt="mail" /></div>
                        <div><img className={styles.mail} src="/public/img/mail.png" alt="mail" /></div>
                    </section>
                    <section className={styles.cutOff}><p>or</p></section>
                    <section className={styles.mailSign}>
                        <Link to="/signup">Sign up with your Email</Link>
                    </section>
                </footer>
            </div>
        )
    }
}

export default SignUp
