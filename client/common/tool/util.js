/**
 * 函数防抖
 *
 * @export
 * @param {any} fn
 * @param {any} wait
 * @param {any} immediate
 * @returns
 */
export function debounce(fn, wait, immediate) {
    let timeout
    let args
    let context
    let timestamp
    let result

    const later = function later() {
        const last = +(new Date()) - timestamp

        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            if (!immediate) {
                result = fn.apply(context, args)
                if (!timeout) {
                    context = null
                    args = null
                }
            }
        }
    }

    return function debounced() {
        context = this
        timestamp = +(new Date())

        const callNow = immediate && !timeout
        if (!timeout) {
            timeout = setTimeout(later, wait)
        }

        if (callNow) {
            result = fn.apply(context, args)
            context = null
            args = null
        }

        return result
    }
}

/**
 * 函数节流
 *
 * @export
 * @param {any} fn      传入函数
 * @param {any} wait    间隔时间
 * @param {any} scope
 * @returns {function}  传入的函数
 */
export function throttle(fn, wait, scope) {
    const waitTime = wait || 250
    let last
    let args
    let deferTimer

    return function() {
        const context = scope || this

        const now = +new Date()

        if (last && now < last + wait) {
            // hold on to it
            clearTimeout(deferTimer)
            deferTimer = setTimeout(() => {
                last = now
                fn.apply(context, args)
            }, waitTime)
        } else {
            last = now
            fn.apply(context, args)
        }
    }
}
