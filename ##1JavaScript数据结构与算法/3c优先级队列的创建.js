// 【使用数组实现】
class PriorityQueue {

    // ⚠️ 封装一个 内部类 在里面
    QueueElement = class {
        constructor(element, priority){
            this.element = element;
            this.priority = priority;
        };
    };

    constructor(){
        this.items = [];
    }

    enqueue(element, priority){ // 插入方法
        // ⚠️ 创建内部类对象
        this.queueElement = new this.QueueElement(element, priority);
        // ⚠️ 插入
        if (this.items.length === 0){
            this.items.push(this.queueElement)
        } else {
            // ⭐️ 优先级排前面
            let added = false;
            for (let i=0; i<this.items.length; i++){
                if (this.queueElement.priority < this.items[i].priority){
                    this.items.splice(i,0,this.queueElement);
                    // splice(start, deleteCount, item1, item2, /* …, */ itemN)
                    // splice() 方法就地移除或者替换已存在的元素和/或添加新的元素
                    added = true;
                    break;
                };
            };
            if (!added) {this.items.push(this.queueElement)};
        };
    };

    dequeue(){
        return this.items.shift();
    }

    front(){
        return this.items[0].element;
    }

    isEmpty(){
        return this.items.length === 0;
    }

    size(){
        return this.items.length;
    }

    toString(){
        let str = '';
        for(const q of this.items){
            str += (q.element+' ');
        } 
        return str;
    }
}

const pq = new PriorityQueue();
pq.enqueue('qqq', 2);
pq.enqueue('aaa', 1);
pq.enqueue('uiu', 8);
pq.enqueue('yxy', 5);
console.log(pq.toString()); // aaa qqq yxy uiu 
pq.dequeue();
pq.dequeue();
console.log(pq.front());    // yxy
console.log(pq.size());     // 2