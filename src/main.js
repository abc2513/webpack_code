import count from "./js/count";
import sum from "./js/sum";
// 要想webpack打包资源必须在main.js中引入
import "./css/iconfont.css";
import "./css/index.css"
import "./less/index.less"
import "./sass/index.sass"
import "./sass/index.scss"
import "./stylus/index.styl"

var a = 1 // 此时打包会报错
console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));