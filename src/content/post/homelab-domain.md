---
date: '2025-03-27 08:00:00'
description: 在局域网中配置内网服务的优雅访问，通过自建域名映射不同服务，使用反向代理和SSL证书确保安全访问，最终实现无需端口号直接访问服务的目标。
hidden: false
urlname: homelab-domain
title: 局域网内优雅的访问家庭内网服务
tags:
  - 赛博空间
  - HomeLab
updated: '2025-03-27 23:39:00'
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


![9ac38eec-30a4-4548-b11d-9c8e66df06ae.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/9e0f5163-fab3-47a2-8d2e-f58f0964230d/9ac38eec-30a4-4548-b11d-9c8e66df06ae.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466773MRMSV%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T004634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD8CTuTm4cVIPJre1lU9H1lhhIcDL0gnaCXn5TWTfk5dwIgJHYz25kbSSe1l15bHK%2FZxirsiE%2BVjyiik4C56wvcomIq%2FwMIcRAAGgw2Mzc0MjMxODM4MDUiDL6DRO3BooDmPe7i0SrcAxxa%2FsCe4go2YFsBzNA7RxMWqLgo9zmsQaDvxf3uGJuL6y1qjoZmfmEEN%2Bo5VfsV6x0lcSlH7fwflL9QlZu6VI3lno0zMudPzxEAaFCU3uDJNLKa2AbqSehy%2Fj8BcF%2BjNM5sqMdEE%2B7fcylY2a221h7gVApoC0HEB5ln3ebd38IwejNt8T9IsuXTShnzw6WVkD4MfItljSfwSMou7pd%2BdlrJQhHRwnCVMz9YpwiUizp7f%2FLmdhNUA5IDEynsAxDJ1GQJ3AhwI%2FC1Qu82%2BU2sGgv34njakbtj9QVQHwdft8l4fsJ9t7SSwKoTmx1grvM4QZ9SRPBP2hfwfHu6icZS%2B6NTh4XDrVDYRLvX43tm5AY%2Fp4XrR%2B6TrQl9BjiE3fYM6JNX%2FikCuq1WiPfAv5VHo3rM%2F0FcMdX4D0jwVxEuEsgEVcoNh8hyDkE1B1PXLuydO4h85NtMJnkxmAXlTNkh9b3d6ERM7whPgl9W7Oyk1EUMyQqQatMXVPR7K8wLMQOnQ7OQzZWALo4FpDMebYv%2FQnTemCnJAaHMUQDsT%2FM4qQmxG27YFBrm9R%2BU6jsfg40Xvf7mlFUH4iz159e%2Ba2Xp6lzmCwz11VcQ3fqRdXu%2FOvC1ovNSFuIbfi0MnIueMPqGgs4GOqUBvU3XOh9BPeBHNDz%2FOmi778Hij0ca6nVIc39p%2BNsvyx7TNM90yYJ%2Btbu7XgoK2upyrOu3KrIQHG7Zg4N0E1f7Z2J%2FfFPtQdyLDHDwwLU%2FoWWBRBjr3DEGVY2Fxk%2BQTsfn42sbf9s9%2BgHWneI%2BxFY5vRV9iDy2KplcfV8gXWUZXILlQV%2B%2B7koir%2BNL7lYFvqlLCrEIsv06VrtPHLcCDjA9uvTA994q&X-Amz-Signature=60fe7ea087748c0431607d11fb2aceb653c3b1ead926b6b689099bb304dfde0a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


> 注意：如果电脑开启了代理，访问内网域名时，可能无法正确解析 DNS，需要将 `*.cody.com` 加入到代理绕过配置中。


## 反向代理


部署在服务器上的服务都是不同端口号，直接访问 `gitlab.cody.com` 是要加上端口号的，所以需要在服务器上再做一层反向代理，将不同域名映射到不同端口号上去。


我使用的是 1Panel 自带的基于 Open Resty 的「网站」功能来配置的，你也可以使用 Nginx Proxy Manager 来配置反向代理，使用起来也一样简单。


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/d040d7d3-3947-4499-b19f-77532c9ac3a0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466773MRMSV%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T004634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD8CTuTm4cVIPJre1lU9H1lhhIcDL0gnaCXn5TWTfk5dwIgJHYz25kbSSe1l15bHK%2FZxirsiE%2BVjyiik4C56wvcomIq%2FwMIcRAAGgw2Mzc0MjMxODM4MDUiDL6DRO3BooDmPe7i0SrcAxxa%2FsCe4go2YFsBzNA7RxMWqLgo9zmsQaDvxf3uGJuL6y1qjoZmfmEEN%2Bo5VfsV6x0lcSlH7fwflL9QlZu6VI3lno0zMudPzxEAaFCU3uDJNLKa2AbqSehy%2Fj8BcF%2BjNM5sqMdEE%2B7fcylY2a221h7gVApoC0HEB5ln3ebd38IwejNt8T9IsuXTShnzw6WVkD4MfItljSfwSMou7pd%2BdlrJQhHRwnCVMz9YpwiUizp7f%2FLmdhNUA5IDEynsAxDJ1GQJ3AhwI%2FC1Qu82%2BU2sGgv34njakbtj9QVQHwdft8l4fsJ9t7SSwKoTmx1grvM4QZ9SRPBP2hfwfHu6icZS%2B6NTh4XDrVDYRLvX43tm5AY%2Fp4XrR%2B6TrQl9BjiE3fYM6JNX%2FikCuq1WiPfAv5VHo3rM%2F0FcMdX4D0jwVxEuEsgEVcoNh8hyDkE1B1PXLuydO4h85NtMJnkxmAXlTNkh9b3d6ERM7whPgl9W7Oyk1EUMyQqQatMXVPR7K8wLMQOnQ7OQzZWALo4FpDMebYv%2FQnTemCnJAaHMUQDsT%2FM4qQmxG27YFBrm9R%2BU6jsfg40Xvf7mlFUH4iz159e%2Ba2Xp6lzmCwz11VcQ3fqRdXu%2FOvC1ovNSFuIbfi0MnIueMPqGgs4GOqUBvU3XOh9BPeBHNDz%2FOmi778Hij0ca6nVIc39p%2BNsvyx7TNM90yYJ%2Btbu7XgoK2upyrOu3KrIQHG7Zg4N0E1f7Z2J%2FfFPtQdyLDHDwwLU%2FoWWBRBjr3DEGVY2Fxk%2BQTsfn42sbf9s9%2BgHWneI%2BxFY5vRV9iDy2KplcfV8gXWUZXILlQV%2B%2B7koir%2BNL7lYFvqlLCrEIsv06VrtPHLcCDjA9uvTA994q&X-Amz-Signature=310cca8490970e03a1c087351da0e5597aa36f7994ebe15e69c6ca2ef0c36122&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


## SSL 证书


这里纯属强迫症配置，不配置 SSL 证书，浏览器总是会谈不安全访问。所以直接在 1Panel 上签发一个自签泛域名证书即可。


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/792bb332-de73-47e3-af8a-eb1dcf9003ac/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466773MRMSV%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T004634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD8CTuTm4cVIPJre1lU9H1lhhIcDL0gnaCXn5TWTfk5dwIgJHYz25kbSSe1l15bHK%2FZxirsiE%2BVjyiik4C56wvcomIq%2FwMIcRAAGgw2Mzc0MjMxODM4MDUiDL6DRO3BooDmPe7i0SrcAxxa%2FsCe4go2YFsBzNA7RxMWqLgo9zmsQaDvxf3uGJuL6y1qjoZmfmEEN%2Bo5VfsV6x0lcSlH7fwflL9QlZu6VI3lno0zMudPzxEAaFCU3uDJNLKa2AbqSehy%2Fj8BcF%2BjNM5sqMdEE%2B7fcylY2a221h7gVApoC0HEB5ln3ebd38IwejNt8T9IsuXTShnzw6WVkD4MfItljSfwSMou7pd%2BdlrJQhHRwnCVMz9YpwiUizp7f%2FLmdhNUA5IDEynsAxDJ1GQJ3AhwI%2FC1Qu82%2BU2sGgv34njakbtj9QVQHwdft8l4fsJ9t7SSwKoTmx1grvM4QZ9SRPBP2hfwfHu6icZS%2B6NTh4XDrVDYRLvX43tm5AY%2Fp4XrR%2B6TrQl9BjiE3fYM6JNX%2FikCuq1WiPfAv5VHo3rM%2F0FcMdX4D0jwVxEuEsgEVcoNh8hyDkE1B1PXLuydO4h85NtMJnkxmAXlTNkh9b3d6ERM7whPgl9W7Oyk1EUMyQqQatMXVPR7K8wLMQOnQ7OQzZWALo4FpDMebYv%2FQnTemCnJAaHMUQDsT%2FM4qQmxG27YFBrm9R%2BU6jsfg40Xvf7mlFUH4iz159e%2Ba2Xp6lzmCwz11VcQ3fqRdXu%2FOvC1ovNSFuIbfi0MnIueMPqGgs4GOqUBvU3XOh9BPeBHNDz%2FOmi778Hij0ca6nVIc39p%2BNsvyx7TNM90yYJ%2Btbu7XgoK2upyrOu3KrIQHG7Zg4N0E1f7Z2J%2FfFPtQdyLDHDwwLU%2FoWWBRBjr3DEGVY2Fxk%2BQTsfn42sbf9s9%2BgHWneI%2BxFY5vRV9iDy2KplcfV8gXWUZXILlQV%2B%2B7koir%2BNL7lYFvqlLCrEIsv06VrtPHLcCDjA9uvTA994q&X-Amz-Signature=25c75b6eda18bac7d6110e32bcc4c7ed0b37c8af7fa801841d556b8a7ec0f1d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


然后将证书下载到本地 Mac 上，解压后，双击 `fullchain.pem` 文件即可加入到本地证书上。


你也可以拖动这个证书到钥匙串访问中来添加。


然后双击该证书，将信任配置为时钟信任即可。


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/4d387c38-6043-45fd-8c73-11598900f891/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466773MRMSV%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T004634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD8CTuTm4cVIPJre1lU9H1lhhIcDL0gnaCXn5TWTfk5dwIgJHYz25kbSSe1l15bHK%2FZxirsiE%2BVjyiik4C56wvcomIq%2FwMIcRAAGgw2Mzc0MjMxODM4MDUiDL6DRO3BooDmPe7i0SrcAxxa%2FsCe4go2YFsBzNA7RxMWqLgo9zmsQaDvxf3uGJuL6y1qjoZmfmEEN%2Bo5VfsV6x0lcSlH7fwflL9QlZu6VI3lno0zMudPzxEAaFCU3uDJNLKa2AbqSehy%2Fj8BcF%2BjNM5sqMdEE%2B7fcylY2a221h7gVApoC0HEB5ln3ebd38IwejNt8T9IsuXTShnzw6WVkD4MfItljSfwSMou7pd%2BdlrJQhHRwnCVMz9YpwiUizp7f%2FLmdhNUA5IDEynsAxDJ1GQJ3AhwI%2FC1Qu82%2BU2sGgv34njakbtj9QVQHwdft8l4fsJ9t7SSwKoTmx1grvM4QZ9SRPBP2hfwfHu6icZS%2B6NTh4XDrVDYRLvX43tm5AY%2Fp4XrR%2B6TrQl9BjiE3fYM6JNX%2FikCuq1WiPfAv5VHo3rM%2F0FcMdX4D0jwVxEuEsgEVcoNh8hyDkE1B1PXLuydO4h85NtMJnkxmAXlTNkh9b3d6ERM7whPgl9W7Oyk1EUMyQqQatMXVPR7K8wLMQOnQ7OQzZWALo4FpDMebYv%2FQnTemCnJAaHMUQDsT%2FM4qQmxG27YFBrm9R%2BU6jsfg40Xvf7mlFUH4iz159e%2Ba2Xp6lzmCwz11VcQ3fqRdXu%2FOvC1ovNSFuIbfi0MnIueMPqGgs4GOqUBvU3XOh9BPeBHNDz%2FOmi778Hij0ca6nVIc39p%2BNsvyx7TNM90yYJ%2Btbu7XgoK2upyrOu3KrIQHG7Zg4N0E1f7Z2J%2FfFPtQdyLDHDwwLU%2FoWWBRBjr3DEGVY2Fxk%2BQTsfn42sbf9s9%2BgHWneI%2BxFY5vRV9iDy2KplcfV8gXWUZXILlQV%2B%2B7koir%2BNL7lYFvqlLCrEIsv06VrtPHLcCDjA9uvTA994q&X-Amz-Signature=b410930ea82d5dd61a65ef51a2eb0707f343fb1ac6d39c22b1501cde87a60c6c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


## 大功告成


至此，大功告成，然后就可以直接输入域名来访问服务，浏览器也不会告警。


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/6a358794-5e77-4f81-9f67-f85ed7600e88/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466773MRMSV%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T004634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD8CTuTm4cVIPJre1lU9H1lhhIcDL0gnaCXn5TWTfk5dwIgJHYz25kbSSe1l15bHK%2FZxirsiE%2BVjyiik4C56wvcomIq%2FwMIcRAAGgw2Mzc0MjMxODM4MDUiDL6DRO3BooDmPe7i0SrcAxxa%2FsCe4go2YFsBzNA7RxMWqLgo9zmsQaDvxf3uGJuL6y1qjoZmfmEEN%2Bo5VfsV6x0lcSlH7fwflL9QlZu6VI3lno0zMudPzxEAaFCU3uDJNLKa2AbqSehy%2Fj8BcF%2BjNM5sqMdEE%2B7fcylY2a221h7gVApoC0HEB5ln3ebd38IwejNt8T9IsuXTShnzw6WVkD4MfItljSfwSMou7pd%2BdlrJQhHRwnCVMz9YpwiUizp7f%2FLmdhNUA5IDEynsAxDJ1GQJ3AhwI%2FC1Qu82%2BU2sGgv34njakbtj9QVQHwdft8l4fsJ9t7SSwKoTmx1grvM4QZ9SRPBP2hfwfHu6icZS%2B6NTh4XDrVDYRLvX43tm5AY%2Fp4XrR%2B6TrQl9BjiE3fYM6JNX%2FikCuq1WiPfAv5VHo3rM%2F0FcMdX4D0jwVxEuEsgEVcoNh8hyDkE1B1PXLuydO4h85NtMJnkxmAXlTNkh9b3d6ERM7whPgl9W7Oyk1EUMyQqQatMXVPR7K8wLMQOnQ7OQzZWALo4FpDMebYv%2FQnTemCnJAaHMUQDsT%2FM4qQmxG27YFBrm9R%2BU6jsfg40Xvf7mlFUH4iz159e%2Ba2Xp6lzmCwz11VcQ3fqRdXu%2FOvC1ovNSFuIbfi0MnIueMPqGgs4GOqUBvU3XOh9BPeBHNDz%2FOmi778Hij0ca6nVIc39p%2BNsvyx7TNM90yYJ%2Btbu7XgoK2upyrOu3KrIQHG7Zg4N0E1f7Z2J%2FfFPtQdyLDHDwwLU%2FoWWBRBjr3DEGVY2Fxk%2BQTsfn42sbf9s9%2BgHWneI%2BxFY5vRV9iDy2KplcfV8gXWUZXILlQV%2B%2B7koir%2BNL7lYFvqlLCrEIsv06VrtPHLcCDjA9uvTA994q&X-Amz-Signature=3cd682b9e30dec385f299518cde1406fca5287265a641a7f082dab530e3cba80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


## 原理解析


```javascript
https://gitlab.cody.com -> 192.168.31.1(路由器 Hosts 映射)

-> 192.168.31.56(服务器上的 Open Resty) -> http://192.168.31.56:9002(Gitlab服务)
```


## 为什么不部署真正的公网域名


其实我有好几个域名都有映射服务器上的服务，例如 `https://halo.1874.cool`就会访问到我的家庭服务器上的 Halo 站点。


我的一些面向公网的服务，都是通过腾讯云服务器来中转，利用 FRP 穿透，让公网用户能访问内网服务。


但上面配置的这些服务，几乎没有公网访问的必要，内网访问做测试用就够了，也能保证一定程度的安全性。

