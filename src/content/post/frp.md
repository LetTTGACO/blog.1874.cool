---
date: '2024-01-28 00:00:00'
description: 本文介绍了如何使用FRP进行自建FRP内网穿透。通过搭建FRP Server和FRP Client，可以实现访问家庭内网设备的目的。文章详细介绍了在Mac和云服务器上配置FRP的步骤，并提供了相应的配置文件示例。
urlname: frp
title: 自建FRP内网穿透
tags:
  - 家庭服务器
cover: 'https://image.1874.cool/08a266ae5795e27308010b46158b87c8.jpg'
updated: '2024-02-03 14:41:00'
draft: false
---

## 前言


自己的轻量云服务器的性能太弱了(1C/2G)，但是博客站点 Halo 的占用对于我的机器来说压力比较大。所以就想着怎么利用本地的机器来搭建博客。


目前手头上有个Mac，零刻 N100 小主机还在路上，所以就想着先试着在 Mac 和云服务器上搭建一下 FRP 内网穿透，熟悉熟悉操作。


## 环境准备

- 腾讯云轻量服务器
- MacBook Pro
- Docker 环境
- FRP Docker镜像：[https://github.com/snowdreamtech/frp](https://github.com/snowdreamtech/frp)

## FRP


![Untitled.png](https://image.1874.cool/c58a08d4a06214a0375a7db196632503.png)


完整点的 FRP 内网穿透应该是上面的架构

- FRP Server：拥有公网 IP 的服务器
- FRP Client：家庭内网服务器，中转设备
- NAS：家庭 NAS
- PC：家庭其他设备

当建立起 FRP 内网穿透后，就可以利用 FRP Server 服务器来访问家庭内网 FRP Client 中转设备，进而访问所有家庭内网设备。


鉴于目前我的家庭内网设备只有 Mac，所以就只能将 Mac 当做 FRP Client，本篇文章也是基于 Mac 来搭建，等我的 N100 到了再替换掉。


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
	[common]
	bind_port = 7000
	dashboard_port = 7500
	dashboard_user = frp
	dashboard_pwd = frppassword
	vhost_http_port = 7080
	vhost_https_port = 7081
	token = 123456
	```

	- `bind_port`：服务端监听端口
	- `dashboard_port`：访问FRP Server 端登录面板端口号
	- `dashboard_user`：登录面板用户名
	- `dashboard_pwd`：登录面板密码
	- `vhost_http_port`：`http`协议下代理端口（非必要）
	- `vhost_https_port`：`https`协议下代理端口（非必要）
	- `token`：FRP Client 客户端与服务端通信密钥
4. `docker run` 运行 FRP Server 服务

	```bash
	docker run --restart=always --network host -d -v /etc/frp/frps.toml:/etc/frp/frps.toml --name frps snowdreamtech/frps
	```

5. 开放端口号，在轻量云服务器和本地服务器（如果有的话）防火墙开启`7000,7005,7080,7081`端口号
6. 测试访问，访问`云服务器 IP 地址:7000`登录后台，输入用户名密码正常访问即可

## FRP Client


我的 FRP Client 客户端是 Mac 电脑，用的是 [OrbStack](https://orbstack.dev/) 来管理 Docker，本地部署了一个 Halo 站点，对外端口号是 `8090`。


我的目的就是将云服务上的 `8090` 端口映射到我内网 Mac 上的 `8090` 对应的 Halo 站点

1. 在 Mac 某个目录新建 `frp` 文件夹

	```bash
	mkdir /Users/1874w/workspace/1874/frp
	```

2. 在 `frp` 文件夹下新建`frpc.toml`文件

	```bash
	vim /Users/1874w/workspace/1874/frp/frpc.toml
	```

3. 配置`frpc.toml`文件

	```toml
	[common]
	server_addr = 111.222.33.111
	server_port = 7000
	token =  123456
	
	[halo]
	type = tcp
	local_ip = 127.0.0.1
	local_port = 8090
	remote_port = 8090
	```

	- `server_addr`：云服务 IP 地址
	- `server_port`：之前 Server 端配置的`bind_port`端口号
	- `token`：之前 Server 端配置的通信密钥
	- `type`：通信协议，TCP
	- `local_ip`：内网的 IP，因为是我本机部署的 Halo，所以写`127.0.0.1`就行，如果是其他内网设备部署的应用，需要填写对应的内网 IP 地址
	- `local_port`：内网应用访问的端口号
	- `remote_port`：FRP Server 端映射的端口号，`111.222.33.111:8090 ⇒ 127.0.0.1:8090`
	- 如果有其他应用可以继续添加
4. `docker run` 运行 FRP Client 服务

	```bash
	docker run --restart=always --network host -d -v /Users/1874w/workspace/1874/frp/frpc.toml:/etc/frp/frpc.toml --name frpc snowdreamtech/frpc
	```

5. 开放端口号，在轻量云服务器和本地服务器（如果有的话）防火墙开启`8090`端口号
6. 测试访问，访问`111.222.33.111:8090`检查是否能访问到 Mac 上部署的 Halo 站点

## 结束


至此，FRP 就搭建完成，如果有其他应用可以继续在添加`frpc.toml`文件中继续添加你想要暴露的应用。

