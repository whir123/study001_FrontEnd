// ⭐️ 【 单向链表 】
class LinkedList {
    // ⭐️ 内部类 节点
    Node = class {
        constructor(data){
            this.data = data;
            this.next = null;
        };
    };

    constructor(){
        this.head = null;
        this.length = 0;
    };

    append(data){ // 链表尾部添加一个新的节点
        // 链表为空 新添加头 ｜ 链表不为空 像其他节点后面追加节点
        if(this.length === 0){
            let newNode = new this.Node(data);
            this.head = newNode;
        } else {
            let newNode = new this.Node(data);
            let cur = this.head; // 循环找到最后一个节点
            while(cur.next){
                cur = cur.next;
            };
            cur.next = newNode;
        };
        this.length += 1; // 总长度+1
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

    insert(position, data){ // 插入数据到指定位置
        // ⚠️ 对 position 进行越界判断
        if(position<0 || position>this.length){ // 插入时 可以取=
            console.log('position越界');
            return;
        }
        let newNode = new this.Node(data);
        // 判断插入位置是否是0
        if(position===0){
            newNode.next = this.head;
            this.head = newNode;
        } else {
            let index = 0;
            let cur = this.head, prev = null;
            while(index++ < position){
                prev = cur;
                cur = cur.next;
            };
            newNode.next = cur;
            prev.next = newNode;
        };
        this.length += 1;
    };

    size(){
        return this.length;
    };

    get(position){
        // ⚠️ 对 position 进行越界判断
        if(position<0 || position>=this.length){ // 获取时 不能取=
            console.log('position越界');
            return;
        }
        let index = 0;
        let cur = this.head;
        while(index++ < position){
            cur = cur.next;
        };
        return cur.data;        
    };

    update(position, data){ // 更新某个位置的元素
        // ⚠️ 对 position 进行越界判断
        if(position<0 || position>=this.length){ // 获取时 不能取=
            console.log('position越界');
            return;
        }
        let index = 0;
        let cur = this.head;
        while(index++ < position){
            cur = cur.next;
        };
        cur.data = data;
    };

    indexOf(data){
        let cur = this.head, index = 0;
        while(cur){
            if(data===cur.data) return index;
            cur = cur.next;
            index++;
        };
        console.log('数据不存在');
        return false;
    };

    removeAt(position){
        // ⚠️ 对 position 进行越界判断
        if(position<0 || position>=this.length){ // 获取时 不能取=
            console.log('position越界');
            return;
        }
        let index = 0;
        let cur = this.head, prev = null;
        while(index++ < position){
            prev = cur;
            cur = cur.next;
        };
        prev.next = cur.next;
        this.length--;
    };

    remove(data){
        // ⭐️ 也可以直接调用 indexOf 和 removeAt
        let cur = this.head, prev = null;
        while(cur){
            if(data===cur.data){
                if(prev===null){
                    this.head = cur.next;
                    cur.next = null;
                }else{
                    prev.next = cur.next;
                };
                this.length--;
                return true;
            };
            prev = cur;
            cur = cur.next
        };
        console.log('数据不存在');
        return false;
    }
};

const list = new LinkedList();
list.append(3);
list.append(5.5);
list.append(8);
list.append(1);
console.log(list.toString(), '长度：', list.size()); // 3->5.5->8->1 长度： 4

list.insert(100, 2);        // position越界
list.insert(0, 'a0');
console.log(list.toString(), '长度：', list.size()); // a0->3->5.5->8->1 长度： 5
list.insert(3, 'b3');
console.log(list.toString(), '长度：', list.size()); // a0->3->5.5->b3->8->1 长度： 6
list.insert(6, 'c3');
console.log(list.toString(), '长度：', list.size()); // a0->3->5.5->b3->8->1->c3 长度： 7

console.log(list.get(0)); // a0
console.log(list.get(3)); // b3
list.update(3,'bbbb3');
console.log(list.get(3)); // bbbb3
console.log(list.indexOf('bbbb3')); // 3
console.log(list.indexOf(1));       // 5
console.log(list.indexOf('kkkk'));  // 数据不存在

list.removeAt(3);
console.log(list.toString(), '长度：', list.size()); // a0->3->5.5->8->1->c3 长度： 6

list.remove(5.5);
console.log(list.toString(), '长度：', list.size()); // a0->3->8->1->c3 长度： 5
list.remove(100); // 数据不存在
console.log(list.toString(), '长度：', list.size()); // a0->3->8->1->c3 长度： 5