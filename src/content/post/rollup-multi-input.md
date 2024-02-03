---
date: '2023-09-03 00:00:00'
description: ''
urlname: rollup-multi-input
title: Rollup打包——多入口配置
tags:
  - Rollup
  - 打包构建
updated: '2024-02-03 01:56:00'
draft: false
---

## 适用场景


当开发一个组件包时，由于平台的差异，所以在某些实现上需要实现两套。


例如，`multi-input`是一个可以同时用于微信小程序和浏览器环境的`npm`库，其中的`request`请求库在不同客户端的实现不一样。在微信环境下用的是`wx.request`，在浏览器环境用的是`fetch`。


但是在微信环境使用时，我不希望我引入的代码中包含用不到的适用于浏览器环境的`fetch`等相关代码。再加上微信小程序对于代码体积的严格限制。所以我希望`multi-input`再引入的时候可以有多个入口，主逻辑代码直接引入`multi-input`，`request`库相关逻辑单独有个入口。


解决办法有两种

1. 将`request`库相关逻辑抽离成另外一个`npm`包
2. `rollup`打包多入口文件并配合`package.json`中的`exports`字段实现

本文介绍第二种方法，使用示例如下：


```javascript
import { TestCore } from 'multi-input' // 引用的是 dist 文件中的代码
import { WebRequest } from 'multi-input/lib/web-request'// 引用的是 lib 文件中的代码
import { WxRequest } from 'multi-input/lib/wx-request' // 引用的是 lib 文件中的代码
```


这样在微信小程序端使用并打包时，就不会将`WebRequest`相关代码打包到微信小程序代码中，实现按需引入。


## 代码结构


｜ 代码源码：[multi-input](https://github.com/LetTTGACO/build-project/tree/master/rollup/multi-input)


`multi-input`库代码结构如下


```text
.
|-multi-input
  |-.gitignore
  |-adapter // 这里面就是不同客户端的request请求库的实现的源代码
  |  |-web-request.ts
  |  |-wx-request.ts
  |-src
  |  |-core.ts
  |  |-index.ts
  |  |-manager
  |  |  |-message.ts
  |  |-utils
  |  |  |-url.ts
  |-rollup.config.js // rollup打包配置
  |-tsconfig.json
  |-package.json
```


## 注意事项


要想要外部以这样的方式引用，有几个必要条件：

1. 代码隔离：`adapter`下的文件只能引用`adapter`目录中的文件，`src`下中的文件只能引用`src`中的文件
2. 打包产物路径存在：`multi-input`根目录下必须存在打包后的`lib/web-request`文件
3. 路径映射：`package.json`中的`exports`字段中需要有`lib/web-request`的路径映射
4. 多入口打包：`rollup`需要分别打包`src`和`adapter`下的文件

## Rollup配置


功能点如下

- 将`multi-input`以`esm`模式导出到`dist`下
- `adapter`下的请求库以`esm`模式导出到`lib`下
- 打包后的类型声明文件和`js`文件和原文件目录结构保持一致

```typescript
// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs"; // 解析js
import typescript from "@rollup/plugin-typescript"; // 解析ts

const getBasePlugins = (tsConfig) => {
  return [
    resolve(),
    commonjs(),
    typescript({
      ...tsConfig,
    }),
  ];
};

export default [
  // 主逻辑代码打包
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "esm",
      exports: "named",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: true,
    },
    plugins: [
      ...getBasePlugins({
        outDir: "dist",
        declaration: true,
        filterRoot: "src",
      }),
    ],
  },
  // adapter导出
  {
    input: {
      "web-request": "adapter/web-request.ts",
      "wx-request": "adapter/wx-request.ts",
    },
    output: [
      {
        dir: "lib",
        format: "esm",
        sourcemap: true
      },
    ],
    plugins: [
      ...getBasePlugins({
        outDir: "lib",
        declaration: true,
        filterRoot: "adapter",
      }),
    ],
  },
];
```


## package.json配置


```typescript
{
  "name": "multi-input",
  "version": "1.0.0",
  "description": "多入口打包",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "typings": "dist/index.d.ts",
  "scripts": {
    "build": "rollup -c rollup.config.js --bundleConfigAsCjs",
    "clean": "rimraf -rf ./dist ./lib"
  },
  "files": ["dist", "lib"],
  "exports": {
    // 定义multi-input路径引用文件
    ".": "./dist/index.js",
    // 定义multi-input/lib/web-request路径引用文件
    "./lib/web-request": {
      "import": "./lib/web-request.js",
      "types": "./lib/web-request.d.ts"
    },
    // 定义multi-input/lib/wx-request路径引用文件
    "./lib/wx-request": {
      "import": "./lib/wx-request.js",
      "types": "./lib/wx-request.d.ts"
    }
  },
  "author": "1874",
  "license": "ISC",
  "devDependencies": {
    "@rollup/plugin-commonjs": "^25.0.4",
    "@rollup/plugin-node-resolve": "^15.2.1",
    "@rollup/plugin-typescript": "^11.1.3",
    "rimraf": "^5.0.1",
    "rollup": "^3.28.1",
    "tslib": "^2.6.2",
    "typescript": "^5.2.2"
  }
}
```


## 打包后代码结构


```typescript
.
|-multi-input
  |-dist // 主包打包产物
  |  |-core.d.ts
  |  |-core.js
  |  |-core.js.map
  |  |-index.d.ts
  |  |-index.js
  |  |-index.js.map
  |  |-manager
  |  |  |-message.d.ts
  |  |  |-message.js
  |  |  |-message.js.map
  |  |-utils
  |  |  |-url.d.ts
  |  |  |-url.js
  |  |  |-url.js.map
  |-lib // request 插件打包产物
  |  |-tslib.es6-4083ca3c.js
  |  |-tslib.es6-4083ca3c.js.map
  |  |-web-request.d.ts
  |  |-web-request.js
  |  |-web-request.js.map
  |  |-wx-request.d.ts
  |  |-wx-request.js
  |  |-wx-request.js.map
  |-adapter // request 插件源码
  |  |-web-request.ts
  |  |-wx-request.ts
  |-src // 主包源码
  |  |-core.ts
  |  |-index.ts
  |  |-manager
  |  |  |-message.ts
  |  |-utils
  |  |  |-url.ts
  |-package.json
  |-pnpm-lock.yaml
  |-rollup.config.js
  |-tsconfig.json
```


## 参考资料

- [Rollup中文文档](https://cn.rollupjs.org/introduction/)
- [rollup/plugin-typescript插件配置](https://www.npmjs.com/package/@rollup/plugin-typescript)
