// ⚠️ 通过【闭包】保存一个时间戳或定时器，确保在规定时间内只执行一次函数。可以通过两种方式实现：
// ⚠️ 【时间戳方式】根据时间间隔判断是否执行
function throttle(fn, delay) {
    let lastTime = 0; // 闭包中时间戳
    return function (...args) {
        let now = Date.now();
        if (now - lastTime >= delay) {
            fn.apply(this, args);
            lastTime = now;
        };
    };
};
// ⚠️ 【定时器方式】通过定时器控制函数的执行频率
function throttle2(fn, delay) {
    let timer = null; // 初始化
    return function (...args) {
        const context = this; // ⚠️ 在这里捕获 this
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args); // 使用箭头函数 this不会丢失
                timer = null;
            }, delay);
        };
    };
};
// 监听滚动事件【放到浏览器控制台运行】
function handleScroll() {
    console.log('Scroll event triggered');
}
window.addEventListener("scroll", throttle(handleScroll, 500));
window.addEventListener("scroll", throttle2(handleScroll, 500));