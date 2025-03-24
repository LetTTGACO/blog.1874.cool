---
date: '2025-03-24 08:00:00'
description: ''
hidden: false
urlname: hacker-news-rss
title: 用小爱音响听 Hacker News & RSS
tags:
  - 赛博空间
  - HomeLab
updated: '2025-03-24 17:19:00'
draft: false
---

## 前言


Hacker News 以及 各种 RSS 是我信息流获取方式中很重要的咨询来源。但随着 RSS 订阅数的增多，以至于有很长一段时间每天都有十几条更新，慢慢的就会变得没有精力去看完所有，甚至还有点焦虑。后来将 RSS 做了一次减法和筛选，目前订阅了只有大概十来条 RSS，每天更新的频率也锐减到 0 至 3 条。


不过一部分 RSS 和 Hacker News一样，因为是英文，所以大部分时间我都是用插件将他们翻译为中文然后阅读。随着 AI 大模型百花齐放，我一直都想用 AI 能帮我做点什么。


直到我遇到了这个宝藏博主的 Hacker News 每日播报 项目：[https://github.com/ccbikai/hacker-news](https://github.com/ccbikai/hacker-news)


## Hacker News 每日播报


一个基于 AI 的 Hacker News 中文播客项目，每天自动抓取 Hacker News 热门文章，通过 AI 生成中文总结并转换为播客内容。


![image.png](https://image.cody.fan/blog/c4233647a4aeab7374393fbae06213fa.png)


![Hacker-News.png](https://image.cody.fan/blog/0cdbfb69f821ded84a27ca31037005e4.png)


这个项目一下子打开了我的新思路，通过手机的播客订阅 RSS，就可以在任意时间通过播客的方式来听 Hacker News 热门新闻。然而我并不满足于此，既然可以用这套流程来总结 Hacker News，那么也应该可以总结那些文本类型的 RSS，将我关注的 RSS 也用这种方式生成 Podcast。


**于是，Podcast RSS 每日播报诞生了。**


## Podcast RSS 每日播报


一个基于 AI 的 RSS 中文播客项目，每天自动抓取你感兴趣的 RSS 更新内容，通过 AI 生成中文总结并转换为播客内容。


![Podcast-RSS.png](https://image.cody.fan/blog/c7e6e4e32dac019915a559a0afbf82be.png)


## 小爱音响播放每日播报


通过这两个项目的生成流程，我的 Cloudflare R2 中会存在每天的每日播报音频文件。我就在想能不能更近一步，能不能用小爱音响来收听。


非常惊喜的是，我找到了这样一个开源项目：[https://github.com/hanxi/xiaomusic](https://github.com/hanxi/xiaomusic)


把它部署到我的家庭服务器上之后，就可以通过自定义口令来播放本地音乐。我写了一个 shell 脚本，并设置了一个定时器，每天晚上定时下载 Cloudflare R2上的每日播报音频文件。


于是，我的流程最终形态出现了：


![%E6%AF%8F%E6%97%A5%E6%92%AD%E6%8A%A5.png](https://image.cody.fan/blog/f53a2cf71d70ff1190eb65ec47f6caac.png)


## 实机演示


## 相关工具

- 大佬的 Hacker News 每日播报：[https://hacker-news.agi.li/](https://hacker-news.agi.li/)
- 我的 Hacker News 每日播报：[https://hacker-news.1874.run/](https://hacker-news.1874.run/)
- Podcast RSS 每日播报：[https://podrss.1874.run/](https://podrss.1874.run/)
- XiaoMusic：[https://github.com/hanxi/xiaomusic](https://github.com/hanxi/xiaomusic)

> 顺便推荐下我的备忘录站点：[Cody 的百宝箱](https://memo.1874.run/)    
> 基于 Telegram + Astro 打造，是我的折腾日记。不同于独立博客，它更像是我的 Flomo 网页版，主要是日常开发记录 & 技术分析。你也可以加入我的 Telegram 群聊，一起自由讨论。

