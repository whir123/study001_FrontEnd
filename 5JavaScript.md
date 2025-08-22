# 📜 JavaScript
---
## ES6 新特性

全称 `ECMAScript`，`JavaScript` 的版本标准，2015.06发版（里程碑式版本 几乎改变了JS写法）｜ `ECMAScript` 和 `JavaScript` : 前者是后者的一种规格 后者是前者的一种实现

let 与 const
- 代码块内如果存在 `let` 或者 `const`，代码块会对这些命令声明的变量从块的开始就形成一个封闭作用域。代码块内，在声明变量之前使用它会报错，称为暂时性死区 （ES6的块级作用域必须有大括号）

解构赋值
- 按照一定模式，从`数组和对象`中提取值，对变量进行赋值

Symbol
- 新的原始数据类型 Symbol 表示独一无二的
- 最大用法：定义`对象`的`唯一属性名`
    ```js
      let s1 = Symbol("s");
      let s2 = Symbol("s");
      console.log(s1 === s2); //false 
    ```

Spread / Rest 操作符（展开语法...）
- Spread 用于将数组作为参数传入函数
- Rest 用于函数传递参数组
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

箭头函数
- 箭头函数继承的是`上下文的 this`

参数默认值
- `function f(a = 1){console.log(a);}`

字符串拓展
- `includes()` 返回布尔值，判断是否找到参数字符串 
- `startsWith()` 返回布尔值，判断参数字符串是否在原字符串的头部
- `endsWith()` 返回布尔值，判断参数字符串是否在原字符串的尾部
- `repeat()` 返回新的字符串，表示将字符串重复指定次数返回
- `padStart()` 返回新的字符串，表示用参数字符串从头部补全原字符串
- `padEnd()` 返回新的字符串，表示用参数字符串从尾部（右侧）补全原字符串
- `...`

数值拓展
- 二进制表示法新写法 前缀`0b`或`0B`，例如`console.log(0B11 === 3);` //true
- 八进制表示法新写法 前缀`0o`或`0O`，例如`console.log(0O11 === 9);` //true
- 常量 Number.EPSILON，表示1与大于1的最小浮点数之间的差,值接近于 2.2204460492503130808472633361816E-16
- 常量 Number.MAX_SAFE_INTEGER 表示在JavaScript中能够精确表示的最大安全整数 2^53-1
- Number.isFinite() 用于检查一个数值是否为有限的finite，即不是Infinity
- Number.parseInt() 逐步减少全局方法，用于全局变量的模块化,方法的行为没有发生改变

数组拓展
- `Array.of()` 将参数中所有值作为元素形成数组
- `Array.from()` 将类数组对象或可迭代对象转化为数组
- `find()` 查找数组中符合条件的元素,若有多个符合条件的元素，则返回第一个元素
- `findIndex()` 查找数组中符合条件的元素索引，若有多个符合条件的元素，则返回第一个元素索引
- `fill()` 将一定范围索引的数组元素内容填充为单个指定的值
- `copyWithin()` 将一定范围索引的数组元素修改为此数组另一指定范围索引的元素
- `entries()` 遍历键值对
- `keys()` 遍历键名
- `values()` 遍历键值
- `includes()` 数组是否包含指定值
- `...`

迭代器
- 引入的一种统一访问数据集合的机制，可以让`不同的数据结构（数组、字符串、Map、Set、类数组对象等）`通过相同的方式被遍历统一的接口：`Symbol.iterator` 一个对象如果想要成为可迭代对象 需要满足迭代器协议：
  - 具有一个 `Symbol.iterator` 属性（是一个方法）
  - 调用这个方法会返回一个“迭代器对象”
  - 迭代器对象必须有一个 `next()` 方法
  - `next()` 方法返回一个对象：{ value: 当前值, done: 是否迭代完成 }
  - 迭代器是很多语法糖的基础：
    ```js
      // for...of
      for (let x of [1, 2, 3]) console.log(x);  
      // 扩展运算符 ...
      console.log([...new Set([1, 2, 3, 3])]); 
      // 解构赋值
      let [a, b] = "hi"; // h i
    ```

