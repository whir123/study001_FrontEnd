// ⚠️ 手写浅拷贝
function shallowCopy (obj) {
    if(typeof(obj)!=='object' || obj===null) return obj;

    const copy = Array.isArray(obj) ? [] : {}

    for (let key in obj) {
        if(obj.hasOwnProperty(key)) {
            // ⚠️ Object.hasOwnProperty()
            // 返回一个布尔值 表示对象(obj)自有属性（而不是继承来的属性）中是否具有指定的属性(key)
            copy[key] = obj[key];
        };
    };
    return copy;
};
const obj1 = {a:1, b:{c:2, d:3, e:[4, 5]}};
const copy1 = shallowCopy(obj1);
console.log(copy1.a);   // 1
console.log(copy1.b);   // { c: 2, d: 3, e: [ 4, 5 ] }
console.log(copy1.b.e); // [ 4, 5 ] 
copy1.b.e = 99;
console.log(obj1.b.e);  // 99 | ❗浅拷贝是对原对象的引用 把原对象改了

// ⚠️ 手写深拷贝
function deepCopy (obj) {
    if (typeof(obj)!=='object' || obj===null) return obj;

    const copy = Array.isArray(obj) ? [] : {};
    const keys = Object.keys(obj);
    keys.forEach(key=>{
        copy[key] = deepCopy(obj[key]);
    });
    return copy;
};
const obj2 = {a:1, b:{c:2, d:3, e:[4, 5]}};
const copy2 = deepCopy(obj2);
console.log(copy2.a);   // 1
console.log(copy2.b);   // { c: 2, d: 3, e: [ 4, 5 ] }
console.log(copy2.b.e); // [ 4, 5 ] 
copy2.b.e = 99;
console.log(obj2.b.e);  // [ 4, 5 ] | ❗深拷贝嵌套对象完全独立 改值不影响原对象

// ⚠️ 手写能解决循环引用的深拷贝【使用WeakMap】
function deepCopyPlus (obj, hash = new WeakMap()) { // ⚠️
    if(typeof(obj)!=='object' || obj===null) return obj;

    if(hash.has(obj)) return hash.get(obj);
    
    const copy = Array.isArray(obj) ? [] : {};
    hash.set(obj, copy); // ⚠️ 先把副本存进 weakMap

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopyPlus(obj[key], hash); // ⚠️ 递归时记得传递 hash 防止不断新建一个 爆栈
    });
    return copy;
};
//❗循环引用对象测试
const obj3 = { name: "Alice" };
obj3.self = obj3;
const copy3 = deepCopyPlus(obj3);
console.log(copy3);         // <ref *1> { name: 'Alice', self: [Circular *1] }
console.log(copy3.self);    // <ref *1> { name: 'Alice', self: [Circular *1] }
//❗循环引用数组测试
const arr4 = [1,2,3,4];
arr4.push(arr4);
const copy4 = deepCopyPlus(arr4);
console.log(copy4);                 // <ref *1> [ 1, 2, 3, 4, [Circular *1] ]
console.log(copy4[4] === copy4);    // true
console.log(copy4[4] === arr4);     // false
