import config from "../../../config/index"

const CDN = config.cdn.url
/**
 * img url处理，添加cdn地址
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

// 产品类型判断
export function productTypeFilter(productType) {
    const type = {}
    switch (productType) {
    case "ticketBroadway":
    case "ticketSeason":
    case "ticketNormal":
    case "ticket":
        Object.assign(type, { info: "ticket", url: "daytour" })
        break
    case "tourHelicopter":
    case "tourSimWifi":
    case "tourNormal":
    case "oneday":
        Object.assign(type, { info: "oneday", url: "daytour" })
        break
    case "multiDayNormal":
    case "multiday":
        Object.assign(type, { info: "multiday", url: "multiDayNormal" })
        break
    default: break
    }

    return type
}

/*
* 判断没有如详情页那样的有直接给出产品类型的产品的类型
* 在进行一次产品判断后最后通过通用的转换转成对应的3个大类
*/
export function pTypeIndexFilter(productInfo) {
    let productType = ""
    if (productInfo) {
        if (!productInfo.is_ticket && productInfo.product_entity_type === "1") {
            productType = "multiDayNormal"
        } else if (productType.is_flight) {
            productType = "tourHelicopter"
        } else if (productType.is_sim || productType.is_wifi) {
            productType = "tourSimWifi"
        } else if (productType.is_broadway_tour && productType.is_ticket) {
            productType = "ticketBroadway"
        } else if (productType.is_ticket && productType.is_season_tour
                    && !productType.is_broadway_tour) {
            productType = "ticketSeason"
        } else if (!(productType.is_broadway_tour || productType.is_season_tour)
                    && productType.is_ticket) {
            productType = "ticketNormal"
        } else if (productType.type && productType.type === "multidaytour") { // 收藏列表url
            productType = "multiDayNormal"
        } else {
            productType = "tourNormal"
        }
    }
    return productTypeFilter(productType)
}

// 数字星期转换为文字星期
export function mathWeekExchange(week) {
    const wordWeek = ["", "周日", "周一", "周二", "周三", "周四", "周五", "周六"]
    let wordString = ""
    week.map((item, index) => {
        wordString += (wordWeek[week[index + 1]] + "、")
    })
    return wordString
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
