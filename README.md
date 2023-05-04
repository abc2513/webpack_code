# webpack_code
尚硅谷的webpack教程https://yk2012.github.io/sgg_webpack5/intro/

# 基础
## webpack简介及常见资源处理 开发模式
### webpack简介
#### [04-基础-webpack介绍&基本使用]
    main.js 打包入口文件
    public 静态资源
    package.json 包描述文件 初始化npm init -y
    npm i webpack webpack-cli -D 下载依赖
    npx 会将.bin目录临时添加为环境变量，这样就可以访问环境变量里的应用程序
    npx webpack ./src/main.js --mode=development 开发
    npx webpack ./src/main.js --mode=production  生产

#### [05-基础-webpack5大核心概念]
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

#### [06-基础-webpack基本配置]
    在项目根目录下新建文件：webpack.config.js
    Webpack 是基于 Node.js 运行的，所以采用 Common.js 模块化规范（module.exports）
    npx webpack 打包 会自动找webpack.config.js配置文件去进行打包

#### [07-基础-开发模式的介绍]
    开发代码时使用的模式
        1. 编译代码，使浏览器能识别运行
            样式资源、字体图标、图片资源、html资源等，webpack默认都不能处理这些资源，所以需要加载配置来编译这些资源。
        2. 代码质量检查，树立代码规范
            提前检查代码的一些隐患，让代码运行时更健壮
            提前检查代码的规范和格式，统一编码风格，让代码更优雅美观，可维护性强。

### 处理样式资源
#### [08-基础-处理css资源]
    Webpack 如何处理 Css、Less、Sass、Scss、Styl 样式资源
    借助 Loader 来帮助 Webpack 解析样式资源（https://webpack.docschina.org/loaders/）
    要想webpack打包资源必须在main.js中引入
    npm i css-loader style-loader -D 用了哪个loader就下载。在module中配置
    此时webpack就可以正常打包了

#### [09-基础-处理less资源]
    安装npm install less less-loader --save-dev
    配置
    在main.js中引入
    打包即可

#### [10-基础-处理sass资源]
    npm i sass-loader sass -D
    
#### [11-基础-处理stylus资源]
    写起来最简单 括号 分号 冒号都不需要写
    npm i stylus stylus-loader -D

### 处理图片资源

#### [12-基础-处理图片资源]
    小图片转成base64 体积只会增大1kb左右，但是会减少请求
    不需要安装loader
    直接配置maxSize: 10 * 1024 小于10kb的图片转成base64即可
    此时打包的dist文件只有两张图，另一张被转成base64了。

### 处理打包后的文件: 分类打包资源、清空上次打包
#### [13-基础-修改输出文件目录]
    目前看来输出的文件比较乱
    希望js打包到js文件夹下，filename: "static/js/main.js",
    图片打包到images文件夹下，generator: { filename: "static/imgs/[hash:8][ext][query]" }
    npx webpack去打包即可

#### [14-基础-自动清空上次打包内容]
    output: {
        clean: true, // 自动清空上次打包的内容
    }

### 处理字体、音视频资源
#### [15-基础-处理字体图标资源]
    首先阿里巴巴矢量图标库（https://www.iconfont.cn/）下载
    引入iconfont.css及.ttf .woff .woff2
    再引入到main.js中
    webpack打包配置test: /\.(ttf|woff2?)$/
    在html中使用<i class="iconfont icon-xihuan"></i>

#### [16-基础-处理其他资源]
    音视频资源 在处理字体图标资源基础上增加其他文件类型，统一处理即可
     test: /\.(ttf|woff2?|map4|map3|avi)$/,

### 处理js资源: eslint检测代码规范、babel将js编译成低版本语法兼容浏览器
#### [17-基础-处理js资源介绍]
    Webpack 对 js 处理是有限的，只能编译 js 中 ES 模块化语法，不能编译其他语法
        针对 js 兼容性处理，我们使用 Babel 来完成
        针对代码格式，我们使用 Eslint 来完成
    先完成 Eslint，检测代码格式无误后，在由 Babel 做代码兼容性处理

#### [18-基础-eslint介绍]
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

#### [19-基础-eslint使用]
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

