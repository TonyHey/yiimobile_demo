import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Autosuggest from "react-autosuggest"
import { Link } from "react-router-dom"
import _ from "lodash"
import "./index.less"
import theme from "./theme.less"
import ToursAPI from "../../../redux/actions/ToursActions"
import LocalstorageAct from "../../../redux/actions/LocalstorageAction"
import SearchAct from "../../../redux/actions/SearchAction"
import { urlPrettify } from "../../tool/filter"

function renderSuggestion(item) {
    return (
        <div className="suggestionItem">
            { item.name }
            <span> { item.type }</span>
        </div>
    )
}

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.debounced = _.debounce(value => this.props.getSuggestions(value), 700)
    }
    componentDidMount() {
        document.title = "Search"
        this.props.getRecentSearch()
        this.props.getPopular()
    }

    onChange = (event, { newValue }) => {
        this.props.setSuggestionValue(newValue)
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.debounced(value)
    }

    onSuggestionsClearRequested = () => {
        this.props.clearSuggestions()
    }
    onSuggestionSelected = (event, { suggestion }) => {
        this.props.setSuggestionValue(suggestion.name)
        const searchType = suggestion.type === "" ? "" : "/" + urlPrettify(suggestion.type)
        this.props.history.push(`/tours/${urlPrettify(suggestion.name) + searchType}`)
        this.props.openSearch(false)
    }
    getSuggestionValue = suggestion => suggestion.name
    clearSearchValue = () => this.props.setSuggestionValue("")

    handleSubmit = e => {
        e.preventDefault()
        this.props.history.push(`/tours/${urlPrettify(e.target.autosuggest.value)}`)
    }
    renderRecentSearch = () => {
        if (this.props.recentSearch.length) {
            return (
                <div className="search_list">
                    <h2>Recent Searches:</h2>
                    <div className="search_tags">
                        {
                          this.props.recentSearch.map((item, key) => (
                              <Link key={`recent_${key}`} to={`/tours/${urlPrettify(item)}`}>{item}</Link>
                          ))
                        }
                    </div>
                </div>
            )
        }
        return (
            <section />
        )
    }
    renderPopulerSearchh = () => {
        if (this.props.popularSearch.length) {
            return (
                <div className="search_list">
                    <h2>Popular Searches:</h2>
                    <div className="search_tags">
                        {
                          this.props.popularSearch.map((item, key) => (
                              <Link key={`recent_${key}`} to={`/tours/${urlPrettify(item)}`}>{item}</Link>
                          ))
                        }
                    </div>
                </div>
            )
        }
        return (
            <section />
        )
    }

    render() {
        const inputProps = {
            placeholder: "Search",
            name: "autosuggest",
            value: this.props.searchValue,
            onChange: this.onChange
        }
        return (
            <div>
                <section className="search_section_module">
                    <div className="container">
                        <div className="search_section_module_form">
                            <form onSubmit={this.handleSubmit}>
                                <Autosuggest
                                    theme={theme}
                                    className="search_section_module_input"
                                    suggestions={this.props.suggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    getSuggestionValue={this.getSuggestionValue}
                                    renderSuggestion={renderSuggestion}
                                    inputProps={inputProps}
                                    onSuggestionSelected={this.onSuggestionSelected}
                                />
                                <input type="button" onClick={() => this.props.openSearch(false)} value="Cancel" className="search_section_module_button" />
                                <a onClick={this.clearSearchValue} ><img src="../../../public/img/search_module_close_icon.png" alt="" title="" /></a>
                            </form>
                        </div>
                        { this.renderRecentSearch()}
                        { this.renderPopulerSearchh()}
                    </div>
                </section>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        ...state.SearchReducer
    }
}
Search.propTypes = {
    popularSearch: PropTypes.oneOfType([PropTypes.array]),
    searchValue: PropTypes.string,
    recentSearch: PropTypes.oneOfType([PropTypes.array]),
    history: PropTypes.oneOfType([PropTypes.object]).isRequired,
    suggestions: PropTypes.oneOfType([PropTypes.array])
}
Search.defaultProps = {
    searchValue: "",
    popularSearch: [],
    recentSearch: [],
    suggestions: []
}

export default connect(mapStateToProps,
  { ...SearchAct, ...LocalstorageAct, ...ToursAPI })(Search)
