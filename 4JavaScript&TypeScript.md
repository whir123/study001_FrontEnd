# 📜 JavaScript & TypeScript
---
## ES6 新特性

全称 `ECMAScript`，`JavaScript` 的版本标准，2015.06发版（里程碑式版本 几乎改变了JS写法）｜ `ECMAScript` 和 `JavaScript` : 前者是后者的一种规格 后者是前者的一种实现

>let 与 const
- 代码块内如果存在 `let` 或者 `const`，代码块会对这些命令声明的变量从块的开始就形成一个封闭作用域。代码块内，在声明变量之前使用它会报错，称为暂时性死区 （ES6的块级作用域必须有大括号）
>解构赋值
- 按照一定模式，从`数组和对象`中提取值，对变量进行赋值
>Symbol
- 新的原始数据类型 Symbol 表示独一无二的 最大用法：定义`对象`的`唯一属性名`
  ```js
  let s1 = Symbol("s");
  let s2 = Symbol("s");
  console.log(s1 === s2); //false 
  ```
>Spread / Rest 操作符（展开语法...）
- Spread 用于将数组作为参数传入函数 Rest 用于函数传递参数组
  ```js
  // Spread
  var s = ['1', '2', '3'];
  function f(s1,s2,s3){
      console.log(`Hello ${s1},${s2},${s3}`); 
  	//ES6新增字符串中加入变量和表达式
  }
  f(...s); //Hello 1,2,3

  // Rest
  function f(...args){
      console.log(args);
  }
  f(1,2,3,4,5); //[1, 2, 3, 4, 5]
  ```
- **箭头函数 ｜**  箭头函数继承的是<span data-type="text" style="background-color: var(--b3-font-background4);">上下文的 this</span>
- **参数默认值 ｜**

  ```js
  function f(a = 1){
      console.log(a);
  }
  f(); //1
  f(11); //11
  ```
