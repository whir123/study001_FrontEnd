---
id: 4
title: CSS
---

# 🎨 CSS
---
## CSS 盒子模型
所有的`HTML元素`都可以看作是一个盒子:   
`box model` = `margin`+`border`+`padding`+`content`
```
------------------------------------------
|                 margin                 |  
| -------------------------------------- |
| |               border               | |
| | ---------------------------------- | |
| | |             padding            | | |
| | | ------------------------------ | | |
| | | |           content          | | | |
| | | |                            | | | |
| | | |                            | | | |
| | | ------------------------------ | | |
| | ---------------------------------- | |
|  ------------------------------------- |
------------------------------------------
```
- **box-sizing 属性的取值**
- **`content-box`**：
  - 这是 `标准盒子模型` 的表现形式
  - `width` 和 `height` 属性只包含`内容区域（content）`的宽度和高度
  - `padding` 和 `border` 会添加到内容区域之外 额外增加元素的尺寸
- **`border-box`**：
  - 这是`IE盒子模型`的表现形式
  - `width` 和 `height` 属性包含`内容区域`、`内边距（padding）`和`边框（border）`
  - 没有`外边距（margin）`
  - 元素的内容区域会根据 `padding` 和 `border` 的大小进行缩减 以保持元素的总宽度和高度不变
---
## CSS 引入方式
- **内联方式**
  ```html
    <div style="color: red"></div>
  ```
  - 不需要额外的`HTTP请求`
  - 有更高的优先级 覆盖外部样式
  - 但 页面维护会非常棘手
- **嵌入方式**
  ```html
    <style type="text/css">
        div {
            color: blue,
        }
    </style>
  ```
  - 一般放在 `<head>` 标签内
  - `CSS`与`HTML`一起作为一个文件 不需要额外的`HTTP请求`
  - 但 嵌入样式不能被浏览器缓存并用于其他界面
- **链接方式**
  ```html
    <link rel="stylesheet" href="xxxxx.css">
  ```
  - 通过替换`CSS`文件实现主题更换
  - `CSS`在第一次访问时就被浏览器缓存 多个页面请求的网站速度有所提高
  - 但 每个链接的`CSS`文件都需要一个附加的`HTTP请求`
- **导入方式**
  ```html
    <style>
        @import url("xxxxx.css");
    </style>
  ```
  - 通过 `@import` 语句在`内联 <style> 标签`中导入`外部 CSS 文件`的方式
  - 链接`<link>`属于HTML提供的标签 |  `@import`属于`CSS`语句 ( `CSS2.1`才出现的概念 )
  - 当`HTML`文件被加载时，`<link>`引用的文件会同时被加载，而`@import`引用的文件则会等页面全部下载完毕再被加载 (有时候浏览`@import`加载`CSS`的页面时会没有样式 也就是闪烁现象 网速慢的时候比较明显)
  - 但 每次 `@import` 都会产生一次额外的 `HTTP 请求` | `<link>` 不会有这种问题 它是直接加载的
