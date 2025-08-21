//====================[typeof]==================
//基本数据类型：
console.log(typeof 42);             //number
console.log(typeof 'hello');        //string
console.log(typeof true);           //boolean
console.log(typeof undefined);      //undefined
console.log(typeof Symbol('aa'));   //symbol
console.log(typeof BigInt(123n));   //bigint
//引用类型：
console.log(typeof {});             //object
console.log(typeof []);             //object
console.log(typeof null);           //⚠️object
//`typeof (null)`会返回`Object` 
//这是因为JS二进制前三位都为0的话会被判断为Object类型
//null的二进制表示是全0，自然前三位也是0，所以执行typeof时会返回Object，实际null为基本数据类型
console.log(typeof function(){});   //⚠️function

//===================[instanceof]==================
console.log([] instanceof Array);   //true  //⚠️[] --> Array.prototype --> Object.prototype --> null
console.log({} instanceof Object);          //⚠️{} --> Object.prototype --> null
console.log(function(){} instanceof Function);
console.log(new Date() instanceof Date);
//继承关系的返回
class Animal {};
class Dog extends Animal {};
const dog = new Dog();
console.log(dog instanceof Dog);    //true
console.log(dog instanceof Animal);
console.log(dog instanceof Object);
//⚠️dog --> Dog.prototype --> Animal.prototype --> Object.prototype --> null
//【然而 Dog 是由 class 定义的构造函数 所有函数（包括类）都是 Function 的实例】
//⚠️Dog --> Function.prototype --> Object.prototype --> null【即 Dog.__proto__ === Function.prototype】
//❗Dog 是一个构造函数，它的原型链与普通函数一致。
//❗dog 是 Dog 的实例，它的原型链反映了类的继承关系

//============[Object.prototype.toString.call]==========
//❗toString 定义在 Object.prototype 上的方法 返回一个字符串 表示对象的类型信息
//❗.call 的作用：允许手动指定 this 的值为括号里的 强制 Object.prototype.toString 方法在特定上下文中运行
console.log(Object.prototype.toString.call(42));
console.log(Object.prototype.toString.call("42"));
console.log(Object.prototype.toString.call(null));      //⚠️[object Null]
console.log(Object.prototype.toString.call(undefined)); //⚠️[object Undefined]
console.log(Object.prototype.toString.call([]));
console.log(Object.prototype.toString.call({}));
console.log(Object.prototype.toString.call(/regex/));   //[object RegExp]

//===================[.constructor]=================
console.log([].constructor === Array);                  //true
console.log({}.constructor === Object);                 //true
console.log(new Date().constructor === Date);           //true
console.log(function() {}.constructor === Function);    //true
//⚠️对象的 .constructor 属性来源于其原型
console.log(Array.prototype.constructor === Array);         //❗true
console.log(Function.prototype.constructor === Function);   //❗true
//⚠️.constructor 属性可以被手动修改 从而导致错误的结果