# webpack_code
尚硅谷的webpack教程https://yk2012.github.io/sgg_webpack5/intro/


main.js 打包入口文件
public 静态资源
package.json 包描述文件 初始化npm init -y
npm i webpack webpack-cli -D 下载依赖
npx 会将.bin目录临时添加为环境变量，这样就可以访问环境变量里的应用程序
npx webpack ./src/main.js --mode=development 开发
npx webpack ./src/main.js --mode=production  生产
