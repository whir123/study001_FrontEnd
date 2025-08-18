var a = function(){};
var b = new Array();
var c = new Number(1);

console.log(a.__proto__);// Object(0)
console.log(b.__proto__);// []
console.log(c.__proto__);// {}

console.log(a.__proto__.__proto__);// [Object: null prototype] {}
console.log(b.__proto__.__proto__);// [Object: null prototype] {}
console.log(c.__proto__.__proto__);// [Object: null prototype] {}

console.log(a.__proto__.__proto__ === Object.prototype);// true
console.log(b.__proto__.__proto__ === Object.prototype);// true
console.log(c.__proto__.__proto__ === Object.prototype);// true

//————————————————————————————————————————————————————————————
console.log(Object.__proto__ === Function.prototype);// true
console.log(Function.__proto__ === Function.prototype);// true
console.log(Function.prototype.__proto__ === Object.prototype);// true
console.log(Object.prototype.__proto__ === null);// true

//构造函数有.prototype
console.log(typeof Array); // function
console.log(Array.prototype); // Object(0) [] （原型对象）
console.log(Array.__proto__ === Function.prototype); // true (因为 Array 是函数)

//new出来的实例是对象 没有.prototype
let d = new Date();
console.log(d.__proto__ === Date.prototype); // true
console.log(d.prototype); // undefined
