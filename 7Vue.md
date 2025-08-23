# 📗 Vue
---
## Vue 基本介绍
`Vue.js` 是用于构建用户界面的 `JavaScript 框架` | 基于标准 `HTML`、`CSS` 和 `JavaScript` 构建 并提供了一套`声明式的、组件化的`编程模型
- **单文件组件**
  - 使用一种类似 HTML 格式的文件来书写 `Vue 组件` 被称为单文件组件 (`*.vue` 文件 ｜ `Single-File Components` ｜ `SFC`)
  - 将一个组件的逻辑 (`JavaScript`)，模板 (`HTML`) 和样式 (`CSS`) 封装在同一个文件里。计数器示例：
    ```vue
      <!-- 这里是组合式API -->
      <script setup>
        import { ref } from 'vue'
        const count = ref(0)
      </script>
      
      <template>
        <button @click="count++">Count is: {{ count }}</button>
      </template>
      
      <style scoped>
        button {
            font-weight: bold;
        }
      </style>
    ```
---
## 选项式API 和 组合式API 
Vue 的组件可以按两种不同的风格书写：`选项式API (Options API)` 和 `组合式API(Composition API)` 【`API` = `Application Programming Interface`（应用程序接口） ｜ 这里可以理解为 `Vue` 提供的一组用来写组件的“语法接口”或“编程方式”】
- **选项式API** ｜ `Options API` 中的 `this` 指向组件实例，所有 `data` 返回的属性和 `methods` 里的方法都会挂载到 `this` 上
- 【写法特点】通过一系列固定的选项（`data`、`methods`、`computed`、`watch`、`mounted`...）来组织代码
- 【优点】上手简单，逻辑直观，学习成本低 ｜ 适合中小型项目，代码量不大时结构清晰
- 【缺点】同一逻辑分散在不同的选项里（比如一个功能既有 data 又有 methods 又有 watch，要上下翻着看） ｜ 难以在大型项目里复用和组织复杂逻辑
  ```vue
    <script>
    export default {
      // data() 返回的属性将会成为响应式的状态
      // 并且暴露在 `this` 上
      data() {
        return {
          count: 0
        }
      },
    
      // methods 是一些用来更改状态与触发更新的函数
      // 它们可以在模板中作为事件处理器绑定
      methods: {
        increment() {
          this.count++
        }
      },
    
      // 生命周期钩子会在组件生命周期的各个不同阶段被调用
      // 例如这个函数就会在组件挂载完成后被调用
      mounted() {
        console.log(`The initial count is ${this.count}.`)
      }
    }
    </script>
    
    <template>
      <button @click="increment">Count is: {{ count }}</button>
    </template>
  ```
- **组合式API** ｜ Composition API 中则没有 this 概念（尤其在 `<script setup>` 里），直接用变量和函数即可
- 【写法特点】通过 `import { ref, reactive, onMounted, computed, watch } from 'vue'` 这样的函数，把相关逻辑集中写在一起
- 【优点】更灵活，逻辑聚合更好，一个功能的状态和方法可以写在一起 ｜ 方便抽取逻辑（写成 `composable` 复用） ｜ 类型推导更好（对 `TS` 友好）
- 【缺点】没有 `this`，需要习惯 `.value`（`ref` 包裹的值）
  ```vue
    <script setup>
    import { ref, onMounted } from 'vue'
    
    // 响应式状态
    const count = ref(0)
    
    // 用来修改状态、触发更新的函数
    function increment() {
      count.value++
    }
    
    // 生命周期钩子
    onMounted(() => {
      console.log(`The initial count is ${count.value}.`)
    })
    </script>
    
    <template>
      <button @click="increment">Count is: {{ count }}</button>
    </template>
  ```
