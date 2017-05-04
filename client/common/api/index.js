import fetch from "isomorphic-fetch"
import configs from "../../../config/index"

const URL = configs.mobileAPI.url

const reqHeader = new Headers()
reqHeader.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8;")
// reqHeader.append("X-ACCESS-PLATFORM", "mobile")

// add search params
const handleParams = params => {
    if (!params) {
        return ""
    }

    const paramsArr = Object.entries(params)

    for (let i = 0; i < paramsArr.length; i += 1) {
        paramsArr[i] = paramsArr[i].join("=")
    }
    return paramsArr.join("&")
}

const GET = (url, params) => {
    const query = handleParams(params) === "" ? "" : ("?" + handleParams(params))

    return fetch(URL + url + query, {
        method: "GET",
        headers: reqHeader
    }).then(rs => rs.json()).then(json => {
        if (json.ok) {
            console.log(json)
            return json
        }
        Promise.reject("api error : " + json.message)
        return false
    }).catch(err => {
        Promise.reject("api request failed:" + err)
    })
}

const POST = (url, params) => {
    const headerParams = {
        method: "POST",
        body: handleParams(params),
        headers: reqHeader
    }

    return fetch(URL + url, headerParams)
    .then(rs => rs.json())
    .then(json => {
        if (json.ok) {
            return json
        }
        Promise.reject(json.message)
        return false
    })
    .catch(err => {
        Promise.reject("api request failed:" + err)
    })
}

const API = {
    homeBanner: () => GET("/config/index/v1"),
    hotSearch: () => GET("/resource/popularSearch"),
    search: params => GET("/search/entry", params),
    testPost: params => POST("url", params),
    testGet: () => GET("/common/getCountries")
}

export default API
