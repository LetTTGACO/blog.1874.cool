---
date: '2024-02-01 00:00:00'
urlname: make-use-boot-disk-on-mac
title: Mac 系统下制作 USB 启动盘
tags:
  - 家庭服务器
updated: '2024-02-03 01:54:00'
draft: false
---

## 前言


最近在折腾 PVE、Linux、Windows 安装时都会遇到：从 U 盘启动并安装系统。大部分教程都是基于 Windows 来制作USB启动盘，将 ISO 文件通过各种软件烧录到 U 盘中。


但是我手头暂时只有 Mac，找了老半天终于找到一个非常方便的方法，只需要基于命令行就能直接操作：利用 Mac 自带的`hdiutil`命令行工具来操作。


## 开始制作

1. 下载 ISO 镜像文件
	1. [debian12 镜像下载](https://www.debian.org/)
	2. [pve8 镜像下载](https://www.proxmox.com/en/downloads)

	```bash
	debian-12.4.0-amd64-netinst.iso
	proxmox-ve_8.1-1.iso
	```

2. 将 iso 文件转换为 dmg 文件，这里以 `debian-12.4.0-amd64-netinst.iso` 为例

	```bash
	hdiutil convert -format UDRW -o debian-12.4.0-amd64-netinst.dmg debian-12.4.0-amd64-netinst.iso
	```


	```bash
	hdiutil convert -format UDRW -o debian-12.4.0-amd64-netinst.dmg debian-12.4.0-amd64-netinst.iso
	正在读取Driver Descriptor Map（DDM：0）…
	正在读取Debian 12.4.0 amd64 n           （Apple_ISO：1）…
	正在读取Apple（Apple_partition_map：2）…
	正在读取Debian 12.4.0 amd64 n           （Apple_ISO：3）…
	正在读取EFI（Apple_HFS：4）…
	..
	正在读取Debian 12.4.0 amd64 n           （Apple_ISO：5）…
	....................................................................................
	已耗时： 1.475s
	速度：425.5MB/秒
	节省：0.0%
	created: /Users/1874w/workspace/debian-12.4.0-amd64-netinst.dmg
	```

3. 插入 U 盘，查看 U 盘盘符。我的是`disk4`

	```bash
	diskutil list
	```

4. 取消挂载 U 盘，记得修改`disk4`为你的 USB 盘符

	```bash
	diskutil unmountDisk /dev/disk4
	```

5. 烧录 img 文件到 U 盘，记得修改`disk4`为你的 USB 盘符

	```bash
	sudo dd if=debian-12.4.0-amd64-netinst.dmg of=/dev/rdisk4 bs=1m
	```


至此，USB 启动盘就制作好了！

