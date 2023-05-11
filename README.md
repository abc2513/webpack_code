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

#### [41-高级-压缩图片-（减少本地图片体积）]
    安装 npm i image-minimizer-webpack-plugin imagemin -D
    无损压缩 npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D
    配置 
        const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
        // 压缩图片
        new ImageMinimizerPlugin({
            minimizer: {
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
                plugins: [
                ["gifsicle", { interlaced: true }],
                ["jpegtran", { progressive: true }],
                ["optipng", { optimizationLevel: 5 }],
                [
                    "svgo",
                    {
                    plugins: [
                        "preset-default",
                        "prefixIds",
                        {
                        name: "sortAttrs",
                        params: {
                            xmlnsOrder: "alphabetical",
                        },
                        },
                    ],
                    },
                ],
                ],
            },
            }
        })
    npm run build后 dist/static/imgs 里的图片变小了

### 优化代码运行性能

#### Code Split 多入口 按需 动态导入 代码分割打包 统一命名
##### [42-高级-Code Split-多入口-（输出多个js按需加载）]
    demo1
    打包代码时会将所有 js 文件打包到一个文件中，体积太大了。我们如果只要渲染首页，就应该只加载首页的 js 文件，其他文件不应该加载。

    所以我们需要将打包生成的文件进行代码分割，生成多个 js 文件，渲染哪个页面就只加载某个 js 文件，这样加载的资源就少，速度就更快。

    代码分割（Code Split）主要做了两件事：
        分割文件：将打包生成的文件进行分割，生成多个 js 文件。
        按需加载：需要哪个文件就加载哪个文件。

    新建一个项目CODE-SPLIT/demo1
    创建多个js文件，webpack配置中实现多入口，这样打包之后也是多个js文件，而不只是一个main.js文件。
    创建好相应的文件夹后，npm init -y 初始化package.json文件
    安装npm i webpack webpack-cli html-webpack-plugin -D
    打包npx webpack 此时在 dist 目录我们能看到输出了两个 js 文件。


##### [43-高级-Code Split-多入口提取公共模块-（提取重复代码减小体积）]
    demo2
    如果多入口文件中都引用了同一份代码，我们不希望这份代码被打包到两个文件中，导致代码重复，体积更大。
    我们需要提取多入口的重复代码，只打包生成一个 js 文件，其他文件引用它就好。

    多入口的文件引入的公共代码处理，将公共模块单独打包，这样其他文件就可以引用它了。
    配置 optimization->splitChunks->cacheGroups

##### [44-高级-Code Split-多入口按需加载-（动态导入 触发时再加载）]
    demo3
    想要实现按需加载，动态导入模块。还需要额外配置：
        document.getElementById("btn").onclick = function () {
            // 动态导入 --> 实现按需加载：会将动态导入的文件代码分割，拆分成单独的模块，在需要使用的时候自动加载
            // 即使只被引用了一次，也会代码分割
            import("./math.js").then(({ sum }) => {
                alert(sum(1, 2, 3, 4, 5));
            });
        }
    
    我们可以发现dist文件夹，一旦通过 import 动态导入语法导入模块，模块就被代码分割，同时也能按需加载了。

##### [45-高级-Code Split-单入口-（单页面应用代码分割打包）]
    最终我们会使用单入口+代码分割+动态导入方式来进行配置。更新之前的配置文件。

    开发时我们可能是单页面应用（SPA），只有一个入口（单入口）。那么我们需要这样配置：
        optimization: {
            // 代码分割配置
            splitChunks: {
                chunks: "all", // 对所有模块都进行分割
            }
        }
        document.getElementById('btn').onclick = function () {
            // 动态导入 --> 实现按需加载：会将动态导入的文件代码分割，拆分成单独的模块，在需要使用的时候自动加载
            // 即使只被引用了一次，也会代码分割
            // 打包后会将该js文件单独分割出来587.js，在点击的时候 network中可以看到该js文件的加载
            import("./js/math").then((mul) => { // import有波浪线是eslint不能识别动态导入，需要额外配置
                console.log('/js/math模块加载成功', mul(1, 3))
            })
        }

