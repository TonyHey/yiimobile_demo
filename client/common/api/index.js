import fetch from "isomorphic-fetch"
import { URL } from "./config"

let reqHeader = new Headers()
reqHeader.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8;")
reqHeader.append("X-ACCESS-PLATFORM", "mobile")

// 对象转url search字符串
const handleParams = params => {
    if(!params) {
        return ""
    }

    let params_arr = []
    for(let attr in params) {
        params_arr.push(attr + "=" + params[attr])
    }
    return params_arr.join("&")
}

const GET = (url, params) => {
    const query  = handleParams(params) === "" ? "" : ("?" + handleParams(params))

    return fetch(URL + url + query, {
        method: "GET",
        headers: reqHeader
    }).then(rs => rs.json()).then(json => {
        if(json.code !== 1) {
            Promise.reject("api error : " + json.message)
        }else{
            return json.data
        }
    }).catch(err => {
        Promise.reject("接口请求失败")
    })
}

const POST = (url, params) => {
    return fetch(URL + url, {
        method: "POST",
        body: handleParams(params),
        headers: reqHeader
    }).then(rs => rs.json()).then(json => {
        if(json.code !== 1) {
            Promise.reject(json.message)
        }else{
            return json
        }
    }).catch(err => {
        Promise.reject("接口请求失败")
    })
}

const API = {
    homeBanner: () => {
        return GET("/config/index/v1")
    },
    hotSearch: () => {
        return GET("/resource/popularSearch")
    },
    search: params => {
        return GET("/search/entry", params)
    },
    productList: (type, params) => {
        return GET("/search/" + type + "/product_list/1.0", params)
    }
}

export const API_Product = {
    detail: pID => {
        return GET(`/product/${pID}/detail`)
    }
}

export const API_Comment = {
    product_comment: pID => {
        return GET(`/product/multiday-tour/${pID}/comment`, {limit: 1000})
    }
}

export const API_user = {
    info: userID => {
        if(!reqHeader.get("X-ACCESS-TOKEN")) {
            reqHeader.append("X-ACCESS-TOKEN", `${localStorage.getItem("access_token")}`)
        }
        return GET(`/user/${userID}/new`)
    },
    accountLogin: param => {
        param = encodeURIComponent(param)
        return POST("/user/sso", {cookie: param})
    }
}

export const API_Visa = {
    detail: country => {
        return GET("/visa/detail", { country: country })
    }
}

export default API

