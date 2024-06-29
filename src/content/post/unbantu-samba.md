---
date: '2024-06-29 00:00:00'
description: ''
urlname: unbantu-samba
title: Ubuntu 配置 Samba
tags:
  - 赛博空间
  - HomeLab
updated: '2024-06-29 23:47:00'
draft: false
---

记录一下 `HomeLab` 搭建过程中的 Samba 服务配置和安装。


我本地服务器已经装了 `SFTPGo` 并暴露了 `WebDAV` 协议，用于内网和公网访问，这段时间测试下来，看视频还是挺稳挺快的。


但  `SMB` 协议的设备支持范围更广，我的投影仪在局域网中共享文件只支持 `SMB` 协议。为了更方便内部共享，还是需要搭建 Samba 用于提供`SMB` 协议。


## 本地环境


Linux 系统：`Ubuntu 22.04.3 LTS`


## 安装 **Samba**


```bash
sudo apt-get update
sudo apt-get install samba
```


## 配置 **Samba**

1. 创建用户，专门用于 Samba 共享

	```bash
	useradd cody
	```

2. 准备共享目录，没有则创建

	```bash
	sudo mkdir /workspace
	```

3. 配置 config 文件

	```bash
	sudo vim /etc/samba/smb.conf
	```

4. 在配置文件末尾添加共享配置

	```bash
	[workspace]
	  path = /workspace
	  browseable = yes
	  writeable = yes
	  guest ok = yes
	  valid users = cody
	```

	- `[workspace]`这是定义的一个共享名称，客户端在访问共享资源时会看到这个名称。
	- `path = /workspace`指定了共享的实际路径，即 `/workspace` 这个目录。
	- `browseable = yes` 客户端在网络中搜索共享资源时，能够看到这个共享的名称
	- `writeable = yes`意味着用户对这个共享具有写入权限，可以在其中创建、修改和删除文件。
	- `guest ok = yes`允许访客访问这个共享，不需要提供有效的用户凭据。
	- `valid users = cody`指定了只有名为 `cody` 的用户有权访问这个共享。
5. 创建 Samba 用户

```bash
sudo smbpasswd -a cody
```

1. 重启 Samba 服务

```bash
sudo service smbd restart
```

1. 客户端连接，默认端口是 `445`

```bash
smb://192.168.31.22:445
```

