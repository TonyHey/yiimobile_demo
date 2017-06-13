import React, { Component } from "react"
import PropTypes from "prop-types"

import styles from "./recently-viewed.less"

const ItemSpan = props => {
    const hotDisplay = props.hot ? "iconfont" : "dis-none iconfont"

    return (
        <span className={hotDisplay}>&#xe64d;</span>
    )
}

ItemSpan.propTypes = {
    hot: PropTypes.bool.isRequired
}


class RecentlyViewed extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [{
                imgUrl: "/public/img/lazy.png",
                itemHot: true,
                itemDes: "Lorem inpsum dolor slt amet conserctetur adipiscing",
                itemPrice: "$100"
            }, {
                imgUrl: "/public/img/lazy.png",
                itemHot: false,
                itemDes: "Lorem inpsum dolor slt amet conserctetur adipiscing",
                itemPrice: "$100"
            }]
        }
    }

    getItems() {
        const itemList = this.state.items
        if (itemList.length) {
            return itemList.map((item, index) => (
                <div className={styles.itemWraper} key={`item_${index}`}>
                    <div className={styles.itemImg}>
                        <img src={item.imgUrl} alt="item img" />
                        <ItemSpan hot={item.itemHot} />
                    </div>
                    <p className={styles.itemDes}>{item.itemDes}</p>
                    <p className={styles.itemPrice}>{item.itemPrice}</p>
                </div>
            ))
        }
        return (
            <p>no content</p>
        )
    }

    render() {
        return (
            <div className={styles.recentlyViewed}>
                <p>Recently Viewed</p>
                <div className={styles.items}>
                    {this.getItems()}
                </div>
            </div>
        )
    }
}

export default RecentlyViewed
