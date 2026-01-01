//【基于Object实现】
class MySet {
    constructor () {
        this.items = {};
    };

    add (value) {
        if (this.has(value)) return false;
        this.items[value] = value;
        return true;
    };

    has (value) {
        return this.items.hasOwnProperty(value);
    };

    remove (value) {
        if (!this.has(value)) return false;
        delete this.items[value];
    };

    clear () {
        this.items = {}
    };

    size () {
        return Object.keys(this.items).length; // ❗️
    };

    values () {
        return Object.keys(this.items);
    };
};

let s = new MySet();
s.add('abc');
s.add(33);
s.add(60);
s.add([1,2,3]);
console.log(s.size()); // 4
s.remove('abc');
s.remove(60);
console.log(s.values()); // [ '33', '1,2,3' ]
console.log(s.has(33)); // true 

// 对象（{}）的 键只能是字符串或 symbol。
// 如果用数字、布尔值、数组等非字符串类型当键，它们会被自动转换为字符串。