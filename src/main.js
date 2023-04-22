import count from "./js/count";
import sum from "./js/sum";
// 要想webpack打包资源必须在main.js中引入
import "./css/index.css"
import "./less/index.less"

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));