#### [20-基础-babel介绍]
    是JavaScript 编译器。用于将(es6)高版本语法转换为低版本的的语法，兼容旧版本浏览器。
#### [21-基础-babel使用]
    官网https://webpack.docschina.org/loaders/babel-loader/#install
    1. 安装
         npm i babel-loader @babel/core @babel/preset-env -D
    2. 配置loader
        loader: 'babel-loader',
        
    3. 将options 属性单独写入babel.config.js配置文件
        presets: ['@babel/preset-env']

    4. 打包后main.js打包里的箭头函数就变成了普通函数。

### 处理html资源
#### [22-基础-处理html资源]
    html中引入打包好的js文件，如果改了文件名或者路径都需要进行手动改。
    需要自动引入，通过插件实现。官网https://webpack.docschina.org/plugins/html-webpack-plugin/
    1. 下载 npm install --save-dev html-webpack-plugin
    2. 引入 const HtmlWebpackPlugin = require('html-webpack-plugin');
    3. new 调用，并传入template属性，将某个html文件作为打包后的模板
    4. 打包 打包后dist文件夹会自动生成一个index.html文件，并自动引入了打包后的js文件
    5. 打开dist/index.html就可以看到效果了。


### 自动化：自动打包编译
#### [23-基础-搭建开发服务器]
    每次写完代码都需要手动输入npx webpack进行打包，编译代码；希望自动化。
    1. 安装 npm i webpack-dev-server -D
    2. 配置 devServer
    3. 运行 npx webpack server

#### [24-基础-总结开发模式配置]
    编译代码：loader加载器用来编译 css、less、scss、图片、字体、音视频、babel+预设将js编译成低版本语法
    代码检查：plugins插件用来扩展功能 eslint检测、html自动生成
    自动化：保存代码后自动打包刷新

## 生产模式
### 生产环境准备
#### [25-基础-生产模式准备工作]
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

### CSS处理
#### [26-基础-提取css成单独文件]
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

#### [27-基础-样式css兼容性处理]
    1. 安装npm i postcss-loader postcss postcss-preset-env -D
    2. 写在css-loader后面，less-loader前面
    3. 在package.json里配置"browserslist": [ "last 2 version", "> 1%", "not dead" ] 只取最近两个版本的浏览器 且 覆盖99% 且 不要已经退出市场的浏览器。
    通过loader和预设做兼容性处理，通过browserslist控制兼容性程度

#### [28-基础-封装共同样式loader函数]
    loader里面存在很多重复的代码，定义一个函数getStyleLoaders，把重复的东西放进去。
    在用到的地方调用即可

#### [29-基础-css压缩]
    官网https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/
    1. 安装 npm install css-minimizer-webpack-plugin --save-dev
    2. 引入
    3. new CssMinimizerPlugin()
    4. npm run build 打包后可以看到css文件压缩成一行了

### html和js压缩介绍
#### [30-基础-html和js压缩介绍]
    默认生产模式已经开启了：html 压缩和 js 压缩

    不需要额外进行配置

## 基础总结
#### [31-基础-webpack基础总结]
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

# 高级

#### [32-高级-webpack高级介绍]
    所谓高级配置其实就是进行 Webpack 优化，让我们代码在编译/运行时性能更好~
    我们会从以下角度来进行优化：
        1. 提升开发体验：SourceMap
        2. 提升打包构建速度：HotModuleReplacement
        3. 减少代码体积
        4. 优化代码运行性能

