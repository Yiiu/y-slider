const buble = require('rollup-plugin-buble')
export default {
    entry: "src/slider.js",      // 入口文件
    dest: "dist/js/main.js",            // 出口文件
    format: "umd",                     // 输出格式
    sourceMap: "inline",
    plugins: [
        buble(),
    ],
      banner:
`/**
 * test
 * (c) ${new Date().getFullYear()} Yiiu
 * @license MIT
 */`
}