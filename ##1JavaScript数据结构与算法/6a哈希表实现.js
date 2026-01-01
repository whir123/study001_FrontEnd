class HashTable {
    constructor () {
        this.storage = []; // [[[k,v], [k,v], [k,v]...], [], [], []...]
        this.count = 0;
        this.limit = 7;
    };

    // 哈希函数
    hashFunc = function (str, size) {
        // 1 定义hashCode变量
        let hashCode = 0;
        // 2 霍纳算法 计算hashCode的值
        for (let i=0; i<str.length; i++) {
            hashCode = 37 * hashCode + str.charCodeAt(i);
            // ⚠️ 37 是一个常用的质数/奇数，能减少哈希冲突
            // ⚠️ 相当于把字符串看成一个 多项式数值 来计算哈希值
        };
        // 3 取余
        let idx = hashCode % size;
        // ⚠️ 由于哈希表大小有限（size），需要取余把结果映射到 0 ~ size-1 的索引范围
        return idx;
    };
    /**
     * ⚠️ 使用举例
     * hashFunc("abc", 10);
     * "a".charCodeAt(0) = 97
     * "b".charCodeAt(1) = 98
     * "c".charCodeAt(2) = 99
     * → 37*0 + 97 = 97
     * → 37*97 + 98 = 3707
     * → 37*3707 + 99 = 137258
     * idx = 137258 % 10 = 8
     * 结果：8
     * 意味着 "abc" 这个字符串会存储到哈希表下标 8 的桶里。
     */

    put (key, value) { //【插入/修改】
        // 1 根据key获取索引值
        // 2 根据索引值取出bucket（桶不存在 创建在该索引位置）
        // 3 判断新增还是修改原来的值
        let idx = this.hashFunc(key, this.limit);
        let bucket = this.storage[idx];
        if (bucket===undefined) {
            bucket = [];
            this.storage[idx] = bucket;
        };
        const n = bucket.length;
        for (let i=0; i<n; i++) {
            let tuple = bucket[i];
            if (tuple[0]===key) {
                tuple[1] = value; // 找到原来存在值 修改值 return
                return;
            };
        };
        bucket.push([key, value]); // 否则push新值
        this.count++;
    };

    get (key) { //【获取】
        let idx = this.hashFunc(key, this.limit);
        let bucket = this.storage[idx];
        if (bucket===undefined) return undefined;
        const n = bucket.length;
        for (let i=0; i<n; i++) {
            let tuple = bucket[i];
            if (tuple[0]===key) return tuple[1];
        };
        return undefined;
    };

    remove (key) { //【删除】
        let idx = this.hashFunc(key, this.limit);
        let bucket = this.storage[idx];
        if (bucket===undefined) return undefined;
        const n = bucket.length;
        for (let i=0; i<n; i++) {
            const tuple = bucket[i];
            if (tuple[0]===key) {
                bucket.splice(i,1);
                this.count--;
                return tuple[1];
            };
        };
        return undefined;
    };

    isEmpty () {return this.count===0;};

    size () {return this.count;}
};

//【---测试---】
let ht = new HashTable();
ht.put('aa', 123);
ht.put('bb', '789');
ht.put('cc', 473);

console.log(ht.get('aa')); // 数字123
console.log(ht.get('bb')); // 字符串789

ht.remove('aa');
console.log(ht.get('aa')); // undefined
console.log(ht.get('cc')); // 数字473