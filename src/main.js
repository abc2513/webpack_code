import count from "./js/count";
import sum from "./js/sum";
// 要想webpack打包资源必须在main.js中引入
import "./css/iconfont.css";
import "./css/index.css"
import "./less/index.less"
import "./sass/index.sass"
import "./sass/index.scss"
import "./stylus/index.styl"
import {mul} from "./js/math"

console.log('mul', mul(1, 2))
// var a = 1 // 此时打包会报错
console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));

if (module.hot) {
    // 判断是否支持热模块替换功能: 局部更新js文件，不再编译刷新整个页面
    module.hot.accept("./js/count.js");
    // module.hot.accept("./js/sum.js", function (sum) {
    //     const result2 = sum(1, 2, 3, 4);
    //     console.log('result2', result2);
    //   });
    module.hot.accept("./js/sum.js");
}