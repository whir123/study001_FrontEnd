---
id: 8
title: 8-React
---

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
## React 的 Hooks
`React` 的 `Hooks` 是 `React 16.8` 引入的一种新特性，它允许在`函数组件`中使用**状态和生命周期**相关的功能，而无需编写`类组件` | 常见的 `Hooks`:
- 1-**`useState`** | 用于在函数组件中声明状态变量
- 接收初始状态作为参数，返回一个数组，包含当前状态和更新状态的函数
- 状态更新后，组件会重新渲染
- 状态是独立的，每次渲染都有自己的状态值
    ```jsx
      import React, { useState } from 'react';

      function Counter() {
        const [count, setCount] = useState(0); // ⚠️ 初始化状态为0

        return (
            <div>
                <p>当前计数：{count}</p>
                <button onClick={() => setCount(count+1)}> 增加 </button>
            </div>
        );
      }
    ```
- 2-**`useEffect`** | 副作用 Hook，用于在组件中执行副作用（如数据获取、订阅、手动 `DOM` 操作等）
- 默认在组件首次渲染和每次更新后执行
- 第二个参数是依赖数组 只有依赖项发生变化时才会重新执行
- 如果依赖数组为空（`[]`），`useEffect` 只会在组件挂载和卸载时执行
- 可以通过返回一个函数来清理副作用（比如取消订阅、清除定时器等）
    ```jsx
      import React, { useState, useEffect } from 'react';

      function Example() {
        const [count, setCount] = useState(0);

        useEffect(()=>{
            // 每次 count 更新时执行
            console.log(`Count is: ${count}`);
            document.title = `Count: ${count}`;
            // 返回项为一个清理函数
            return () => {
                console.log('清理副作用'); // ⚠️ 这里示意 没有真的清理
            };
        }, [count]); // ⚠️ 依赖项为 count

        return (
            <div>
                <p>当前计数：{count}</p>
                <button onClick={() => setCount(count+1)}> 增加 </button>
            </div>
        );
      }
      // 初次渲染时，useEffect 会执行一次
      // ❗每次 count 更新时，useEffect 会先执行上一次的清理函数 再重新执行
      // 组件卸载时，调用 useEffect 的清理函数
    ///////////////////////【 清理事件监听器例子 】/////////////////////////
      useEffect(()=>{
        const hanldeResize = () => {
            console.log('窗口大小改变');
        }
        window.addEventListener('resize', handleResize);
        return ()=>{
            // 清理事件监听器
            window.removeEventListener('resize', handleResize);
        };
      }, []);
      // ❗挂载时： useEffect 的回调函数会执行一次
      // 依赖项变化时： 如果依赖数组非空，且依赖项发生变化，useEffect 会重新执行
      // ❗卸载时： React 会调用 useEffect 返回的清理函数，清理副作用
    ```
- 3-**`useContext`** | 用于在组件中订阅上下文 （`Context`）
- `useContext` 接收一个 `Context` 对象，返回当前上下文的值
- 当上下文的值发生变化时，订阅该上下文的组件会重新渲染
- 避免通过组件树逐层传递 `props`
    ```jsx
      import React, { useContext } from 'react';

      // ⚠️ 通过 React.createContext 创建了一个【 上下文对象 ThemeContext 】
      // createContext 接收一个参数 'light'，表示该上下文的默认值
      // 如果组件树中没有 ThemeContext.Provider，消费者（useContext）会使用这个默认值
      const ThemeContext = React.createContext('light');

      // 定义消费者组件
      function ThemedButton(){
        // useContext(ThemeContext) 订阅了 ThemeContext 上下文
        // ⚠️ theme 的值会根据最近的 【 ThemeContext.Provider 】 的 value 决定 | 如果没有 Provider，theme 的值为 'light'
        const theme = useContext(ThemeContext); // ⚠️ 获取上下文值
        return <button style={{ background: theme==='dark' ? '#333' : '#fff' }}> 主题按钮 </button>;
      }

      function App(){
        return (
            {/* 【 ThemeContext.Provider 】是上下文的提供者，负责将上下文的值传递给子组件 */}
            {/* 目前没有切换功能 可以结合【 const [theme, setTheme] = useState('light') 】*/}
            <ThemeContext.Provider value="dark">
                <ThemedButton />
            </ThemeContext.Provider>
        );
      }
      //❗App 渲染时，ThemeContext.Provider 包裹了 ThemedButton，并提供了 value="dark"
      // ThemedButton 调用 useContext(ThemeContext)，获取到 theme="dark"
      // 如果 ThemeContext.Provider 的 value 改变，React 会触发重新渲染：
      // useContext(ThemeContext) 会返回新的上下文值 'light' ThemedButton 重新渲染
      // 如果 App 中没有 ThemeContext.Provider，那么 ThemedButton 会使用 ThemeContext 的默认值
    ```
