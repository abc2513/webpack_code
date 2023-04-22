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

[07-基础-处理css资源]
    Webpack 如何处理 Css、Less、Sass、Scss、Styl 样式资源
    借助 Loader 来帮助 Webpack 解析样式资源（https://webpack.docschina.org/loaders/）
    要想webpack打包资源必须在main.js中引入
    npm i css-loader style-loader -D 用了哪个loader就下载。在module中配置
    此时webpack就可以正常打包了

[08-基础-处理less资源]
    安装npm install less less-loader --save-dev
    配置
    在main.js中引入
    打包即可
