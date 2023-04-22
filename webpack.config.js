// Node.js的核心模块，专门用来处理文件路径
const path = require("path");

module.exports = {
  // 入口
  // 相对路径和绝对路径都行
  entry: "./src/main.js",
  // 输出
  output: {
    // path: 文件输出目录，必须是绝对路径
    // path.resolve()方法返回一个绝对路径
    // __dirname 当前文件的文件夹绝对路径
    path: path.resolve(__dirname, "dist"),
    filename: "main.js", // filename: 输出文件名
  },
  // 加载器
  module: {
    rules: [
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
            use: ["style-loader", "css-loader", "sass-loader"], // 将sass编译成css
          },
      ],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "development", // 开发模式
};