- 【补充】`HTML`链接的`CSS` `JS`都在哪？
  ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <!-- 引入外部 CSS 文件 -->
        <link rel="stylesheet" href="styles.css">
        <!-- 1 脚本放在<head>中：引入外部 JS 文件 -->
        <script src="script.js" defer></script>
    </head>
    <body>
        <h1>这是一个标题</h1>
        <!-- 2 脚本放在<body>末尾：引入外部 JS 文件 -->
        <script src="script.js"></script>
    </body>
    </html>
  ```
  - `CSS` `<head>` | 确保页面加载前 样式已经被浏览器解析并应用到`HTML`元素上
  - `JS` `<head>` | 脚本需要在页面内容加载前执行（如 初始化某些全局变量）
  - `JS` `<body>` 末尾 | 最常见 确保 `HTML` 内容先加载 再执行 `JavaScript`
  - `CSS`文件的`<link>`属性 | `rel` 表示链接的关系，rel="stylesheet" 表示加载外部样式表 | `href`	指定样式表文件的路径
  - `JS`文件的`<script>`属性 | `src` 指定 JavaScript 文件的路径 | `defer` 脚本会延迟执行 直到 HTML 文档完全解析后再运行 保证顺序执行 | `async` 脚本会异步加载并执行 加载顺序不一定与 HTML 顺序一致（可能无序）
---
## 选择器 & 优先级
1. 内联选择器 ｜ 1000 ｜ 
2. id选择器 ｜ 100 ｜ `#id`
3. 类选择器 ｜ 10 ｜ `.class`
4. 属性选择器 ｜ 10 ｜ `a[ref="link"]`
5. 伪类选择器 ｜ 10 ｜ `li:last-child`
6. 标签选择器 ｜ 1 ｜ `div`
* ————
7. 兄弟选择器 ｜ 0 ｜ `div+p`
8. 子选择器 ｜ 0 ｜ `ul>li`
9. 后代选择器 ｜ 0 ｜ `li a`
* ————
10.  通配符 ｜ 0 ｜ `*`
---
## 长度单位
- **绝对单位**：不随环境改变 固定不变
  - `px` ｜ 受屏幕dpi影响
  - `cm/mm/in` ｜ 
  - `pt` ｜ 点 ｜ 1pt = 1/72in = 1.333px
  - `pc` ｜ 派卡 ｜ 1pc = 12pt
- **相对单位**：根据父元素、根元素或视口大小计算的，更灵活，响应式开发常用
  - `em` ｜ 相对于父元素字体大小 ｜ 1em = 当前元素继承到的 font-size
  - `rem` ｜ 相对于根元素字体大小 ｜ 一般 16px
  - `ex` ｜ 相对于字体x高度（小写x）
  - `ch` ｜ 相对于字体0宽度
  - `vw/vh` ｜ 视口宽度/高度百分比
  - `vmin/vmax` ｜ vw vh 的较小值/较大值 ｜ 自适应缩放
  - `%` ｜ 相对于父元素的
  - `lh` ｜ 相对于父元素的 line-height
  - `rlh` ｜ 相对于根元素的 line-height
---
## CSS 隐藏元素方法
1. **`display: none`**
- 被隐藏的元素不占据任何空间 产生的效果像元素完全不存在
- 用户交互事件无法生效（点击事件等）
- 但在DOM中可以访问到这个元素 也可以通过DOM操作它
1. **`visibility: hidden`**
- 元素会隐藏 但也会占据着自己的位置 并对网页的布局起作用
- 用户交互事件无法生效（点击事件等）在读屏软件中会隐藏
- 如果对于子元素：visibility: visible 子元素依旧可以显示而父元素会被隐藏
1. **`opacity: 0`**
- 可见度设置0 完全透明
- 只能从视角效果上隐藏元素 本身依然占据位置并对网页的布局起作用
- 可以响应用户交互（点击事件等）
- 添加过度属性可以显示动画效果
1. **`overflow: hidden + position/height`**
- 把元素移出视觉区域 超出显示的部分隐藏掉
---
## display
`display`属性可以设置元素的内部和外部显示类型 | 元素的外部显示类型将决定该元素在流式布局中的表现 (例如块级或内联元素) | 元素的内部显示类型可以控制其子元素的布局 (例如grid或flex)
- **外部显示：**
- `display:none` --
- `display:block` -- 块级元素 元素前后带换行符 独占一行
- `display:inline` -- 内联元素 不会自动换行 `width/height`不能生效 ｜ `line-height` 以及 `padding` 可以撑开
-  `display:inline-block` -- 内联块元素 可以设置宽高
-  **内部显示：**
-  `display:flow-root` -- 此元素会生成一个块元素盒子，该元素盒子可建立一个新的块格式化上下文`BFC`，定义格式化根所在的位置
-  `display:table (inline-table)` -- 在元素内部表现相同 外部显示为inline
-  `display:flex` --
-  `display:grid` -- 
-  `display:list-item` -- 表示将元素的外部显示类型变为block盒模型 并将内部显示类型变为多个list-item | 生成一个列表项盒，带 marker 小圆点/序号
-  **子元素内部表现：**
-  `display: table-row-group` -- 类似于`<tbody>`
-  `display: table-header-group` -- 类似于`<thead>`
-  `display: contents` -- 移除自身的外部盒，子元素直接提升到父容器里
---
## overflow
- 控制当元素内容超出其定义的宽度或高度时该如何处理（用于处理内容溢出问题）
- `overflow` 属性的取值：
  - `visible`（默认值）： 内容不会被裁剪 超出容器的部分会直接显示在外部
  - `hidden`： 超出容器的内容会被裁剪 隐藏不可见 没有滚动条 （但仍可能通过JS等触发滚动）
  - `scroll`： 无论内容是否超出容器 都会显示滚动条
  - `auto`： 如果内容超出容器则显示滚动条 否则不显示滚动条
  - `clip`： 类似于 hidden 但完全不会触发滚动
  - `inherit`： 从父元素继承 overflow 的值
