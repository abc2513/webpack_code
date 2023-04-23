# webpack_code
尚硅谷的webpack教程https://yk2012.github.io/sgg_webpack5/intro/


[04-基础-webpack介绍&基本使用]
    main.js 打包入口文件
    public 静态资源
    package.json 包描述文件 初始化npm init -y
    npm i webpack webpack-cli -D 下载依赖
    npx 会将.bin目录临时添加为环境变量，这样就可以访问环境变量里的应用程序
    npx webpack ./src/main.js --mode=development 开发
    npx webpack ./src/main.js --mode=production  生产

[05-基础-webpack5大核心概念]
    entry（入口）
        指示 Webpack 从哪个文件开始打包

    output（输出）
        指示 Webpack 打包完的文件输出到哪里去，如何命名等

    loader（加载器）
        webpack 本身只能处理 js、json 等资源，其他资源（图片、文件等）需要借助 loader，Webpack 才能解析

    plugins（插件）
        扩展 Webpack 的功能

    mode（模式）
        主要由两种模式：
            开发模式：development
            生产模式：production

[06-基础-webpack基本配置]
    在项目根目录下新建文件：webpack.config.js
    Webpack 是基于 Node.js 运行的，所以采用 Common.js 模块化规范（module.exports）
    npx webpack 打包 会自动找webpack.config.js配置文件去进行打包

[07-基础-开发模式的介绍]
    开发代码时使用的模式
        1. 编译代码，使浏览器能识别运行
            样式资源、字体图标、图片资源、html资源等，webpack默认都不能处理这些资源，所以需要加载配置来编译这些资源。
        2. 代码质量检查，树立代码规范
            提前检查代码的一些隐患，让代码运行时更健壮
            提前检查代码的规范和格式，统一编码风格，让代码更优雅美观，可维护性强。

## 处理样式资源
[08-基础-处理css资源]
    Webpack 如何处理 Css、Less、Sass、Scss、Styl 样式资源
    借助 Loader 来帮助 Webpack 解析样式资源（https://webpack.docschina.org/loaders/）
    要想webpack打包资源必须在main.js中引入
    npm i css-loader style-loader -D 用了哪个loader就下载。在module中配置
    此时webpack就可以正常打包了

[09-基础-处理less资源]
    安装npm install less less-loader --save-dev
    配置
    在main.js中引入
    打包即可

[10-基础-处理sass资源]
    npm i sass-loader sass -D
    
[11-基础-处理stylus资源]
    写起来最简单 括号 分号 冒号都不需要写
    npm i stylus stylus-loader -D

## 处理图片资源

[12-基础-处理图片资源]
    小图片转成base64 体积只会增大1kb左右，但是会减少请求
    不需要安装loader
    直接配置maxSize: 10 * 1024 小于10kb的图片转成base64即可
    此时打包的dist文件只有两张图，另一张被转成base64了。

## 处理打包后的文件: 分类打包资源、清空上次打包
[13-基础-修改输出文件目录]
    目前看来输出的文件比较乱
    希望js打包到js文件夹下，filename: "static/js/main.js",
    图片打包到images文件夹下，generator: { filename: "static/imgs/[hash:8][ext][query]" }
    npx webpack去打包即可

[14-基础-自动清空上次打包内容]
    output: {
        clean: true, // 自动清空上次打包的内容
    }

[15-基础-处理字体图标资源]
    首先阿里巴巴矢量图标库（https://www.iconfont.cn/）下载
    引入iconfont.css及.ttf .woff .woff2
    再引入到main.js中
    webpack打包配置test: /\.(ttf|woff2?)$/
    在html中使用<i class="iconfont icon-xihuan"></i>

[16-基础-处理其他资源]
    音视频资源 在处理字体图标资源基础上增加其他文件类型，统一处理即可
     test: /\.(ttf|woff2?|map4|map3|avi)$/,

[17-基础-处理js资源介绍]
    Webpack 对 js 处理是有限的，只能编译 js 中 ES 模块化语法，不能编译其他语法
        针对 js 兼容性处理，我们使用 Babel 来完成
        针对代码格式，我们使用 Eslint 来完成
    先完成 Eslint，检测代码格式无误后，在由 Babel 做代码兼容性处理

[18-基础-eslint介绍]
    使用 Eslint，关键是写 Eslint 配置文件，里面写上各种 rules 规则，将来运行 Eslint 时就会以写的规则对代码进行检查
    以 .eslintrc.js 配置文件为例：
        module.exports = {
            // 解析选项
            parserOptions: {},
            // 具体检查规则
            rules: {},
            // 继承其他规则
            extends: [],
            // ...
            // 其他规则详见：https://eslint.bootcss.com/docs/user-guide/configuring
        };

[19-基础-eslint使用]

[20-基础-babel介绍]

[21-基础-babel使用]

[22-基础-处理html资源]

[23-基础-搭建开发服务器]

[24-基础-总结开发模式配置]

[25-基础-生产模式准备工作]

[26-基础-提取css成单独文件]

[27-基础-样式兼容性处理]

[28-基础-封装样式loader函数]

[29-基础-css压缩]

[30-基础-html和js压缩介绍]

[30-基础-webpack基础总结]




