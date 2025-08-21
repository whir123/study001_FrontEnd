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
React.createElement（）
核心思想： React.createElement() 是 React 用来创建虚拟 DOM 元素（React Element） 的底层 JavaScript 函数。JSX 只是一种语法糖，最终都会被编译工具（如 Babel）转换为 React.createElement() 调用

这个对象非常轻量，它包含了组件的类型、属性和子元素等信息。React 使用这些对象来构建虚拟 DOM 树，并通过上述的 Diff 算法来协调和更新界面。 