---
## Float 浮动
- `文档流`：盒子元素 排版布局过程中 ｜ 自动从左往右 从上往下 流式排布
- `文本流`：文字元素 排版布局过程中 ｜ 自动从左往右 从上往下 流式排布
- `float`属性会使元素浮动，使元素向左或向右移动，直到它的外边缘碰到`包含框`或`另一个浮动框`为止 ｜ `float` 意味着使用块布局，它在某些情况下会修改 `display` 值的计算值
- 浮动元素会脱离文档流但不会脱离文本流，当浮动时其不会影响周围的盒子模型，但是文字会环绕在浮动元素周围 | 可以认为: 文档流与文字流是分层结构 浮动元素盒子与文字元素处于同一层
- 【脱离文档流，也就是将元素从普通的布局排版中拿走，其他盒子在定位的时候，会当做其不存在而进行定位】
- **基本规则：**
  - 元素设置 `float:left/right` 后，不再占据原本的块级位置（脱离常规流），但仍影响行框（文字绕排）
  - 浮动元素的宽度若未指定，会进行 `shrink-to-fit`（收缩适配）
    ```html
      <div style="float:left; background:lightblue;">hello world</div>
      <!-- 没设置width 计算它的内容宽度 收缩到刚好包裹住内容 -->
    ```
  - 父元素若只包含浮动子元素，高度会塌陷（因为浮动不在常规流）
  - `clear` 可以让后续元素“避开”浮动的一侧或两侧：`clear:left/right/both`
    - `clear` 属性指定一个元素是否必须移动 (清除浮动后) 到在它之前的浮动元素下面 | `clear` 属性适用于浮动和非浮动元素
  - [浮动与清除浮动的尝试](../static/4CSS/float.html)
---
## BFC 块级格式化上下文
`BFC`：`Block Formatting Context` 页面的一个独立布局环境 ｜ 在这个环境里的块级盒子排版不受外部影响，也不会影响外部的块级排版（尤其是与浮动、外边距折叠相关的行为）
- **如何触发？**
- `display: flow-root`（推荐，现代且语义清晰）
- `overflow 非 visible` （`hidden` `auto` `scroll` `clip`）
- `float 非 none`
- `position: absolute/fixed`
- `display: inline-block`
- 【注意】`display: flex/grid` 的容器为其子代建立独立的格式化上下文（ `Flex/Gird FC` ）。在`阻止margin折叠`、`避开浮动`这些效果上，可视作 BFC 边界
- **能做什么？**
- `清除浮动/包裹浮动`：让父元素能“包含”内部浮动元素的高度 ｜ BFC 计算高度时会包含内部浮动，因此不再塌陷
- `阻止外边距折叠（margin collapsing）`：父子/兄弟之间的垂直 `margin` 不再相互折叠 ｜ `非BFC` 相邻的垂直`margin`不会叠加，而是合并成一个`margin`值
- `避免与浮动重叠`：旁边有浮动元素时，建立 BFC 的盒子会绕排或避开重叠
- `多列布局技巧`：配合 float 或固定宽度实现左右列不重叠
---
## Flex 布局
`Flex布局` | `CSS3`的一种布局模式 也称`弹性布局` 可以为盒状模型提供最大的灵活性 是布局的首选方案 现已得到所有现代浏览器的支持

