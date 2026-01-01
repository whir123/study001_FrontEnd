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

    // ⭐️ 集合间操作
    union (otherSet) { //【并集】
        let unionSet = new MySet();
        let values = this.values();
        for (let i=0; i<values.length; i++) {
            unionSet.add(values[i]);
        };
        values = otherSet.values();
        for (let i=0; i<values.length; i++) {
            unionSet.add(values[i]);
        };
        return unionSet;
    };

    intersection (otherSet) { //【交集】
        let intersectionSet = new MySet();
        let values = this.values();
        for (let i=0; i<values.length; i++) {
            if (otherSet.has(values[i])) {
                intersectionSet.add(values[i]);
            };
        };
        return intersectionSet;
    };

    difference (otherSet) { //【差集】
        let differenceSet = new MySet();
        let values = this.values();
        for (let i=0; i<values.length; i++) {
            if (!otherSet.has(values[i])) {
                differenceSet.add(values[i]);
            };
        };
        return differenceSet;
    };

    subset (otherSet) { //【子集】
        let values = this.values();
        for (let i=0; i<values.length; i++) {
            if (!otherSet.has(values[i])) {
                return false;
            };
        };
        return true;
    };
};

const a = new MySet();
a.add('abc');
a.add('cbb');
a.add('eee');
const b = new MySet();
b.add('abc');
b.add('eee');
b.add('nmn');
console.log(a.values()); // [ 'abc', 'cbb', 'eee' ]
console.log(b.values()); // [ 'abc', 'eee', 'nmn' ]

const ab1 = a.union(b);
console.log(ab1.values()); // [ 'abc', 'cbb', 'eee', 'nmn' ]
const ab2 = a.intersection(b);
console.log(ab2.values()); // [ 'abc', 'eee' ]
const ab3 = a.difference(b);
console.log(ab3.values()); // [ 'cbb' ]
const ab4 = a.subset(b);
console.log(ab4); // false

const c = new MySet();
c.add('www');
c.add('yyy');
const d = new MySet();
d.add('www');
d.add('yyy');
d.add('kkk');
console.log(c.subset(d)); // true