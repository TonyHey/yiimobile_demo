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
                    context = args = null
                }
            }
        }
    }

    return function debounced() {
        context = this
        args = arguments
        timestamp = +(new Date())

        const callNow = immediate && !timeout
        if (!timeout) {
            timeout = setTimeout(later, wait)
        }

        if (callNow) {
            result = fn.apply(context, args)
            context = args = null
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
    wait || (wait = 250)
    let last,
        deferTimer
    return function() {
        let context = scope || this

        let now = +new Date,
            args = arguments
        if (last && now < last + wait) {
            // hold on to it
            clearTimeout(deferTimer)
            deferTimer = setTimeout(function() {
                last = now
                fn.apply(context, args)
            }, wait)
        } else {
            last = now
            fn.apply(context, args)
        }
    }
}
