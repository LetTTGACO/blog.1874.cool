---
date: '2025-03-26 08:00:00'
description: 本文分析了 CJS 和 ESM 模块的混合开发，涵盖了 NPM 库维护者和使用者的不同场景，提供了导出和使用模块的最佳实践，以及如何在项目中有效地管理模块类型和文件后缀。全面拥抱 ESM 是未来的趋势。
hidden: false
urlname: esm-commonjs
title: 从多场景分析 ESM 和 CJS 混合开发
tags:
  - 赛博空间
updated: '2025-03-27 22:47:00'
draft: false
---

## 前言


本文将从 2 个视角、12 种场景来分析和使用 ESM 和 CJS 模块：

1. NPM 库维护者
	1. 在 CJS 项目中导出 CJS 模块
	2. 在 CJS 项目中导出 ESM 模块
	3. 在 ESM 项目中导出 ESM 模块
	4. 在 ESM 项目中导出 CJS 模块
2. 使用者
	1. 在 CJS 项目中使用内部的 CJS 模块
	2. 在 CJS 项目中使用外部 npm 库的 CJS 模块
	3. 在 CJS 项目中使用内部的 ESM 模块
	4. 在 CJS 项目中使用外部 npm 库的 ESM 模块
	5. 在 ESM 项目中使用内部的 ESM 模块
	6. 在 ESM 项目中使用外部 npm 库的 ESM 模块
	7. 在 ESM 项目中使用内部的 CJS 模块
	8. 在 ESM 项目中使用外部 npm 库的 CJS 模块

