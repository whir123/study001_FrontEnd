// 数到某个数字 对应的人自动淘汰
// 反复淘汰 知道一个人剩余 他获胜

// ⬇️ 封装的队列
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
        return this.items.length;
    }
    toString(){
        return this.items.join(' ');
    }
};

function passGame(nameList, num) {
    let q = new Queue();
    // ⚠️ 把人全放进队列里
    for(let i=0; i<nameList.length; i++){
        q.enqueue(nameList[i]);
    };
    // ⚠️ 开始数数字 不是num：加入队列末尾 是num：从队列中删除
    while(q.size()>1){
        for(let k=0; k<num-1; k++){
            q.enqueue(q.dequeue());
        };
        console.log('淘汰掉：', q.dequeue());
    };
    return q.front();
};

console.log(passGame(['a', 'b', 'c', 'd', 'e'], 3));