类 class
- 提供了更接近传统语言的写法 但ES6的class只是对原型链（prototype）继承的语法糖（本质上就是`构造函数的语法糖`）底层仍然是`基于原型链的继承`：
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

Promise
- 异步编程的一种解决方案 ES6之前 异步任务主要依赖回调函数 嵌套多层的写法产生回调地狱 难以维护 Promise 的出现 就是为了扁平化异步流程
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
- 状态一旦改变就不会再变（不可逆）除了异步操作的结果 其他操作都无法改变这个状态
- 成功会触发`.then()`| 失败会触发`.catch()`
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
    - `Promise.reject(reason)` → 创建已失败的 Promise
    - `Promise.all([p1, p2])` → 全部成功才成功，有一个失败就失败
    - `Promise.allSettled([p1, p2])` → 等全部结束（不管成功失败），返回每个结果状态
    - `Promise.race([p1, p2])` → 最快的 Promise 决定结果
    - `Promise.any([p1, p2])` → 任意一个成功就成功（全失败才失败）
    - `resolve`和`reject`: 
      - new Promise() 构造函数里，你自己传入的回调函数会自动收到这两个参数
      - resolve(value) → 把 Promise 从 pending 状态变成 fulfilled（已成功），并把 value 传给 .then() 的回调
      - reject(reason) → 把 Promise 从 pending 状态变成 rejected（已失败），并把 reason 传给 .catch() 的回调
      - 如果 resolve() 传入的值是一个 Promise，那么当前 Promise 会跟随那个 Promise 的状态
---
## ES2022 新特性（ES6的持续改进版本）
2022年6月 ｜ 增强了`类`、`数组`、`对象`等功能，并增加了`私有成员`等语法

类的增强

- 私有实例字段：`#name` | 私有方法：`#doSomething() { ... }` | 静态私有字段 / 方法 | 类字段声明（不需要写在 constructor 里）
    ```js
      class Person {
        name = "default"; // 实例字段
        static species = "Homo sapiens"; // 静态字段
      }
    ```

顶层 await
- 模块中可以直接用 `await`，不必包在 `async function` 里
    ```js
      const data = await fetch('/api/data')
      .then(res => res.json());
    ```

Error cause
- `Error` 构造函数支持 `cause` 属性，用于传递错误链

    ```js
    throw new Error("数据库连接失败", { cause: originalError });
    ```

Object.hasOwn
- 更简洁的自有属性判断（替代 `Object.prototype.hasOwnProperty`）
    ```js
      Object.hasOwn(obj, "prop");
    ```
---
## WeakMap
`JavaScript` 中的一种特殊集合类型 它与普通的 Map 类似，但有以下几个关键区别：
- 键必须是对象（不能是原始值）
- 键是弱引用（不会阻止垃圾回收）
  - 当WeakMap 中的键对象没有被其他地方引用时，它会被垃圾回收；相应的键值对会自动从 WeakMap 中消失；这使得 WeakMap 非常适合用来存储对象的元数据或私有数据
- 不可枚举（没有方法能获取所有键或值）
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
---
## Array.from()
把`“可迭代对象”`或`“类数组对象”`转换成真正的数组，并且在“转换的同时”支持映射（像 `map` 那样）
- 把类数组对象转换为真数组
  ```js
    // DOM NodeList / HTMLCollection
    const divs = Array.from(document.querySelectorAll('div'));
    
    // arguments
    function f() { return Array.from(arguments); }
    f(1,2,3); // [1,2,3]
    
    // 手写类数组
    const likeArr = {0:'a', 1:'b', length:2};
    Array.from(likeArr); // ['a','b']
    
    // Set / Map
    Array.from(new Set([1,2,2,3])); // [1,2,3]
    Array.from(new Map([['a',1],['b',2]])); // [['a',1], ['b',2]]
  ```
