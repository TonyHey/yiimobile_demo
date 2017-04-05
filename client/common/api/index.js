import fetch from "isomorphic-fetch"
import { URL } from "./config"

let reqHeader = new Headers()
reqHeader.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8;")
reqHeader.append("X-ACCESS-PLATFORM", "mobile")

// add search params
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
        Promise.reject("api request failed")
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
        Promise.reject("api request failed")
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
    },
    testPost: params => {
        return POST("url", params)
    }
}

export default API