容器默认两根轴线: `主轴` `交叉轴` | 主轴的开始位置叫做main start 结束位置叫做main end | 交叉轴的开始位置叫做cross start 结束位置叫做cross end | 容器成员默认按照主轴排列
- 通过指定`display: flex`来标识一个弹性布局盒子
- `Flexbox` 的布局基于两个主要部分：
  - `容器（Flex Container）`： 包含所有的子元素 负责定义整体布局规则
  - `子元素（Flex Items）`： 容器内的每个直接子元素 按照容器的规则进行排列和布局
  - 【如果子元素不需要成为一个新的 Flex 容器（即它的子元素不需要参与 Flex 布局），则不需要设置 display: flex;】
- `Flexbox` 的主要特点：
  - `一维布局`： Flexbox 主要用于一维布局（水平或垂直）
  - `动态调整`： 子元素的大小和位置会根据`容器的空间`自动调整
  - `高灵活性`： Flexbox 提供了简单的对齐、分布和排序方式，适合多种布局需求
- `Flexbox` 的属性分为两类：
  - `容器属性`：作用于 Flex 容器，控制子元素的整体布局
  - `子元素属性`：作用于 Flex 子元素，控制每个子元素的行为
- **容器属性**
  - `display`: flex 块级flex容器 | inline-flex 行内flex容器
  - `flex-direction`：定义主轴方向 row | row-reverse | column | column-reverse
  - `justify-content`： 定义子元素在`主轴`上对齐方式
    - flex-start（默认值）：子元素靠主轴起点对齐
    - flex-end：子元素靠主轴终点对齐
    - center：子元素在主轴上居中对齐
    - space-between：子元素均匀分布，首尾元素贴边
    - space-around：子元素均匀分布，首尾元素与边界有间距
    - space-evenly：子元素均匀分布，间距相等
  - `align-items`：定义元素在`交叉轴`上对齐方式
    - stretch（默认值）：每行在交叉轴上拉伸填满容器
    - flex-start：内容靠交叉轴起点对齐
    - flex-end：内容靠交叉轴终点对齐
    - center：内容在交叉轴上居中对齐
    - baseline：子元素在交叉轴方向按照文字基线（baseline）对齐｜文字排版时小写字母 x 的下边缘线
  - `flex-wrap`：定义子元素是否换行
    - nowrap（默认值）：不换行，所有子元素排列在一行
    - wrap：换行，子元素超出容器宽度时自动换行
    - wrap-reverse：换行，子元素超出容器宽度时自动换行，且反向排列
  - `gap`：定义子元素之间的间距 | 可选值：数值或百分比：如 `gap: 10px` 或 `gap: 1rem`
- **子元素属性**
  - `flex`：定义子元素如何分配容器空间 | `flex: <grow> <shrink> <basis>` | `flex:1` 等价于 `flex:1 1 0%` （ 初始大小为 0，所有空间都通过放大比例分配） | 可能覆盖掉设置的 `width` 或 `height`
    - flex-grow：放大比例（容器有多余空间时，子元素怎么分配）
    - flex-shrink：缩小比例（容器空间不够时，子元素怎么压缩）
    - flex-basis：初始大小（类似 width/height 的基准值，优先级比 width 高）
  - `align-self`： 定义单个子元素在交叉轴上的对齐方式（覆盖容器的 `align-items` 属性）| 可选值与 align-items 相同
  - `order`：定义子元素的排列顺序 | 默认值为 0，数值越小越靠前
  - [布局尝试](../static/4CSS/flex.html)
  - [圣杯布局](../static/4CSS/flex-圣杯布局.html)