- 4-**`useRef`** | 用于访问 DOM 元素或存储可变值
- `useRef` 返回一个可变的 `ref` 对象 | `ref` 对象的 `.current` 属性可以存储一个值
- `useRef` 的值在组件的整个生命周期内保持不变 | 更新 `useRef` 的 `.current` 属性不会触发组件重新渲染
    ```jsx
      import React, { useRef } from 'react';

      function FocusInput(){
        const inputRef = useRef(null); // 创建了一个ref对象 初始值为null 还没绑定DOM元素

        const focusInput = () => {
            inputRef.current.focus(); // ⚠️ 访问 DOM 元素
        };

        return (
            <div>
                <input ref={inputRef} type="text" />
                {/* 将 inputRef 绑定到 <input> 元素 */}
                {/* 渲染完成后，React 会将 <input> 的 DOM 元素赋值给 inputRef.current */}
                {/* ⚠️ 在组件挂载后，inputRef.current 的值变成了对应的 <input> DOM 元素 */}
                <button onClick={focusInput}> 聚焦搜索框 </button>
            </div>
        );
      }
    ```
- 5-**`useMemo`** | 用于缓存计算结果 避免不必要计算
- 只有依赖项发生变化时 `useMemo`才会重新计算
- 适合 性能优化 避免重复计算
    ```jsx
      import React, { useState, useMemo } from 'react';

      function ExpensiveCalculation({ num }){
        const result = useMemo(()=>{
            // ⚠️ 组件首次渲染时，useMemo 会执行传入的函数
            // 计算结果会被缓存，并返回给 result | 依赖项 [num] 会被记录下来，供后续比较
            console.log('计算中…');
            return num ** 2; // 用平方模拟大开销计算
        }, [num]);

        return <p>结果：{result}</p>
      }

      function App() {
        const [num, setNum] = setState(1);

        return (
            <div>
                <button onClick={() => setNum(num + 1)}> 增加 </button>
                <ExpensiveCalculation num={num} />
            </div>
        );
      }
      export default App;
    ```
---
## 函数组件的生命周期
函数组件本身没有类组件的生命周期方法 | 但可以通过 useEffect 和其他 Hooks 模拟生命周期
| |类组件生命周期方法	|函数组件中的实现方式 |
|---|---|---|
|组件挂载完成后 (第一次渲染后)        |`componentDidMount`	      |`useEffect(() => {}, [])`                  |
|依赖项变化后(组件更新后)             |`componentDidUpdate`	      |`useEffect(() => {}, [deps])`              |
|组件卸载前 (适合清理副作用)          |`componentWillUnmount`	  |`useEffect(() => { return () => {}; }, [])`|
|组件重新渲染前，决定是否重新渲染组件   |`shouldComponentUpdate`	|`React.memo` 或 `useMemo`                  |
|在 props 变化时更新 state          |`getDerivedStateFromProps`	|`useEffect` 或 `useState`                  |
---
## React 的条件渲染和列表渲染
`React` 使用 `JavaScript` 表达式和 `JSX` 语法来实现这些功能
- 🔷 **条件渲染**是根据某个条件表达式的结果，动态地决定是否渲染某些组件或元素
- 在 React 中，条件渲染通常通过以下方式实现：
  - 使用 `if-else` 语句
  - 使用三元运算符
  - 使用逻辑与 (`&&`) 运算符
  - 使用函数返回 JSX
  ```jsx
    function Greeting(props) {
      const isLoggedIn = props.isLoggedIn;

      if (isLoggedIn) {
        return <h1>Welcome back!</h1>;
      } else {
        return <h1>Please sign in.</h1>;
      }
    }

    // 使用组件
    <Greeting isLoggedIn={true} />
  ```

  ```jsx
    // ⚠️ 使用三元运算符
    function Greeting(props) {
      return (
        <h1>
          {props.isLoggedIn ? 'Welcome back!' : 'Please sign in.'}
        </h1>
      );
    }

    // 使用组件
    <Greeting isLoggedIn={false} />
  ```

  ```jsx
    // ⚠️ 使用 && 
    function Notification(props) {
      return (
        <div>
          {props.hasNewMessages && <p>You have new messages!</p>}
        </div>
      );
    }

    // 使用组件
    <Notification hasNewMessages={true} />
  ```

  ```jsx
    // ⚠️ 使用函数返回 JSX
    function renderMessage(isLoggedIn) {
      if (isLoggedIn) {
        return <h1>Welcome back!</h1>;
      } else {
        return <h1>Please sign in.</h1>;
      }
    }

    function App() {
      const isLoggedIn = true;
      return <div>{renderMessage(isLoggedIn)}</div>;
    }
  ```
- 🔷 **列表渲染**是根据数组中的数据，动态生成一组组件或元素
- React 使用 `JavaScript` 的 `map()` 方法来实现列表渲染。
  ```jsx
    const items = ['Apple', 'Banana', 'Cherry'];

    function ItemList() {
      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
  }
  // items.map()：遍历数组，为每个元素生成一个 <li>
  // key属性：React 要求列表中的每个子元素必须有一个唯一的 key，以便高效更新 DOM
  ```
- 注意事项
 - `key` 是 React 用于识别列表中每个元素的唯一标识 | `key` 应该是稳定且唯一的（如 ID）
 - React 的状态是不可变的，修改数组时应返回一个新的数组
  ```jsx
    const [items, setItems] = useState(['Apple', 'Banana']);
    setItems([...items, 'Cherry']);
  ```
 - 如果列表中包含嵌套数据，可以使用递归渲染
- 条件渲染与列表渲染结合例子：
  ```jsx
    const items = [
      { id: 1, name: 'Apple', visible: true },
      { id: 2, name: 'Banana', visible: false },
      { id: 3, name: 'Cherry', visible: true }
    ];

    function ItemList() {
      return (
        <ul>
          {items.map(item => (
            item.visible && <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      );
    }
  ```
---