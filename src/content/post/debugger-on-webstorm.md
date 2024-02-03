---
date: '2024-02-02 00:00:00'
description: 在WebStorm中调试React/Vue等项目的正确姿势是通过"JavaScript调试"配置来设置调试模式，并在项目中打断点后刷新浏览器页面以进入WebStorm调试模式。
urlname: debugger-on-webstorm
title: 在 WebStorm 中调试 React/Vue 等项目
tags:
  - Webstorm
  - 效率工具
updated: '2024-02-03 14:41:00'
draft: false
---

## 引言


关于调试前端代码，由于Webstorm 的使用基数确实比 VsCode 少一些，网上的教程也比较少，甚至还有一些胡说的，例如要下载浏览器插件。基于我对 Webstorm 的认知，这个团队是不会把这么基础的功能做复杂的，开箱即用才是 Jetbrains 团队所追求的，这也是我喜欢 Webstorm 的原因。


> 本教程基于 Webstorm 2023.3.3 实践，其他版本请参考[官方文档](https://www.jetbrains.com.cn/en-us/help/webstorm/debugging-code.html)


![Untitled.png](https://image.1874.cool/blog/904a0852e90d5a4c766bedd0cff67fd8.png)


可以看到，Webstorm 支持很多种形式的调试，这里以调试 NextJs + React 项目为例，其他项目的调试姿势基本一样。


## **调试姿势**


我原本以为 Webstorm 会将调试直接融入 `npm script` 命令中，直接使用 `debug` 模式启动 `npm script` 就可以开始调试。在网上找了一圈教程，好多都是需要新建配置，一开始我还不相信，直到我看了官方文档才相信。


### **错误的调试姿势**


> Node 项目可以直接在 npm script 中打断点直接进行调试，不需要新建「JavaScript 调试」配置


![Untitled.png](https://image.1874.cool/blog/b71cae3ad55c8344e7ae0375423d2360.png)


### 正确的调试姿势


利用**「JavaScript 调试」**来配置调试模式 **⬇️**


![Untitled.png](https://image.1874.cool/blog/04b4c56479df8ebf9f848d93cd058e64.png)


## 调试配置

1. 在项目的运行配置中新建「**JavaScript 调试**」

	![Untitled.png](https://image.1874.cool/blog/bd76fd472a27dd69aca43cb695bb347a.png)

2. 将项目运行时的地址填入 URL 配置中
3. 正常通过 `npm script` 启动项目本体

	> 注意 ⚠️ ：如果有配置自动打开浏览器，项目会启动一个正常的浏览器窗口，可以关闭此窗口，调试模式并不运行在此窗口。

4. Debug 模式启动**「步骤 1 」**中的运行配置，系统会打开一个不带用户信息、插件、书签等功能的浏览器标签，**请不要关闭此浏览器标签！**
5. 在项目中正常打断点，并刷新**「步骤 4」**中的浏览器页面，成功断住并进入 Webstorm 调试模式。

	![Untitled.png](https://image.1874.cool/blog/79f35161ace642a01de45bc25eeaa77d.png)


## 参考资料

- [Debug Code ｜ Webstorm Doc](https://www.jetbrains.com.cn/en-us/help/webstorm/debugging-code.html)
- [使用 Webstorm 调试 Vue/React 项目](https://iming.work/detail/6093709a5b51982eaf7f7b1d.html)
