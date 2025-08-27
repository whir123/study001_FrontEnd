// const { visit } = require('unist-util-visit'); // ⚠️ 一定要解构 .visit

// module.exports = function remarkEscapeCurlyBraces() {
//   return (tree) => {
//     visit(tree, 'text', (node) => {
//       // 把 { 和 } 转义成 \{ \}
//       node.value = node.value.replace(/\{/g, '\\{').replace(/\}/g, '\\}');
//     });
//   };
// };