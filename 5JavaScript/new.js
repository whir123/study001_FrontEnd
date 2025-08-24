// ⚠️ 手写new | 核心点
// 1 创建一个新对象 把它的原型链指向构造函数的 prototype
// 2 执行构造函数 并把 this 绑定到新对象上
// 3 根据返回值确定最终结果：
//      如果构造函数返回的是对象（函数、数组、对象等） 返回这个对象
//      否则创造新的对象

function myNew(Constructor, ...args) {
    // 创建新对象 原型链关联构造函数的 prototype
    const obj = Object.create(Constructor.prototype);
    // 执行构造函数 + 绑定this
    const result = Constructor.apply(obj, args);
    // 等价于：【直接操作 __proto__ 不推荐，性能和可维护性差】
    // const obj = {};
    // obj.__proto__ = Constructor.prototype;

    // 判断返回值类型 【typeof判断是对象或函数（不能是null）】
    return (result!==null && (typeof result === 'object' || typeof result === "function"))
        ? result
        : obj;
};

//【测试】
// 原生语法： new Person("Alice", 18); 是语法糖 new不是函数 而是JS的关键字
// 手写模拟的时候 必须用一个函数来实现
function Person(name, age) {
    this.name = name;
    this.age = age;
};
const p1 = myNew(Person, "Alice", 18);
console.log(p1);                    // Person { name: 'Alice', age: 18 }
console.log(p1 instanceof Person);  // true

function Test1() {
    return {msg:"我是对象"};
};
function Test2() {
    return 333;
};
const t1 = myNew(Test1);
const t2 = myNew(Test2);
console.log(t1);    // { msg: '我是对象' }
console.log(t2);    // Test2 {}