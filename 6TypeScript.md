# 📨 TypeScript
---
## JavaScript 和 TypeScript
`TS 是 JS 的超集`：TS在JS的基础上加入了静态类型系统+其他高级特性：
- 静态类型检查
- 类、接口、泛型等面向对象特性
- ES6+ 特性支持
- 更好的工具支持（代码补全、重构等）

TS的接口：
```ts
  // TS 中的正式接口
  interface Person {
    name: string;
    age: number;
    greet(): void;
  }
```

JS没有抽象类：
```ts
  abstract class Animal {
    abstract makeSound(): void;
    move(): void {
      console.log("Moving...");
    }
  }

  class Dog extends Animal {
    makeSound(): void {
      console.log("Bark!");
    }
  }
```

TS的泛型：
```ts
  function identity<T>(arg: T): T {
    return arg;
  }
```

`T`是一个类型变量（Type Variable） 它会在函数调用时被具体类型替换 它保持类型一致性 不是任意类型
- `T` 保持类型约束、能推断出入参和返回值的关联
- `any` 完全放弃类型检查、失去所有类型信息
---
## 弱类型 & 强类型语言 / 动态类型 & 静态类型语言
- `弱类型语言`：变量的类型可以在运行时可以自动转换 允许隐式类型转换 操作不同类型的数据时 语言自动尝试转换
- `强类型语言`：不允许隐式类型转换 操作不同类型的数据需显式转换
- `动态类型语言`：类型在运行时才确定 变量类型可随时改变
- `静态类型语言`：类型在编译时确定 变量类型不可改变

`Python`：强类型+动态类型
```python
  x = 10      # x 是整数（动态类型允许赋值）
  x = "hello" # x 变为字符串（动态类型的特性）
  # 但 x + 10 会报错（强类型的特性）
```
`JS`：弱类型+动态类型  
`TS`：强类型+静态类型

---