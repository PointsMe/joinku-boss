import moment from "moment";
/**
 * 保留小数
 * @param {*} num 需要处理的值
 * @param {*} n 保留几位小数，默认保留2位小数
 * @returns
 */
const filterToFixedFloat = (num, n = 2) => {
    if (!num) return 0
    return Number.parseFloat(num).toFixed(2)
}

/**
 * 保留小数
 * @param {*} num 需要处理的值
 * @param {*} n 保留几位小数，默认不保留小数
 * @returns
 */
const filterRoundFloat = (num, n = 2) => {
    if (!num && num !== 0) return ''
    let value = Number.parseFloat(num)
    if (n) {
        let square = Math.pow(10, n)
        return Math.round(value * square) / square
    } else {
        return Math.round(value)
    }
}

/**
 * 格式化日期
 * @param str
 * @returns {string}
 */
const filterDate = (str) => {
    if (!str) return ''
    return moment(str).format('YYYY-MM-DD')
}

/**
 * 格式化时间
 * @param str
 * @returns {string}
 */
const filterTime = (str) => {
    if (!str) return ''
    return moment(str).format('YYYY-MM-DD HH:mm:ss')
}


export { filterToFixedFloat, filterRoundFloat, filterDate, filterTime }