##### [46-高级-Code Split-给模块命名-（给动态导入文件取名称 替代 随机数命名）]
    给打包分割文件（及动态导入的js文件）进行重命名

    // /* webpackChunkName: "math" */ 这是webpack命名的方式，也叫魔法命名。此时打包的就不是587这种随机数了，而是math.js
    import(/* webpackChunkName: "math" */ "./js/math").then(({ mul }) => { // import有波浪线是eslint不能识别动态导入，需要额外配置plugins: ["import"]
        console.log('/js/math模块加载成功', mul(1, 3))
    })

    chunkFilename: 'static/js/[name].js', // 给打包输出的其他文件命名 比如动态导入，分割打包

##### [47-高级-Code Split-统一命名-（容易区分文件来源 兼容多入口）]
    对图片、图标、css、js等输出文件进行统一命名配置

    出口文件
        filename: "static/js/[name].js", // 兼容多入口。打包的主文件
        chunkFilename: 'static/js/[name].chunk.js', // 给打包输出的其他文件命名 比如动态导入，分割打包。加个.chunk区分打包的额外文件
    图片、字体
        assetModuleFilename: "static/media/[name].[hash][ext]", // 图片、字体等资源命名方式（注意用hash）
    css打包输出 
        filename: "static/css/[name].css", // 兼容多入口
        chunkFilename: "static/css/[name].chunk.css", // 暂时用不到

    在开发模式下配置同样

#### [48-高级-Preload和Prefetch-（用浏览器空闲时间加载后续要使用的资源，避免使用时加载卡顿）]

    安装npm i @vue/preload-webpack-plugin -D
    配置
        const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
        new PreloadWebpackPlugin({
            rel: "preload", // preload兼容性更好
            as: "script",
            // rel: 'prefetch' // prefetch兼容性更差
        }),

    可以通过这个网站查看兼容性https://caniuse.com/?search=Preload
    打包后的html 可以看到用了 rel="preload" as="script"
        <script defer="defer" src="static/js/main.js"></script>
        <link href="static/js/math.chunk.js" rel="preload" as="script">
        <link href="static/css/main.css" rel="stylesheet">
    也可以在浏览器中查看 加载的优先级

