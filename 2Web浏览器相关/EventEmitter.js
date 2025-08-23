class myEventEmitter {
  constructor() {
    this.events = {};
  }

  // 监听
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    // ⚠️ 形成：this.events = {eventName:[fn1, fn2...], eventName2:[]...}
  }

  // 一次性监听
  once(event, listener) {
    const wrapper = (...args) => {
      //listener(...args); // ⚠️ 直接使用传入的 listener
      //this.off(event, wrapper); // ⚠️ 执行一次后解绑
      try {
        listener(...args);
      } finally {
        // ⚠️ 确保无论 listener 抛不抛异常都会解绑【更健壮的写法】
        this.off(event, wrapper);
      }
    };
    // ⚠️ 保存原始引用，方便 off(originalListener) 也能移除 wrapper
    wrapper._original = listener;
    this.on(event, wrapper);
  }

  //触发事件
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((fn) => fn(...args));
      // ⚠️ 取出事件名对应的监听函数数组，对每个 fn 调用它并把 emit 传进来的参数展开传给函数
    }
  }

  //移除监听器
  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(fn => fn !== listener && fn._original !== listener);
      // ⚠️ 把 this.events[event] 这个数组过滤一遍，生成新的数组，去掉等于 listener 的元素，再把结果重新赋回 this.events[event]
      // ⚠️ 既要排除直接相等的 listener，也要排除 wrapper._original === listener 的 wrapper
    }
  }

  //移除某个事件所有监听器
  removeAllListeners(event) {
    if (this.events[event]) delete this.events[event];
  }
}

//【测试】
const bus = new myEventEmitter();
bus.on("hi", (msg) => {
  console.log(`我收到了msg:${msg}`);
});
bus.once("no", () => {
  console.log("no!");
});
bus.emit("hi", "testMsg");      // 我收到了msg:testMsg
bus.emit("no");                 // no!
bus.emit("no");                 // 
bus.removeAllListeners("hi");
bus.emit("hi", "testMsg2");     //
