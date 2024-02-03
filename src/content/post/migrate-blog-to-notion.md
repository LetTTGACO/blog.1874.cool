---
date: '2023-04-10 08:00:00'
description: 这篇文章介绍了将博客迁移到Notion的经历。作者提到了使用语雀作为原始博客平台，然后转向Notion的原因，包括Notion的友好API、筛选和排序功能、AI功能以及中文插件。作者还介绍了使用NotionNext来持续集成部署到Vercel的过程，并提到了在迁移过程中遇到的问题，如Notion对Markdown导入的不完美和NotionNext的一些小瑕疵。
urlname: migrate-blog-to-notion
title: 迁移博客到 Notion
tags:
  - Notion
  - 博客折腾手册
updated: '2024-02-03 18:23:00'
draft: false
---

## Why Notion ?


这是我第三次进行博客的迁移了！


原本的博客是基于[语雀](https://www.yuque.com/) 云端书写 + 语雀 webhook + 自建Node API服务 + [yuqe-hexo-with-cdn](https://github.com/LetTTGACO/yuque-hexo-with-cdn) + [Hexo](https://hexo.io/) + Github Actions 持续集成部署到腾讯云COS静态网站上。


现在是基于 [Notion](https://www.notion.so/zh-cn) + [NotionNext](https://tangly1024.com/article/notion-next) 持续集成部署到 [Vercel](https://vercel.com/) 上。


本人接触Notion有一段时间了，但是一直没怎么用起来，原因有三

- 当时以为没有中文
- 语雀的写作舒适感要更好一点
- 还没感受到Notion的强大

在用了2年时间语雀之后，语雀的产品策略越来越离谱，各种收费割韭菜。再加上之前一段时间开发 Elog 对接语雀和 Notion 的 Api 时，发现 Notion 原来这么好用。

- Notion 的 Properties 天然对Api很友好。再也不用在语雀的文章头部手动添加 Front-Matter。
- Notion 的筛选和排序对于统一分类管理文章很方便
- Notion AI 永远的神。ChatGPT 火起来之后，对于 Notion 这种写作工具来说简直是锦上添花。用来帮忙写总结，写技术方便，修正文章格式等等。虽然现在还是有很多能力没有深度绑定，但是已经足够好用了！坐等官方更新！
- 找到中文插件了，其实用习惯之后，是不是中文也没那么重要了。不过一个有中文的话会让小白用户更快的爱上 Notion

## Why NotionNext ?


> 2024/02/03更新，博客已迁移至 Notion & Elog & Astro & Vercel


其实一开始是准备用我自己的 [Elog](https://elog.1874.cool/) 工具来将 Notion 文档同步到博客平台。在无意间发现了 [NotionNext](https://tangly1024.com/article/notion-next) ，部署简单，对于 Notion 的格式支持度非常高，所以我才选择了它。


不得不说，NotionNext 对于我的 Elog 在 Notion 的发展是一个不小的打击，Elog 完全没有优势。不过这也让我看到了我的 Elog 的未来的发展方向。


通过深入 NotionNext 的研究，发现大家都逃不过缝合怪。Notion社区生态的强大完全可以造就一个又一个的 类 NotionNext，所以我也相信我的 Elog 在不久后也能成为一个优秀的博客同步工具。


正如我的 Elog 介绍


> Elog: 开放式跨平台博客解决方案，随意组合写作平台(语雀/Notion)和部署平台(Hexo/Vitepress/HuGo/Confluence)等


Elog 生态将是我未来的强大优势！


## 迁移中遇到的的问题


### Notion 对于 markdown 的导入还没有很完美


其实已经很好了，就是有几个小问题

1. Notion 没能完全区分行内代码块和代码块

有时候会把行内代码块识别为代码块，造成不必要的换行和格式错乱。我导入的60多篇文档，一大半都有这个问题，好在有 Notion Ai 的帮助，才让我不那么痛苦的手动调整格式。

1. Notion 对于代码块的语言识别不够完善

对于常见的 `TypeScript` 和 `JavaScript` 没能完全识别出来，导致代码的格式化出现问题，代码少了换行，全部堆积在一起。而且 Notion Ai  处理它的速度也比较慢，不如我手动按照原文档复制粘贴来得快。


而且处理之后的文档在同步到别的工作区也会丢失一部份的代码块的语言识别和格式化，这让我有点头痛，好在只是一次性的工作量……


### NotionNext 虽强大但也还有小瑕疵

1. NotionNext 不支持 `Internal integration token`

NotionNext 是基于公开分享的页面来实时获取 Notion Database 中的数据，这意味着你的 Notion 数据源被完全公开了，用户有可能通过 `Page Id`找到你的博客源数据，而一些你不想被分享的文章或者数据就暴露了。


虽然官方给出的方案是 可以使用 cookie 中的 `auth_token`，但是它是有有效期的。而且经过我的实测，`auth_token`存在并发问题：NotionNext 会在短时间内请求很多次API。在我60来篇文档的部署过程中就出现了请求次数过多的错误，所以我暂时还是用的公开的页面来部署。


不过话说回来，既然部署到博客都能公开，那这个数据库里面的文档其实被看到也无所谓啦～


话虽如此，我还是寻求过解决方案，因为我的 Elog 就是基于 `Notion Internal integration token` 来部署的（所以 Elog 的功能很有限）。我尝试过改动 Notion Next 中的相关API 来支持它，结果得到的答案是，NotionNext 所使用的 [react-notion-x](https://github.com/NotionX/react-notion-x) 库不是基于官方API来开发的。


正如 [react-notion-x](https://github.com/NotionX/react-notion-x) 中 [Why use notion-client over @notionhq/client? ](https://github.com/NotionX/react-notion-x/issues/457)所描述的那样


> `notion-client`在官方客户端发布之前就出现了，官方客户端不支持所有块类型并且由于某种原因效率极低。更多细节在[这里](https://github.com/NotionX/react-notion-x/tree/master/packages/notion-compat)


`Notion Internal integration token` 是官方 API 所提供的令牌，而官方 API [@notionhq/client](https://github.com/makenotion/notion-sdk-js) 无法支持所有现有的 Notion 功能模块，所以需要等官方 API 完善了才能使用它。

1. NotionNext 不是很稳定

NotionNext 部署的博客，浏览器控制台会出现很多报错。大部分都是使用 React/NextJs 不标准导致的，当然它也存在性能问题，我能感觉到他调用了很多不必要的 API 。好在有缓存，导致线上问题不那么明显。


还有一些 UI、路由、网站配置等小问题需要作者去解决，不过当下最好的办法当然是自己修复它。我已经修复了一些看起来比较明显的问题，还有一些需要接下来一小段时间去解决它。当然，如果能参与 NotionNext 的开发的话会更好。

