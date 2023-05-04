// Node.js的核心模块，专门用来处理文件路径
const path = require("path");
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口
  // 相对路径和绝对路径都行
  entry: "./src/main.js",
  // 输出
  output: {
    // path: 所有文件输出目录，必须是绝对路径
    // 开发环境没有输出
    path: undefined,
    filename: "static/js/main.js", // 入口文件打包输出文件名。将 js 文件输出到 static/js 目录中
  },
  // 加载器
  module: {
    rules: [
      {
        oneOf: [
          // 1. 样式资源处理
          {
            test: /\.css$/, // 只检测.css文件
            use: [ // 执行顺序 从后往前
              "style-loader", // 将js中css通过创建style标签添加html文件中生效
              "css-loader" // 将css资源编译成commonjs的模块打包到js中
              ],
          },
          {
              test: /\.less$/,
              use: [
                // compiles Less to CSS
                'style-loader',
                'css-loader',
                'less-loader', // 将less文件编译成css文件
              ],
          },
          {
              test: /\.s[ac]ss$/,
              use: ["style-loader", "css-loader", "sass-loader"], // sass-loader将sass编译成css
          },
          {
              test: /\.styl$/,
              use: ["style-loader", "css-loader", "stylus-loader"], // stylus-loader将 Styl 文件编译成 Css 文件
          },
          // 2. 图片资源处理：转base64，定义打包输出路径
          {
              test: /\.(png|jpe?g|gif|webp|svg)$/,
              type: "asset",
              parser: {
                  dataUrlCondition: {
                      // 优点减少请求数量，缺点体积变大一点。
                    maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
                  }
              },
              generator: {
                  // 将图片文件输出到 static/imgs 目录中
                  // 将图片文件命名 [hash:8][ext][query]
                  // [hash:8]: hash值取8位
                  // [ext]: 使用之前的文件扩展名
                  // [query]: 添加之前的query参数
                  filename: "static/imgs/[hash:8][ext][query]",
              },
          },
          // 3. 字体资源处理：ttf|woff2?  4. 音视频|map4|map3|avi
          {
              test: /\.(ttf|woff2?|map4|map3|avi)$/,
              type: "asset/resource", // 对文件原封不动的输出
              generator: {
                  // 打包输出名称
                  filename: "static/media/[hash:8][ext][query]",
              },
          },
          // type: "asset/resource" 相当于file-loader, 将文件转化成 Webpack 能识别的资源，其他不做处理
          // type: "asset" 相当于url-loader, 将文件转化成 Webpack 能识别的资源，同时小于某个大小的资源会处理成 data URI 形式
          
          // 5. babel 将es6转成低版本js语法
          {
            test: /\.js$/,
            exclude: /(node_modules)/, // 排除node_modules中的js文件（这些文件不处理）
            // use: {
              loader: 'babel-loader',
            //   options: {
            //     presets: ['@babel/preset-env'] // 可以写在这里，也可以单独写入babel.config.js配置文件
            //   }
            // }
          }
        ]
      }
    ],
  },
  // 插件：需要安装后引入才能用
  plugins: [
    // 4. eslint插件 检测文件
    new ESLintPlugin({
      context: path.resolve(__dirname, "../src") // 检测哪些文件，src下的
    }),
    // 6. Html插件 自动生成一个html并自动引入js资源
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html") 
    })
  ],
  // 开发服务器：此时在终端 npx webpack server 改动代码保存后会自动刷新。特点：不会输出打包资源，在内存中编译打包。
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器的端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 局部更新css样式，不再编译刷新整个页面
  },
  // 模式
  mode: "development", // 开发模式
  devtool: "cheap-module-source-map", // 错误代码编译后浏览器可以定位到具体的文件及行
};

// 打包运行 npx webpack serve --config ./config/webpack.dev.js
