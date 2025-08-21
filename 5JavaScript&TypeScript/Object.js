var a = function(){};
var b = new Array();
var c = new Number(1);

console.log(a.__proto__ === Function.prototype);    // true
console.log(b.__proto__ === Array.prototype);       // true
console.log(c.__proto__ === Number.prototype);      // true
//【更推荐】
console.log(Object.getPrototypeOf(a) === Function.prototype); // true
console.log(Object.getPrototypeOf(b) === Array.prototype);    // true
console.log(Object.getPrototypeOf(c) === Number.prototype);   // true

// ⚠️ 普通对象实例（包括数组、数字对象、函数对象本身），再往上一层，都会回到 Object.prototype
console.log(a.__proto__.__proto__ === Object.prototype);  // true
console.log(b.__proto__.__proto__ === Object.prototype);  // true
console.log(c.__proto__.__proto__ === Object.prototype);  // true

//————————————————————————————————————————————————————————————
console.log(Object.__proto__ === Function.prototype);// true
console.log(Function.__proto__ === Function.prototype);// true
console.log(Function.prototype.__proto__ === Object.prototype);// true
console.log(Object.prototype.__proto__ === null);// true
