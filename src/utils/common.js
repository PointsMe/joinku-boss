/**
 * 防抖
 * 在连续的操作中，无论进行了多长时间，
 * 只有某一次的操作后在指定的时间内没有再操作，这一次才被判定有效
 * @param {*} fn 回调函数
 * @param {*} delay 间隔时间
 * @returns
 */
export const Debounce = (fn, delay = 300) => {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    }
}

/**
 * 节流
 * 一定时间内一定执行而且只执行一次。我们通常规定300ms执行一下的话，
 * 在规定时间内执行了很多次，只有一次是有效的
 * @param {*} fn 回调函数
 * @param {*} delay 间隔时长
 * @returns
 */
export const Throttle = (fn, delay = 300) => {
    let canRun = true;
    return function () {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            canRun = true;
        }, delay);
    };
}
