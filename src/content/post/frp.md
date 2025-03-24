---
date: '2024-01-28 08:00:00'
description: ''
hidden: false
urlname: frp
title: 自建 FRP 内网穿透
tags:
  - 赛博空间
  - HomeLab
updated: '2025-03-24 15:44:00'
draft: false
---

## 前言


自己的轻量云服务器的性能太弱了(1C/2G)，但是博客站点 Halo 的占用对于我的机器来说压力比较大。所以就想着怎么利用本地的机器来搭建博客。


~~目前手头上有个Mac，零刻 N100 小主机还在路上，所以就想着先试着在 Mac 和云服务器上搭建一下 FRP 内网穿透，熟悉熟悉操作。~~


## 环境准备

- 腾讯云轻量服务器
- Ubuntu 22.04（N100 本地小主机 ）
- FRP Docker镜像：[https://github.com/snowdreamtech/frp](https://github.com/snowdreamtech/frp)
- FRP 版本 `0.58.0` 及以上
- FRP 官方文档：[https://gofrp.org/zh-cn/docs/](https://gofrp.org/zh-cn/docs/)

## FRP


![Untitled.png](https://image.cody.fan/blog/c58a08d4a06214a0375a7db196632503.png)


完整点的 FRP 内网穿透应该是上面的架构

- FRP Server：拥有公网 IP 的服务器
- FRP Client：家庭内网服务器，中转设备
- NAS：家庭 NAS
- PC：家庭其他设备

当建立起 FRP 内网穿透后，就可以利用 FRP Server 服务器来访问家庭内网 FRP Client 中转设备，进而访问所有家庭内网设备。


## FRP Server


我的 FRP Server 端是一台腾讯云轻量云服务器，5MB 带宽，300G/月的流量，用来搭建访问量不大的应用绰绰有余。

1. 在`/etc`下新建`/frp`文件夹

	```bash
	sudo mkdir /etc/frp
	```

2. 在`/etc/frp`下新建`frps.toml`文件

	```bash
	sudo vim /etc/frp/frps.toml
	```

3. 配置`frps.toml`文件

	```toml
	bindAddr = "0.0.0.0"
	bindPort = 7000
	
	auth.method = "token"
	auth.token = "123456"
	
	webServer.addr = "0.0.0.0"
	webServer.port = 7500
	webServer.user = "user"
	webServer.password = "123456"
	
	# tls
	#transport.tls.force = true
	#transport.tls.certFile = "/etc/frp/ssl/server.crt"
	#transport.tls.keyFile = "/etc/frp/ssl/server.key"
	#transport.tls.trustedCaFile = "/etc/frp/ssl/ca.crt"
	
	```

	- `bindPort`：服务端监听端口
	- `auth.method`：授权方式，客户端需要保持一致
	- `auth.token`：授权密钥，客户端需要保持一致
	- `webServer.addr`：管理面板地址，默认本地
	- `webServer.user`：管理面板用户
	- `webServer.port`：管理面板端口
	- `webServer.password`：管理面板密码
4. `docker run` 运行 FRP Server 服务

	```bash
	docker run --restart=always --network host -d -v /etc/frp/frps.toml:/etc/frp/frps.toml --name frps snowdreamtech/frps
	```

5. 开放端口号，在云服务器和本地服务器（如果有的话）防火墙开启`7000,7005`端口号
6. 测试访问，访问`云服务器 IP 地址:7000`登录后台，输入用户名密码正常访问即可

## FRP Client


我的 FRP Client 客户端是  N100 Ubuntu 22.04，用的是 [1Panel](https://1panel.cn/) 来管理 服务器和 Docker，服务器部署了一个 Halo 站点，对外端口号是 `8090`。


我的目的就是将云服务上的 `9100` 端口映射到我内网 N100 上的 `8090` 对应的 Halo 站点

1. 在 Mac 某个目录新建 `frp` 文件夹

	```bash
	mkdir /home/1874/frp
	```

2. 在 `frp` 文件夹下新建`frpc.toml`文件

	```bash
	vim /home/1874/frp/frpc.toml
	```

3. 配置`frpc.toml`文件

	```toml
	serverAddr = "xxx.xx.xx.xx"
	serverPort = 7000
	
	auth.method = "token"
	auth.token = "123456"
	
	webServer.addr = "0.0.0.0"
	webServer.port = 7500
	webServer.user = "user"
	webServer.password = "123456"
	webServer.pprofEnable = false
	
	
	# tls
	#transport.tls.certFile = "/etc/frp/ssl/client.crt"
	#transport.tls.keyFile = "/etc/frp/ssl/client.key"
	#transport.tls.trustedCaFile = "/etc/frp/ssl/ca.crt"
	
	[[proxies]]
	name = "Halo"
	type = "tcp"
	localIP = "127.0.0.1"
	localPort = 8090
	remotePort = 9100
	```

	- `serverAddr`：云服务器 IP 地址
	- `serverPort`：监听云服务器的端口号
	- `auth.method`：授权方式，保持和服务端一致
	- `auth.token`：授权密钥，保持和服务端一致
	- `webServer.addr`：管理面板地址，默认本地
	- `webServer.user`：管理面板用户
	- `webServer.port`：管理面板端口
	- `webServer.password`：管理面板密码
4. `docker run` 运行 FRP Client 服务

	```bash
	docker run --restart=always --network host -d -v /home/1874/frp/frpc.toml:/etc/frp/frpc.toml --name frpc snowdreamtech/frpc
	```

5. 开放端口号，在轻量云服务器开启 `9100` 端口，在本地服务器防火墙开启`8090`端口号
6. 测试访问，访问`111.222.33.111:9100`检查是否能访问到 N100 上部署的 Halo 站点

## 结束


至此，FRP 就搭建完成，如果有其他应用可以继续在添加`frpc.toml`文件中继续添加你想要暴露的应用。

