//JavaScript 类中，你可以通过各种方式控制属性的可读写性、可枚举性等特性
//一、使用getter和setter
class Person {
    constructor(name){
        this._name = name;//使用一个不同的内部属性名来存储值 防止无限递归
    }
    get name(){
        return this._name;
    }
    set name(newName){//有条件的写入
        if(typeof newName === 'string' && newName.length > 0){
            this._name = newName;
        }else{console.error('Invalid name');}
    }
};
const p = new Person("lzk");
console.log(p.name);
p.name = "bob";//√
p.name = '';//Invalid name

//二、使用 Object.defineProperty 精细控制
console.log("________________________________________")
class Product {
    constructor(id,price){
        this._id = id;
        this._price = price;
        //定义【不可遍历】【不可写】的price属性
        Object.defineProperty(this, 'price', {
            enumerable: false,
            // writable: false, // 数据描述符 //不可以和get一起用
            // value: price,    // 数据描述符 //不可以和get一起用
            get(){//依然可以写 getter setter //访问器描述符
                return this._price;
            }
        });
        //定义【可配置】但【不可写】的id属性
        Object.defineProperty(this, 'id', {
            enumerable: true, //【可枚举？可遍历？】（是否会在 for...in 循环或 Object.keys() 中出现）
            configurable: false, // 控制属性是否可被删除或修改其特性
            writable: false, // 控制属性是否可被修改
            value: id,
        });
    };
};
const prod = new Product('p123', 99);
console.log(prod.id);
console.log(prod.price);

//三、使用 Object.defineProperties 【批量定义】
console.log("________________________________________")
class Account {
    constructor(balance){
        this._balance = balance;
        Object.defineProperties(this,{
            balance: {
                get(){return this._balance},
                set(val){
                    if(val>=0){this._balance = val;}
                },
                enumerable: true,
            },
            accountNumber: {
                //随机数——》字符串——》去掉前两位 生成随机ID或标识符
                value: Math.random().toString().slice(2),
                writable: false,
                enumerable: true,
            }
        })
    }
};

//四、使用Proxy方法实现高级控制
// new Proxy(obj, {
//   get(target, prop) { /*...*/ },
//   set(target, prop, value) { /*...*/ }
// })
// target：表示被代理的原始对象
// prop：表示被访问/设置的属性名（property 的缩写）
// value：表示要设置的新值
class ProtectedData {
    constructor(secret){
        //返回一个代理对象而不是this
        return new Proxy(this, {
            get(target, prop){//禁止访问以_开头的"私有属性"
                if (prop.startsWith('_')) {
                    throw new Error('Access denied to private fields');
                }
                return target[prop];//正常返回
            },
            set(target, prop, value){
                if (prop === 'id'){//不准修改id属性
                    throw new Error('ID cannot be changed');
                };
                target[prop] = value;
                return true;
            }
        });
    }
};
const data = new ProtectedData('confidential');
// console.log(data.secret); // Error: Access denied
// data.id = 'new'; //Error: ID cannot be changed
const data1 = new ProtectedData('secret');
data1.name = 'Alice';
console.log(data1.name); // Alice