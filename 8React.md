# 📘 React
---
## React核心概念概述
1. **React** 
    是一个用于构建用户页面的`JavaScript库`（尤其是单页面应用）
2. **核心特性**
    `组件化`：拆分为重复可复用的组件 每个组件管理自己的状态
    `JSX`：`js`的语法拓展 允许在`js`中写`html`结构
    `虚拟DOM`：在内存中维护一个虚拟DOM树 通过`diff算法`最小化真实DOM操作
    `单向数据流`：数据从父组件流向子组件 保持可预测性
    `Hooks`：让函数组件拥有`状态`和`生命周期`
3. **组件类型**
    `函数组件`：通过函数定义 无状态（可以通过`Hooks`实现状态）
    `类组件`：通过ES6定义 有状态和生命周期方法
4. **函数组件的Hooks**
    `useState`：管理状态
    `useEffect`：处理副作用
    `useContext`：处理上下文
    `useReducer`：复杂状态逻辑管理
    自定义Hooks
5. **类组件的生命周期**
    `挂载阶段` construct render componentDidMount
    `更新阶段` shouldComponentUpdate render componentDidUpdate
    `卸载阶段` componentWillUnmount
---
## JSX 是什么
`JSX` 是语法糖 最终会被Babel 编译成对 `React.createElement` 的调用 类似：`React.createElement('div', { className: 'foo' }, 'Hello')`
1. `React.createElement` 的本质
   - 创建一个 React Element，也就是虚拟 DOM 的基础单位
   - 返回的对象非常轻量，一般包含这些字段：
    ```js
      {
        type: 'div' | Component,  // 标签名或组件函数/类
        props: {                  // 属性对象，包括 children
          className: 'foo',
          children: [...]
        },
        key: 'uniqueKey' | null,  // 用于列表 diff 的标识
        ref: null | refObject     // 引用
      }
    ```
2. **`React Element` vs `DOM Element`**
   - `React Element` 不是 `DOM 元素`，它只是一个普通对象，描述了要渲染的界面
   - React 会把这个`对象树（虚拟 DOM）`与`真实 DOM `做 `diff`，然后最小化地更新真实 DOM
   - 所以 `React Element` 本身是不可变的，每次状态更新都会生成新的 `React Element`
3. **`Diff` 和更新**
   - `React` 使用 `Fiber` 架构来管理更新
   - `React Element 树`是 `Fiber` 的输入
   - `Diff 算法`通过比较新旧 React Element 树，决定最小量的 DOM 操作
4. **补充点**
   - 轻量对象：React Element 比真实 DOM 对象轻很多，不包含事件绑定、父子指针等
   - 不可变性：每次渲染生成新的 React Element，不会修改旧对象
   - key 与列表：key 是 React diff 的核心标识，用于优化列表渲染
   - 函数/类组件：如果 type 是函数或类，React 会调用它生成子元素，递归构建虚拟 DOM 树
---