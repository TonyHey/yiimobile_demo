import React, { Component } from "react"
import { Link } from "react-router-dom"

// import API from "../../common/api"
import styles from "./index.less"


class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mailWarning: "test",
            pwdWarning: ""
        }
    }
    // handleSubmit = () => {
    //     API.testGet().then(res => {
    //         console.log(res)
    //     })
    // }
    render() {
        return (
            <div className={styles.main}>
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
                            <img className={styles.password} src="/public/img/password.png" alt="password" />
                            <input type="password" placeholder="Password" />
                        </section>
                        <p className={styles.warningMsg}>{this.state.pwdWarning}</p>
                        <input type="submit" value="SIGN UP" onSubmit={this.handleSubmit} />
                    </form>
                </section>
                <footer className={styles.signupFooter}>
                    <p><Link to="/login">Already have an account?</Link></p>
                </footer>
            </div>
        )
    }
}

export default SignUp
