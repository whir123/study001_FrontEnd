// ⚠️【深拷贝】能考虑循环引用 也能考虑 Date、RegExp、Map、Set 这些特殊对象
function deepCopyPlus(obj, hash = new WeakMap()) {
    if (typeof obj !== 'object' || obj === null) return obj;

    // 循环引用检测
    if (hash.has(obj)) return hash.get(obj);

    let copy;
    // 处理特殊对象
    if (obj instanceof Date) {
        copy = new Date(obj.getTime()); // ⚠️
        hash.set(obj, copy); // ❗
        return copy;
    };
    if (obj instanceof RegExp) {
        copy = new RegExp(obj.source, obj.flags); // ⚠️
        hash.set(obj, copy); // ❗
        return copy;
    };
    if (obj instanceof Map) {
        copy = new Map(); // ⚠️
        hash.set(obj, copy); // ❗
        obj.forEach((v, k) => {
            copy.set(deepCopyPlus(k, hash), deepCopyPlus(v, hash));
        });
        return copy;
    };
    if (obj instanceof Set) {
        copy = new Set(); // ⚠️
        hash.set(obj, copy); // ❗
        obj.forEach(v => {
            copy.add(deepCopyPlus(v, hash));
        });
        return copy;
    };
    // 普通对象 / 数组
    copy = Array.isArray(obj) ? [] : {};
    hash.set(obj, copy); // ❗

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopyPlus(obj[key], hash);
    });

    return copy;
}
//【验证】
const obj1 = { a: 1, b: { c: 2 } };
const copy1 = deepCopyPlus(obj1);
console.log(copy1.b.c); // 2
copy1.b.c = 99;
console.log(obj1.b.c);  // 2 | 原obj不变

const obj2 = { name: "Alice" };
obj2.self = obj2;
const copy2 = deepCopyPlus(obj2);
console.log(copy2.name);            // Alice
console.log(copy2.self === copy2);  // true 

// Date
const d1 = new Date();
const d2 = deepCopyPlus(d1);
// getTime() 返回一个时间的格林威治时间数值
console.log(d1.getTime() === d2.getTime()); // true 

// RegExp
const r1 = /abc/gi;
const r2 = deepCopyPlus(r1);
console.log(r1.source === r2.source, r1.flags === r2.flags); // true true 

// Map
const m1 = new Map();
m1.set('a', 1);
m1.set({ x: 1 }, { y: 2 });
const m2 = deepCopyPlus(m1);
console.log(m1 !== m2, [...m1][1][0] !== [...m2][1][0]); // true true 

// Set
const s1 = new Set([1, 2, { a: 3 }]);
const s2 = deepCopyPlus(s1);
console.log(s1 !== s2, [...s1][2] !== [...s2][2]); // true true 
