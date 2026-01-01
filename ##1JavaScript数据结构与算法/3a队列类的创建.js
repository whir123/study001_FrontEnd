//【基于数组实现】（还可以基于链表实现）
class Queue{
    constructor(){
        this.items = [];
    }
    enqueue (element){
        this.items.push(element); // 后端插入
    }
    dequeue (){
        return this.items.shift(); // 前端删除 ｜ 性能不高
        // ⚠️ 记得返回值！！
    }
    front (){ // 查看前端的元素
        return this.items[0];
    }
    isEmpty(){
        return this.items.length === 0;
    }
    size(){
        return this.items.length
    }
    toString(){
        return this.items.join(' ');
    }
};

let q = new Queue();
q.enqueue(4);
q.enqueue(7);
q.enqueue(20);
q.enqueue(78);
console.log(q.toString()); // 4 7 20 78
q.dequeue();
q.dequeue();
console.log(q.size()); // 2