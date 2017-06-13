import React from "react"
import "./category.less"

class Component extends React.Component {
    componentDidMount() {
        Swiper(".category-swiper-container", {
            slidesPerView: "auto",
            spaceBetween: 20
        })
    }
    render() {
        return (
            <section className="product_type_section">
                <div className="container">
                    <div className="row category-swiper-container">
                        <div className="swiper-wrapper">
                            { this.props.categories.map((item, index) => (
                                <div className="col-md-3 swiper-slide" key={`category_${index}`}>
                                    <div className="productbox">
                                        <div className="product_icon">
                                            <img className="product_type_img" src={item.product_type_img} alt="" title="" />
                                        </div>
                                        <h3 className="product_type_des">{item.product_type_des}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
Component.defaultProps = {
    categories: [{
        product_type_img: "public/img/tours_activity_icon.png",
        product_type_des: "TOURS & ACTIVITIES"
    }, {
        product_type_img: "public/img/hotel_icon.png",
        product_type_des: "HOTELS"
    }, {
        product_type_img: "public/img/cruises_icon.png",
        product_type_des: "CRUISES"
    }, {
        product_type_img: "public/img/local-expert.png",
        product_type_des: "LOCAL EXPERTS"
    }]
}

export default Component