#### [49-高级-Network Cache-（更新缓存 - 只更新修改的文件）]
    1. 当文件发生变化通过后缀名hash值的变化去更新缓存，去加载新的资源
            [contenthash:8] 只要文件发生变化hash值就会发生变化。
    2. 一个文件发生变化只更新这个文件的缓存，其他文件缓存不失效。
        把文件之间依赖的hash值提取成一个单独的文件保管，这样当a文件发生变化，只会a和runtime文件发生变化，并不会影响其他文件。
            runtimeChunk: {
                name: (entrypoint) => `runtime~${entrypoint.name}`, // runtime文件命名规则
            },

    1. 将来开发时我们对静态资源会使用缓存来优化，这样浏览器第二次请求资源就能读取缓存了，速度很快。
    但是这样的话就会有一个问题, 因为前后输出的文件名是一样的，都叫 main.js，一旦将来发布新版本，因为文件名没有变化导致浏览器会直接读取缓存，不会加载新资源，项目也就没法更新了。
    所以我们从文件名入手，确保更新前后文件名不一样，这样就可以做缓存了。
        contenthash 根据文件内容生成 hash 值，只有文件内容变化了，hash 值才会变化。所有文件 hash 值是独享且不同的。
        filename: "static/js/[name].[contenthash:8].js"
    
    2. 问题：
        当我们修改 math.js 文件再重新打包的时候，因为 contenthash 原因，math.js 文件 hash 值发生了变化（这是正常的）。
        但是 main.js 文件的 hash 值也发生了变化，这会导致 main.js 的缓存失效。明明我们只修改 math.js, 为什么 main.js 也会变身变化呢？

    原因：
        更新前：math.xxx.js, main.js 引用的 math.xxx.js
        更新后：math.yyy.js, main.js 引用的 math.yyy.js, 文件名发生了变化，间接导致 main.js 也发生了变化
    解决：
        将 hash 值单独保管在一个 runtime 文件中。
        我们最终输出三个文件：main、math、runtime。当 math 文件发送变化，变化的是 math 和 runtime 文件，main 不变。

    runtime 文件只保存文件的 hash 值和它们与文件关系，整个文件体积就比较小，所以变化重新请求的代价也小。
        // 提取runtime文件
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`, // runtime文件命名规则
        },

    





#### [50-高级-解决js兼容性问题CoreJS-（自动按需加载 解析兼容性语法）]
    #为什么
        过去我们使用 babel 对 js 代码进行了兼容性处理，其中使用@babel/preset-env 智能预设来处理兼容性问题。

        它能将 ES6 的一些语法进行编译转换，比如箭头函数、点点点运算符等。但是如果是 async 函数、promise 对象、数组的一些方法（includes）等，它没办法处理。

        所以此时我们 js 代码仍然存在兼容性问题，一旦遇到低版本浏览器会直接报错。所以我们想要将 js 兼容性问题彻底解决

    #是什么
        core-js 是专门用来做 ES6 以及以上 API 的 polyfill。

        polyfill翻译过来叫做垫片/补丁。就是用社区上提供的一段代码，让我们在不兼容某些新特性的浏览器上，使用该新特性。
    
    解决Eslint 会对 Promise 报错。安装
        npm i @babel/eslint-parser -D
        parser: "@babel/eslint-parser", // 支持最新的最终 ECMAScript 标准
    
    下载包
        npm i core-js
    全部引入 import "core-js";
    手动按需引入 import "core-js/es/promise";
    自动按需引入 babel.config.js
            // 智能预设：能够编译ES6语法
            presets: [
                [
                    "@babel/preset-env",
                    // 按需加载core-js的polyfill
                    { useBuiltIns: "usage", corejs: { version: "3", proposals: true } },
                ],
            ],
    此时打包后es6之后的新语法就可以被解析了，会自动分析代码中存在兼容性问题的代码进行编译。
    此时就会自动根据我们代码中使用的语法，来按需加载相应的 polyfill 了。




#### [51-高级-PWA-（离线访问项目）]
    #为什么 （兼容性差）
        开发 Web App 项目，项目一旦处于网络离线情况，就没法访问了。
        我们希望给项目提供离线体验。

    #是什么
        渐进式网络应用程序(progressive web application - PWA)：是一种可以提供类似于 native app(原生应用程序) 体验的 Web App 的技术。
        其中最重要的是，在 离线(offline) 时应用程序能够继续运行功能。
        内部通过 Service Workers 技术实现的。

    #怎么用：通过一个插件并在js中加载一段代码
        npm i workbox-webpack-plugin -D
        修改配置
        const WorkboxPlugin = require("workbox-webpack-plugin");
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助快速启用 ServiceWorkers
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true,
        }),
        修改main.js
            if ("serviceWorker" in navigator) {
                window.addEventListener("load", () => {
                    navigator.serviceWorker
                    .register("/service-worker.js")
                    .then((registration) => {
                        console.log("SW registered: ", registration);
                    })
                    .catch((registrationError) => {
                        console.log("SW registration failed: ", registrationError);
                    });
                });
            }
        打包npm run build
        此时如果直接通过 VSCode 访问打包后页面，在浏览器控制台会发现 SW registration failed。
        因为我们打开的访问路径是：http://127.0.0.1:5500/dist/index.html。此时页面会去请求 service-worker.js 文件，请求路径是：http://127.0.0.1:5500/service-worker.js，这样找不到会 404。
        实际 service-worker.js 文件路径是：http://127.0.0.1:5500/dist/service-worker.js。

        解决路径问题：
            npm i serve -g
            运行serve dist

        出现就成功了
             Serving!                                  │
            │                                          │
            │   - Local:    http://localhost:3000      │
            │   - Network:  http://172.18.22.11:3000   │
            │                                          │
            │   Copied local address to clipboard! 

        在浏览器的Application里可以看Service Workers的情况
        在Cache Storage里也可以看到

### [52-高级-总结]