- **字符串拓展 ｜<sup>(includes() 返回布尔值，判断是否找到参数字符串。 startsWith() 返回布尔值，判断参数字符串是否在原字符串的头部。 endsWith() 返回布尔值，判断参数字符串是否在原字符串的尾部。 repeat() 返回新的字符串，表示将字符串重复指定次数返回。 padStart() 返回新的字符串，表示用参数字符串从头部补全原字符串。 padEnd() 返回新的字符串，表示用参数字符串从尾部（右侧）补全原字符串。)</sup>**
- **数值拓展 ｜<sup>(二进制表示法新写法 前缀0b或0B，例如console.log(0B11 === 3); //true。 八进制表示法新写法 前缀0o或0O，例如console.log(0O11 === 9); //true。 常量 Number.EPSILON，表示1与大于1的最小浮点数之间的差,值接近于 2.2204460492503130808472633361816E-16。 常量 Number.MAX_SAFE_INTEGER 表示在JavaScript中能够精确表示的最大安全整数 2^53-1。 Number.isFinite() 用于检查一个数值是否为有限的finite，即不是Infinity。 Number.parseInt() 逐步减少全局方法，用于全局变量的模块化,方法的行为没有发生改变。)</sup>**

- **数组拓展 ｜<sup>(Array.of() 将参数中所有值作为元素形成数组。 Array.from() 将类数组对象或可迭代对象转化为数组。 find() 查找数组中符合条件的元素,若有多个符合条件的元素，则返回第一个元素。 findIndex() 查找数组中符合条件的元素索引，若有多个符合条件的元素，则返回第一个元素索引。 fill() 将一定范围索引的数组元素内容填充为单个指定的值。 copyWithin() 将一定范围索引的数组元素修改为此数组另一指定范围索引的元素。 entries() 遍历键值对。 keys() 遍历键名。 values() 遍历键值。 includes() 数组是否包含指定值。 flat() 嵌套数组转一维数组。 flatMap() 先对数组中每个元素进行了处理，再对数组执行flat()方法。)</sup>**
- **迭代器 ｜**  引入的一种<span data-type="text" style="background-color: var(--b3-font-background4);">统一访问数据集合的机制</span>，可以让不同的<span data-type="text" style="background-color: var(--b3-font-background4);">数据结构（数组、字符串、Map、Set、类数组对象等）</span>通过相同的方式被遍历 **统一的接口：Symbol.iterator**   一个对象如果想要成为**可迭代对象** 需要满足迭代器协议：

  - 具有一个 `Symbol.iterator` 属性（是一个方法）
  - 调用这个方法会返回一个“迭代器对象”
  - 迭代器对象必须有一个 `next()` 方法
  - `next()` 方法返回一个对象：{ value: 当前值, done: 是否迭代完成 }

    迭代器是很多语法糖的基础：

    ```js
    // for...of
    for (let x of [1, 2, 3]) console.log(x);

    // 扩展运算符 ...
    console.log([...new Set([1, 2, 3, 3])]);

    // 解构赋值
    let [a, b] = "hi"; // h i
    ```
- **类 class ｜**  提供了更接近传统语言的写法 ES6的class只是<span data-type="text" style="background-color: var(--b3-font-background4);">对原型链（prototype）继承的语法糖</span> （本质上就是<span data-type="text" style="background-color: var(--b3-font-background4);">构造函数的语法糖</span>）底层仍然是<span data-type="text" style="background-color: var(--b3-font-background4);">基于原型链的继承</span>：

  ```js
  // ES5 构造函数写法
  function Person(name) {
    this.name = name;
  }
  Person.prototype.sayHi = function () {
    console.log(`Hi, I'm ${this.name}`);
  };
  //—— —— —— —— —— —— —— —— —— —— —— —— —— —— —— 
  // ES6 类写法
  class Person {
    constructor(name) {
      this.name = name;
    }
    sayHi() {
      console.log(`Hi, I'm ${this.name}`);
    }
  }

  ```
- **Promise ｜**  <u>异步编程</u>的一种解决方案 ES6之前 异步任务主要依赖回调函数 嵌套多层的写法产生回调地狱 难以维护 Promise 的出现 就是为了<u>扁平化异步流程</u>

  ```js
  //ES5
  doSomething(function (result) {
    doSomethingElse(result, function (newResult) {
      doThirdThing(newResult, function (finalResult) {
        console.log(finalResult);
      });
    });
  });
  //ES6
  doSomething()
    .then(doSomethingElse)
    .then(doThirdThing)
    .then(console.log)
    .catch(console.error);
  ```

  - Promise是一个对象 可以获取异步操作的消息
  - 三种状态：`pending` 进行中｜ `fulfilled`已完成｜  `rejected`已失败｜
  - 状态一旦改变就不会再变<span data-type="text" style="background-color: var(--b3-font-background4);">（不可逆）</span> 除了<span data-type="text" style="background-color: var(--b3-font-background4);">异步操作的结果</span> 其他操作都无法<span data-type="text" style="background-color: var(--b3-font-background4);">改变这个状态</span>
  - 成功会触发<span data-type="text" style="background-color: var(--b3-font-background4);">.then()</span> 失败会触发<span data-type="text" style="background-color: var(--b3-font-background4);">.catch()</span>
  - 链式调用：

    ```js
    Promise.resolve(1)
      .then(num => num + 1)
      .then(num => num * 2)
      .then(console.log); // 4

    //⚠️ Promise.resolve(value) 
    // 返回一个已解决(fulfilled)状态的Promise 并且value会成为这个Promise的结果

    // ⚠️ 无论.then()回调里返回什么 都会被包成一个新的Promise返回
    ```
  - Promise常用API：

    - `Promise.resolve(value)` → 创建已成功的 Promise
    - `Promise.reject(reason)` → 创建已失败的 Promise  **｜**resolve和reject<sup>(· new Promise() 构造函数里，你自己传入的回调函数会自动收到这两个参数 · resolve(value) → 把 Promise 从 pending 状态变成 fulfilled（已成功），并把 value 传给 .then() 的回调 · reject(reason) → 把 Promise 从 pending 状态变成 rejected（已失败），并把 reason 传给 .catch() 的回调 · 如果 resolve() 传入的值是一个 Promise，那么当前 Promise 会跟随那个 Promise 的状态)</sup>
    - `Promise.all([p1, p2])`
      全部成功才成功，有一个失败就失败
    - `Promise.allSettled([p1, p2])`
      等全部结束（不管成功失败），返回每个结果状态
    - `Promise.race([p1, p2])`
      最快的 Promise 决定结果
    - `Promise.any([p1, p2])`
      任意一个成功就成功（全失败才失败）


## <u>**ES2022 新特性 （ES6的持续改进版本）**</u> 

2022 年 6 月 ｜ 增强了类、数组、对象等功能，并增加了私有成员等语法

- **类的增强**

  - 私有实例字段：`#name` **｜** 私有方法：`#doSomething() { ... }` **｜** 静态私有字段 / 方法 **｜** 类字段声明（不需要写在 constructor 里）

    ```js
    class Person {
      name = "default"; // 实例字段
      static species = "Homo sapiens"; // 静态字段
    }
    ```
- **顶层 await**

  - 模块中可以直接用 `await`，不必包在 `async function` 里

    ```js
    const data = await fetch('/api/data').then(res => res.json());
    ```
- **Error cause**

  - `Error` 构造函数支持 `cause` 属性，用于传递错误链

    ```js
    throw new Error("数据库连接失败", { cause: originalError });
    ```
- **Object.hasOwn**

  - 更简洁的自有属性判断（替代 `Object.prototype.hasOwnProperty`）

    ```js
    Object.hasOwn(obj, "prop");
    ```
- **Array.prototype.at**

  - 支持正负索引访问数组元素

    ```js
    arr.at(-1); // 最后一个元素
    ```
- **RegExp Match Indices**

  - 正则匹配支持返回匹配位置 `d` 标志


## **<u>WeakMap</u>**

<u>JavaScript 中的一种特殊集合类型</u>，它<u>与普通的 Map 类似</u>，但有以下几个关键区别：

