import React from "react"
import PropTypes from "prop-types"

import styles from "./index.less"

class Search extends React.Component {
    static propTypes = {
        recentSearch: PropTypes.oneOfType([PropTypes.array]).isRequired,
        value: PropTypes.string.isRequired
    }

    static defaultProps = {
        recentSearch: ["New York", "Las Vegas"],
        value: ""
    }

    constructor(props) {
        super(props)
        this.state = { searchVal: this.props.value.replace("-", " ") }
    }

    componentDidMount() {
        document.title = "Search"
    }

    handleChange = event => {
        this.setState({ searchVal: event.target.value })
    }

    handleClear = () => {
        this.setState({ searchVal: "" })
    }

    handleCancel = () => {
        history.back()
    }

    handleRecent = event => {
        this.setState({ searchVal: event.target.innerText })
    }

    render() {
        const recentSearch = () => {
            const recentList = this.props.recentSearch
            if (recentList.length) {
                return (
                    <section className={styles.recentSearch}>
                        <p className={styles.title}>Recent Searches</p>
                        <div className={styles.items}>
                            { recentList.map((item, key) => (
                                <p key={`recent_${key}`} className={styles.item} onClick={this.handleRecent}>{item}</p>
                            ))}
                        </div>
                    </section>
                )
            }
            return (
                <section>{""}</section>
            )
        }
        return (
            <div className={styles.main}>
                <form onSubmit={this.handleSubmit} className={styles.search}>
                    <div className={styles.searchInput}>
                        <i className={styles.searchIcon + " iconfont"}>&#xe69c;</i>
                        <input
                            type="text"
                            name="test"
                            value={this.state.searchVal}
                            className={styles.textBox}
                            onChange={this.handleChange}
                            onKeyUp={this.handleKeyDown}
                        />
                        <i className={styles.cleanIcon + " iconfont"} onClick={this.handleClear}>&#xe6da;</i>
                    </div>
                    <input type="button" className={styles.cancelBtn} value="Cancel" onClick={this.handleCancel} />
                </form>
                {recentSearch()}
                <div className={styles.spliter}>{""}</div>
                <div className="search-result">Search Results List</div>
            </div>
        )
    }
}


export default Search
