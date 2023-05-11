const os = require("os");
// Node.js的核心模块，专门用来处理文件路径
const path = require("path");
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin"); // 12. 压缩插件 内置了 不需要下载
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin"); // 图片压缩

// cpu核数
const threads = os.cpus().length;

// 获取处理样式的Loaders
const getStyleLoaders = (preLoader) => {
  return [ // 执行顺序 从后往前
    MiniCssExtractPlugin.loader, // 将js中css通过创建style标签添加html文件中生效
    "css-loader", // 将css资源编译成commonjs的模块打包到js中
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preLoader
  ].filter(Boolean) // filter过滤不传参的
}

module.exports = {
  // 入口
  // 相对路径和绝对路径都行
  entry: "./src/main.js",
  // 输出
  output: {
    // path: 所有文件输出目录，必须是绝对路径
    // path.resolve()方法返回一个绝对路径
    // __dirname 当前文件的文件夹绝对路径
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/main.js", // 入口文件打包输出文件名。将 js 文件输出到 static/js 目录中
    clean: true, // 自动清空上次打包的内容
  },
  // 加载器
  module: {
    rules: [
      {
        oneOf: [ // 8. 使用后打包速度明显快了
          // 1. 样式资源处理
          {
            test: /\.css$/, // 只检测.css文件
            use: getStyleLoaders()
          },
          {
              test: /\.less$/,
              use: getStyleLoaders('less-loader')
          },
          {
              test: /\.s[ac]ss$/,
              use: getStyleLoaders('sass-loader'),
          },
          {
              test: /\.styl$/,
              use: getStyleLoaders('stylus-loader'), // stylus-loader将 Styl 文件编译成 Css 文件
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
          // 5. babel 将es6转成低版本js语法
          {
            test: /\.js$/,
            // exclude: /(node_modules)/, // 排除node_modules中的js文件（这些文件不处理）
            include: path.resolve(__dirname, "../src"), // 9. 只处理src下的文件，其他文件不处理
            // // use: {
            //   loader: 'babel-loader',
            // //   options: {
            // //     presets: ['@babel/preset-env'] // 可以写在这里，也可以单独写入babel.config.js配置文件
            // //   }
            // // }
            // options: {
            //   cacheDirectory: true, // 开启babel编译缓存
            //   cacheCompression: false, // 缓存文件不要压缩
            // },
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
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                },
              }
            ],
          }
        ]
      }
    ],
  },
  // 插件：需要安装后引入才能用
  plugins: [
    // 4. eslint插件 检测文件
    new ESLintPlugin({
      context: path.resolve(__dirname, "../src"), // 检测哪些文件，src下的
      exclude: "node_modules", // 9. 默认值 排除node_modules文件不处理
      cache: true, // 10. 开启缓存
      // 10. 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
      threads, // 11. 开启多进程和线程数量
    }),
    // 6. Html插件 自动生成一个html并自动引入js资源
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html") 
    }),
    // 7. 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/main.css",
    }),
    // new CssMinimizerPlugin(),
    // new TerserPlugin({
    //   parallel: threads // 开启多进程
    // }) // webpack5官方 建议放入minimizer中压缩
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(), // css压缩也可以写到optimization.minimizer里面，效果一样的
      new TerserPlugin({ // js压缩，当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
        parallel: threads // 开启多进程
      }),
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
    ],
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 其他的都用默认值
    }
  },
  // 模式
  mode: "production", // 开发模式
  devtool: "source-map", // 错误代码编译后浏览器可以定位到具体的文件、行、列 打包后的js文件夹会生成一个main.js.map文件
};

// 生产模式打包 npx webpack --config ./config/webpack.prod.js