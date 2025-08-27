// ⚠️ 通过【闭包】保存一个【定时器】，每次触发事件时会清除上一次的定时器，并重新设置一个新的定时器
// ⚠️ 只有在指定时间内没有新的触发，回调函数才会执行
function debounce (fn, delay) {
    let timer;
    return function(...args){
        const context = this; // 确保回调函数 fn 中的 this 指向调用它的上下文
        clearTimeout(timer);
        timer = setTimeout(()=>{
        // ⚠️ setTimeout 的回调函数会运行在 window（浏览器环境）或全局作用域中，默认情况下 this 会丢失原来的上下文
            fn.apply(context, args);
        }, delay);
    };
};
// 监听窗口大小调整【放到浏览器控制台运行】
function handleResize () {
    console.log("Window resized to:", window.innerWidth, "*", window.innerHeight);
}
const debouncedResize = debounce(handleResize, 500);
window.addEventListener("resize", debouncedResize);