# 🌏 Web浏览器相关
---
## 跨域与同源策略
1. `跨域`：一个网页向另一个域（ 不同 `协议` || `域名` || `端口号` ）发起请求的行为
2. `跨域请求`通常发生在：
- 使用 `AJAX` 或 `Fetch API` 请求其他域的数据
- 在网页中嵌套跨域资源（图片 脚本 iframe等）
3. `同源策略(Same-Origin Policy)` ：浏览器的一种安全机制，用于防止不同来源的网页间互相访问数据 保护用户隐私和数据安全
4. 同源的定义：两个网页的 `协议|如http` `域名|如example.com` `端口号|如80` 完全相同 则被认为是同源
5. 同源策略会限制以下行为：
   - `DOM访问`：跨域的`iframe`和主页互相无法访问DOM（但是不阻止页面的加载 这是正常行为 `iframe`可以渲染） 
   - `Cookie` 和 `Storage`：跨域页面无法访问彼此的`Cookie` `LocalStorage` `SessionStorage`
   - `AJAX请求`：跨域的AJAX请求会被浏览器阻止 除非目标浏览器设置了`允许跨域的CORS头`
---
## 如何解决跨域问题
- 1 `CORS（跨域资源共享）`：服务器在响应头中设置 Access-Control-Allow-Origin，允许指定的域名访问资源（ HTTP协议的响应头 `应用层` `Access-Control-Allow-Origin: https://www.example.com` ）
- 2 `JSONP（JSON with Padding）`：通过` <script> `标签加载跨域的` JSON `数据 | 缺点：只支持 GET 请求 安全性较低 容易被恶意代码利用
    ```html
      <!-- `<script>`可以加载跨域的JS文件 而不会触发同源策略 -->
      <!-- `JSONP` 利用了这一点 -->
      <script src="https://api.example.com/data?callback=myCallback"></script>
      <script>
          function myCallback(data) {
              console.log('收到数据:', data);
          }
      </script>
    ```
 - 3 `代理服务器`：通过浏览器与`同源的服务器`通信，而由服务器代替浏览器与目标跨域服务器进行数据交互: 因为浏览器的同源策略`只限制前端的跨域请求`，而`服务器之间的通信`不受同源策略的限制
 - 4 `postMessage`：postMessage 是一种浏览器提供的 API，用于在不同来源的页面之间安全地传递消息
    ```js
      // 主页给 iframe 发消息
      const iframe = document.getElementById('myIframe');
      iframe.contentWindow.postMessage('Hello iframe!', 'https://www.example.com');
      // iframe 接收消息
      window.addEventListener('message', (event) => {
        if (event.origin === 'https://your-domain.com') {
        console.log('收到主页面的消息:', event.data);
        }
      });
    ```
- 主页面可以通过给`iframe`的`src`添加`查询参数` 传递参数给`iframe`
    ```js
      <iframe src="https://www.example.com?data=hello"></iframe>
    ```
- 跨域与同源策略的作用:
   - 保护用户隐私： 防止恶意网站窃取用户数据。
   - 防止跨站脚本攻击（XSS）： 阻止恶意脚本操作其他域的数据。
   - 确保数据安全： 限制未经授权的跨域访问
---
## 跨站脚本攻击（XSS）
跨站脚本攻击 `XSS，Cross-Site Scripting` | 是一种特定场景下的`代码注入攻击`，发生在`浏览器端`，攻击者通过在网页注入恶意脚本（通常是`JavaScript`）来盗取数据、劫持会话、篡改页面等
- XSS 的危害:
  - 窃取用户的 Cookie、LocalStorage 等敏感信息
  - 劫持用户会话，冒充用户身份
  - 注入恶意代码，传播病毒或木马
  - 重定向用户到钓鱼网站
- 如何防御 XSS: 
  - 输入验证：严格验证用户的输入内容 确认不含恶意代码
  - 输出编码：对动态生成的 HTML 内容进行转义，防止脚本执行 例：将`<`转义为`&lt`
  - 使用 `CSP（内容安全策略）`：通过设置 HTTP 响应头，限制页面加载的资源 例：`Content-Security-Policy: default-src 'self'; script-src 'self'`
  - 避免直接执行用户输入：不使用 `eval()`、`innerHTML` 等危险方法
    - `eval()` :  `JavaScript` 中的一个内置函数 用于将字符串作为代码执行 主要功能是动态解析和执行代码
      ```js
        const code = "console.log('Hello, World!')";
        eval(code); // 输出 "Hello, World!"
      ```
    - `innerHTML` 是 DOM 元素的一个属性，用于设置或获取元素的 HTML 内容
      ```js
        const div = document.getElementById('example');
        div.innerHTML = '<p>Hello, World!</p>';
      ```
---
## CSP（内容安全策略）
`CSP`（`Content Security Policy`，内容安全策略） 是一种 Web 安全机制，用于防止`跨站脚本攻击（XSS）`及`浏览器端的恶意内容注入`
- 通过限制网页可以加载的资源类型、来源以及执行的脚本，来提高 Web 应用的安全性: CSP 可以控制：`脚本（script-src）``样式（style-src）``图片（img-src）``字体（font-src）``媒体（media-src）``连接（connect-src）``iframe 对象``表单提交`等
- 通过 `HTTP` 响应头（`Content-Security-Policy`）或 `HTML 元标签（<meta>）`来配置 (`HTTP 响应头`优先于 `<meta> 标签`)
---
## 对浏览器内核的理解
