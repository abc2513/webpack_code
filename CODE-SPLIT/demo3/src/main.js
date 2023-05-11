import { sum } from "./math";
// import { count } from "./count" // 如果这里引入的话，会将count.js直接打包到main.js中

console.log("hello main");
console.log(sum(1, 2, 3, 4, 5));

document.getElementById('btn').onclick = function () {
    // console.log(count(2, 1))
    // 动态导入 --> 实现按需加载：会将动态导入的文件代码分割，拆分成单独的模块，在需要使用的时候自动加载
    // 即使只被引用了一次，也会代码分割
    // 打包后会将该js文件单独分割出来293.js，在点击的时候 network中可以看到该js文件的加载
    import("./count").then((res) => {
        console.log('count模块加载成功', res.default(1, 3))
    }).catch((err) => {
        console.log('失败')
    })
}