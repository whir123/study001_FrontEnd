# 📑 HTML
---
## Attribute 和 Property
* `Attribute（HTML属性）`：写在HTML标签中的内容 表示元素的初始状态； 静态的 描述HTML元素默认行为：
    ```html
      <input type="text" value="hello" id="myInput">
      <!-- type value id都是属性（Attribute） -->
    ```
* `Property（DOM属性）`：HTML元素在JavaScript中的表现形式； 动态的 元素的实时状态 通过JS读取或修改：   
    ```js
      const input = document.getElementById("myInput");
      console.log(input.value); // 通过 Property 获取当前值
    ```
* 例子：
    ```html
      <input type="text" value="hello" id="myInput">
    ```
    ```js
      const input = document.getElementById("myInput");
      console.log(input.getAttribute("value")); // hello
      input.value = "world"; // 输入框也变
      console.log(input.value); // world
      console.log(input.getAttribute("value")); // 仍然hello
    ```
* `初始同步`：HTML加载时 Attribute 的值会初始化 Property 的值
* `不同步`：修改 Property 的值不会影响 Attribute 的值；修改Attribute的值不会更新Property的值
* `可以手动更新`：
    ```js
      const input = document.getElementById("myInput");
      input.setAttribute("value",input.value); // 同步 Property 到 Attribute
    ```
* 修改 `Property` 时 直接操作了`DOM对象`的实时状态 并非和`Attribute`同步（如例子中：更新了输入框中显示的值）
---
## HTML 和 XHTML
* `HyperText Markup Language` 和 `Extension HyperText Markup Language`
* 前者：基于SGML（Standard Generalized Markup Language）的标记语言 用于定义网页中的内容和结构 语法相对宽松 容错性高
* HTML页面：通常使用 text/html 作为MIME类型
* 后者：基于XML（Extension Markup
 Language）的标记语言 遵循XML的严格语法规则 XHTML是HTML的4.01严格升级版
* XHTML页面：应使用 application/xhtml+xml 作为MIME类型 如果使用text/html 浏览器会以HTML的方式解析
* 所有浏览器都支持HTML；现代浏览器支持XHTML 但通常以HTML的方式解析XHTML页面 除非MIME类型设置为 application/xhtml+xml 

* SGML（Standard Generalized Markup Language）一种用于定义标记语言的国际标准（ISO 8879），是 HTML 和 XML 的祖先
* HTML 和 XML 都是 SGML 的简化和衍生版本，分别用于网页开发和数据结构化
* MIME 类型是一种用于描述互联网中传输的数据类型的标准。它最初是为电子邮件设计的，但现在广泛用于 HTTP 和其他协议中：`text/html 表示 HTML 文档` `image/png 表示 PNG 图像` `application/json 表示 JSON 数据`
---
## HTML 语义化
总结为：`根据内容选择标签 用最恰当的标签来标记内容`
---
## iframe 与 frame 的区别
二者都是用于在页面中`嵌套其他网页的HTML元素`
* `iframe` 一种内联框架 在HTML4中被引入 一个独立的HTML元素 可以直接嵌套在HTML文档任何地方
* `frame` 一种框架元素 用于将网页分成多个独立的区域 每个区域可以加载不同的网页 在HTML5中废弃 通过 `<frameset>` 元素实现的 早期HTML的布局方式 
* `iframe` 嵌套内容可能不会被搜索引擎索引 但对主页面SEO影响较少 支持现代可访问性标准（如ARIA标签）
* `frame` 对SEO有严重影响 搜索引擎可能无法正确索引框架中的内容 不支持现代可访问性标准 用户体验较差
iframe 是一种嵌套网页的机制，它允许在一个网页中加载另一个网页（甚至是跨域的网页）。然而，iframe 的跨域行为受到浏览器的严格限制，主要是为了保障安全性