---
## Vue2 和 Vue3 的响应式原理
响应式原理 = 数据驱动视图的机制。｜ **核心思想**：数据变化 → 触发依赖更新 → 视图更新。｜ 在 `Vue2` 是 `Object.defineProperty`，在 `Vue3` 是 `Proxy`。| 它保证了`单向的数据流（model → view）`
- **Vue2 响应式原理**
- Vue2 的响应式核心是 `Object.defineProperty` + 发布订阅模式
  - Vue 在初始化时 用`Object.defineProperty`拦截对象属性的`getter`/`setter`
  - 每个属性都会被劫持 在访问/修改时触发回调
  - 每个属性都有一个`Dep（依赖管理器）` 里面存放订阅它的`Watcher（观察者）`
  - 当属性被访问时 会把`Watcher`收集起来 属性被修改时 通知`Watcher`修改视图å
  - 【问题与局限性】只能劫持对象已有的属性 无法监听 新增/删除属性
  - 【问题与局限性】初始化时递归遍历对象 数据量大 性能下降
- **Vue3 响应式原理**
- `Vue3` 核心是 `Proxy` + Reflect + 响应式依赖追踪，用全新的 `Reactive` 系统 替代 `Vue2` 的 `defineProperty`
  - `Proxy` 拦截 | 使用 `new Proxy(target, handler)` 一次性拦截对象的 读写、删除、遍历 等操作
  - `Vue3` 用 `effect()` 来注册副作用函数，类似 `Vue2` 的 `Watcher`
  - `track` 用来收集依赖，`trigger` 用来触发更新
  - 【比起vue2的优势】支持属性的新增/删除监听
  - 【比起vue2的优势】性能更好：惰性追踪，按需触发，不需要深度递归
- 【小结】
  - Vue2：defineProperty —— 劫持属性，先全量递归，缺点：新增/删除属性不行，数组不好搞。｜ **劫持属性，补丁式方案**
  - Vue3：Proxy —— 代理对象，按需收集依赖，优点：功能更强大，性能更好，支持数组 & 属性操作。｜ **代理对象，根治式方案**
---
## 双向绑定
双向绑定 = 视图变化也能影响数据。｜ 在响应式系统的基础上，额外加上了**事件监听**。｜ `Vue` 提供 `v-model` 语法糖来简化表单场景的「输入框 → 数据」同步
  ```vue
    <script setup>
      import { ref } from 'vue';
      const text = ref("");
    </script>
    
    <template>
      <input v-model = "text" />
      <p>{{text}}</p>
    </template>
  ```
等价于：
  ```vue
    <input :value="text" @input="text = $event.target.value" />
  ```
- 数据 → 视图：靠**响应式系统**更新。
- 视图 → 数据：靠**事件监听**（input、change 等）
---
## ref reactive
- `ref`:
  - 【适用类型】原始类型 也可包对象
  - 【读写方式】r.value
  - 【替换/修改】常用于整体修改：{r.value = 新值}
- `reactive`:
  - 【适用类型】仅对象/数组/Map/Set
  - 【读写方式】直接点/索引点访问：state.foo
  - 【替换/修改】常用于就地修改：{state.foo = x}
- **ref处理基本类型例子：**
  ```vue
    <script setup>
    import { ref } from 'vue'
    
    const count = ref(0)
    
    function increment() {
      count.value++ // ⚠️
    }
    </script>
    
    <template>
      <button @click="increment">点击次数：{{ count }}</button>
    </template>
  ```
- **reactive处理对象例子：**
  ```vue
    <script setup>
    import { reactive } from 'vue'

    const state = reactive({
      name: '小明',
      age: 20
    })

    function grow() {
      state.age++ // ⚠️
    }
    </script>

    <template>
      <p>{{ state.name }} - {{ state.age }} 岁</p>
      <button @click="grow">长大一岁</button>
    </template>
  ```
- **ref & reactive 处理对象对比：**
  ```vue
    <script setup>
    import { ref, reactive } from 'vue'

    // ref 包裹对象
    const objRef = ref({ a: 1 })

    // reactive 包裹对象
    const objReactive = reactive({ b: 2 })

    function update() {
      // ✅ ref：修改对象需要重新赋值
      objRef.value = { a: objRef.value.a + 1 }

      // ✅ reactive：直接改属性就会更新
      objReactive.b++
    }
    </script>

    <template>
      <p>ref 包裹对象：{{ objRef.a }}</p>
      <p>reactive 对象：{{ objReactive.b }}</p>
      <button @click="update">更新</button>
    </template>
  ```
