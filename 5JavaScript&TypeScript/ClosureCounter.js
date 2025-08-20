function counter(){
    let count = 0;//计数器
    return{
        increment: function(){
            count++;
            return count;
        },
        decrement: function(){
            count--;
            return count;
        },
        getCount: function(){
            return count;
        },
    };
};

const aa = counter();
console.log(aa.increment());//1
console.log(aa.increment());//2
console.log(aa.decrement());//1
console.log(aa.getCount());//1
const bb = counter();
console.log(bb.getCount());//0
console.log(bb.increment());//1