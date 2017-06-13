import fetch from "isomorphic-fetch"
import configs from "../../../config/index"

const queue = []

const reqHeader = new Headers()
reqHeader.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8;")

// extend strings function
// add hashCode() to strings

/* eslint-disable no-bitwise, operator-assignment */
function getHashCode(str) {
    if (Array.prototype.reduce) {
        return str.split("").reduce((a, b) => {
            const c = ((a << 5) - a) + b.charCodeAt(0)
            return c & c
        }, 0
        )
    }
    let hash = 0
    if (str.length === 0) {
        return hash
    }

    for (let i = 0; i < str.length; i += 1) {
        const character = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + character
        hash = hash & hash // Convert to 32bit integer
    }
    return hash
}
/* eslint-enable no-bitwise, operator-assignment */

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

/**
 * Generate url
 */
function getUrl(path, params) {
    const queryString = handleParams(params)
    let url = configs.mobileAPI.url + path
    if (queryString) {
        url += "?" + queryString
    }
    return url
}

/**
 * Generate request hash
 */
function getRequestHash(url) {
    return getHashCode(url)
}

const showLoadingIndicator = (indicator = null) => {
    if (indicator) {
        indicator.show()
    }
}

const hideLoadingIndicator = (indicator = null) => {
    if (indicator) {
        indicator.hide()
    }
}

/**
 * Remove url from queue
 */
function removeFromQueue(url) {
    const hash = getRequestHash(url)
    const index = queue.indexOf(hash)
    if (queue.length > 0 && index > -1) {
        queue.splice(index, 1)
    }
    if (queue.length === 0) {
        hideLoadingIndicator()
    }
}


/**
 * Add to requests queue
 */
function addToQueue(url) {
    const hash = getRequestHash(url)
    queue.push(hash)
    showLoadingIndicator()
}

/**
 * Get api
 *
 * @param string endpoint
 * @param object params Query params
 * @param boolean cache Should cache request
 * @param boolean loadingIndicator loading indicator
 */
export const get = (endpoint, params = {}, cache = false, loadingIndicator = true) => {
    const url = getUrl(endpoint, params)

    const headers = {
        method: "GET",
        headers: reqHeader
    }
    return fetch(url, headers).then(response => {
        if (loadingIndicator) {
            removeFromQueue(url)
        }
        return Promise.resolve(response.json())
    }).catch(err => {
        if (loadingIndicator) {
            removeFromQueue(url)
        }
        return Promise.reject("Api calling error" + err)
    })
}

/**
 * Post data to api
 *
 * @param endpoint
 * @param params
 *
 * @return Promise
 */
export const post = (endpoint, payload = {}, params = {}, loadingIndicator = true) => {
    const headers = {
        method: "POST",
        body: handleParams(params),
        headers: reqHeader
    }

    const url = getUrl(endpoint, params)

    if (loadingIndicator) {
        addToQueue(url)
    }

    return fetch(url, headers)
        .then(rs => rs.json())
        .then(data => {
            if (loadingIndicator) {
                removeFromQueue(url)
            }
            return data
        })
        .catch(err => {
            if (loadingIndicator) {
                removeFromQueue(url)
            }
            Promise.reject("api request failed:" + err)
        })
}
