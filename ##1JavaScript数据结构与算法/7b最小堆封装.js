/**
 * 堆通常使用「数组」来实现，而不是「指针结构的树」
 * 下标关系如下（假设根节点下标为 0）：
 * index = i
 * 左子节点：2*i + 1
 * 右子节点：2*i + 2
 * 父节点：(i - 1) // 2
 */

class MinHeap {
    constructor(){
        this.heap = [];
    };

    // 获取父子节点索引
    _parent(idx) { return Math.floor((idx-1)/2) };
    _left(idx) { return 2*idx+1; };
    _right(idx) { return 2*idx+2; };
    // 交换两个节点
    _swap(i,j) {
        [this.heap[i],this.heap[j]] = [this.heap[j],this.heap[i]];
    };

    peek(){ // 查看堆顶
        return this.heap[0];
    };

    insert(value){ // 插入
        this.heap.push(value);
        this._siftUp(this.heap.length-1);
    };

    extractMin(){ // 弹出堆顶元素
        if (this.heap.length===0) return null;
        if (this.heap.length===1) return this.heap.pop();
        let min = this.heap[0];
        this.heap[0] = this.heap.pop(); // 最后一个元素移到堆顶
        this._siftDown(0);
        return min;
    }

    // 向上调整
    _siftUp(idx){
        while(idx>0){
            let par = this._parent(idx);
            if (this.heap[par]<=this.heap[idx]) break;
            this._swap(idx, par);
            idx = par;
        };
    };
    // 向下调整
    _siftDown(idx){
        const n = this.heap.length;
        while(true){
            let left = this._left(idx);
            let right = this._right(idx);
            let smallest = idx;
            if (left<n && this.heap[smallest]>this.heap[left]) smallest=left;
            if (right<n && this.heap[smallest]>this.heap[right]) smallest=right;
            if (smallest===idx) break;
            this._swap(idx, smallest);
            idx = smallest;
        };
    };

    size(){ return this.heap.length; }
    isEmpty(){ return this.heap.length===0; }
};

const h = new MinHeap();
console.log(h.peek());

h.insert(6);
h.insert(9);
h.insert(2);
h.insert(3);
h.insert(7);
h.insert(4);

console.log(h.extractMin());  // 2
console.log(h.extractMin());  // 3
console.log(h.extractMin());  // 4
console.log(h.extractMin());  // 6

console.log(h.size());