module.exports = {
    // 预设
    // presets: [
    //     '@babel/preset-env',
    //     // 按需加载core-js的polyfill
    //     { 
    //         useBuiltIns: "usage",
    //         corejs: 3
    //     },
    // ], // 智能预设，可以编译es6的语法
    "presets": [ ["@babel/preset-env", { "useBuiltIns": "usage", "corejs": 3 }] ]
};
