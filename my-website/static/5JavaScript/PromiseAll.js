// ⚠️【 手写 Promise.all 】
// 核心逻辑：
// 输入一组 Promise（或普通值）
// 并行执行，收集结果
// ❕ 只有全部成功才 resolve
// ❕ 有一个失败就 reject
function myPromiseAll(promises){
    return new Promise((resolve, reject)=>{
        if(!Array.isArray(promises)){
            return reject(new TypeError("Arguement must be an array!"));
        }
        if(promises.length === 0){return resolve([])}; // ⚠️ 输入空数组是resolve

        const result = [];
        let completed = 0;

        promises.forEach((p, index)=>{
            Promise.resolve(p).then( // ⚠️ 保证即使p不是promise也可以处理
                value => {
                    result[index] = value; // ⚠️ 应该存储 resolved 的值
                    completed++;
                    if (completed===promises.length){
                        resolve(result);
                    }
                },
                reason => {
                    reject(reason); // ⚠️ 只要有一个失败 立刻reject
                }
            )
        })
    })
}
//【 测试 】
const p1 = Promise.resolve(1);
const p2 = new Promise(res=>setTimeout(()=>res(2), 500));
const p3 = 3;
myPromiseAll([p1, p2, p3])
    .then(res=>console.log('成功', res))
    .catch(err=>console.log('失败',err)); // ❗️ 成功 [ 1, 2, 3 ]

const p4 = Promise.resolve("ok");
const p5 = Promise.reject("我出错了😭"); // ⚠️ 有一个失败
const p6 = new Promise(res => setTimeout(() => res("late"), 500));
myPromiseAll([p4, p5, p6])
    .then(res=>console.log('成功', res))
    .catch(err=>console.log('失败',err)); // ❗️ 失败 我出错了😭