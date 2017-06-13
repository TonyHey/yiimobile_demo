import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import "./experience.less"

class Component extends React.Component {
    componentDidMount() {
        Swiper(".experiences-slider", {
            slidesPerView: "auto",
            spaceBetween: 20
        })
    }
    render() {
        return (
            <section className="experiences_section">
                <div className="container">
                    <h2>Experiences</h2>
                    <div className="row experiences-slider">
                        <div className="col-experience swiper-wrapper">
                            {this.props.experiences.map((item, index) => (
                                <div className="experience_category_div swiper-slide" key={`experience_${index}`}>
                                    <div className="experience_category_icon">
                                        <img src={item.icon} alt="" title="" />
                                    </div>
                                    <h3>{item.description}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="summer_special_div">
                        <div className="summer_special_slider">
                            <img src="public/img/summer_special_img.jpg" alt="" title="" />
                            <div className="summer_slider_text">
                                <h3>SUMMER</h3>
                                <h2>Specials</h2>
                            </div>
                        </div>
                        <div className="next_arrow">
                            <Link to="">{""}</Link>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
Component.propTypes = {
    experiences: PropTypes.oneOfType([PropTypes.array]).isRequired
}
Component.defaultProps = {
    experiences: [{
        icon: "public/img/culture_icon.png",
        description: "CULTURE"
    }, {
        icon: "public/img/adventure-icon.png",
        description: "ADVENTURE"
    }, {
        icon: "public/img/food_icon.png",
        description: "FOOD"
    }, {
        icon: "public/img/food_icon.png",
        description: "FOOD"
    }]
}

export default Component