- 生成序列（range）+ 映射
  ```js
    // 0...9 
    const range = Array.from({ length: 10 }, (_, i) => i); // 每个位置的值取索引 i

    // 生成 1...5 的平方 
    const squares = Array.from({ length: 5 }, (_, i) => (i+1) ** 2); // [1,4,9,16,25]
  ```
- 浅拷贝 & 类型转换
  ```js
    const arr = [1, {x:2}];
    const copy = Array.from(arr); // 浅拷贝 同一个对象引用
    copy[1].x = 99;
    arr[1].x; // 99

    Array.from('hello'); // ['h','e','l','l','o']
  ```
---
## var / const / let
`var：` 
- 作用域（Scope）: 【函数级】 整个函数内有效 若在外 则是全局作用域
- 变量提升（Hoisting）: 被提升到函数/全局的顶部
- 允许重复声明
- 在全局作用域用`var`声明的变量会成为`window对象`的属性（浏览器环境）
    ```javascript
      var globalVar = "hello";
      console.log(window.globalVar); // "hello"
    ```
`let：` `ES6 块级作用域变量`
- 作用域（Scope）: 【块级】 只在 {}（如 if、for、while 等）内有效
- 变量提升（Hoisting）: 也会提升 但进入“暂时性死区”（TDZ） 在声明前访问会报错
  - TDZ 是指从作用域开始到变量声明语句执行之前的区域，在这期间访问变量会抛出 ReferenceError
  - 引擎知道变量的存在（已提升），只是不允许访问
- 不允许重复声明
- 在全局作用域`用let声明的变量`不会成为`window对象`的属性

`const：` `ES6 块级作用域常量`
- 作用域（Scope）: 【块级】 同`let`
- 变量提升（Hoisting）: 进入“暂时性死区” 同`let`
- 不允许重复声明 同`let`
- 不可变性（Immutability）: const声明的变量必须初始化，且不能重新赋值 `（但对象/数组的内容可修改）`
- 在全局作用域`用const声明的变量`不会成为 window 对象的属性 同`let`
---
## JavaScript 中的执行上下文和执行栈
1. `执行上下文`是当前`JavaScript`代码被解析和执行`所在环境`的抽象概念 | 执行上下文共三种类型：
   - **全局执行上下文**： 浏览器中的对象是`window对象 (或self/frames)` `this`指向这个全局对象
     - this指向：浏览器里默认是 `window` ｜ node里`全局`和`顶层`不一样
   - **函数执行上下文**：有无数个 函数被调用的时候创建 每次调用函数都会创建一个新的上下文
   - **Eval函数执行上下文**： 运行在eval函数中的代码 很少 也不建议使用
2. `执行栈（调用栈）` 具有`LIFO（先进后出）`结构 用于储存在代码执行期间创建的所有执行上下文：
   - **首次运行**：创建一个`全局执行上下文` push 到当前`执行栈`
   - **发生函数调用时**：引擎为当前函数创建 `新的函数执行上下文` push到`执行栈顶` 
   - **函数运行完成后**： 对应的函数执行上下文从栈顶pop出 上下文控制权移交到当前执行栈的`下一个执行上下文`
3. 执行上下文创建与执行：
   - **创建阶段**： 
     1. 确定`this`的值（ `This Binding` ）
     2. `LexicalEnvironment（词法环境）组件` 被创建 `VariableEnvironment（变量环境）组件` 被创建
     3. 建立作用域链 `Scope Chain`
     4. 额外步骤：创建`arguments`对象，检查当前上下文中的参数，建立该对象的属性与属性值【仅在函数环境(非箭头函数)中进行，全局环境没有此过程】
   - **全局执行上下文中**： `this = globalThis`（浏览器是 window，Node 里是 module.exports 或 undefined） 
   - **函数执行上下文中**： `this`指向取决于`函数调用方式` 默认绑定｜隐式绑定｜显式绑定（硬绑定）｜new绑定｜箭头函数 ……
