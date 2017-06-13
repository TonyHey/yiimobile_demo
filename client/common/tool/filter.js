import _ from "lodash"
import config from "../../../config/index"

const CDN = config.cdn.url
/**
 * img url filter
 *
 * @export
 * @param {any} data
 * @param {any} w
 * @param {any} h
 * @param {number} [q=85]
 * @param {boolean} [d=false]
 * @returns
 */
export function imgFilter(data, w, h, q = 85, d = false) {
    const reg = "^((https|http)?://)"
    const re = new RegExp(reg)
    const dpr = d ? window.devicePixelRatio : 1

    let imgUrl = ""

    if (!re.test(data)) {
        imgUrl = CDN + data
    } else {
        imgUrl = data
    }

    if (w && h) {
        return imgUrl + "?imageView2/1/w/" + Math.round(w * dpr) + "/h/" + Math.round(h * dpr) + "/q/" + Number(q) + "/format/jpg"
    }

    return imgUrl
}

export function liveFilter(language) {
    if (language) {
        return language.substring(0, language.length - 5)
    }
    return false
}

// added from old MSite
export function htmlFilter(content) {
    const contentHtml = content && content.replace(/\n/g, "<br />")
    return contentHtml
}

export function ucwords(content) {
    return content.replace(/\w+/g, a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase())
}

export function clearhtml(content) {
    return content.replace(/(<([^>]+)>)/ig, "")
}

export function urlPrettify(input) {
    if (input) {
        return input.toLowerCase().replace(/ /g, "-")
    }
    return input
}

export function urlUnPrettify(input) {
    if (input) {
        return input.replace(/(?!-$)-|_/g, " ").replace(/\w\S*/g, txt =>
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        )
    }
    return input
}

// return unique value with recent order
export function arrayAddUniqueRecent(temp, keyword) {
    _.remove(temp, n => n === keyword)
    temp.push(keyword)
    return temp
}
