// 前一个js文件的栈类
class Stack {
    constructor() {
        this.items = [];
    }
    push(element) {
        this.items.push(element);
        return;
    };
    pop() { return this.items.pop(); };
    peek() { return this.items[this.items.length - 1]; };
    isEmpty() { return this.items.length === 0; };
    size() { return this.items.length; };
    toString() { return this.items.join(' '); };
};

// ⚠️ 只考虑十进制整数 | 栈对象保存每一步的余数
function dec2bin(num) {
    let stack = new Stack();

    while(num>0){
        stack.push(num % 2);
        num = Math.floor(num / 2);
    };

    let binNum = '';
    while(!stack.isEmpty()){
        binNum += stack.pop();
    };
    return binNum;
};

console.log(dec2bin(4)); // 100
console.log(dec2bin(28)); // 111000