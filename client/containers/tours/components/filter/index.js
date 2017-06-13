import React from "react"
import { connect } from "react-redux"
// import PropTypes from "prop-types"
import "./index.less"
import ToursAPI from "../../../../redux/actions/ToursActions"

class Filter extends React.Component {
    constructor(props) {
        super(props)
        console.log("Filter ON")
    }

    render() {
        return (
            <section className="filter_main_section">
                <div className="filter_main_div">
                    <div className="container">
                        <div className="filter_sub_div">
                            <h2>Filters</h2>
                            <div className="close_sign">
                                <button onClick={() => this.props.openFilter(false)}>
                                    <img src="../../public/img/close_sign.png" alt="" title="" />
                                </button>
                            </div>
                            <section className="filter_cat_section">
                                <h3>Departure city</h3>
                                <div className="cat_tags">
                                    <a>France</a>
                                    <a>San Francisco</a>
                                    <a>France</a>
                                    <a>Las Vegas</a>
                                    <a>Salt Lake City</a>
                                </div>
                                <div className="see_all_cat_div">
                                    <a>see all</a>
                                </div>
                            </section>

                            <section className="filter_cat_section">
                                <h3>Duration</h3>

                            </section>

                            <section className="filter_cat_section border_none">
                                <h3>actiity type</h3>
                                <div className="cat_tags">
                                    <a>Sightseeing Tours</a>
                                    <a>Adventure</a>
                                    <a>Walking/Hiking</a>
                                    <a>Bus/Coach</a>
                                </div>

                            </section>

                        </div>
                    </div>
                    <div className="filter_bottom_links">
                        <div className="container">
                            <a className="reset_link">Reset</a>
                            <a className="apply_filters_link">Apply Filters</a>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default connect(null,
  { ...ToursAPI })(Filter)
