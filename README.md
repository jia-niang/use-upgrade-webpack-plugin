# `use-upgrade-webpack-plugin`

配合 `use-upgrade` 使用，令开发者可以手动跳过某次版本更新。

# 用法

配置 webpack，添加此插件：

```js
const UseUpgradeWebpackPlugin = require('use-upgrade-webpack-plugin')

new UseUpgradeWebpackPlugin({
  // 此配置需要和 `use-upgrade` 中的配置项保持一致
  skipMetaName: 'useUpgradeSkip',

  // 是否默认跳过所有更新提示
  defaultSkip: false,
})
```

使用：

配置项 `defaultSkip` 表示是否跳过版本更新提示，默认 `false` 表示每次更新都会提示用户；
你可以在打包指令中添加 `--no-upgrade` 来跳过某一次。

打包指令添加 `--no-upgrade` 可以强制跳过某次更新的版本提示；
打包指令添加 `--use-upgrade` 可以强制某次更新展示版本提示。
