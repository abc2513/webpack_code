module.exports = {
    // 继承其他规则：继承 Eslint 规则
    extends: ["eslint:recommended"],
    env: {
      node: true, // 启用node中全局变量
      browser: true, // 启用浏览器中全局变量
    },
    // 解析选项
    parserOptions: {
      ecmaVersion: 6, // ES6 语法版本
      sourceType: "module", // ES6 模块化
    },
    // 具体检查规则
    rules: {
      "no-var": 2, // 不能使用 var 定义变量
    },
    plugins: ["import"] // 解决动态导入语法报错
  };
  