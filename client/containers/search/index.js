import React from "react"
import { Link } from "react-router-dom"

import API from "../../common/api"
import styles from "./index.less"


class SearchForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { value: "" }
    }

    handleChange = event => {
        this.setState({ value: event.target.value.toUpperCase() })
    }

    handleClear = () => {
        this.setState({ value: "" })
    }

    handleKeyUp = event => {
        event.preventDefault()
        if (event.keyCode === 13) {
            API.testGet().then(res => {
                console.log(res)
            })
        }
    }

    render() {
        return (
            <div className={styles.search}>
                <form onSubmit={this.handleSubmit}>
                    <div className={styles.searchInput}>
                        <i className={styles.searchIcon + " iconfont"}>&#xe69c;</i>
                        <input
                            type="text"
                            name="test"
                            className={styles.textBox}
                            value={this.state.value}
                            onChange={this.handleChange}
                            onKeyUp={this.handleKeyDown}
                        />
                        <i className={styles.cleanIcon + " iconfont"} onClick={this.handleClear}>&#xe6da;</i>
                    </div>
                    <Link to="/">
                        <input type="button" className={styles.cancelBtn} value="Cancel" />
                    </Link>
                </form>
            </div>
        )
    }
}


export default SearchForm
