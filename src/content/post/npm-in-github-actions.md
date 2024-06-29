---
date: '2022-06-23 00:00:00'
description: 本文介绍了如何使用GitHub Actions自动发布npm包。文章包括配置文件、package.json、tsconfig.json以及自动化发布的步骤。通过这些配置，可以在GitHub上创建release版本时自动将构建文件夹中的压缩包发布到npm。
urlname: npm-in-github-actions
title: Github Actions 发布 npm 包
tags:
  - 赛博空间
updated: '2024-06-29 23:37:00'
draft: false
---

## 引言


这篇文章我其实最想解决的是【如何简单快速打造一个能同时导出`cjs`和`esm`的`npm`包】。在看了网上的各种教程，都没我想要的。要么就是利用`rollup`来构建，但是配置问题和兼容性问题又很棘手。最后是在看了[typedi](https://github.com/typestack/typedi)的代码仓库，发现很适合我，就借鉴过来了。 因为我的`npm`包是在`node`端使用的，所以只需要`cjs`和 esm`类型`的包就行，而`ts-node`就刚刚好能满足我的需求，所以我也没有使用其他构建工具。


## 配置


### 目录


项目关键文件如下：


```text
node-agile-client
|--.github
|  |--workflows
|  |	|--cd.yml
|--build
|  |--cjs
|  |	|--index.js
|  |--esm5
|  |	|--index.js
|  |--types
|  |	|--index.d.ts
|  |--package.json
|--src
|  |--index.ts  
|--package.json
|--tsconfig.json
|--tsconfig.esm5.json
|--tsconfig.cjs.json
|--tsconfig.types.json
```

- .github：github actions 配置文件
- build：文件夹是打包后的产物，也是发不到 npm 上的文件夹，仓库 src 的文件是不会上传到 npm 的
	- cjs：CommonJS 模块的代码
	- esm5：ES Modules 模块的代码
	- types：类型声明文件
	- package.json：对 npm 包的定义说明
- src：项目文件代码
- package.json：对项目文件的定义说明及命令行操作
- tsconfig.json：ts 编译配置主体文件
- tsconfig.esm5.json：编译成 ems5 的编译配置
- tsconfig.cjs.json：编译成 cjs 的编译配置
- tsconfig.types.json：编译成类型声明文件的编译配置

### package.json


这是一份最终配置，具体代码：[node-agile-client](https://github.com/LetTTGACO/node-agile-client)


```json
{
  "name": "node-agile-client",
  "version": "0.0.3",
  "description": "AgileConfig的node客户端",
  "main": "./cjs/index.js",
  "module": "./esm5/index.js",
  "typings": "./types/index.d.ts",
  "scripts": {
    "prebuild": "rimraf build",
    "build": "npm run build:cjs && npm run build:esm5 && npm run build:types",
    "build:esm5": "tsc --project tsconfig.esm5.json",
    "build:cjs": "tsc --project tsconfig.cjs.json",
    "build:types": "tsc --project tsconfig.types.json",
    "postbuild": "cp LICENSE build/LICENSE && cp README.md build/README.md && cp package.json build/package.json"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/LetTTGACO/node-agile-client.git"
  },
  "tags": [
    "agile"
  ],
  "keywords": [
    "配置中心"
  ],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/LetTTGACO/node-agile-client/issues"
  },
  "homepage": "https://github.com/LetTTGACO/node-agile-client#readme",
  "dependencies": {
    "axios": "^0.26.1",
    "fs-extra": "^10.1.0",
    "md5": "^2.3.0",
    "path": "^0.12.7",
    "ws": "^8.5.0"
  },
  "devDependencies": {
    "@types/fs-extra": "^9.0.13",
    "@types/md5": "^2.3.2",
    "@types/ws": "^8.5.3",
    "rimraf": "^3.0.2",
    "ts-node": "^10.8.1",
    "typescript": "^4.7.4"
  }
}
```


因为这个`package.json`最后会被拷贝到`build`文件夹中去，所以以下配置都是基于`build`目录下的配置选项


| 关键参数    | 值                  | 备注             |
| ------- | ------------------ | -------------- |
| main    | ./cjs/index.js     | commonjs 的入口文件 |
| module  | ./esm5/index.js    | esmodule 的入口文件 |
| typings | ./types/index.d.ts | 类型声明的入口文件      |


### tsconfig.json


```json
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "target": "es2018",
    "lib": ["es2018"],
    "outDir": "build/node",
    "rootDirs": ["./src"],
    "strict": true,
    "sourceMap": true,
    "inlineSources": true,
    "removeComments": false,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "forceConsistentCasingInFileNames": true
  },
  "exclude": ["build", "node_modules", "sample", "**/*.spec.ts", "test/**"]
}
```


### tsconfig.cjs.json


```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "CommonJS",
    "outDir": "build/cjs"
  },
}
```


### tsconfig.esm5.json


```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "ES2015",
    "target": "ES5",
    "outDir": "build/esm5",
  },
}
```


### tsconfig.types.json


```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationOnly": true,
    "outDir": "build/types",
  },
}
```


## 自动化发布


在项目根目录新建`.github/workflows/cd.yml`，并配置`github actions`，`secrets.NPM_PUBLISH_TOKEN`需要去`npm`官网生成`token`并配置到`github`仓库的`Actions secrets`中。


```yaml
name: CD
on:
  release:
    types: [created]
jobs:
  publish:
    name: Publish to NPM
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 'lts/*'
          registry-url: https://registry.npmjs.org
      - run: npm ci --ignore-scripts
      - run: npm run build:cjs
      - run: npm run build:esm5
      - run: npm run build:types
      - run: cp LICENSE build/LICENSE
      - run: cp README.md build/README.md
      - run: jq 'del(.devDependencies) | del(.scripts)' package.json > build/package.json
      - run: npm publish ./build
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_PUBLISH_TOKEN }}
```


## 大功告成！


经过以上配置，就可以在`github`创建`release`版本时触发`actions`，将`build`文件夹中的压缩包发布到`npm`了！