---
## 父子组件通信
- `Props` **父传子** 父组件数据单向传递 子组件不能直接修改（但可以通过计算属性或拷贝副本修改）
    ```vue
      <!-- 【父组件.vue】-->
      <template>
        <Child :msg="parentMsg" />
        <!-- ⚠️ 子组件用法 :msg传数据 -->
      </template>

      <script setup>
      import Child from './Child.vue' //⚠️引入子组件
      const parentMsg = 'Hello Child!'
      </script>
    ```
    ```vue
      <!-- 【子组件.vue】-->
      const props = defineProps(['parentMsg'])
      // ❌ 直接改 props.parentMsg 不允许
      // ✅ 可以用 ref 副本
      const localParentMsg = ref(props.parentMsg)
    ```
- `emit` **子传父** 子组件用`emit`触发事件，父组件用`@事件名`监听
    ```vue
      <!-- 【父组件 Parent.vue】 -->
      <script setup>
      import Child from './Child.vue' //⚠️引入子组件

      function handleSend(toy) {
        console.log('收到子组件的玩具：', toy)
      }
      </script>

      <template>
        <!-- ⚠️ 子组件用法 @事件名监听 -->
        <Child @send-toy="handleSend" />
      </template>
    ```
    ```vue
      <!-- 【子组件 Child.vue】 -->
      <script setup>
      const emit = defineEmits(['send-toy'])
      function giveToy() { //⚠️ 设置事件
        emit('send-toy', 'Lego')
      }
      </script>

      <template>
        <button @click="giveToy">送玩具</button>
      </template>
    ```
- `v-model` 父子间双向绑定语法糖 ｜ 默认等价于：
`:modelValue="xxx"` `@update:modelValue="(val)=>xxx=val"` ｜ 常用于表单类组件
     ```vue
      <!-- 【父组件 Parent.vue】 -->
      <script setup>
      import ChildInput from './ChildInput.vue' //⚠️ 引入子组件
      import { ref } from 'vue'
      const text = ref('')
      </script>

      <template>
        <!-- ⚠️ 子组件用法 v-model="xxxx" -->
        <ChildInput v-model="text" />
        <p>父组件输入结果：{{ text }}</p>
      </template>
    ```
    ```vue
      <!-- 【子组件 Child.vue】 -->
      <script setup>
      const props = defineProps(['modelValue'])
      const emit = defineEmits(['update:modelValue'])
      </script>

      <template>
        <input
          :value="props.modelValue"
          @input="emit('update:modelValue', $event.target.value)"
        />
      </template>
    ```
- 兄弟组件不能直接通信，需要中转：
  - 方式 1：通过父组件（`props`+`emit`）中转
  - 方式 2：事件总线（`mitt`）
  - 方式 3：状态管理（`Pinia`/`Vuex`）
  - `mitt`的例子：
    ```ts
      //【 utils/emitter.ts 】
      // ⚠️ mitt 是构造函数
      // ⚠️ emitter 是通过 mitt() 创建出来的事件总线对象
      import mitt from 'mitt'
      const emitter = mitt()
      export default emitter
    ```
    ```vue
      <!-- 【 兄弟1 BrotherA.vue 】 -->
      <script setup>
      import emitter from '@/utils/emitter'
      function sendToy() {
        emitter.emit('toy', '变形金刚')
      }
      </script>
      <template><button @click="sendToy">发玩具</button></template>
    ```
    ```vue
      <!-- 【 兄弟2 BrotherB.vue 】 -->
      <script setup>
      import emitter from '@/utils/emitter'
      emitter.on('toy', toy => {
        console.log('兄弟2收到了：', toy)
      })
      </script>
    ```
- `Provide / Inject` **跨层级传递(父传孙等)** 父级 provide 数据；后代组件 inject 直接拿，不需要层层传递
---