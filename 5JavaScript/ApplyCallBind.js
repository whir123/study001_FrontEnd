//==============================【myApply】=================================
// ⚠️ 给所有函数挂上自定义的 myApply （apply 参数数组/类数组一次性给）
Function.prototype.myApply = function(thisArg, argsArr){
    if (typeof this !== 'function') {
        throw new TypeError('myApply target is not callable')
    };

    // null/undefined 映射到 globalThis，其余用 Object() 装箱
    let context = (thisArg!==null && thisArg!==undefined) ? Object(thisArg) : globalThis;

    let fn = Symbol();
    context[fn] = this;
    let args = Array.from(argsArr || []); //防止调用时没传第二个参数 
    let result = context[fn](...args);
    delete context[fn];
    return result;
};
//【验证】【潜在问题：如果函数执行过程中抛出异常 → delete context[fn] 不会被执行 → 会在对象上残留一个 Symbol 属性】
// 1 普通对象绑定
function greet (msg, mark) {
    console.log(`${msg}, my name is ${this.name} ${mark}`);
};
let obj = {name: 'Alice'};
greet.myApply(obj, ['Hello', '!']); // Hello, my name is Alice !
// 2 原始值绑定
function checkType () {
    console.log(Object.prototype.toString.call(this)); 
};
checkType.myApply(42); // [object Number]
checkType.myApply('42'); // [object String]
// 3 null/undefined
function showGlobal () {console.log(this===globalThis);}
showGlobal.myApply(null); // true
showGlobal.myApply(undefined); // true

//==============================【myCall】=================================
// ⚠️ 给所有函数挂上自定义的 myCall （call 参数离散列出）
Function.prototype.myCall = function(thisArg, ...args){
    if (typeof this !== 'function') {
        throw new TypeError('myCall target is not callable')
    };

    // null/undefined 映射到 globalThis，其余用 Object() 装箱
    let context = (thisArg!==null && thisArg!==undefined) ? Object(thisArg) : globalThis;
    
    let fn = Symbol();
    context[fn] = this;
    let result;
    try {
        result = context[fn](...args);
    } finally {
        delete context[fn]; // ⚠️ 确保异常也能清理
    }
    return result;
};
//【验证】
function greetAgain (msg, mark) {
    console.log(`${msg}, my name is ${this.name} ${mark}`);
};
let obj2 = {name: "Bob"};
greetAgain.myCall(obj2, 'hello', '!'); // hello, my name is Bob !
function showGlobalAgain () {
    console.log(this===globalThis);
}
showGlobalAgain(null); // true

//==============================【myBind】=================================
// ⚠️ 给所有函数挂上自定义的 myBind （bind 返回新函数）
Function.prototype.myBind = function(thisArg, ...presetArgs){
    if (typeof this!=='function'){
        throw new TypeError('myBind target is not callable')
    };

    const self = this; // 保存原函数
    
    // 返回的新函数
    function boundFn(...laterArgs){
        // 普通调用：绑定 this 到 thisArg
        // 构造调用（new）：如果 bind 后的函数被用作构造函数，thisArg 要失效，this 应该是 新创建的实例对象
        const isNew = this instanceof boundFn; // instanceof 判断某个对象是否由某个构造函数创建
        // obj instanceof Constructor
        // 沿着 obj.__proto__ 原型链往上查找 只要能找到 Constructor.prototype 返回 true
        const context = isNew ? this 
        : ((thisArg!==null && thisArg!==undefined) ? Object(thisArg) : globalThis);
        return self.apply(context, [...presetArgs, ...laterArgs])
    };

    // 保持原型链 使 new boundFn() 时可以访问原函数
    boundFn.prototype = Object.create(this.prototype);

    return boundFn;
};
//【验证】
// 1 普通绑定
function say(a, b){
    console.log(`${a} likes ${this.name1}, ${b} likes ${this.name2}`);
};
let obj3 = {name1: "dogs", name2: "cats"};
let AA = say.myBind(obj3,["PeterA"]);
AA(); // PeterA likes dogs, undefined likes cats
AA(["PeterB"]); // PeterA likes dogs, PeterB likes cats
// 2 作为构造函数
function Person(name) {
    this.name = name;
}
Person.prototype.speak = function() { console.log(this.name); }
const BoundPerson = Person.myBind({}); // 绑定 this，但构造函数调用覆盖 this
// ⚠️ 用 new 调用绑定函数时，实例对象应该能访问到原函数的 prototype 属性
const p = new BoundPerson("Bob");
// ⚠️ 里面因为 isNew 为 true，context 被设为 this（也就是 p），而不是 myBind 时传入的那个 {}
// ⚠️ Person 的函数体：this.name = name; 所以把 name 写到 p 上
p.speak(); // Bob