---
## 词法环境 和 变量环境
- `词法环境 LE` 和 `变量环境 VE` 并列
  - `LexicalEnvironment（词法环境 LE）` ：
    - `let / const / class` 声明
    - `函数声明`（函数声明提升在 LE 里，且优先级高于 var）
    - 对外层环境的引用（形成作用域链）
    - ( arguments 对象是什么 ) : 只在`非箭头函数`里可用的、`类数组的对象`，装着实参列表: (有length 按下标可取值 但不是数组 没有原生数组方法)
      ```js
        function f(a, b) {
          console.log(arguments.length); // 实参个数
          console.log(arguments[0], arguments[1]);
        }
        f(1, 2, 3);// 3 \n 1 2
      ```
  - `VariableEnvironment（变量环境 VE）` ：
    - `var` 声明的绑定（初始化为 undefined）
- 所以在函数声明与 var 冲突时，函数声明优先 : 
  ```js
    console.log(a); // [Function: a]
    var a = 1;
    function a() {}
    ```
- 函数声明 vs 函数表达式:
  ```js
    // 函数声明提升：整体提升，可以在声明前调用。
    // 函数表达式：只有变量声明提升，函数不会提升。
    foo(); // declaration
    function foo() { console.log("declaration"); }

    bar(); // TypeError: bar is not a function
    var bar = function() { console.log("expression"); };
  ```
- （为什么分两套）ES6 以后增加了 `let/const` 的块级作用域和 `TDZ` 语义，需要与 `var` 分开管理，避免老语义相互干扰
---
## 变量提升的原因 | 从词法环境和变量环境来看 
- `变量提升（Hoisting）`本质：`执行上下文（Execution Context）`在创建阶段就把作用域内的变量和函数“登记”到了`环境记录（Environment Record (ER)）` `（包括：LexicalEnvironment / VariableEnvironment）`里
- **创建阶段**：`let`、`const` 和`函数声明`存储在`词法环境 LE`中（也可包含块级作用域的绑定） ｜ `var 声明`的绑定存储在`变量环境 VE`
- **此时发生提升**：
  - `函数声明 (Function Declaration) `｜整个函数（名字 + 函数体）都会被放入环境中 所以函数可以在声明之前调用
  - `var 声明` ｜ 名字会提前登记到 `Variable Environment` 初始值为 `undefined` ｜ 声明前访问会得到 undefined
  - `let / const 声明` ｜ 名字会被放入 `Lexical Environment` 但保持 `未初始化 (uninitialized)` 状态 在声明前访问会抛出 ReferenceError —— 这就是 `TDZ（暂时性死区）`
- **编译阶段**：
  - 解析器在读取代码时就会“提前扫描”声明
  - 将函数声明和变量声明注册到对应环境（`Lexical Environment` / `Variable Environment`）里
  - 因此即使写在后面 声明也会在执行前就“登记”好
- **执行阶段**：
  - 代码自上而下执行
  - 遇到赋值语句时 才会真正给变量赋值
  - 函数声明早就已经准备好了 所以可以直接调用
- [变量提升范例](./5JavaScript&TypeScript/Hoisting.js)
---
## 作用域链 vs 原型链
`作用域链（Scope Chain）` :
- 用来`变量查找` | 解决“变量在哪儿”
- JS引擎在执行代码时 如果在当前`词法环境 LE` `变量环境 VE`找不到某个变量 就会沿着外层环境一直往上查 直到全局环境

`原型链` :
- 用来属性/方法查找| 解决“对象属性在哪儿”
- 对象访问某个属性时 现在自己身上找 找不到就去它的 `[[Prototype]]`(也就是 `__proto__`) 查找 层层查找直到 `Object.prototype`
---
## 原型与原型链
- [原型链图解-drawio文件](./5JavaScript&TypeScript/原型链.drawio)
- [原型链图解-png文件](./5JavaScript&TypeScript/原型链.png)
- `Prototype` 原型/原型对象
  - `函数`的一个属性 `.prototype`
  - `prototype` 是一个对象 | 浏览器开发者页面：`prototype: {constructor: f}` 【默认包含一个 `constructor` 指向该函数本身】
  - 创建函数时 会默认添加 `prototype` 属性 【除了箭头函数和 Function.prototype.bind() 返回的函数】
