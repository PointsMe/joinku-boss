/**
 * Created by jiachenpan on 16/11/18.
 */

export function isValidUsername(str) {
  // const valid_map = ['test@123.com']
  // return valid_map.indexOf(str.trim()) >= 0
  return str.trim()
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}
//校验数字/^\d+(?=\.{0,1}\d+$|$)/
export function isvalidNum(str) {
  var reg = /^\d+(?=\.{0,1}\d+$|$)/;
  return reg.test(str)
}
/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * 是否有效的字符，本系统所有输入的信息必须判断是否有效字符
 * @param str
 * @returns {boolean}
 */
export function isValidChar(str) {
  if (str === '') {
    return true
  } else {
    const reg = /^[\u0000-\u00FF]{1,1000}$/
    return reg.test(str)
  }
}

/**
 * 判断是否为空
 */
export function validatenull(val) {
  if (typeof val === 'boolean') {
    return false
  }
  if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true
    return false
  }
  return false
}

/**
 * 判断邮箱
 */
export function validateEmail(val) {
  const res = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
  return res.test(val)
}

export function validatePhone(val) {}

export function validateMobile(val) {

}