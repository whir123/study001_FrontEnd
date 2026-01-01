// 封装栈类 【基于数组】
function Stack(){
    // 栈的属性
    this.items = [];

    // 栈的相关操作
    // ⚠️ 箭头函数会带来问题 this是构造时的那个实例 new多个Stack 会共享同一个.prototype.push等
    // ⚠️ 箭头函数不适合挂在 prototype 丢掉了动态绑定的优势 

    // ⚠️ 数组尾部最后一个元素作为栈顶元素
    Stack.prototype.push = function(element){
        this.items.push(element);
        return;
    };

    Stack.prototype.pop = function(){
        return this.items.pop(); 
    };

    Stack.prototype.peek = function(){
        return this.items[this.items.length-1];
    };

    Stack.prototype.isEmpty = function(){
        return this.items.length===0;
    };

    Stack.prototype.size = function(){
        return this.items.length;
    }

    Stack.prototype.toString = function(){
        return this.items.join(' ');
    }
};

const s = new Stack();
s.push(3);
s.push(20);
s.push(8.2);
s.push(11);
console.log(s.size());  // 4
console.log(s.pop());   // 11
console.log(s.pop());   // 8.2
console.log(s.size());  // 2
s.push(76);
console.log(s.toString());  // 3 20 76