- `__proto__` 隐式原型
  - 对象的属性 | `const obj = new Fn()`
  - 指向构造函数的 prototype | `obj.__proto__ === Fn.prototype`
- `Prototype`也是一个对象 所以：`Fn.prototype.__proto__ === Object.prototype`
- 原型链顶层：`Object.prototype.__proto__ === null`
- 【补充】 `__proto__` 是非标准历史遗留属性
  - ES6 开始引入了标准方法 `Object.getPrototypeOf(obj)` 和 `Object.setPrototypeOf(obj, proto)`
  - 推荐用它们代替 `__proto__`
- 【补充】`instanceof` 就是依赖这个链条：
  - `obj instanceof Foo`
  - 实际检查 `obj.__proto__.__proto__...` 是否能找到 `Foo.prototype`
- 【补充】
    ```
          Object.prototype 原型链顶点
                      ↑
          Function.prototype 函数的原型
                      ↑
          Function 构造函数本身
                      ↑
      Object( Array Number ...) 构造函数 ｜ 也是一个函数
    ```
    - `Object.__proto__ === Function.prototype` ✅（因为 Object 本身是一个函数，由 Function 构造）
    - `Function.__proto__ === Function.prototype` ✅（因为 Function 也是函数，它自己造自己）
    - `Function.prototype.__proto__ === Object.prototype` ✅（函数原型最终还是继承自 Object.prototype）
    - `Object.prototype.__proto__` === null ✅（顶点）
- [一些原型链范例](./5JavaScript&TypeScript/Object.js)
---
## 判断类型
1. **`typeof`** 
   - 返回一个字符串表示变量的数据类型
   - ✅️ 基本数据类型（除了nul） 
     - | 基本类型：`number` `string` `boolean` `undefined` `null` `symbol` `bigint`
   - ❌ 无法区分对象类型及引用类型 
     - | 对象类型：`Object` 类型及其衍生类型（`Array`、`Function`、`Date`、`RegExp` 等）
     - | 引用类型：包括所有非基本数据类型的值，即存储在堆内存中的对象
2. **`instanceof`**
   - 用于判断某个对象是否是某个构造函数的实例
   - ✅️只能判断引用类型
   - ✅️继承关系也会返回true
   - ❌无法判断基本类型
   - ❌对象和构造函数来自不同的全局上下文（如不同的 iframe） `instanceof` 判断可能会失败
3. **`Object.prototype.toString.call`**
   - `Object.prototype.toString` 是一种更精确的类型判断方式 返回一个标准化的类型字符串
   - ✅️能够区分所有类型，包括 `null` 和 `undefined`
   - ✅️对内置对象（如 Array、Date）判断准确
   - ✅️不受跨 iframe 或跨窗口的影响
   - ❌对于自定义类 返回值始终是 "[object Object]" 不能区分具体的自定义类型
4. **`.constructor`**
   - `.constructor` 是一个引用 指向创建该对象的构造函数
   - 检查对象的 constructor 属性 可以判断对象是由哪个构造函数创建的
   - ✅️用于判断引用类型
   - ❌无法判断基本数据类型
   - ❌`constructor` 属性可以被修改 导致判断不可靠
 - [几种判断类型方法举例](./5JavaScript&TypeScript/判断类型.js)
---
## new & class
`new` 是 `JavaScript` 中的一个关键字 用于创建一个对象实例 | `new`可以用来调用一个函数，这个函数通常被称为`“构造函数”`。调用之后，它会创建一个对象实例，并将这个对象与构造函数的原型关联起来
- 当使用 `new` 关键字调用一个函数时 `JavaScript`会按照以下步骤执行：
1. 创建一个新对象：
 - JavaScript 会创建一个空对象`{}`，并将其原型设置为构造函数的 `prototype`。
 - 这一步相当于：
  ```javascript
    const obj = Object.create(ConstructorFunction.prototype);
  ```
