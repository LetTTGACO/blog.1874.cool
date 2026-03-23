---
date: '2025-03-24 08:00:00'
description: ''
hidden: false
urlname: hacker-news-rss
title: 用小爱音响听 Hacker News & RSS
tags:
  - 赛博空间
  - HomeLab
updated: '2025-03-24 17:47:00'
draft: false
---

## 前言


Hacker News 以及 各种 RSS 是我信息流获取方式中很重要的咨询来源。但随着 RSS 订阅数的增多，以至于有很长一段时间每天都有十几条更新，慢慢的就会变得没有精力去看完所有，甚至还有点焦虑。后来将 RSS 做了一次减法和筛选，目前订阅了只有大概十来条 RSS，每天更新的频率也锐减到 0 至 3 条。


不过一部分 RSS 和 Hacker News一样，因为是英文，所以大部分时间我都是用插件将他们翻译为中文然后阅读。随着 AI 大模型百花齐放，我一直都想用 AI 能帮我做点什么。


直到我遇到了这个宝藏博主的 Hacker News 每日播报 项目：[https://github.com/ccbikai/hacker-news](https://github.com/ccbikai/hacker-news)


## Hacker News 每日播报


一个基于 AI 的 Hacker News 中文播客项目，每天自动抓取 Hacker News 热门文章，通过 AI 生成中文总结并转换为播客内容。


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/2f14e276-d93c-403f-ab10-d1cfece6063a/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKSAS36Y%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T004633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDaeuOTSb0Z5UvN1d6kapy5xRkKjJ5PYyzB6yAUI9OWEQIhAJZUCrHi5ZcyrBE9IC6uZXE7PmP3cVG4RBMkweT2zP%2BDKv8DCHEQABoMNjM3NDIzMTgzODA1IgyHKueVZpTESei%2FPF4q3AM2grEVnMElPDt2VZnfUvovzNd0ajw1YOKjqY3EDi58MVNLnmSu54ADOjBEtlw0Rl7OENCwHdpLfYDKlWrs7E5Brzv3aqfiY3pkfAn5z2HOp%2BufnmCeTkAyZ43LKbWMs7iQ93zo0RB3ONdDix75%2BagFHWAKO6o7vMgyx7HYDpSwqiGJzE7o%2FVA%2FNzgqKWLpcg7XxB6g58xjA0sIZL0tsUqhGPqCCl2vccx1Mk8JM3OQgPnAKgktFCCdG%2BdkmFrLHvuFs8zXmKqWyDr3WjL2Va9Jc%2Fg2UnyaeSGti8oQ%2Fp9svbFBxmr%2Fp2g%2FAv%2FgKgnaO40kfCVU%2BNNqlhnejb%2FmhjaTzH%2BbLGEMTBZ5bnP13MOOmdDJ2J8PtUNoIBMh2ZSJ2kYKZS3fK90kTvqRClC7P7jiNgbdHlJFqs6jYZs8hh0zG0HcgRLpcGAjbwtLRAcaRT9r1Sa5%2FTUEbuW87UZJEEiQZo%2BqdV02%2FL9tCVnojHNtyxnGJkIwQP5YyfMX0nPBRr%2BHMiNvOSDQhGKurO3ofyXne%2FJFj%2BCBwLHOBh1pVxe%2FurJooypGEFjcqgN11utOGa40FYeCSUVGh%2Feu0Kdho1uzPzx5TW51gX88JlgMGUM4VxhZup3sK8Fij67Y5DCY%2BIHOBjqkAT%2BYCB9DLn3RV1k8w2r5mY8HNE3HAm7an7TpKa76oFLRDreHD4PaIvnwOnUdBQkdQ3tGCMvVd2BDVrZ5PbY6dXb4QylotpxcYmE4CYp1cYRIj82AzmB4zHBKAK4byzxg9rCt69s3pgA9P18FpIARzfGIwbY%2FD7vchVlY7uu5Vz1we7g4zcPn%2FN13hr19Sjmlurrs4gPs2PCAn96aavo1zNvQUC0o&X-Amz-Signature=0d086b5d0a6cfc5c80838cf6be5b9e41331b2a2e8121665d0b892d2a7739792f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![Hacker-News.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/99381d8c-a713-4039-99d0-bfc2e74892c8/Hacker-News.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKSAS36Y%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T004633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDaeuOTSb0Z5UvN1d6kapy5xRkKjJ5PYyzB6yAUI9OWEQIhAJZUCrHi5ZcyrBE9IC6uZXE7PmP3cVG4RBMkweT2zP%2BDKv8DCHEQABoMNjM3NDIzMTgzODA1IgyHKueVZpTESei%2FPF4q3AM2grEVnMElPDt2VZnfUvovzNd0ajw1YOKjqY3EDi58MVNLnmSu54ADOjBEtlw0Rl7OENCwHdpLfYDKlWrs7E5Brzv3aqfiY3pkfAn5z2HOp%2BufnmCeTkAyZ43LKbWMs7iQ93zo0RB3ONdDix75%2BagFHWAKO6o7vMgyx7HYDpSwqiGJzE7o%2FVA%2FNzgqKWLpcg7XxB6g58xjA0sIZL0tsUqhGPqCCl2vccx1Mk8JM3OQgPnAKgktFCCdG%2BdkmFrLHvuFs8zXmKqWyDr3WjL2Va9Jc%2Fg2UnyaeSGti8oQ%2Fp9svbFBxmr%2Fp2g%2FAv%2FgKgnaO40kfCVU%2BNNqlhnejb%2FmhjaTzH%2BbLGEMTBZ5bnP13MOOmdDJ2J8PtUNoIBMh2ZSJ2kYKZS3fK90kTvqRClC7P7jiNgbdHlJFqs6jYZs8hh0zG0HcgRLpcGAjbwtLRAcaRT9r1Sa5%2FTUEbuW87UZJEEiQZo%2BqdV02%2FL9tCVnojHNtyxnGJkIwQP5YyfMX0nPBRr%2BHMiNvOSDQhGKurO3ofyXne%2FJFj%2BCBwLHOBh1pVxe%2FurJooypGEFjcqgN11utOGa40FYeCSUVGh%2Feu0Kdho1uzPzx5TW51gX88JlgMGUM4VxhZup3sK8Fij67Y5DCY%2BIHOBjqkAT%2BYCB9DLn3RV1k8w2r5mY8HNE3HAm7an7TpKa76oFLRDreHD4PaIvnwOnUdBQkdQ3tGCMvVd2BDVrZ5PbY6dXb4QylotpxcYmE4CYp1cYRIj82AzmB4zHBKAK4byzxg9rCt69s3pgA9P18FpIARzfGIwbY%2FD7vchVlY7uu5Vz1we7g4zcPn%2FN13hr19Sjmlurrs4gPs2PCAn96aavo1zNvQUC0o&X-Amz-Signature=659cab79f1f4af09fa5a5ad5e89c99fff8fad27fab51329a74ae47b97ee4472a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


这个项目一下子打开了我的新思路，通过手机的播客订阅 RSS，就可以在任意时间通过播客的方式来听 Hacker News 热门新闻。然而我并不满足于此，既然可以用这套流程来总结 Hacker News，那么也应该可以总结那些文本类型的 RSS，将我关注的 RSS 也用这种方式生成 Podcast。


**于是，Podcast RSS 每日播报诞生了。**


## Podcast RSS 每日播报


一个基于 AI 的 RSS 中文播客项目，每天自动抓取你感兴趣的 RSS 更新内容，通过 AI 生成中文总结并转换为播客内容。


![Podcast-RSS.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/d756b851-6758-43cf-b4ee-ecbd91a343e2/Podcast-RSS.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKSAS36Y%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T004633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDaeuOTSb0Z5UvN1d6kapy5xRkKjJ5PYyzB6yAUI9OWEQIhAJZUCrHi5ZcyrBE9IC6uZXE7PmP3cVG4RBMkweT2zP%2BDKv8DCHEQABoMNjM3NDIzMTgzODA1IgyHKueVZpTESei%2FPF4q3AM2grEVnMElPDt2VZnfUvovzNd0ajw1YOKjqY3EDi58MVNLnmSu54ADOjBEtlw0Rl7OENCwHdpLfYDKlWrs7E5Brzv3aqfiY3pkfAn5z2HOp%2BufnmCeTkAyZ43LKbWMs7iQ93zo0RB3ONdDix75%2BagFHWAKO6o7vMgyx7HYDpSwqiGJzE7o%2FVA%2FNzgqKWLpcg7XxB6g58xjA0sIZL0tsUqhGPqCCl2vccx1Mk8JM3OQgPnAKgktFCCdG%2BdkmFrLHvuFs8zXmKqWyDr3WjL2Va9Jc%2Fg2UnyaeSGti8oQ%2Fp9svbFBxmr%2Fp2g%2FAv%2FgKgnaO40kfCVU%2BNNqlhnejb%2FmhjaTzH%2BbLGEMTBZ5bnP13MOOmdDJ2J8PtUNoIBMh2ZSJ2kYKZS3fK90kTvqRClC7P7jiNgbdHlJFqs6jYZs8hh0zG0HcgRLpcGAjbwtLRAcaRT9r1Sa5%2FTUEbuW87UZJEEiQZo%2BqdV02%2FL9tCVnojHNtyxnGJkIwQP5YyfMX0nPBRr%2BHMiNvOSDQhGKurO3ofyXne%2FJFj%2BCBwLHOBh1pVxe%2FurJooypGEFjcqgN11utOGa40FYeCSUVGh%2Feu0Kdho1uzPzx5TW51gX88JlgMGUM4VxhZup3sK8Fij67Y5DCY%2BIHOBjqkAT%2BYCB9DLn3RV1k8w2r5mY8HNE3HAm7an7TpKa76oFLRDreHD4PaIvnwOnUdBQkdQ3tGCMvVd2BDVrZ5PbY6dXb4QylotpxcYmE4CYp1cYRIj82AzmB4zHBKAK4byzxg9rCt69s3pgA9P18FpIARzfGIwbY%2FD7vchVlY7uu5Vz1we7g4zcPn%2FN13hr19Sjmlurrs4gPs2PCAn96aavo1zNvQUC0o&X-Amz-Signature=bd484eb749b8b4a4009a6bc6f89cc50e623e7e9b793a23c29a0316844f6fcc5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


## 小爱音响播放每日播报


通过这两个项目的生成流程，我的 Cloudflare R2 中会存在每天的每日播报音频文件。我就在想能不能更近一步，能不能用小爱音响来收听。


非常惊喜的是，我找到了这样一个开源项目：[https://github.com/hanxi/xiaomusic](https://github.com/hanxi/xiaomusic)


把它部署到我的家庭服务器上之后，就可以通过自定义口令来播放本地音乐。我写了一个 shell 脚本，并设置了一个定时器，每天晚上定时下载 Cloudflare R2上的每日播报音频文件。


于是，我的流程最终形态出现了：


![%E6%AF%8F%E6%97%A5%E6%92%AD%E6%8A%A5.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/629b825d-34df-4406-9135-26e74850927b/%E6%AF%8F%E6%97%A5%E6%92%AD%E6%8A%A5.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKSAS36Y%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T004633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDaeuOTSb0Z5UvN1d6kapy5xRkKjJ5PYyzB6yAUI9OWEQIhAJZUCrHi5ZcyrBE9IC6uZXE7PmP3cVG4RBMkweT2zP%2BDKv8DCHEQABoMNjM3NDIzMTgzODA1IgyHKueVZpTESei%2FPF4q3AM2grEVnMElPDt2VZnfUvovzNd0ajw1YOKjqY3EDi58MVNLnmSu54ADOjBEtlw0Rl7OENCwHdpLfYDKlWrs7E5Brzv3aqfiY3pkfAn5z2HOp%2BufnmCeTkAyZ43LKbWMs7iQ93zo0RB3ONdDix75%2BagFHWAKO6o7vMgyx7HYDpSwqiGJzE7o%2FVA%2FNzgqKWLpcg7XxB6g58xjA0sIZL0tsUqhGPqCCl2vccx1Mk8JM3OQgPnAKgktFCCdG%2BdkmFrLHvuFs8zXmKqWyDr3WjL2Va9Jc%2Fg2UnyaeSGti8oQ%2Fp9svbFBxmr%2Fp2g%2FAv%2FgKgnaO40kfCVU%2BNNqlhnejb%2FmhjaTzH%2BbLGEMTBZ5bnP13MOOmdDJ2J8PtUNoIBMh2ZSJ2kYKZS3fK90kTvqRClC7P7jiNgbdHlJFqs6jYZs8hh0zG0HcgRLpcGAjbwtLRAcaRT9r1Sa5%2FTUEbuW87UZJEEiQZo%2BqdV02%2FL9tCVnojHNtyxnGJkIwQP5YyfMX0nPBRr%2BHMiNvOSDQhGKurO3ofyXne%2FJFj%2BCBwLHOBh1pVxe%2FurJooypGEFjcqgN11utOGa40FYeCSUVGh%2Feu0Kdho1uzPzx5TW51gX88JlgMGUM4VxhZup3sK8Fij67Y5DCY%2BIHOBjqkAT%2BYCB9DLn3RV1k8w2r5mY8HNE3HAm7an7TpKa76oFLRDreHD4PaIvnwOnUdBQkdQ3tGCMvVd2BDVrZ5PbY6dXb4QylotpxcYmE4CYp1cYRIj82AzmB4zHBKAK4byzxg9rCt69s3pgA9P18FpIARzfGIwbY%2FD7vchVlY7uu5Vz1we7g4zcPn%2FN13hr19Sjmlurrs4gPs2PCAn96aavo1zNvQUC0o&X-Amz-Signature=f43ff9bc18bd366b7f113c22c065ebb059432f30007d92210912f48fb4c7004d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


## 实机演示


## 相关工具

- 大佬的 Hacker News 每日播报：[https://hacker-news.agi.li/](https://hacker-news.agi.li/)
- 我的 Hacker News 每日播报：[https://hacker-news.1874.run/](https://hacker-news.1874.run/)
- Podcast RSS 每日播报：[https://podrss.1874.run/](https://podrss.1874.run/)
- XiaoMusic：[https://github.com/hanxi/xiaomusic](https://github.com/hanxi/xiaomusic)

> 顺便推荐下我的备忘录站点：[Cody 的百宝箱](https://memo.1874.run/)    
> 基于 Telegram + Astro 打造，是我的折腾日记。不同于独立博客，它更像是我的 Flomo 网页版，主要是日常开发记录 & 技术分享。你也可以加入我的 Telegram 群聊，一起自由讨论。