### 提升开发体验
#### [33-高级-SourceMap-（增强调试定位错误）]
    1. 为什么使用
        增强调试，代码打包上线，能够更精准的定位某个文件某一行里具体位置出错了。
        原因：开发时我们运行的代码是经过 webpack 编译后的。
            所有 css 和 js 合并成了一个文件，并且多了其他代码。此时如果代码运行出错那么提示代码错误位置我们是看不懂的。一旦将来开发代码文件很多，那么很难去发现错误出现在哪里。
            所以我们需要更加准确的错误提示，来帮助我们更好的开发代码。
    2. 这是什么东西
        SourceMap（源代码映射）是一个用来生成源代码与构建后代码一一映射的文件的方案。
        它会生成一个 xxx.map 文件，里面包含源代码和构建后代码每一行、每一列的映射关系。当构建后代码出错了，会通过 xxx.map 文件，从构建后代码出错位置找到映射后源代码出错位置，从而让浏览器提示源代码文件出错位置，帮助我们更快的找到错误根源。
    3. 如何使用
        通过查看Webpack DevTool 文档可知，SourceMap 的值有很多种情况.
        实际使用以下两种：
            开发模式：devtool: "cheap-module-source-map",
                优点：打包编译速度快，只包含行映射
                缺点：没有列映射
            生产模式：devtool: "source-map",
                优点：包含行/列映射
                缺点：打包编译速度更慢

### 提升打包构建速度
#### [34-高级-HMR-（开发模式下打包编译速度更快 局部更新）]
    HotModuleReplacement
    1. 为什么使用
        开发时我们修改了其中一个模块代码，Webpack 默认会将所有模块全部重新打包编译，速度很慢。
        所以我们需要做到修改某个模块代码，就只有这个模块代码需要重新打包编译，其他模块不变，这样打包速度就能很快。
    2. 它是什么
        HotModuleReplacement（HMR/热模块替换）：在程序运行中，替换、添加或删除模块，而无需重新加载整个页面
    3. 如何使用
        3-1 基本配置: 此时 css 样式经过 style-loader 处理，已经具备 HMR 功能了。 但是 js 还不行。
            【修改样式只会局部更新，不再刷新整个页面了！！！】
            module.exports = {
                // 其他省略
                devServer: {
                    host: "localhost", // 启动服务器域名
                    port: "3000", // 启动服务器端口号
                    open: true, // 是否自动打开浏览器
                    hot: true, // 开启HMR功能（只能用于开发环境，生产环境不需要了）
                },
            };
        3-2 JS 配置:
            在main.js中
            【修改js文件会局部更新，不再刷新整个页面！！！】
            // 判断是否支持HMR功能：当改了count.js就会局部更新该模块；后面可以跟函数，代表更新之后需要做的事情。
            if (module.hot) {
                module.hot.accept("./js/count.js");

                module.hot.accept("./js/sum.js", function (sum) {
                    const result2 = sum(1, 2, 3, 4);
                    console.log(result2);
                });
            }
        3-3 上面这样写会很麻烦，所以实际开发我们会使用其他 loader 来解决。
            比如：vue-loader(https://github.com/vuejs/vue-loader), 
                 react-hot-loader(https://github.com/gaearon/react-hot-loader)。
            如果是自己搭建的就需要一个个判断引入了。


#### [35-高级-OneOf-（匹配上一个loader，剩下的就不匹配了）]
    1. 为啥使用
        打包时每个文件都会经过所有 loader 处理，虽然因为 test 正则原因实际没有处理上，但是都要过一遍。比较慢。
        使用后打包速度明显快了 webpack 5.80.0 compiled with 2 warnings in 2460 ms
    2. 它是干什么的
        顾名思义就是只能匹配上一个 loader, 剩下的就不匹配了。
    3. 使用
        将rules里的所有loader都放入 一个大对象中再放入oneOf数组中
        {
            oneOf: [
            
            ]
        }

#### [36-高级-Include-Exclude-（只编译处理指定文件，排除指定文件）]
    // exclude: /node_modules/, // 排除node_modules代码不编译
    include: path.resolve(__dirname, "../src"), // 也可以用包含 只编译src文件下的
    
    开发时我们需要使用第三方的库或插件，所有文件都下载到 node_modules 中了。而这些文件是不需要编译可以直接使用的。
    所以我们在对 js 文件处理时，要排除 node_modules 下面的文件。
        include
            包含，只处理 xxx 文件
        exclude
            排除，除了 xxx 文件以外其他文件都处理

#### [37-高级-Eslint和Babel的缓存-（二次打包速度提升）]
    每次打包时 js 文件都要经过 Eslint 检查 和 Babel 编译，速度比较慢。
    可以缓存之前的 Eslint 检查 和 Babel 编译结果，这样第二次打包时速度就会更快了。
    只需要对修改的文件进行eslint检查和babel编译就好了，不需要全部进行编译。
    首次打包是4s，二次打包是2s
    {
        test: /\.js$/,
        // exclude: /node_modules/, // 排除node_modules代码不编译
        include: path.resolve(__dirname, "../src"), // 也可以用包含
        loader: "babel-loader",
        options: {
            cacheDirectory: true, // 开启babel编译缓存
            cacheCompression: false, // 缓存文件不要压缩
        },
    },

    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),


#### [38-高级-Thead多进程打包-（js文件打包开启多进程 并 使用Terser插件压缩）]
    当文件多的时候效果明显，当文件较少的时候反而延长打包实际，因为每个进程启动就有大约为 600ms 左右开销。
    
    当项目越来越庞大时，打包速度越来越慢。
    我们想要继续提升打包速度，其实就是要提升 js 的打包速度，因为其他文件都比较少。
    而对 js 文件处理主要就是 eslint 、babel、Terser 三个工具，所以我们要提升它们的运行速度。
    我们可以开启多进程同时处理 js 文件，这样速度就比之前的单进程打包更快了。

    多进程打包：开启电脑的多个进程同时干一件事，速度更快。

    怎么用
        生产模式需要开启多线程并进行压缩；开发模式下js没有进行压缩就不需要处理了，只需要开启多线程即可。
        1. 启动进程的数量就是我们 CPU 的核数，获取 CPU 的核数
            // nodejs核心模块，直接使用
            const os = require("os");
            // cpu核数
            const threads = os.cpus().length;
        2. 下载包
            npm i thread-loader -D
        3. 使用: 开启多进程并使用terser插件压缩js文件
            const os = require("os");
            // cpu核数
            const threads = os.cpus().length;
            const TerserPlugin = require("terser-webpack-plugin"); // 12. 压缩插件 内置了 不需要下载

            {
                test: /\.js$/,
                include: path.resolve(__dirname, "../src"), // 9. 只处理src下的文件，其他文件不处理
                use: [
                    {
                        loader: "thread-loader", // 11. 开启多进程
                        options: {
                        workers: threads, // 数量
                        },
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                        cacheDirectory: true, // 10. 开启babel编译缓存
                        cacheCompression: false, // 缓存文件不要压缩
                        },
                    }
                ],
            }

            new ESLintWebpackPlugin({
                threads, // 开启多进程
            })

            optimization: {
                minimize: true,
                minimizer: [
                    new CssMinimizerPlugin(), // css压缩也可以写到optimization.minimizer里面，效果一样的
                    new TerserPlugin({ // js压缩，当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
                        parallel: threads // 开启多进程
                    })
                ],
            },