2. 绑定 `this`：
 - 构造函数中的 `this` 会被绑定到新创建的对象上
3. 执行构造函数：
 - 调用构造函数，将参数传递给它，并执行其中的代码
4. 返回对象：
 - 如果构造函数返回了一个对象，则 `new` 表达式返回该对象
 - 如果构造函数返回的是基本数据类型（如 `string`、`number`），或者没有返回值，则返回新创建的对象
  ```js
    //⚠️返回基本数据类型
    function a() {
      return 3; // 显式返回一个基础数据类型（数字）
    };
    const instance = new a();
    console.log(instance); // a {}
    
    //⚠️Number构造函数
    const num1 = Number(123); // 基础数据类型
    const num2 = new Number(123); // 包装对象  
    console.log(num1); // 123
    console.log(typeof num1); // "number"
    console.log(num2); // [Number: 123]
    console.log(typeof num2); // "object"
  ```
  |构造函数|作用|示例|
  |---|---|---|
  |Array|创建数组实例|const arr = new Array(1, 2, 3);|
  |Object|创建对象实例|const obj = new Object();|
  |Date|创建日期实例|const date = new Date();|
  |RegExp|创建正则表达式实例|const regex = new RegExp('\\d+');|
  |Function|创建函数实例|（不推荐使用）|const fn = new Function('x', 'return x * 2');|
  |Number|创建数字对象|（包装基本类型）|const num = new Number(42);|
  |String|创建字符串对象|（包装基本类型）|const str = new String('hello');|
  |Boolean|创建布尔值对象|（包装基本类型）|const bool = new Boolean(true);|

