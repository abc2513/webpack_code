# webpack_code
尚硅谷的webpack教程https://yk2012.github.io/sgg_webpack5/intro/

# webpack简介及常见资源处理 开发模式
## webpack简介
### [04-基础-webpack介绍&基本使用]
    main.js 打包入口文件
    public 静态资源
    package.json 包描述文件 初始化npm init -y
    npm i webpack webpack-cli -D 下载依赖
    npx 会将.bin目录临时添加为环境变量，这样就可以访问环境变量里的应用程序
    npx webpack ./src/main.js --mode=development 开发
    npx webpack ./src/main.js --mode=production  生产

### [05-基础-webpack5大核心概念]
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

### [06-基础-webpack基本配置]
    在项目根目录下新建文件：webpack.config.js
    Webpack 是基于 Node.js 运行的，所以采用 Common.js 模块化规范（module.exports）
    npx webpack 打包 会自动找webpack.config.js配置文件去进行打包

### [07-基础-开发模式的介绍]
    开发代码时使用的模式
        1. 编译代码，使浏览器能识别运行
            样式资源、字体图标、图片资源、html资源等，webpack默认都不能处理这些资源，所以需要加载配置来编译这些资源。
        2. 代码质量检查，树立代码规范
            提前检查代码的一些隐患，让代码运行时更健壮
            提前检查代码的规范和格式，统一编码风格，让代码更优雅美观，可维护性强。

## 处理样式资源
### [08-基础-处理css资源]
    Webpack 如何处理 Css、Less、Sass、Scss、Styl 样式资源
    借助 Loader 来帮助 Webpack 解析样式资源（https://webpack.docschina.org/loaders/）
    要想webpack打包资源必须在main.js中引入
    npm i css-loader style-loader -D 用了哪个loader就下载。在module中配置
    此时webpack就可以正常打包了

### [09-基础-处理less资源]
    安装npm install less less-loader --save-dev
    配置
    在main.js中引入
    打包即可

### [10-基础-处理sass资源]
    npm i sass-loader sass -D
    
### [11-基础-处理stylus资源]
    写起来最简单 括号 分号 冒号都不需要写
    npm i stylus stylus-loader -D

## 处理图片资源

### [12-基础-处理图片资源]
    小图片转成base64 体积只会增大1kb左右，但是会减少请求
    不需要安装loader
    直接配置maxSize: 10 * 1024 小于10kb的图片转成base64即可
    此时打包的dist文件只有两张图，另一张被转成base64了。

## 处理打包后的文件: 分类打包资源、清空上次打包
### [13-基础-修改输出文件目录]
    目前看来输出的文件比较乱
    希望js打包到js文件夹下，filename: "static/js/main.js",
    图片打包到images文件夹下，generator: { filename: "static/imgs/[hash:8][ext][query]" }
    npx webpack去打包即可

### [14-基础-自动清空上次打包内容]
    output: {
        clean: true, // 自动清空上次打包的内容
    }

## 处理字体、音视频资源
### [15-基础-处理字体图标资源]
    首先阿里巴巴矢量图标库（https://www.iconfont.cn/）下载
    引入iconfont.css及.ttf .woff .woff2
    再引入到main.js中
    webpack打包配置test: /\.(ttf|woff2?)$/
    在html中使用<i class="iconfont icon-xihuan"></i>

### [16-基础-处理其他资源]
    音视频资源 在处理字体图标资源基础上增加其他文件类型，统一处理即可
     test: /\.(ttf|woff2?|map4|map3|avi)$/,

## 处理js资源: eslint检测代码规范、babel将js编译成低版本语法兼容浏览器
### [17-基础-处理js资源介绍]
    Webpack 对 js 处理是有限的，只能编译 js 中 ES 模块化语法，不能编译其他语法
        针对 js 兼容性处理，我们使用 Babel 来完成
        针对代码格式，我们使用 Eslint 来完成
    先完成 Eslint，检测代码格式无误后，在由 Babel 做代码兼容性处理

### [18-基础-eslint介绍]
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

### [19-基础-eslint使用]
    eslint在webpack4是个loader处理，在webpack5是个plugins插件处理。
    插件：需要安装后引入才能用。所有的插件都是构造函数，所以都是new调用。
    官网https://webpack.docschina.org/plugins/eslint-webpack-plugin/
    1. 安装
        npm install eslint-webpack-plugin --save-dev
        npm install eslint --save-dev
    2. 配置
        const ESLintPlugin = require('eslint-webpack-plugin');
        module.exports = {
            // ...
            plugins: [new ESLintPlugin(options)],
            // ...
        };
    3. 写.eslintrc.js配置文件

    4. 打包npx webpack 会提示eslint的错误，或者安装了eslint扩展也可以直接在页面上看到红色波浪线〰️提示

    5. 创建.eslintignore 添加的文件可忽略eslint扩展插件的检测。

