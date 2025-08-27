// ⚠️ 【 apply(target, thisArg, args) 】
// 👉 当代理的对象是 函数，并且被“调用”时触发。
// target ｜ 被代理的 原始函数对象
// thisArg ｜ 调用函数时绑定的 this 值
// args ｜ 传给函数的 实参数组
function greet(greeting, name){
    console.log(this.prefix, greeting, name);
};
const handler = {
    apply(target, thisArg, args){
        console.log("target:", target);     // target: [Function: greet]
        console.log("thisArg:", thisArg);   // thisArg: { prefix: 'hahaha' }
        console.log("args:", args);         // args: [ 'Hello', 'Tom' ]
        return target.apply(thisArg, args);
    },
};
const p1 = new Proxy(greet, handler);
p1.call({prefix:'hahaha'}, "Hello", "Tom"); // 前面输出如上⬆️ hahaha Hello Tom

// ⚠️ 【 construct(target, args, newTarget) 】
// 👉 当代理的对象是 构造函数 / 类，并且被 new 调用时触发。
// target ｜ 被代理的 原始构造函数 / 类
// args ｜ 构造函数调用时传入的实参数组
// newTarget ｜ 实际上被调用的构造函数（可能是 Proxy 本身，也可能是继承它的子类）
    // 👉 和 Reflect.construct() 的第三个参数类似，用于 class 继承场景
class Person {
    constructor(name){
        this.name = name;
    };
};
const handler2 = {
    construct(target, args, newTarget){
        console.log("target:", target);         // target: [class Person]
        console.log("args:", args);             // args: [ 'Tom' ]
        console.log("newTarget:", newTarget);   // newTarget: [class Person]
        return new target(...args);
    }
};
const P = new Proxy(Person, handler2);
new P("Tom"); // ⬆️ 输出见上
// ❕实际效果就等价于 new Person("Tom");
// ❕只不过在构造的过程，有机会“插手”并打印或修改逻辑