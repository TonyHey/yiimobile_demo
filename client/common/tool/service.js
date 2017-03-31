import { API_user } from "../api"

export const userLogin = () => {
    let userID = localStorage.getItem("user_id")
    if(userID) {
        API_user.info(userID).then(rs => {
            localStorage.setItem("user_data", JSON.stringify(rs))
            return "success"
        })
    }
    if(!userAuth.hasCookieToken() && !!cookieService.get("TFF_ACCOUNT")) {
        API_user.accountLogin(cookieService.get("TFF_ACCOUNT")).then(rs => {
            if(rs.code === 1) {
                userAuth.setLogin(rs.data)
                if(rs.data.openid) {
                    localStorage.setItem("openid", rs.data.openid)
                }
                return "success"
            }else{
                alert("登录失败 " + rs.code)
                return "faild"
            }
        }).catch(err => {
            console.log(err)
            return "faild"
        })
    }
}

export const cookieService = {
    get: function(c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=")
            if (c_start !== -1) {
                c_start = c_start + c_name.length + 1
                var c_end = document.cookie.indexOf(";", c_start)
                if (c_end === -1) {
                    c_end = document.cookie.length
                }
                return window.unescape(document.cookie.substring(c_start, c_end))
            }
            return ""
        }
    },
    set: function(c_name, c_value, exdays, domain) {
        var d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        var expires = "expires=" + d.toGMTString()
        if (domain) {
            document.cookie = c_name + "=" + c_value + "; " + expires + "; path=/; domain=" + domain
        }else {
            document.cookie = c_name + "=" + c_value + "; " + expires + "; path=/;"
        }
    },
    del: function(c_name, domain) {
        this.set(c_name, this.get(c_name), -1, domain)
    }
}

export const userAuth = {
    setLogin: userData => {
        localStorage.setItem("access_token", userData.access_token)
        localStorage.setItem("user_id", userData.user_id)
        localStorage.setItem("user_name", userData.username)
        userLogin()
    },
    logout: () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("user_id")
        localStorage.removeItem("username")
        localStorage.removeItem("user_data")
    },
    hasCookieToken: () => {
        return !!localStorage.getItem("access_token")
    },
    cookieCheck: () => {
        if(!userAuth.hasCookieToken()) {
            return false
        }
        return true
    }
}