### [20-基础-babel介绍]
    是JavaScript 编译器。用于将(es6)高版本语法转换为低版本的的语法，兼容旧版本浏览器。
### [21-基础-babel使用]
    官网https://webpack.docschina.org/loaders/babel-loader/#install
    1. 安装
         npm i babel-loader @babel/core @babel/preset-env -D
    2. 配置loader
        loader: 'babel-loader',
        
    3. 将options 属性单独写入babel.config.js配置文件
        presets: ['@babel/preset-env']

    4. 打包后main.js打包里的箭头函数就变成了普通函数。

## 处理html资源
### [22-基础-处理html资源]
    html中引入打包好的js文件，如果改了文件名或者路径都需要进行手动改。
    需要自动引入，通过插件实现。官网https://webpack.docschina.org/plugins/html-webpack-plugin/
    1. 下载 npm install --save-dev html-webpack-plugin
    2. 引入 const HtmlWebpackPlugin = require('html-webpack-plugin');
    3. new 调用，并传入template属性，将某个html文件作为打包后的模板
    4. 打包 打包后dist文件夹会自动生成一个index.html文件，并自动引入了打包后的js文件
    5. 打开dist/index.html就可以看到效果了。


## 自动化：自动打包编译
### [23-基础-搭建开发服务器]
    每次写完代码都需要手动输入npx webpack进行打包，编译代码；希望自动化。
    1. 安装 npm i webpack-dev-server -D
    2. 配置 devServer
    3. 运行 npx webpack server

### [24-基础-总结开发模式配置]
    编译代码：loader加载器用来编译 css、less、scss、图片、字体、音视频、babel+预设将js编译成低版本语法
    代码检查：plugins插件用来扩展功能 eslint检测、html自动生成
    自动化：保存代码后自动打包刷新

# 生产模式
## 生产环境准备
### [25-基础-生产模式准备工作]
    开发完代码后需要将代码部署上线
    对代码进行优化，让其运行性能更好。
        1. 优化代码运行性能
        2. 优化代码打包速度
    我们分别准备两个配置文件来放不同的配置
        webpack.dev.js 开发 -> 不会生成打包文件，需要devServer自动打包刷新
        webpack.prod.js 生产 -> 会生成打包文件，不需要devServer
    在package.json中配置 快捷打包命令
        "scripts": {
            "start": "npm run dev", // npm start
            "dev": "webpack serve --config ./config/webpack.dev.js", // npm run dev 打包运行开发环境
            "build": "webpack --config ./config/webpack.prod.js" // npm run build 打包运行生产环境
        },

## CSS处理
### [26-基础-提取css成单独文件]
    之前是通过"style-loader", // 将js中css通过创建style标签添加html文件中生效
    Css 文件目前被打包到 js 文件中，当 js 文件加载时，会创建一个 style 标签来生成样式
    这样对于网站来说，会出现闪屏现象，用户体验不好
    我们应该是单独的 Css 文件，通过 link 标签加载性能才好
    1. 安装 npm i mini-css-extract-plugin -D
    2. 引入const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    3. 在webpack.prod.js中 将所有的style-loader换成 MiniCssExtractPlugin.loader
    4. new MiniCssExtractPlugin调用
    5. 打包运行 npm run build
    打包后会把所有的css文件合并成一个文件，dist目录下会多个css/main.css文件。html文件会自动通过link引入

### [27-基础-样式css兼容性处理]
    1. 安装npm i postcss-loader postcss postcss-preset-env -D
    2. 写在css-loader后面，less-loader前面
    3. 在package.json里配置"browserslist": [ "last 2 version", "> 1%", "not dead" ] 只取最近两个版本的浏览器 且 覆盖99% 且 不要已经退出市场的浏览器。
    通过loader和预设做兼容性处理，通过browserslist控制兼容性程度

### [28-基础-封装共同样式loader函数]
    loader里面存在很多重复的代码，定义一个函数getStyleLoaders，把重复的东西放进去。
    在用到的地方调用即可

### [29-基础-css压缩]
    官网https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/
    1. 安装 npm install css-minimizer-webpack-plugin --save-dev
    2. 引入
    3. new CssMinimizerPlugin()
    4. npm run build 打包后可以看到css文件压缩成一行了

### [30-基础-html和js压缩介绍]
    默认生产模式已经开启了：html 压缩和 js 压缩

    不需要额外进行配置

### [30-基础-webpack基础总结]
    1. 两种开发模式
        开发模式：代码能编译自动化运行
        生产模式：代码编译优化输出
    2. Webpack 基本功能
        开发模式：可以编译 ES Module 语法
        生产模式：可以编译 ES Module 语法，压缩 js 代码
    3. Webpack 配置文件
        5 个核心概念
            entry
            output
            loader
            plugins
            mode
        devServer 配置
   4.  Webpack 脚本指令用法
        webpack 直接打包输出
        webpack serve 启动开发服务器，内存编译打包没有输出