---
## Grid 布局
强大的布局方案 尤其适合二维布局 ｜ 行 + 列同时控制 ｜ 把一个容器划分成行和列，子元素（item）可以被精确地放到某个格子里，也可以跨行/跨列
1. Grid容器：`display: grid;`
2. Grid Items 网格项：直接子元素是网格项（可以指定大小位置来布局）
3. Grid Lines 网格线：网格的分割线 水平+垂直 定义网格项的起始和结束位置
4. Grid Cells 网格单元：网格线之间的区域 网格项可以占据的最小单位
5. Grid Areas 网格区域：网格单元组成的矩形区域
- **容器上的属性：**
- 定义网格
  - `grid-template-rows` : 100px 200px 100px; | 三行
  - `grid-template-columns` : 1fr 2fr / repeat(3, 1fr) ; 比例单位分
- 自动布局
  - `grid-auto-rows`: 100px; 未定义的行默认高度（网格项超出时 按需自动生成的行/列）
  - `grid-auto-columns`: 50px; 未定义的列默认宽度
- 网格间距
  - `gap`: 10px;        行列间都有间距
  - `row-gap`: 20px;    行间距
  - `column-gap`: 30px; 列间距
- 对其方式
  - 整个网格本身在容器中的对齐
  - `justify-content`: center; 水平方向对齐
  - `align-content`: center;   垂直方向对齐
  - 单元格内 item 的对齐：
  - `justify-items`: center; 水平方向对齐
  - `align-items`: center;   垂直方向对齐
- **子元素属性：**
- 跨行/跨列
- `grid-column`: 1/3; | 第1列～第2列（不包括第3列）
- `grid-row`: span 3; | 跨3行
- `grid-area` 等价于：`grid-row-start / grid-column-start / grid-row-end / grid-column-end`
    ```css
      .itemA{ grid-area: 1 / 2 / 3 / 4; }
      <!-- 轨道有 N 个 就有 N+1 条线 结束线是开区间 -->
      <!-- grid-row-start: 1   从第1行开始 -->
      <!-- grid-column-start: 2  从第2列开始 -->
      <!-- grid-row-end: 3  第3行结束（不包含3）-->
      <!-- grid-column-end: 4  第4列结束 -->
    ```
- [Grid示例1 网格划分与合并](../static/4CSS/grid1.html)
- [Grid示例2 grid-area等](../static/4CSS/grid2.html)
---
## Position 定位
`position` 属性用于指定一个元素在文档中的**定位方式** ｜ `top`、`right`、`bottom`、`left` 物理属性 + `inset-block-start`、`inset-block-end`、`inset-inline-start`、`inset-inline-end` 流相对逻辑属性则可用于决定定位元素的**最终位置**
1. **`static`** -- 默认值 正常布局行为 【不脱离文档流】
2. **`relative`** -- 【不脱离文档流】仍占位 ｜ 正常位置下 根据 `top` `bottom` `left` `right` 的值（offset = 偏移量）进行偏移 不影响任何其他元素的位置
     - `z-index` 不是 `auto` 该值会创建一个`新的层叠上下文`
3. **`absolute`** -- 【脱离文档流 也不参与文本流】 页面布局不留其空间 ｜ 参照物：最近的“已定位”（position!=static）祖先的内边距框（`padding box`），无则相对初始包含块（通常是`视口/根元素<html>`）| 最终位置由 `top...` 值决定
     - `z-index` 不是 `auto` 该值会创建一个`新的层叠上下文`
4. **`fixed`** -- 【脱离文档流 也不参与文本流】 页面布局不留其空间 ｜ 参照物：`视口`（如果祖先有 `transform/perspective/filter` 等 它们为视口替代） ｜ 最终位置由 `top...` 值决定
     - 总会创建一个新的层叠上下文 ｜ 在打印的文档中，该元素在每一页上的位置都是相同的（永远固定在视口）
5. **`sticky`** -- 【是否脱离文档流：否/是（阈值前像 `relative` ｜ 超过阈值时就“吸附”在视口 像 `fixed`）】 ｜ 参照物：最近的可滚动祖先（`overflow 非 visible`） ｜ 最终位置由 `top...` 定位
     - 总是创建一个新的层叠上下文
  - [relative + absolute 示例](../static/4CSS/position1.html)
  - [fixed + sticky 示例](../static/4CSS/position2.html)