> 完整项目测试地址：[https://github.com/LetTTGACO/esm-and-cjs](https://github.com/LetTTGACO/esm-and-cjs)


## 基础知识——CJS 模块导出


CJS 模块导出一共有两种方式：`module.exports` 和 `exports`


### 本质区别

- `module.exports` 是模块系统实际导出的对象
- `exports` 只是 `module.exports` 的一个引用（相当于 `let exports = module.exports`）

### 使用差异 


```javascript
// 以下两种方式是等价的：
exports.foo = 'bar';
// 等同于
module.exports.foo = 'bar';

// 但直接赋值时会有区别：
exports = { foo: 'bar' };  // ❌ 不会生效（改变了exports的引用）
module.exports = { foo: 'bar' };  // ✅ 正确方式
```


### 注意事项

1. 直接赋值时：
	1. 只能使用 `module.exports` 进行整体导出 ✅
	2. 使用 `exports = ...` 会切断引用关系，导致导出失败 ❌
2. 混合使用时：
	1. 如果同时使用了 `module.exports` 和 `exports.add`，只有最后设置的 module.exports 会生效。

	```javascript
	// ... 其他代码 ...
	
	// ❌ 错误示例（exports赋值会被覆盖）
	exports = { a: 1 };
	module.exports = { b: 2 }; // 只有这个会生效
	
	// ✅ 正确混合使用方式
	module.exports = { b: 2 }; // 主导出
	module.exports.a = 1;      // 添加属性
	```


### 最佳实践

1. 统一使用 `module.exports` 更安全可靠
2. 如果要使用 `exports`，只用于添加属性`（exports.xxx = ...）`
3. 更具体的实践可参考下面的 npm 库维护者视角

## 基础知识——ESM 模块导出


esm 模块导出则简单很多，只需要使用 `export`进行导出即可


### 命名导出（推荐多导出时使用）


```javascript
// 导出变量
export const name = 'value'; 

// 导出函数
export function fn() {}  

// 导出后重命名
export { name as newName };
```


### 默认导出


```javascript
// 导出单个值
export default function() {}

// 或者
const obj = {};
export default obj;
```


### 混合导出 


```javascript
// 同时有默认导出和命名导出
export default esmFnDefault;
export { esmFn, esmVar, EsmClass };
```


## 基础知识——package.json 与 ESM 和 CJS 的关系

1. `package.json` 中`type=commonjs`或不指定。该项目下所有`.js`文件均被解释使用 CJS 模块加载。如果想使用 ESM 模块，则该文件必须采用`.mjs`后缀名（外部 npm 包可省略）。
2. `package.json` 中`type=module`。该项目下所有`.js`文件的**独立加载**均被解释使用 ESM 模块，如果想使用 CJS 模块，则该文件必须采用`.cjs`后缀名（外部 npm 包可省略）。
3. 对于 `NodeJs@22.12.0`以下版本，CJS 模块的`require`命令不能加载`.mjs`文件，会报错，只有动态`import`命令才可以加载`.mjs`文件。但动态`import`命令是异步的，需要 `Promise` 来处理，详细使用可参考下文使用者视角
4. 对于`NodeJs@22.12.0`及以上版本，CJS 模块`require`命令可以加载`.mjs`文件，但需要指定后缀名（外部 npm 包可省略）。
5. **ESM 模块的****`import`****命令可以加载 CJS 模块，但加载任何 ESM 模块或 CJS 都需要指定文件后缀名**（外部 npm 包可省略）**。**加载外部 npm 库时，其实 `main` 或者 `export` 字段都已经指定了文件后缀，所以不需要用户手动填写。这也解释了第 2 点中的独立加载，一旦要使用 `import`命令，则需要指定文件后缀。

> 相关新闻：[Nodejs@22.12.0已支持 require ESM 模块](https://nodejs.org/en/blog/release/v22.12.0)


## NPM 库维护者视角


### 在 CJS 项目中导出 CJS 模块


**作为 NPM 库来说**


1. 如果你的库只需要提供一个入口函数/对象/变量供外部使用。推荐使用 `module.exports` 直接导出这个入口函数/对象/变量。


```javascript
function cjsFnDefault() {
  console.log("cjsFnDefault", "----cjs:module.exports")
  return "cjsFnDefault----cjs:module.exports"
}

// 只导出一个默认导出即可
module.exports = cjsFnDefault
```


2. 如果你的库提供多个入口函数供外部使用。推荐使用 `module.exports` 导出多个对象。


```javascript
// 单独变量导出
const cjsVar = "cjsVar----cjs:module.exports"

//  单独函数导出
function cjsFn() {
  console.log("cjsFn", "----cjs:module.exports")
  return "cjsFn----cjs:module.exports"
}


module.exports = {
	cjsVar,
	cjsFn
}
```


3. 如果既有主入口函数需要导出，又有其他函数需要导出，推荐使用如下方式来导出。


```javascript
// 单独变量导出
const cjsVar = "cjsVar----cjs:module.exports"

//  单独函数导出
function cjsFn() {
  console.log("cjsFn", "----cjs:module.exports")
  return "cjsFn----cjs:module.exports"
}

// 默认函数导出
function cjsFnDefault() {
  console.log("cjsFnDefault", "----cjs:module.exports")
  return "cjsFnDefault----cjs:module.exports"
}

// 1. 用户可以直接使用 const cjsFnDefault = require('./module_exports') 来获取默认导出的函数
module.exports = cjsFnDefault
// 2. 这里也加一个 default 是为了兼容默认导出。当用户需要既使用默认函数，又使用其他函数时，可以使用 const { default: cjsFnDefault, cjsFn } = require('./module_exports') 更方便地获取
module.exports.default = cjsFnDefault
// 3. 选择导出其他函数
module.exports.cjsFn = cjsFn
module.exports.cjsVar = cjsVar

```


关于**兼容默认导出**，当用户使用如下代码时，兼容导出会更方便使用。


```javascript
// CJS 项目中使用
const { default: cjsFnDefault, cjsFn, cjsVar } = require('./module_exports')

// 用户可以只通过一个 require 来同时导出默认和其他对象
cjsFnDefault()
cjsFn()
console.log(cjsVar)


// 如果没有设置 module.exports.default = cjsFnDefault
// 则用户需要使用如下兼容代码来同时使用
const cjsModule = require('./module_exports')
const cjsFnDefault = cjsModule || cjsModule.default
const { cjsFn, cjsVar } = cjsModule

// ESM 项目则由 import 自动处理，加不加兼容导出都能使用如下代码
import cjsFnDefault, { cjsFn, cjsVar, CjsClass } from 'cjs' // 两种方式都可以，import 会自动处理 default 导出

```


> 在 CJS 项目中导出 CJS 模块完整示例代码：[https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/export/cjs](https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/export/cjs)


### 在 CJS 项目中导出 ESM 模块


这种场景不太常见，一般见于 CJS 项目过渡向 ESM 过程中的一些补丁场景。但这种场景下最关键的有两点：

1. CJS 项目中如果想导出 ESM 模块，则需要指定 ESM 模块代码文件后缀为`.mjs`。
2. `package.json` 中需要使用 `exports` 配置来导出 ESM 模块。可以使用 `exports` 字段来适配该 CJS 项目的 ESM 模块加载入口，注意指定文件后缀名。

```javascript
{
  "name": "cjs_with_esm",
  "version": "1.0.0",
  "description": "",
  "main": "cjs.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "exports": {
    ".": {
      "import": "./esm.mjs",
      "require": "./cjs.js"
    }
  }
}

```


> 在 CJS 项目中导出 ESM 模块完整示例代码：[https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/export/cjs_with_esm](https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/export/cjs_with_esm)


### 在 ESM 项目中导出 ESM 模块


使用 ESM 模块的 export 命令即可导出。但需要注意 `export { default: esmFnDefault }` 和 `export default esmFnDefault`不能同时使用，在别人引入的时候会报错。


```javascript
// exports esm in esm

// 变量
const esmVar = "esmVar----esm_module:export"

// 函数导出
// 可以直接使用 export 导出函数
export function esmFn() {
  console.log("esmFn", "----esm_module:export")
  return "esmFn:----esm_module:export"
}
// 类
class EsmClass {
  esmClassFn() {
    console.log("esmClassFn", "----esm_module:export")
    return "esmClassFn----esm_module:export"
  }
}

// export default function esmFnDefault() {  也可以直接使用export default function 来导出默认函数
function esmFnDefault() {
  console.log("esmFnDefault", "----esm_module:export")
  return "esmFnDefault----esm_module:export"
}

// ESM 选择导出
export {
  esmVar,
  EsmClass,
  // esmFn, // 使用 export 导出的函数，和上面的选择其一，不能同时使用
  // esmFnDefault as default, // esm 默认导出，和下面的选择其一，不能同时使用，使用时会报错 ❌
}

export default esmFnDefault
```


> 在 ESM 项目中导出 ESM 模块完整示例代码：[https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/export/esm_module](https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/export/esm_module)


### 在 ESM 项目中导出 CJS 模块


这种场景和上面的**在 CJS 项目中导出 ESM 模块**类似，但蛮常见的，很多 NPM 库借助编译工具，同时，同时向外提供 CJS 模块和 ESM 模块

1. ESM 项目中如果想导出 CJS 模块，则需要指定 CJS 模块代码文件后缀为 `.cjs`。
2. `package.json` 中需要使用 `exports` 配置来导出 CJS 模块。可以使用 `exports` 字段来适配该 ESM 项目的 CJS 模块加载入口，注意指定文件后缀名。

```javascript
{
  "name": "esm_with_cjs",
  "version": "1.0.0",
  "description": "",
  "main": "esm.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "exports": {
    ".": {
      "import": "./esm.js",
      "require": "./cjs.cjs"
    }
  }
}
```


> 在 ESM 项目中导出 CJS 模块完整示例代码：[https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/export/esm_with_cjs](https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/export/esm_with_cjs)


## 使用者视角


### 在 CJS 项目中使用内部的 CJS 模块


直接使用 require 进行加载即可，所有`.js`文件均被解释为CJS 模块，`require` CJS 模块可以不加`.js`文件后缀。


```javascript
// in cjs project to use cjs inner
// 在 cjs 项目中使用 cjs 内部模块


const { default: cjsFnDefault, cjsVar, cjsFn, CjsClass } = require('./cjs_inner');
cjsFnDefault()
cjsFn()
console.log(cjsVar)
const cjsClass = new CjsClass()
cjsClass.cjsClassFn()

```


> 在 CJS 项目中使用内部的 CJS 模块完整示例代码：[https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/use/in_cjs_use_cjs_inner](https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/use/in_cjs_use_cjs_inner)


### 在 CJS 项目中使用外部 npm 库的 CJS 模块


只要外部的 npm 库在 `package.json` 中提供了 CJS 模块入口，则可以直接使用`require`即可


```javascript
const { default: cjsFnDefault, cjsFn, CjsClass, cjsVar} = require("cjs")


cjsFnDefault()
cjsFn()
console.log(cjsVar)
const cjsClass = new CjsClass()
cjsClass.cjsClassFn()
```


> 在 CJS 项目中使用外部 npm 库的 CJS 模块完整示例代码：[https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/use/in_cjs_use_cjs_outer](https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/use/in_cjs_use_cjs_outer)


### 在 CJS 项目中使用内部的 ESM 模块


这种虽然不常见但比较复杂，完整解释了如何如何混用 ESM 和 CJS。


在 CJS 项目中使用内部的 ESM 模块一共有两种方式：


1. 使用 esm npm 库来加载内部 ESM 模块代码（不推荐，这个库已经很多年不维护了）


```javascript
// npm i esm 库
const esm = require("esm")(module)
const { default: esmFnDefault, esmFn, EsmClass, esmVar } = esm("./esm_mjs")
esmFnDefault()
esmFn()
console.log(esmVar)
const esmClass = new EsmClass()
esmClass.esmClassFn()
```


**2. 使用 import 命令来加载内部 ESM 模块代码（推荐）**


需要注意的是

- 需要指定`.mjs`文件后缀来告诉 Node 使用 ESM 解释器加载。
- 因为`import`命令为异步代码，而 CJS 模块不允许顶层await，所以需要在异步函数中使用

```javascript
// const esmModule = await import('./esm_mjs.mjs'); // ❌ 报错，CJS 模块不允许顶层 await


async function test() {
  const esmModule = import('./esm_mjs.mjs').then(esm => esm);
  const { default: esmFnDefault, esmFn, EsmClass, esmVar } = await esmModule
  esmFnDefault()
  esmFn()
  console.log(esmVar)
  const esmClass = new EsmClass()
  esmClass.esmClassFn()
}

test();
```


**3. 直接使用 require 命令加载 ESM 模块（Node 版本要求）**


如果你的项目的 Node 版本高于 `nodejs@v22.12.0`，则你也可以直接使用`require` 来加载 ESM 模块了。但是需要指定`.mjs`文件后缀，且因为是在 CJS 项目中，所以不能加载`.js`后缀的 ESM 模块


```javascript
// 注意：此用例的 Node 版本需要>=22.12.0
// 直接使用 require 加载 ESM 模块： https://nodejs.org/en/blog/release/v22.12.0
const { default: esmFnDefault, esmFn, EsmClass, esmVar } = require('./esm_mjs.mjs')
// const { default: esmFnDefault, esmFn, EsmClass, esmVar } = require('./esm_js.js') // ❌ 会报错

esmFnDefault()
esmFn()
console.log(esmVar)
const esmClass = new EsmClass()
esmClass.esmClassFn()
```


> 在 CJS 项目中使用内部的 ESM 模块完整示例代码：[https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/use/in_cjs_use_esm_inner](https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/use/in_cjs_use_esm_inner)


### 在 CJS 项目中使用外部 npm 库的 ESM 模块（常见问题）


这个和上面的类似，只要该 npm 库提供了 ESM 模块就行。但值得注意的是，无法使用 esm 库来加载外部 npm 库，只能使用 `import` 命令来异步加载。或者Node 版本高于 `nodejs@v22.12.0`，则也可以直接使用`require` 来加载 ESM 模块


```javascript
// test cjs_with_esm
(async () => {
  const esmModule = await import('cjs_with_esm')
  const { default: esmFnDefault, esmFn, EsmClass, esmVar } = esmModule
  esmFnDefault()
  esmFn()
  console.log(esmVar)
  const esmClass = new EsmClass()
  esmClass.esmClassFn()
})();
```


> 在 CJS 项目中使用内部的 ESM 模块完整示例代码：[https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/use/in_cjs_use_esm_outer](https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/use/in_cjs_use_esm_outer)


### 在 ESM 项目中使用内部的 ESM 模块


这里有个非常重要的点：在 ESM 项目中，该项目下所有`.js`文件的**独立加载**均被解释使用 ESM 模块。一旦要使用 `import` 加载其他模块，不管是 ESM 还是 CJS 都需要添加文件后缀


```javascript
import esmFnDefault, { esmVar, EsmClass, esmFn } from './esm_js.js'; // 需要指定文件后缀名
// import esmFnDefault, { esmVar, EsmClass, esmFn } from './esm_mjs.mjs'; // 也需要指定文件名

esmFnDefault()
esmFn()
console.log(esmVar)
const esmClass = new EsmClass()
esmClass.esmClassFn()

```


> 在 ESM 项目中使用内部的 ESM 模块完整示例代码：[https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/use/in_esm_use_esm_inner](https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/use/in_esm_use_esm_inner)


### 在 ESM 项目中使用外部 npm 库的 ESM 模块


只要该 npm 库提供了 ESM 模块就行。而且在使用外部的 ESM npm 库时，因为外部的  npm 库在导出时都在 `package.json` 的 `main` 或者 `exports`字段指定了入口文件后缀，所以 `import` 时不需要指定文件后缀。


```javascript
import esmFnDefault, { esmVar, EsmClass, esmFn } from 'cjs_with_esm';


esmFnDefault()
esmFn()
console.log(esmVar)
const esmClass = new EsmClass()
esmClass.esmClassFn()
```


> 在 ESM 项目中使用外部 npm 库的 ESM 模块完整示例代码：[https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/use/in_esm_use_esm_outer](https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/use/in_esm_use_esm_outer)


### 在 ESM 项目中使用内部的 CJS 模块


这个场景和**在 ESM 项目中使用内部的 ESM 模块**类似，因为 import 本身支持加载 CJS 模块，但需要注意指定该文件的文件后缀。


```javascript
// 在 ems 中使用 cjs，可以直接使用，但需要指定 cjs 的文件后缀

import { cjsFn, cjsVar, CjsClass, default as cjsFnDefault } from './cjs.cjs'
// import cjsFnDefault, { cjsFn, cjsVar, CjsClass } from './cjs.cjs' // 两种方式都可以，import 会自动处理 default 导出

cjsFnDefault()
cjsFn()
console.log(cjsVar)
const cjsClass = new CjsClass()
cjsClass.cjsClassFn()
```


> 在 ESM 项目中使用内部的 CJS 模块完整示例代码：[https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/use/in_esm_use_cjs_inner](https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/use/in_esm_use_cjs_inner)


### 在 ESM 项目中使用外部 npm 库的 CJS 模块


这个和上面的类似，由于外部的  npm 库在导出时都在 `package.json` 的 `main` 或者 `exports`字段指定了入口文件后缀，所以 `import` 时不需要指定文件后缀。


```javascript
// 可以直接使用

// import { cjsFn, cjsVar, CjsClass, default as cjsFnDefault } from 'cjs'
import cjsFnDefault, { cjsFn, cjsVar, CjsClass } from 'cjs' // 两种方式都可以，import 会自动处理 default 导出

cjsFnDefault()
cjsFn()
console.log(cjsVar)
const cjsClass = new CjsClass()
cjsClass.cjsClassFn()
```


> 在 ESM 项目中使用外部 npm 库的 CJS 模块完整示例代码：[https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/use/in_esm_use_cjs_outer](https://github.com/LetTTGACO/esm-and-cjs/tree/master/packages/use/in_esm_use_cjs_outer)


## 最佳实践


### 对于 CJS 项目维护者/使用者


如果你是 CJS 模块的 npm 库维护者，在开发时大部分情况下，既是使用者，也是维护者。


当 `require` 外部 npm 库时，经常出现的情况就是`Error [ERR_REQUIRE_ESM]: require() of ES Module`，这个时候的解决方案就是

1. 回退这个库到 CJS 模块的版本号
2. 使用 import 异步加载 ESM 模块
3. 升级 Node 到 `Nodejs@22.12.0`，但对于npm 维护者库来说，需要限制用户的 node 版本

### 对于 ESM 项目维护者/使用者


无论是加载外部 ESM 模块还是 CJS 模块，`import` 外部库会变得几乎无感，对于需要添加文件后缀的问题，则可以通过 Typescript + 编译工具来解决


## 结论


总得来说，对于 npm 库维护者，全面拥抱 ESM 将是大势所趋，目前越来越多的库都 `Pure ESM package` 


所以新建项目的时候。第一步：把 `package.json` 的 `type` 变为 `module`；第二步：尽情的 `import` 吧。


## CJS 转向 ESM


对于已经存在的 CJS 项目，这里有一份转向 ESM 的操作指南：


[How can I move my CommonJS project to ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)

