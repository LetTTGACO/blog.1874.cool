---
date: '2025-03-27 08:00:00'
description: 在局域网中配置内网服务的优雅访问，通过自建域名映射不同服务，使用反向代理和SSL证书确保安全访问，最终实现无需端口号直接访问服务的目标。
hidden: false
urlname: homelab-domain
title: 局域网内优雅的访问家庭内网服务
tags:
  - 赛博空间
  - HomeLab
updated: '2025-03-27 22:57:00'
draft: false
---

## 前言


今天在服务器搭了个 Gitlab 和 Jenkins，准备搞搞 CI/CD，自建个前端发布平台。


使用的时候总是觉得用 IP 来访问不够优雅，就尝试自建个内网域名，刚好把我常用的内网服务都映射上去，顺便还可以享受顶级域名观赏体验 😌


## 域名规划


| 域名               | 后端服务                      | 说明              |
| ---------------- | ------------------------- | --------------- |
| jenkins.cody.com | http://192.168.31.56:9001 | Jenkins         |
| gitlab.cody.com  | http://192.168.31.56:9002 | Gitlab          |
| music.cody.com   | http://192.168.31.56:9003 | XiaoMusic 小爱音响  |
| vpn.cody.com     | http://192.168.31.56:9004 | v2rayA          |
| pt.cody.com      | http://192.168.31.56:9005 | qBittorrent 下载器 |


## 局域网 DNS 映射


本来我是用了个笨办法，直接在需要连通的 Mac 端和服务器端都添加 Hosts，后来在 DeepSeek 的提示下，可以在路由器/旁路由上统一修改。


但是我本地没有部署旁路由，有旁路由的情况下可以使用 AdGuard Home 或者 DNSmasq 来配置整个内网的 DNS 规则，而且还支持泛域名。直接使用 `192.168.31.56 *.cody.com`就能映射所有服务。


好在我的小米路由器的 APP 可以设置自定义 Hosts，也能解决我的问题。


![9ac38eec-30a4-4548-b11d-9c8e66df06ae.png](https://image.cody.fan/blog/0ed0e5060e3739f3d6a8142c8d823774.png)


## 反向代理


部署在服务器上的服务都是不同端口号，直接访问 `gitlab.cody.com` 是要加上端口号的，所以需要在服务器上再做一层反向代理，将不同域名映射到不同端口号上去。


我使用的是 1Panel 自带的基于 Open Resty 的「网站」功能来配置的，你也可以使用 Nginx Proxy Manager 来配置反向代理，使用起来也一样简单。


![image.png](https://image.cody.fan/blog/481d9caac42101b664c9cd78fa99a64b.png)


## SSL 证书


这里纯属强迫症配置，不配置 SSL 证书，浏览器总是会谈不安全访问。所以直接在 1Panel 上签发一个自签泛域名证书即可。


![image.png](https://image.cody.fan/blog/3507c1b441538e25c68149c219f36af4.png)


然后将证书下载到本地 Mac 上，解压后，双击 `fullchain.pem` 文件即可加入到本地证书上。


你也可以拖动这个证书到钥匙串访问中来添加。


然后双击该证书，将信任配置为时钟信任即可。


![image.png](https://image.cody.fan/blog/90fd6270861550647de18da4be4c04e5.png)


## 大功告成


至此，大功告成，然后就可以直接输入域名来访问服务，浏览器也不会告警。


![image.png](https://image.cody.fan/blog/edba58b120c4e6ebb27ac4bca442c3cf.png)


## 原理解析


```javascript
https://gitlab.cody.com -> 192.168.31.1(路由器 Hosts 映射)

-> 192.168.31.56(服务器上的 Open Resty) -> http://192.168.31.56:9002(Gitlab服务)
```


## 为什么不部署真正的公网域名


其实我有好几个域名都有映射服务器上的服务，例如 `https://halo.1874.cool`就会访问到我的家庭服务器上的 Halo 站点。


我的一些面向公网的服务，都是通过腾讯云服务器来中转，利用 FRP 穿透，让公网用户能访问内网服务。


但上面配置的这些服务，几乎没有公网访问的必要，内网访问做测试用就够了，也能保证一定程度的安全性。

