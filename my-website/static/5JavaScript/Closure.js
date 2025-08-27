function outer(){
    let count = 0;//外部函数作用域变量
    return function inner(){
        count++;//内部函数访问外部函数作用域
        console.log(count);
    };
};

outer();//什么都没有
// ⚠️ 并没有保存 outer() 的返回值 也没有调用返回的函数inner
outer()();//1
outer()();//1
const aa = outer();// ⚠️ 将 outer() 的返回值赋给 aa
aa();//1
aa();//2
aa();//3
const bb = outer();// ⚠️ 重新创建了一个执行上下文和新的闭包作用域
bb();//1
bb();//2
// ⚠️ aa 和 bb 分别捕获了不同的作用域