`class` 是 `ES6（ES2015）`引入的一种语法，用来定义类。它提供了一个更清晰、更面向对象的方式来创建对象和继承
- `class` 示例：
    ```js
      class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        greet() {
            console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`)
        }
      };
      const person = new Person('Alice', 18);
      person.greet();
    ```
- class 的底层实现实际上是基于构造函数的 可以用一个等价的构造函数来模拟 class 的行为
    ```js
      function Person(name, age) {
        this.name = name;
        this.age = age;
      }
      Person.prototype.greet = function () { // ⚠️
        console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
      };
      const person = new Person('Alice', 18);
      person.greet();
    ```
- `class` 定义的函数默认必须用 `new` 调用，直接调用会报错
- `new` 调用 `class` 的过程 【底层的工作流程与普通构造函数调用非常类似】
  - 创建一个新对象
  - 将新对象的原型设置为 `class.prototype`
  - 调用 `constructor` 方法，将 `this` 绑定到新对象
  - 如果 `constructor` 显式返回一个引用类型（如对象），`new` 表达式返回这个引用类型；否则，返回新创建的对象
---
## JS 中的位操作符
- JavaScript的数字类型为`双精度 IEEE 754 64位浮点类型`
- 按位操作符的操作数都会被转成`补码形式的有符号32位整数` 用比特序列(0和1组成)表示 超过32位的数字会被丢弃
- 第一个操作数的每个比特位与第二个操作数的相应比特位匹配（第一位对应第一位，第二位对应第二位，以此类推）
- 位运算符应用到每对比特位，结果是新的比特值
- 运算结果再转化为`Js数字类型`
- **& ：按位与(AND)**
  - 对于每一个比特位，只有两个操作数相应的比特位都是1时，结果才为1，否则为0
  - 判断数值的奇偶性
    ```js
      console.log(7 & 1);    // 1
      console.log(8 & 1) ;   // 0
    ```
- **| ：按位或(OR)**
  - 对于每一个比特位，当两个操作数相应的比特位至少有一个1时，结果为1，否则为0
  - 将值强制转换为`int 32`即`32位整数类型`
    ```js
      console.log(11.11 | 0);      // 11
      console.log("11.11" | 0);    // 11
      console.log("-11.11" | 0);   // -11
      console.log(1.23E2 | 0);     // 123
      console.log([] | 0);         // 0
      console.log(({}) | 0);       // 0
    ```
- **^ ：按位异或(XOR)**
  - 对于每一个比特位，当两个操作数相应的比特位有且只有一个1时，结果为1，否则为0
  - 交换数值
    ```js
      let a = 7; // 0111
      let b = 1; // 0001
      //将 a 和 b 的信息混合到 a 中
      a ^= b; // a = a^b = 0110
      //使用新的 a（混合了 a 和 b 的信息）^b提取出原始的 a，并将其存储到 b
      b ^= a; // b = b^a = 0111
      //使用新的 a（混合了 a 和 b 的信息）^新b(a)提取出原始的 b，并将其存储到 a
      a ^= b; // a = a^b = 0001
      console.log(a);   // 1
      console.log(b);   // 7

      // 也可以借助数组交换
      b = [a, a = b][0];
      // 解构赋值更简单
      [a, b] = [b, a];
    ```
  - 判断值的符号是否相同
    ```js
      let a = 1;
      let b = 1;
      console.log((a ^ b) >= 0);   // true
      console.log((a ^ -b) >= 0);   // false
      // ⚠️ 两个数的符号不同（一个正一个负），高位符号位将不同，异或后结果的符号位为 1（负数）
      // 负数以补码表示
      // b=1 正数的二进制为 0000 0001
      // 将正数转为负数的补码：
      // 先取反：1111 1110
      // 再加1：1111 1111
      // −1 的二进制表示为 1111 1111
    ```
- **～ ：按位非(NOT)** 
  - 对于每一个比特位，反转操作数的比特位，即0变成1，1变成0
  - 将值强制转换为`int 32`即`32位整数类型`
    ```js
      console.log(~~(11.11));      // 11
      console.log(~~("11.11"));    // 11
      console.log(~~("-11.11"));   // -11
      console.log(~~(1.23E2));     // 123
      console.log(~~([]));         // 0
      console.log(~~({}));         // 0
    ```
- **<< ：左移**
  - 将值的二进制形式向左移n (n < 32)比特位，右边用0填充
  - 进行整数的* 2^n运算
    ```js
      console.log(11 << 2);         // 44
      console.log(11.11 << 1);      // 22
      console.log("11.11" << 1);    // 22
    ```
    - 将值强制转换为`int 32`即`32位整数类型`: `xxxx << 0`
- **>> ：有符号右移**
    - 将值的二进制表示向右移n (n < 32)位，丢弃被移出的位
    - 进行整数的/ 2^n运算： `xxxx >> n`
    - 将值强制转换为`int 32`即`32位整数类型`： `xxxx >> 0`
- **>>> ：无符号右移**
    - 将值的二进制表示向右移n (n< 32)位，丢弃被移出的位，并使用0在左侧填充
    - 所以结果总是非负的，即便右移0个比特，结果也是非负的（对于>>>一般不用于负数操作）
    - 进行整数的/ 2^n运算（不用于负数）： `xxxx >>> n`
    - 将值强制转换为`int 32`即`32位整数类型`（不用于负数）： `xxxx >>> 0`
---
## 闭包（Closure）
- `JavaScript` 中 函数能够“记住”并访问它所在的`词法作用域` 即使函数在其作用域之外执行
- 简单来说，闭包就是一个函数能够访问它外部函数作用域中的变量
  - 作用域链：当一个函数被创建时，它会携带一个对其外部作用域的引用。这种引用使得函数即使在外部作用域已经销毁时，仍然能够访问该作用域中的变量。
  - 变量的生命周期：闭包的核心在于，外部函数的变量不会在外部函数执行完毕后销毁，而是被闭包函数“捕获”并保持存活。
  - 可能导致内存泄漏（如果不正确使用）。
- [闭包小例](./5JavaScript&TypeScript/Closure.js)
- [闭包计数器](./5JavaScript&TypeScript/ClosureCounter.js)
---
## this 的指向
- `JS`中`this`的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定，this的最终指向的是那个调用它的对象
- 调用函数才会使`this`指向调用者，但箭头函数除外
- **浏览器中（window 环境）的 this**
  - 顶层对象是 window | 可以认为：`this` 👉 顶层 = 全局 = window
- **Node.js 中的 this**
  - `Node` 的顶层对象不是 `window`，而是 `global` ｜但 `Node` 对模块化有特殊处理（每个 `.js` 文件都是一个模块 模块外层不是直接暴露到 `global`，而是被包了一层函数）
  - **`顶层作用域`** | **Node.js 里有两种模块体系** 
    - `CommonJS 模块（CJS）` Node.js 早期的默认模块系统（`require`、`module.exports`）【`this` 指向 `module.exports`（打印出来通常是 `{}`）】
    - `ES Module（ESM）`新标准（`import`、`export`），Node 从 v12 开始逐步支持，.mjs 文件默认是 ESM 【默认运行在严格模式下 `this` 指向 `undefined`】
  - **`全局作用域`** 运行时真正的全局上下文（global 对象） 只有在 REPL（命令行交互模式）里输入代码时 | `this` 👉 `global`
- [this 的实例](./5JavaScript&TypeScript/this.js)
---
## apply、call、bind
- 【 apply call bind 】 每个Function对象都存在`apply()`、`call()`、`bind()`方法 其作用都是改变运行时的 `this` 绑定 但不改变词法作用域/变量查找（闭包仍按定义处决定）
- `fn.apply(thisArg, [a, b, c])`：立刻调用，参数数组/类数组一次性给
- `fn.call(thisArg, a, b, c)`：立刻调用，参数离散列出
- `fn.bind(thisArg, a)`：不调用，返回新函数；后续调用时等同 `fn.call(thisArg, a, ...laterArgs)` | 若用 `new` 调用绑定函数，thisArg 会被忽略，this 指向新实例
- [手写 apply、call、bind](./5JavaScript&TypeScript/ApplyCallBind.js)
---
## 防抖（Debounce）& 节流（Throttle）
- `Debounce`
  - 将多次触发的操作合并为一次执行 | 即在事件连续触发时，只有在事件触发结束的一段时间后，才会执行一次回调函数
  - 如果在等待时间内再次触发事件，则重新计时
  - 场景：搜索框输入、表单验证、窗口调整大小等
- `Throttle`
  - 在一定时间间隔内，只允许函数执行一次，无论期间事件触发了多少次
  - 即函数的执行频率是固定的
  - 场景：滚动事件、页面拖拽、按钮点击等
- [手写防抖](./5JavaScript&TypeScript/Debounce.js)
- [手写节流](./5JavaScript&TypeScript/Throttle.js)
---
# 浅拷贝与深拷贝
1. **浅拷贝**
- 只复制对象的第一层属性
- 如果对象的属性是基础数据类型（如字符串、数字、布尔值等），它会复制这些值
- 如果属性是引用类型（如对象或数组），它只会复制引用地址，而不会复制引用类型的实际内容
- `Object.assign({}, obj)`、展开运算符`{...obj}`都是典型浅拷贝
- ⚠️ 不能拷贝：
  - 函数（只拷贝引用）
  - `Symbol` 属性（`Object.assign` 能拷贝 | `...` 不能）：
    ```js
      let sym = Symbol('foo');
      let source = { a: 1, [sym]: 2 };
      let target = {};
      Object.assign(target, source);
      console.log(target); // { a: 1 }
      console.log(target[sym]); // 2 ✅
    ```
  - 不可枚举属性
1. **深拷贝**
- 深拷贝会递归地复制对象的所有层级，包括嵌套的子对象和数组
- 深拷贝后的对象与原对象完全独立，修改拷贝后的对象不会影响原对象
- [深浅拷贝测试](./5JavaScript&TypeScript/CloneTest.js)
- [手写深浅拷贝](./5JavaScript&TypeScript/Clone.js)
- [考虑循环引用+特殊对象的深拷贝](./5JavaScript&TypeScript/CloneDeepPlus.js)