- **键必须是****<u>对象</u>**（不能是原始值）
- **键是****弱引用**（不会阻止垃圾回收）

  ｜当 <u>WeakMap 中的键对象</u>**没有被其他地方引用**时，它**会被垃圾回收**；相应的键值对会自动从 WeakMap 中消失；这使得 WeakMap 非常适合用来存储对象的元数据或私有数据
- **<u>不可枚举</u>**（没有方法能获取所有键或值）

  ```js
  const weakMap = new WeakMap();
  const obj1 = {};
  const obj2 = {};

  weakMap.set(obj1, 'value1');// 设置键值对
  weakMap.set(obj2, 'value2');
  console.log(weakMap.get(obj1)); // 获取值 // 'value1'
  console.log(weakMap.has(obj1)); // 检查键是否存在 // true
  weakMap.delete(obj1); // 删除键值对

  for (const key of map.keys()) {......} // 普通Map遍历方法
  for (const val of map.values()) {......}
  for (const [key, value] of map.entries()) {......} // entries 遍历键值对
  map.forEach((value, key, map) => { // forEach 方法
    console.log(key, value);
  });
  ```


## **<u>JavaScript 和 TypeScript</u>**

**TS 是 JS 的超集**：TS在JS的基础上加入了<span data-type="text" style="background-color: var(--b3-font-background4);">静态类型系统</span>+其他高级特性：

- 静态类型检查
- **<u>类、接口、泛型</u>**等面向对象特性
- <u>ES6+ </u>特性支持
- 更好的工具支持（代码补全、重构等）

  ｜TS的**接口**：

  ```ts
  // TS 中的正式接口
  interface Person {
    name: string;
    age: number;
    greet(): void;
  }
  ```

  ｜JS没有**抽象类**：

  ```ts
  abstract class Animal {
    abstract makeSound(): void;
    move(): void {
      console.log("Moving...");
    }
  }

  class Dog extends Animal {
    makeSound(): void {
      console.log("Bark!");
    }
  }
  ```

  ｜TS的**泛型**：

  ```ts
  function identity<T>(arg: T): T {
    return arg;
  }
  ```

  **T** 是一个类型变量 **（Type Variable）** 它会<span data-type="text" style="background-color: var(--b3-font-background4);">在函数调用时被具体类型替换</span>  它保持类型一致性  不是任意类型
- **T** 保持类型约束、能推断<span data-type="text" style="background-color: var(--b3-font-background4);">出入参</span>和<span data-type="text" style="background-color: var(--b3-font-background4);">返回值</span>的关联  **any** 完全放弃类型检查、失去所有类型信息


## <u>**弱类型语言、强类型语言 ｜ 动态类型语言、静态类型语言**</u>

**弱类型语言：** 变量的类型可以在运行时可以自动转换 <u>允许</u><u>隐式类型转换</u> 操作不同类型的数据时 语言自动尝试转换

**强类型语言：**<u>不允许</u><u>隐式类型转换</u> 操作不同类型的数据需显式转换

**动态类型语言：** 类型在<span data-type="text" style="background-color: var(--b3-font-background4);">运行时才确定</span> 变量类型<u>可随时改变</u>

**静态类型语言：** 类型在<span data-type="text" style="background-color: var(--b3-font-background4);">编译时确定</span> 变量类型<u>不可改变</u>

<u>python</u>：强类型+动态类型

```python
x = 10      # x 是整数（动态类型允许赋值）
x = "hello" # x 变为字符串（动态类型的特性）
# 但 x + 10 会报错（强类型的特性）
```

<u>JS</u>：弱类型+动态类型

<u>TS</u>：强类型+静态类型


## **<u>var、const、let</u>**

**var：** 

- **作用域（Scope）**  <u>函数级</u> 整个函数内有效 若在外 则是<u>全局作用域</u>
- **变量提升（Hoisting）** 被提升到函数/全局的顶部
- **允许重复声明**
- 在<u>全局作用域</u>用 **var 声明的变量**会成为 **window 对象的属性**<u>（浏览器环境）</u>

  ```javascript
  var globalVar = "hello";
  console.log(window.globalVar); // "hello"
  ```

**let：**    ES6 块级作用域变量

- **作用域（Scope）**  <u>块级</u> 只在 {}（如 <u>if、for、while 等</u>）内有效
- **变量提升（Hoisting）** 也会提升 但进入“暂时性死区”（TDZ） 在**声明前访问会报错**

  - TDZ 是指从<u>作用域开始</u>到<u>变量声明语句执行之前</u>的区域，在这期间访问变量会抛出 ReferenceError
  - 引擎知道变量的存在（已提升），只是不允许访问
- **不允许重复声明**
- 在<u>全局作用域</u>用声明的  **不会成为 window 对象的属性**

**const：**    ES6 块级作用域常量

- **作用域（Scope）**  <u>块级</u> 同let
- **变量提升（Hoisting）** 进入“暂时性死区” 同let
- **不允许重复声明** 同let
- **不可变性（Immutability）：** const声明的变量**必须初始化**，且**不能重新赋值** **（但对象/数组的内容可修改）**
- 在<u>全局作用域</u>用声明的  不会成为 window 对象的属性 同let