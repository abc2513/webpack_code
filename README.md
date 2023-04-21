# webpack_code
尚硅谷的webpack教程https://yk2012.github.io/sgg_webpack5/intro/


[04基本使用]
    main.js 打包入口文件
    public 静态资源
    package.json 包描述文件 初始化npm init -y
    npm i webpack webpack-cli -D 下载依赖
    npx 会将.bin目录临时添加为环境变量，这样就可以访问环境变量里的应用程序
    npx webpack ./src/main.js --mode=development 开发
    npx webpack ./src/main.js --mode=production  生产

[05基本配置]
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

