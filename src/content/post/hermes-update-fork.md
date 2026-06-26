---
date: '2026-06-27 00:00:00'
description: 通过将 Hermes 的 origin remote 指向个人 fork，并创建 .skip_upstream_prompt 静音文件，可让 hermes update 从 fork 拉取代码，实现安全的更新与补丁开发流程；同时可自行设置 upstream 同步官方仓库，保持 fork 与上游代码同步，简化开发、合并和部署步骤。
hidden: false
urlname: hermes-update-fork
title: 无需打散件补丁：用 fork 接管 Hermes 更新
tags:
  - 赛博空间
  - Hermes
updated: '2026-06-27 04:00:00'
draft: false
---

## 前言


我的 Hermes 是部署在局域网的机器上的，而目前 Hermes 不支持飞书渠道的 Cardkit 卡片消息，所以我自己打了补丁来实现。而在服务器上真实测试时，之前的流程是汇总改动的文件，然后去服务器上 Hermes 源代码目录中替换掉对应文件。但如果在服务器上使用`hermes update`更新时，又会被官方代码覆盖了（虽然可以恢复暂存，但不好应对冲突情况）


最近在 Claude 的帮助下，发现一个非常舒服的开发/更新流程


## 核心判断


Hermes 的 `hermes update` 在拉代码阶段固定执行：


```bash
git pull --ff-only origin <branch>
```


所以更新来源由服务器部署目录里的 `origin` remote 决定。


只要 `origin` 指向个人 fork，`hermes update` 就会从 fork 拉取 `main`，并继续执行 Hermes 自带的快照、pull、语法校验、回滚保护、清 bytecode、依赖重装、迁移等步骤。


### fork 检测静音


`hermes update` 检测到 `origin` 是 fork 时，可能会提示或尝试同步官方 upstream。为了让服务器更新只关注个人 fork，需要满足：

- 服务器上没有 `upstream` remote。
- 存在 `$HERMES_HOME/.skip_upstream_prompt`。
> 注意：`.skip_upstream_prompt` 只负责静音 fork 检测提示，不负责改变代码拉取来源。真正让 update 拉 fork 的开关是 `origin`。

## 配置 fork 更新流程


基于以上判断，可以设置新的更新流程。


我的服务器的相关路径：

- Hermes 源码目录：`/usr/local/lib/hermes-agent`
- `HERMES_HOME`目录：`~/.hermes`

```bash
cd /usr/local/lib/hermes-agent

# 1. 改 origin 指向个人 fork
git remote set-url origin https://github.com/LetTTGACO/hermes-agent.git

# 2. 确认无 upstream remote（fork 检测静音前提）
git remote get-url upstream 2>/dev/null || echo "无 upstream，OK"

# 3. 建 skip 标记，有这个文件就行，不需要有内容
touch "~/.hermes/.skip_upstream_prompt"

# 4. fetch fork 并对齐到 fork main（清掉工作区手工补丁）
git fetch origin
git reset --hard origin/main

# 5. 尝试一次Hermes更新，会自动重启
hermes update
```


## 新的开发流程


### 1. 设置本地项目 upstream 为官方仓库


如果需要 fork 仓库的代码能定期保持和官方仓库代码一致，可以设置此项：


```bash
git remote add upstream https://github.com/NousResearch/hermes-agent.git
```


### 2. 将 upstream 的最新改动同步到 fork 仓库


```bash
git fetch upstream
git merge upstream/main     # 冲突：解决后 git add + git commit
git push origin main        # merge 不改写历史，普通 push 即可。
```

> 注意：`git merge` 会让提交记录多一条 merge 记录，如果要保持单线提交，就得用到 `git rebase upstream/main` 改写提交历史了。我暂时自用的话，就直接 merge了，不制造复杂度。

## 3. 修改代码并合并到 main 分支


不管是新建分支还是新建 worktree 进行开发，开发完只需要将提交合并到 fork 仓库的 main 分支就行，然后推送到 fork 仓库。


## 4. 更新服务器的 Hermes


直接执行`hermes update`，Hermes 的更新流程就变成从你的 fork 仓库 main 分支拉取最新代码了。


## Hermes 支持飞书 Cardkit 卡片流式输出


展示下我的成果。目前官方 Hermes 在飞书上的表现


![image.png](https://image.1874.run/blog/3e8988c5ba1877f2bb15ea4c44d986e4.png)


我打了补丁之后的效果


![image.png](https://image.1874.run/blog/32eb5c8b82690954e4486670c75a33d5.png)


因为目前我主要是自用，可能会有一些我没体验到的 BUG。如果有想用的话，可以直接按照【配置 fork 更新流程】设置为我的仓库就行。

