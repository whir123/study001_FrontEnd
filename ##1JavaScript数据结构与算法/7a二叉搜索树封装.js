// ⭐️ Binary Search Tree
// 非空左子树 所有键值 < 根节点键值
// 非空右子树 所有键值 > 根节点键值
// 左右子树分别也是二叉搜索树

class BinarySearchTree {
    Node = class { // 内部类 节点
        constructor(key, value){
            this.key = key;
            this.value = value;
            this.left = null;
            this.right = null;
        };
    };

    constructor(){
        this.root = null;
    };

    insert(key, value){
        let newNode = new this.Node(key, value);
        if (this.root===null){
            this.root = newNode;
            return true;
        };
        let cur = this.root;
        let par = null;
        while(cur!==null){
            par = cur;
            if (key < cur.key) {cur = cur.left;}
            else if (key > cur.key) {cur = cur.right;}
            else { // key = cur.key
                cur.value = value; // key已存在 更新value
                return true;
            };
        };
        if (key < par.key) {par.left = newNode;}
        else {par.right = newNode;}
        return true;
    };

    search(key){
        let cur = this.root;
        while(cur!==null){
            if (key===cur.key) {return cur.value;}
            else if (key<cur.key) {cur = cur.left;}
            else {cur = cur.right;}
        };
        return null;
    };

    // ⭐️ 删除节点
    delete(key){
        this.root = this._delete(this.root, key);
    };
    // ✅ 递归写法：root 不需要单独讨论，递归返回值直接赋给 this.root。
    // 迭代写法：root 需要单独判断，删除时直接修改 this.root。
    _delete(node, key){
        if (node===null) return null;

        if (key<node.key){
            node.left = this._delete(node.left, key);
            return node;
        } else if (key>node.key){
            node.right = this._delete(node.right, key);
            return node;
        } else { // ⭐️ 找到目标节点
            // 1 删除的节点没有子节点（是叶子节点）
            if (node.left===null && node.right===null) return null;

            // 2 删除的节点有一个子节点
            if (node.left===null) return node.right;
            if (node.right===null) return node.left;

            // 3 删除的节点有两个子节点
            // 找到右子树的最小节点
            let findNode = this._find(node.right);
            node.key = findNode.key;
            node.value = findNode.value;
            node.right = this._delete(node.right, findNode.key);
            return node;
        };
    };
    _find(node){
        while (node.left!==null){
            node = node.left;
        };
        return node;
    }

    preOrderTraverse(){ // 前序遍历所有节点 ｜ 根 左 右
        let arr = [];
        function preOrder(node, arr){
            if (node===null) {return;}
            arr.push(node.value);
            preOrder(node.left, arr);
            preOrder(node.right, arr);
        };
        preOrder(this.root, arr);
        console.log(arr.join('->'));
    };

    inOrderTraverse(){ // ⭐️ 中序遍历所有节点 ｜ 左 根 右 顺序
        let arr = [];
        function inOrder(node, arr){
            if (node===null) {return;}
            inOrder(node.left, arr);
            arr.push(node.value);
            inOrder(node.right, arr);
        };
        inOrder(this.root, arr);
        console.log(arr.join('->'));
    };

    postOrderTraverse(){ // 后序遍历所有节点
        let arr = [];
        function postOrder(node, arr){
            if (node===null) {return;}
            postOrder(node.left, arr);
            postOrder(node.right, arr);
            arr.push(node.value);
        };
        postOrder(this.root, arr);
        console.log(arr.join('->'));
    };

    inOrderTraverseStack(){ // ⭐️ 【栈方法】中序遍历所有节点 ｜ 左 根 右 顺序
        let arr = [];
        let stack = [];
        let cur = this.root;
        while (cur!==null || stack.length!==0){
            while(cur!==null){
                stack.push(cur);
                cur = cur.left;
            };
            cur = stack.pop();
            arr.push(cur.value);
            cur = cur.right;
        };
        console.log(arr.join('->'));
    };

    min(){
        if (this.root===null) return null;
        let cur = this.root;
        while(cur.left!==null){
            cur = cur.left;
        };
        return cur.value;
    };
    
    max(){
        if (this.root===null) return null;
        let cur = this.root;
        while(cur.right!==null){
            cur = cur.right;
        };
        return cur.value;
    };
};

let bst = new BinarySearchTree();
bst.insert(1,'a');
bst.insert(3,'c');
bst.insert(6,'g');
bst.insert(6,'f');
bst.insert(5,'e');
bst.insert(4,'d');
bst.insert(2,'b');
//       1-a
//         \
//         3-c
//         /  \
//       2-b  6-f
//            /
//          5-e
//          /
//        4-d
bst.preOrderTraverse();     //前序 根左右 acbfed
bst.inOrderTraverse();      //中序 左根右 abcdef
bst.postOrderTraverse();    //后序 左右根 bdefca
bst.inOrderTraverseStack(); //中序 左根右 abcdef (Stack版)

console.log(bst.search(3)); // c
console.log(bst.search(5)); // e
console.log(bst.search(1)); // a

console.log(bst.min());     // a
console.log(bst.max());     // f

bst.delete(4);
bst.inOrderTraverse();      //中序 左根右 a->b->c->e->f
bst.delete(5);
bst.inOrderTraverse();      //中序 左根右 a->b->c->f
bst.delete(1);
bst.inOrderTraverse();      //中序 左根右 b->c->f
bst.delete(3);
bst.inOrderTraverse();      //中序 左根右 b->f