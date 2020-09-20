# demo-rn

[React Native](https://reactnative.cn/docs/getting-started) 个人练习项目

## 创建项目

```bash
npx react-native init MyApp --template react-native-template-typescript
```

## 环境搭建

[官网参考](https://reactnative.cn/docs/getting-started)

注意：

1、目标平台为`Android`时，需替换阿里云提供的`maven`镜像，将`android/build.gradle`中的`jcenter()`和`google()`分别替换为`maven { url 'https://maven.aliyun.com/repository/jcenter' }`和`maven { url 'https://maven.aliyun.com/repository/google' }`（注意有多处需要替换）。

2、执行`yarn ios/android`成功后，仍需执行`yarn start`否则会提示`bundle`错误。

3、真机运行时，安卓手机需先打开开发者模式，开启 USB 调试及 USB 安装。重新执行`yarn ios/android`，安装应用（第一次安装时真机上不能有重名应用，否则会安装失败），安装成功后，需退出应用，再执行`yarn start`，成功后打开应用。

4、如果更换了网络，可以执行`adb reverse tcp:8081 tcp:8081`，重启即可。

5、如果遇到本地更改后，`reload` 却不生效，可以看一下项目根目录下`.git`文件里是否有`index.lock`文件，如果有请删掉再试。

## 第三方依赖

```bash
# 路由 https://reactnavigation.org/docs/getting-started
# 注意屏幕适配 https://reactnavigation.org/docs/handling-safe-area/#summary
yarn add react-navigation
yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

```bash
# 第三方组件库 https://rn.mobile.ant.design/docs/react/introduce-cn
yarn add @ant-design/react-native
react-native link @ant-design/react-native

# 安装peer依赖，安装完依赖后需要到 iOS 目录 `pod install`(auto linking)，Android 不需要手动处理
yarn add @react-native-community/cameraroll @react-native-community/picker @react-native-community/segmented-control @react-native-community/slider @react-native-community/viewpager @react-native-community/async-storage

# 手动链接字体图标
npx react-native link

# 按需加载
yarn add babel-plugin-import -D
# .babelrc or babel-loader option
{
  "plugins": [
    ["import", { libraryName: "@ant-design/react-native" }] // 与 Web 平台的区别是不需要设置 style
  ]
}
```

```bash
# 字体 参考 https://github.com/oblador/react-native-vector-icons
yarn add react-native-vector-icons
yarn add @types/react-native-vector-icons -D

# 解决路径引入问题 参考 https://github.com/entwicklerstube/babel-plugin-root-import
yarn add babel-plugin-root-import -D

# lottie
# 安装参考 https://github.com/react-native-community/lottie-react-native
# 用法参考 https://github.com/react-native-community/lottie-react-native/blob/master/docs/typescript.md
yarn add lottie-react-native
yarn add lottie-ios@3.1.8
cd ios
pod install

yarn add react-native-modal -D
```
