---
date: '2022-04-28 00:00:00'
description: 这篇文章介绍了开发AgileConfig的NodeJS客户端的过程。作者通过使用AgileConfig作为配置中心，开发了一个稳定的nodejs客户端，实现了通过http请求获取配置和通过websocket长连接接收配置变更的功能。文章详细介绍了代码实现的逻辑和工作原理，并提供了使用示例。
urlname: node-agile-client
title: 为开源社区做贡献-开发AgileConfig的NodeJS客户端：node-agile-client
tags:
  - Node
updated: '2024-02-03 15:07:00'
draft: false
---

## 引言


其实一开始没打算要搞这玩意儿的，事情的起因还得从我同事开始说起。 同事利用空余时间，开发了一款表情包小程序和 App，里面有各种表情包可以下载，挺有意思，我也推荐了其他朋友使用。


然后我就琢磨着也搞个什么玩玩，前几天想到了一个点子，准备着手开发`Node`服务端时，想到有一些连接参数、可配置参数、账号密码什么的我又不想写死在代码里。因为公司用的是`Apollo`，一些可配置的参数是放在`Apollo`来管理的。再加上我问了下我同事，他的项目就是把这些东西写死在代码里的，他也觉得如果有一个配置中心来管理这些的话会方便很多。 


但是`Apollo`过于复杂了，对于我这种小项目是有点过了，于是在`Github`搜索一圈之后，偶然发现了[AgileConfig](https://github.com/dotnetcore/AgileConfig)这个轻量级的配置中心，但可惜的是只有`C#`的客户端，其他语言的客户端都没有。于是我就抱着试一试的想法加了这个项目的 QQ 群，果然还没有人开发`nodejs`的客户端。 于是我的兴趣就来了，由于我以前有`Java`语言的基础，所以`C#`的代码勉强能读懂，所以结合着`C#`的客户端和与群主的交流，终于开发出了一个相对稳定的`nodejs`客户端：[node-agile-client](https://github.com/LetTTGACO/node-agile-client) 


就此分享下我的开发过程和源码逻辑。


## 开始


配置中心听起来很高大上，其实说白了就是一个在线的数据库，客户端可以通过`http`请求去获取某个应用在某个环境下的`JSON`配置。所以我要做的就是通过`http`请求拿数据就完事，就是如此简单。


当然配置中心最核心的不只是能分应用分环境地存储数据，高可用也是其必不可少的能力。所以配置中心一般都是多节点分布式部署，客户端的代码大部分代码逻辑也是围绕着高可用去实现。


[AgileConfig](https://github.com/dotnetcore/AgileConfig)服务端除了向外暴露获取配置的`http`接口，还提供了`websocket`长链接机制，当配置中心发生配置变更时会发送消息告诉客户端。


## 基础工作原理流程图


于是我就构思了[node-agile-client](https://github.com/LetTTGACO/node-agile-client)的基础工作原理流程图：


![FnGZZCTPJNVUKA3cSKxwOv45nRzh.png](https://image.1874.cool/1c11354f362e08b2f5edbcb80b6a58f7.png)


我的想法是充分利用缓存，`node`使用端在需要时只需要读取本地的配置文件或者内存中的缓存即可拿到`json`文件。对于缓存的处理，如下图所示：


![Fi902QOqP5_v6kgBr4U5XnKHf_As.jpeg](https://image.1874.cool/4623eda78a2c0d961eef09319fa2ed98.jpeg)


## 完整工作原理流程图


在完整的研究了`AgileConfig`的`C#`客户端原理之后，发现`AgileConfig`有以下几个功能点：


---

- 多节点`http`访问
- 多节点`websocket`访问
- `websocket`心跳检测时会返回当前配置中心文件的`md5`
- 手动更新配置时会通过`websocket`向客户端发送需要更新的消息
- 手动关闭连接时会通过`websocket`向客户端发送需要关闭连接的消息

所以基于以上几个功能点，我画出了`node-agile-client`的完整工作原理流程图：


![Fi8seFPwjcCvorcZxZY1A2bMTZz4.png](https://image.1874.cool/8493c6f3f6c9c846c266d8a466ed05c2.png)


## 代码实现


接下来就到了代码实现的阶段，由于是第一次完整开发`npm`包，没啥经验，所以实现需求是第一要务，暂不考虑`npm`包的打包压缩、`TypeScript`支持等等功能。开发出来的包也并不适用于生产环境，待后期慢慢完善。


### 源码逻辑


先说明一下配置参数说明：


| 配置项名称       | 数据类型    | 配置项说明       | 必填 | 备注                                            |
| ----------- | ------- | ----------- | -- | --------------------------------------------- |
| appid       | string  | 应用 ID       | 是  | 对应后台管理中应用的`应用ID`                              |
| secret      | string  | 应用密钥        | 是  | 对应后台管理中应用的`密钥`                                |
| nodes       | string  | 应用配置节点      | 是  | 存在多个节点则使用逗号`,`分隔                              |
| env         | string  | 配置中心的环境     | 否  | 通过此配置决定拉取哪个环境的配置信息；如果不配置，服务端会默认返回第一个环境的配置     |
| name        | string  | 连接客户端的自定义名称 | 否  | 方便在 agile 配置中心后台对当前客户端进行查阅与管理                 |
| tag         | string  | 连接客户端自定义标签  | 否  | 方便在 agile 配置中心后台对当前客户端进行查阅与管理                 |
| httptimeout | number  | http 请求超时时间 | 否  | 配置 client 发送 http 请求的时候的超时时间，默认 100000(100 秒) |
| debug       | boolean | debug 模式    | 否  | 打印更多信息                                        |


```javascript
const axios = require('axios')
const path = require('path')
const fs = require('fs-extra')
// utils
const { generateAuthorization, transformConfig, getTime, generateUrl } = require('./utils')
const { WS } = require('./ws')
// const
const { WEBSOCKET_ACTION } = require('./const/ws')

// 配置缓存
let agileConfigCache

/**
* 初始化agile配置
* @param options
* @returns {Promise<void>}
*/
async function init(options) {
  const { appid, secret, env, nodes } = options
  const beginTime = Date.now();
  // 生成请求头
  // 请求http/websocket需要特定的请求头，详情看utils/auth.js文件
  options.headers = generateAuthorization(options)
  try {
    // 初始化agile配置
    await initAgileConfig(options);
    console.info(`【agile】: 初始化agile服务成功，耗时: ${Date.now() - beginTime}ms。`);
  } catch (err) {
    console.error({
      message: '【agile】: 初始化agile失败',
      error: err
    });
    // 退出进程
    process.exit(-1);
  }
}

/**
* 初始化agile配置
* @param options
* @returns {Promise<*|undefined>}
*/
async function initAgileConfig(options) {
  // websocket长连接
  // 这里websocket和http请求不是阻塞的，防止http/ws其中一个连接失败时阻塞流程
  getNotifications(options)
  await getAgileConfigAsync(options, true);
}

/**
* websockt连接
* @param options
*/
function getNotifications(options) {
  // 生成ws连接的Url
  const wsPaths = generateUrl(options, true)
  
  // 递归调用，用于多节点保证可用性
  function connect(index) {
    try {
      const ws = new WS(wsPaths[index], {
        debug: !!options.debug,
        wsOptions: { headers: options.headers },
      })
      ws.websocketOnOpen(() => {
        console.info(`【agile】: websocket连接成功，连接地址：${wsPaths[index]}`)
      })
      ws.websocketOnMessage((data) => {
        if (data.indexOf("Action") !== -1) {
          // 服务端更新了
          const { Action: action } = JSON.parse(data)
          if (action === WEBSOCKET_ACTION.RELOAD) {
            // 不使用本地缓存，直接发起http请求更新缓存
            getAgileConfigAsync(options, false).catch()
          }
          if (action === WEBSOCKET_ACTION.OFFLINE) {
            // 关闭ws连接
            ws.removeSocket(true)
          }
        } else if (data !== '0' && data.startsWith('V:')) {
          // 心跳检测时/服务端主动关闭连接时，同步配置
          // 对比本地缓存中的MD5和心跳检测时服务端返回的MD5
          if (data.slice(2) !== agileConfigCache.md5) {
            console.info('【agile】: 配置更新，即将重新读取配置')
            // 不使用本地缓存，直接发起http请求更新缓存
            getAgileConfigAsync(options, false).catch()
          }
        }
      })
      ws.websocketOnError((err) => {
        console.warn({
          message: '【agile】: websocket连接发生错误，正在尝试重新连接...',
          error: err
        });
        // 连接下一个节点，尝试尝试重新连接ws
        throw err
      })
      ws.websocketOnClose(() => {
        console.warn('【agile】: websocket断开连接，将会读取本地缓存');
      })
    } catch (err) {
      // 初始化失败时，更换ws节点
      index = index + 1;
      if (index < wsPaths.length) {
        // 递归调用，连接下一个节点
        connect(index)
      } else {
        console.error({
          url: `【agile】：请求地址：${wsPaths}`,
          message: `【agile】：websocket连接失败，将会读取本地缓存`,
          error: err,
        })
      }
    }
  }
  connect(0)
}

/**
* 异步获取agile配置
* @param options
* @param useCache 是否使用缓存
* @returns {Promise<*>}
*/
async function getAgileConfigAsync(options, useCache) {
  if (useCache) {
    // 优先从缓存中获取信息
    const beginTime = Date.now();
    const agileConfig = getAgileConfigFromCache(beginTime);
    if (agileConfig) {
      return agileConfig;
    }
    console.info('【agile】: 开始初始化agile配置(通过接口获取)');
  }
  // 从接口中获取
  try {
    agileConfigCache = await getAgileConfigPromise(options);
    // 写入本地文件
    fs.writeJsonSync(path.resolve(__dirname, './agileConfig.json'), agileConfigCache);
    console.info(`【agile】: 更新缓存成功, 更新时间：${getTime()}`)
    return agileConfigCache;
  } catch (err) {
    console.warn({
      message: '【agile】: 更新缓存失败，将会读取本地缓存',
      error: err
    });
    throw err;
  }
}

/**
* 从缓存中获取agile配置
* @param beginTime
* @returns {*}
*/
function getAgileConfigFromCache(beginTime) {
  if (agileConfigCache) {
    return agileConfigCache;
  }
  try {
    const cacheFile = path.join(__dirname, './agileConfig.json');
    const isHave = !!fs.statSync(cacheFile).size;
    console.info('【agile】: 开始初始化agile配置(通过缓存获取)');
    if (isHave) {
      // 从本地文件读取配置
      agileConfigCache = fs.readJsonSync(path.resolve(__dirname, './agileConfig.json'));
      if (agileConfigCache) {
        return agileConfigCache
      }
    }
  } catch (err) {}
  
  return agileConfigCache;
}

/**
* 从服务端获取配置并写入缓存
* @param options
* @returns {Promise<*>}
*/
async function getAgileConfigPromise(options) {
  // 获取http请求url
  const urlPaths = generateUrl(options, false);
  let agileConfigRes
  // 递归调用，适配多节点获取配置
  const getConfig = async (index) => {
    console.info(`【agile】：接口请求地址：${urlPaths[index]}`)
    try {
      const response = await axios.get(urlPaths[index], {
        timeout: options.httptimeout || 100000,
        headers: {
          ...options.headers,
        },
      })
      agileConfigRes = transformConfig(response.data);
    } catch (err) {
      index = index + 1;
      if (index < urlPaths.length) {
        // 递归调用，连接下一个节点
        await getConfig(urlPaths, index);
      } else {
        console.error({
          url: `agile请求地址：${urlPaths}`,
          message: `【agile】警告：获取agile配置失败,appid: ${options.appid}`,
          error: err,
        })
        throw err;
      }
    }
  };
  await getConfig(urlPaths, 0);
  return agileConfigRes
}


/**
* 同步获取Agile配置
* @returns {*}
*/
function getAgileConfig() {
  if (!agileConfigCache) {
    try {
      agileConfigCache = fs.readJsonSync(path.resolve(__dirname, './agileConfig.json'))
    } catch (err) {}
    if (!agileConfigCache) {
      throw new Error('【agile】: 请确保agile初始化已完成！');
    }
  }
  return agileConfigCache.data;
}

exports.init = init
exports.getAgileConfig = getAgileConfig
```


```javascript
const { WebSocket } = require('ws');

class WS {
  constructor(socketUrl, option) {
    this.socketUrl = socketUrl
    this.option = {
      onOpenAutoSendMsg:"",
      heartTime: 30000, // 心跳时间间隔
      heartMsg: 'ping', // 心跳信息,默认为'ping'
      isReconnect: true, // 是否自动重连
      reconnectTime: 5000, // 重连时间间隔
      reconnectCount: -1, // 重连次数 -1 则不限制
      openCallback: null, // 连接成功的回调
      closeCallback: null, // 关闭的回调
      messageCallback: null, // 消息的回调
      errorCallback: null, // 错误的回调
      debug: false,  //是否打开debug模式
      ...option,
    }
    this.websocket = null
    this.sendPingInterval = null  //心跳定时器
    this.reconnectInterval = null  //重连定时器
    this.activeLink = true  //socket对象是否可用
    this.disconnect = false  //是否是服务端主动切断socket连接
    this.reconnectNum = 0 //重连次数限制
    this.init()
  }
  
  /**
  * 初始化
  */
  init() {
    Reflect.deleteProperty(this, this.websocket)
    this.websocket = new WebSocket(this.socketUrl, {
      ...this.option.wsOptions,
    })
    this.websocketOnOpen()
    this.websocketOnMessage()
    this.websocketOnError()
    this.websocketOnClose()
  }
  
  /**
  * 连接成功
  */
  websocketOnOpen(callback) {
    this.websocket.onopen = (event) => {
      if (this.option.debug) console.log('%c websocket链接成功', 'color:green')
      // 连接成功时定时向发送消息
      this.sendPing(this.option.heartTime, this.option.heartMsg);
      if(this.option.onOpenAutoSendMsg){
        this.send(this.option.onOpenAutoSendMsg)
      }
      if (typeof callback === 'function') {
        this.disconnect = false
        callback(event)
      } else {
        (typeof this.option.openCallback === 'function') && this.option.openCallback(event)
      }
    }
  }
  
  /**
  * 发送数据
  * @param message
  */
  send (message){
    if (this.websocket.readyState !== this.websocket.OPEN) {
      new Error('没有连接到服务器，无法发送消息')
      return
    }
    this.websocket.send(message)
  }
  
  /**
  * 触发接收消息事件
  * @param callback
  */
  websocketOnMessage(callback) {
    this.websocket.onmessage = (event) => {
      // 收到任何消息，重新开始倒计时心跳检测
      if (typeof callback === 'function') {
        callback(event.data)
      } else {
        (typeof this.option.messageCallback === 'function') && this.option.messageCallback(event.data)
      }
    }
  }
  
  /**
  * 连接错误
  * @param callback
  */
  websocketOnError(callback) {
    this.websocket.onerror = (event) => {
      if (this.option.debug) console.error('连接发生错误', event)
      if (typeof callback === 'function') {
        callback(event)
      } else {
        (typeof this.option.errorCallback === 'function') && this.option.errorCallback(event)
      }
    }
  }
  
  /**
  * 连接关闭
  */
  websocketOnClose(callback) {
    this.websocket.onclose = (event) => {
      if (this.option.debug) console.warn('socket连接关闭,关于原因:', event)
      clearInterval(this.sendPingInterval)
      clearInterval(this.reconnectInterval);
      if (this.activeLink && this.option.isReconnect) {
        this.onReconnect()
      } else {
        this.activeLink = false;
        if (this.option.debug) console.log('%c websocket链接完全关闭', 'color:green')
      }
      if (typeof callback === 'function') {
        callback(event)
      } else {
        (typeof this.option.closeCallback === 'function') && this.option.closeCallback(event)
      }
    }
  }
  
  /**
  * 连接事件
  */
  onReconnect() {
    if (this.option.debug) console.warn(`非正常关闭,${this.option.reconnectTime}毫秒后触发重连事件`)
    if (this.option.reconnectCount === -1 || this.option.reconnectCount > this.reconnectNum) {
      this.reconnectInterval = setTimeout(() => {
        this.reconnectNum++
        if (this.option.debug) console.warn(`正在准备第${this.reconnectNum}次重连`)
        this.init()
      }, this.option.reconnectTime)
    } else {
      this.activeLink = false;
      if (this.option.debug) console.warn(`已重连${this.reconnectNum}次仍然没有响应,取消重连`)
      clearInterval(this.reconnectInterval);
    }
  }
  
  /**
  * 移除socket并关闭
  */
  removeSocket(disconnect) {
    this.activeLink = false
    this.disconnect = disconnect
    this.websocket.close(1000)
  }
  
  /**
  * 心跳机制
  * @param time
  * @param ping
  */
  sendPing (time = 5000, ping = 'ping'){
    clearInterval(this.sendPingInterval);
    if (time === -1) return
    this.send(ping)
    this.sendPingInterval = setInterval(() => {
      this.send(ping)
    }, time)
  }
  
  /**
  * 返回websocket实例
  * @returns {null}
  */
  getWebsocket() {
    return this.websocket
  }
  
  /**
  * 查看连接状态
  */
  getActiveLink() {
    return {
      activeLink: this.activeLink,
      disconnect: this.disconnect
    }
  }
}
```


## 开始使用


### 安装


```shell
npm i node-agile-client
```


### 初始化


```javascript
const { init } = require('node-agile-client');

init({
  appid: 'app',
  secret: 'xxx',
  node: 'http://192.168.1.1,http://192.168.1.2',
  env: 'DEV',
  tag: '',
  name: '',
  httptimeout: 100,
  debug: false,
});
```


### 获取配置


```javascript
const { getAgileConfig }  = require('node-agile-client');

const { token, url } = getAgileConfig();
```

