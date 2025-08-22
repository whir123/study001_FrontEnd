// ⚠️ 浅拷贝方法1：扩展运算符
const obj = {
    name: "lzk",
    details: {
        age: 18,
        city: 'shanghai',
    },
};
const shallowCopy = {...obj};
console.log(shallowCopy.name);      // lzk
console.log(shallowCopy.details);   // { age: 18, city: 'shanghai' }
shallowCopy.name = "whir";
console.log(obj.name);              // lzk | 没更改

// ⚠️ 浅拷贝方法2：Object.assign() 
// 该静态方法将一个或者多个源对象中所有可枚举的自有属性复制到目标对象，并返回修改后的目标对象
// Object.assign(target, ...sources)
// target 需要应用源对象属性的目标对象，修改后将作为返回值 | sources 一个或多个包含要应用的属性的源对象
const shallowCopy2 = Object.assign({}, obj);
console.log(shallowCopy2.name);      // lzk
console.log(shallowCopy2.details);   // { age: 18, city: 'shanghai' }

// Object.assign() 接收多个 sources
const obj2 = {
    name: "LLL",
    details: {
        age: 24,
        city: 'beijing',
        school: 'ABC',
    },
};
const shallowCopy3 = Object.assign({}, obj, obj2);
console.log(shallowCopy3.name);      // LLL
console.log(shallowCopy3.details);   // { age: 24, city: 'beijing', school: 'ABC' }

//========================================================================================
// ⚠️ 深拷贝方法1：JSON.parse(JSON.stringify(obj))
// JSON.stringify() 方法将一个 JavaScript 对象或值转换为 JSON 字符串
// JSON.parse() 方法用来解析 JSON 字符串，构造由字符串描述的 JavaScript 值或对象
const obj3 = {
    a: 1,
    b: [2, 3],
    c: {
        d: 4,
        e: [5, 6],
    },
};
const deepClone = JSON.parse(JSON.stringify(obj3));
console.log(deepClone.a);   // 1
console.log(deepClone.b);   // [2,3]
console.log(deepClone.c);   // { d: 4, e: [ 5, 6 ] }
console.log(deepClone.c.d); // 4
console.log(deepClone.c.e); // [5,6]

// ❗无法处理函数、undefined、Symbol 等特殊值
// ❗对象中如果有循环引用（即对象的某个属性指向自身），会报错