### 减少代码体积
#### [39-高级-TreeShaking-（按需打包）]
    开发时我们定义了一些工具函数库，或者引用第三方工具函数库或组件库。
    如果没有特殊处理的话我们打包时会引入整个库，但是实际上可能我们可能只用上极小部分的功能。
    这样将整个库都打包进来，体积就太大了。

    Tree Shaking 是一个术语，通常用于描述移除 JavaScript 中的没有使用上的代码。
    注意：它依赖 ES Module

    Webpack 已经默认开启了这个功能，无需其他配置。
    如：math.js中写入多个方法，只用到其中一个，就可以按需引入，这样打包的时候不会打包整个文件了。

#### [40-高级-减少Babel生成文件的体积-（避免重复定义，引用安装的包里的）]
    安装 npm i @babel/plugin-transform-runtime -D
    配置babel增加 plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
    文件越多，效果越明显。开发和生产都可以做。

    Babel 为编译的每个文件都插入了辅助代码，使代码体积过大！
    Babel 对一些公共方法使用了非常小的辅助代码，比如 _extend。默认情况下会被添加到每一个需要它的文件中。
    你可以将这些辅助代码作为一个独立模块，来避免重复引入。

    @babel/plugin-transform-runtime: 禁用了 Babel 自动对每个文件的 runtime 注入，而是引入 @babel/plugin-transform-runtime 并且使所有辅助代码从这里引用。

#### [41-高级-压缩图片]






