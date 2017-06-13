/**
 * interface:
 * offset(var) distance between bottom
 * throttle(var) method timing reducer
 * onScroll(func) trigger scroll
 * onScrollComplete(func) method while sroll at bottom
 */

import React, { Component } from "react"
import PropTypes from "prop-types"

import { throttle } from "../../tool/util"

class Scroll extends Component {
    static propTypes = {
        throttle: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        onScroll: PropTypes.func.isRequired,
        onScrollComplete: PropTypes.func.isRequired,
        children: PropTypes.oneOfType([PropTypes.element]).isRequired
    }
    constructor(props) {
        super(props)
        const time = Number(this.props.throttle) || 0
        this.handleScroll = throttle(this.handleScroll.bind(this), time)
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll)
    }

    // scroll bar distance from top
    getScrollTop = () => {
        let scrollTop = 0
        let bodyScrollTop = 0
        let documentScrollTop = 0

        if (document.body) {
            bodyScrollTop = document.body.scrollTop
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
        return scrollTop
    }

    // total page height
    getScrollHeight = () => {
        let scrollHeight = 0
        let bodyScrollHeight = 0
        let documentScrollHeight = 0

        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight
        }

        const heightBoolean = bodyScrollHeight - documentScrollHeight > 0
        scrollHeight = heightBoolean ? bodyScrollHeight : documentScrollHeight
        return scrollHeight
    }

    // height of the browser window
    getWindowHeight = () => {
        let windowHeight = 0
        if (document.compatMode === "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight
        } else {
            windowHeight = document.body.clientHeight
        }
        return windowHeight
    }

    handleScroll = () => {
        const offset = Number(this.props.offset) || 0
        const scrollTop = (this.getScrollTop() + this.getWindowHeight() + offset)
        const scrollHeight = this.getScrollHeight()
        this.props.onScroll({
            y: scrollTop
        })

        if (this.props.onScrollComplete && scrollTop >= scrollHeight) {
            this.props.onScrollComplete()
        }
    }

    render() {
        return (
            <div className="scroll">
                {this.props.children}
            </div>
        )
    }
}

export default Scroll
