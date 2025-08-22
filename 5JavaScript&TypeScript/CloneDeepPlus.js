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
