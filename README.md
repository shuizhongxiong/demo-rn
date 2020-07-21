# demo-rn

[React Native](https://reactnative.cn/docs/getting-started) 个人练习项目

## 环境搭建

[官网参考](https://reactnative.cn/docs/getting-started)

注意：

1、目标平台为 Android 时，需替换阿里云提供的 maven 镜像，将 android/build.gradle 中的 jcenter()和 google()分别替换为 maven { url 'https://maven.aliyun.com/repository/jcenter' }和 maven { url 'https://maven.aliyun.com/repository/google' }（注意有多处需要替换）。

2、执行 yarn ios/android 成功后，仍需执行 yarn start 否则会提示 bundle 错误。

3、真机运行时，需先打开开发者模式，开启 USB 调试及 USB 安装。重新执行 yarn ios/android，安装应用（第一次安装时真机上不能有重名应用，否则会安装失败），安装成功后，需退出应用，执行 yarn start 成功后，再打开应用。

## 第三方依赖

```bash
# 字体 参考 https://github.com/oblador/react-native-vector-icons
yarn add react-native-vector-icons
yarn add @types/react-native-vector-icons -D

# 解决路径引入问题 参考 https://github.com/entwicklerstube/babel-plugin-root-import
yarn add babel-plugin-root-import -D

# 支持 web 端
yarn add react-dom react-native-web

yarn add react-native-modal -D
```
