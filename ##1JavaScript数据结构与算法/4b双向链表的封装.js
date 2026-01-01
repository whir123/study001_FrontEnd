// ⭐️ 【 双向链表 】
class DoublyLinkedList {
    // ⭐️ 内部类 节点
    Node = class {
        constructor(data){
            this.data = data;
            this.prev = null;
            this.next = null;
        };
    };

    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    };

    append(data){
        let newNode = new this.Node(data);
        if(this.length===0){
            this.head = newNode;
            this.tail = newNode;
        } else {
            let cur = this.head;
            while(cur.next){
                cur = cur.next;
            };
            cur.next = newNode;
            newNode.prev = cur;
            this.tail = newNode;
        };
        this.length++;
    };

    insert(data, position){
        // ⚠️ 对 position 进行越界判断
        if(position<0 || position>this.length){ // 插入时 可以取=
            console.log('position越界');
            return;
        };
        let newNode = new this.Node(data);
        if(this.length===0){
            this.head = newNode;
            this.tail = newNode;
        }else if(position===0){
            newNode.next = this.head;
            if(this.head) this.head.prev = newNode;
            this.head = newNode;
        }else if(position===this.length){
            newNode.prev = this.tail;
            if(this.tail) this.tail.next = newNode;
            this.tail = newNode;
        }else if(position>0&&position<this.length){
            let index = 0;
            let cur = this.head, prev = null;
            while(index++ < position){
                prev = cur;
                cur = cur.next;
            };
            newNode.next = cur;
            cur.prev = newNode;
            newNode.prev = prev;
            prev.next = newNode;
        };
        this.length ++;
    };

    removeAt(position){
        // ⚠️ 对 position 进行越界判断
        if(position<0 || position>=this.length){
            console.log('position越界');
            return;
        };
        if(this.length===1){
            this.head = null;
            this.tail = null;
        } else if (position===0){
            this.head = this.head.next;
            this.head.prev = null;
        } else if (position===this.length-1){
            this.tail = this.tail.prev;
            this.tail.next = null;
        } else if (position>0&&position<this.length-1){
            let index = 0;
            let cur = this.head;
            while(index++ < position){
                cur = cur.next;
            };
            cur.prev.next = cur.next;
            cur.next.prev = cur.prev;
        };
        this.length--;
    };

    toString(){
        let parts = [];
        let cur = this.head;
        while(cur){
            parts.push(cur.data);
            cur = cur.next;
        };
        return parts.join('->');
    };

    forwardString(){ // 从后向前遍历 获取每一个节点
        let parts = [];
        let cur = this.tail;
        while(cur){
            parts.push(cur.data);
            cur = cur.prev;
        };
        return parts.join('<-');
    };

    size(){
        return this.length;
    }
};

const list = new DoublyLinkedList();
list.append(3);
list.append(5.5);
list.append(8);
list.append(1);
console.log(list.toString(), '长度：', list.size()); // 3->5.5->8->1 长度： 4
console.log(list.forwardString(), '长度：', list.size()); // 1<-8<-5.5<-3 长度： 4

list.insert('a', 0);
console.log(list.toString(), '长度：', list.size()); // a->3->5.5->8->1 长度： 5
console.log(list.forwardString(), '长度：', list.size()); // 1<-8<-5.5<-3<-a 长度： 5

const list2 = new DoublyLinkedList();
list2.insert('a', 0);
console.log(list2.toString(), '长度：', list2.size()); // a 长度： 1
console.log(list2.forwardString(), '长度：', list2.size()); // a 长度： 1
list2.insert('dd', 0);
list2.insert('cc', 2);
console.log(list2.toString(), '长度：', list2.size()); // dd->a->cc 长度： 3
console.log(list2.forwardString(), '长度：', list2.size()); // cc<-a<-dd 长度： 3
list2.removeAt(0);
console.log(list2.toString(), '长度：', list2.size()); // a->cc 长度： 2
list2.append(2);
list2.append(7.1);
list2.append(3);
list2.append(4);
console.log(list2.toString(), '长度：', list2.size()); // a->cc->2->7.1->3->4 长度： 6
list2.removeAt(3);
console.log(list2.toString(), '长度：', list2.size()); // a->cc->2->3->4 长度： 5