---
## CSS 响应式设计
- 响应式设计是现代Web开发的核心概念，它使网站能够适应**不同屏幕尺寸**和**设备类型**
- 响应式设计基于三个主要技术：`流体网格（Fluid Grids）`｜ `弹性图片（Flexible Images）`｜ `媒体查询（Media Queries）`
- 【 实现方法 】
1. `视口设置(Viewport)` ｜ 响应式设计的首要步骤，确保页面在不同设备上正确缩放。
  ```html
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ```
2. `媒体查询(Media Queries)` ｜ 允许根据设备特性（如屏幕宽度）应用不同的CSS样式
  ```css
    /* 移动设备优先（默认样式为小屏幕设计） */
    .container {
      width: 100%;
      padding: 10px;
    }
    /* ⚠️ @media (min-width: ...px) */
    /* 中等屏幕（平板） */
    @media (min-width: 768px) {
      .container {
        width: 750px;
        padding: 15px;
      }
    }
    /* 大屏幕（桌面） */
    @media (min-width: 992px) {
      .container {
        width: 970px;
        padding: 20px;
      }
    }
    /* 超大屏幕 */
    @media (min-width: 1200px) {
      .container {
        width: 1170px;
      }
    }
  ```
3. `流体网格(Fluid Grid)` | 使用百分比而非固定单位创建布局：
4. `弹性图片(Flexible Images)`
  ```css
    img {
      max-width: 100%;
      height: auto;
    }
  ```
5. 现代CSS布局技术
· `Flexbox`：一维布局系统
· `CSS Grid`：二维布局系统
· `CSS容器查询`：根据容器尺寸而非视口应用样式
- 【 最佳实践 】
1. `移动优先`：先为小屏幕设计，然后使用媒体查询逐步增强
2. `使用相对单位`：`em`、`rem`、`%`、`vw`/`vh` 而非固定像素
3. `优化图片`：使用`srcset`和`picture`元素提供适当尺寸的图片
4. `测试多种设备`：确保在各种屏幕尺寸上都能良好显示
5. `性能考虑`：避免在小屏幕设备上加载大尺寸资源
---
## CSS 动画
CSS动画主要基于两个关键组件：
1. `@keyframes`规则：定义动画序列
2. `animation`属性：将动画应用于元素
- 【 实现方法 】
- (1) 使用`@keyframes`定义动画
  ```css
    /* ⚠️ @keyframes 名字 {...} */
    @keyframes example {
      from {background-color: red;}
      to {background-color: yellow;}
    }
    /* ⚠️ 变化：也可使用百分比 */
    @keyframes complex-animation {
      0% {
        transform: translateX(0);
        opacity: 1;
      }
      50% {
        transform: translateX(100px);
        opacity: 0.5;
      }
      100% {
        transform: translateX(200px);
        opacity: 1;
      }
    }
   ```
- (2) 应用动画到元素
  ```css
    .element {
      animation-name: example;
      animation-duration: 3s;
      animation-timing-function: ease-in-out;
      animation-delay: 1s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }
    /* ⚠️ 简写形式 */
    .element {
      animation: example 3s ease-in-out 1s infinite alternate;
    }
  ```
- `animation-name` 指定@keyframes动画名称 自定义名称
- `animation-duration` 动画完成一个周期的时间 时间值(如2s, 500ms)
- `animation-timing-function` 动画速度曲线 ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier(n,n,n,n)
- `animation-delay` 动画开始前的延迟 时间值
- `animation-iteration-count` 动画播放次数 数字或infinite
- `animation-direction` 动画是否反向播放 normal, reverse, alternate, alternate-reverse
- `animation-fill-mode` 动画执行前后如何应用样式 none, forwards, backwards, both
- `animation-play-state` 动画运行或暂停 running, paused
- 【 最佳实践 】
1. `性能优化`：优先使用`opacity`和`transform`属性，它们可以由`GPU`加速
2. `减少使用`：避免过度使用动画，以免分散用户注意力
3. `提供控制`：为用户提供减少动画或关闭动画的选项
4. `考虑可访问性`：为 prefers-reduced-motion 媒体查询提供替代方案
5. `保持简洁`：简单自然的动画通常比复杂的效果更好
---