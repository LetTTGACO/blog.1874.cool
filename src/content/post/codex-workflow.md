---
date: '2026-06-09 08:00:00'
description: 从对话到沉淀的工作流通过自定义 Skill 将 Codex 对话中的问题、想法和行动自动分类并记录到 Flomo、TickTick、Notion 等工具，实现即时捕获 TODO、跨项目洞察和项目分析，并通过图像生成、R2 上传等步骤完成博客配图与更新，形成一套高效的信息沉淀与任务管理体系。
hidden: false
urlname: codex-workflow
title: 从对话到沉淀：我的 Codex 工作流实践
tags:
  - VibeCoding
cover: 'https://image.1874.run/blog/642e33c3f702976d0d0ced5746e440a0.png'
updated: '2026-07-06 11:15:00'
draft: false
---
> 2026-07-05 更新：当前文档这套工作流算是我持续研究 Vibe Coding 工作流的一个基础模板。 其中存放文档的知识库和相关 Skill 已经升级为 AI Fitst Obsidain，目前持续改进中，后续稳定后会更新。

## 前言


在使用 Codex 代码开发时，我发现有以下几个问题会让我头疼

1. 优化项目代码时可能有很多 TODO 需要解决，但是不能及时处理，后续想翻找会话历史还挺费劲的。我需要一个地方能及时记录这些问题
2. 和 Codex 聊天的过程中也会诞生一些想法/实践/沉淀，如果不及时记录就会很容易找不到/忘记

所以我需要一个工作流能在聊天过程中及时记录/沉淀，而我使用的flomo/notion/滴答清单刚好能承接这些内容，就创建了一些 Skil 来规范这些 mcp 调用规范


## 系统架构总览


```javascript
用户对话入口
   │
   ├─ 📦 自定义 Skill 层（6 个个人 Skill）
   │    ├─ 🧭 dev-info-router             → 开发信息分流
   │    ├─ 📝 flomo-engineering-insights  → Flomo 工程洞察沉淀
   │    ├─ ✅ ticktick-action-capture     → TickTick 行动捕获
   │    ├─ 📚 notion-project-dev-record   → Notion 项目记录
   │    ├─ 🖼️ ian-xiaohei-illustrations   → 博客正文配图
   │    └─ ☁️ r2-image-upload             → 图片上传到 R2 CDN
   │
   ├─ 🔌 外部工具层（MCP / App / 本地脚本）
   │    ├─ Flomo MCP       → 笔记搜索、创建、标签规范
   │    ├─ Dida365 MCP     → 滴答清单任务、项目、标签
   │    ├─ Notion App MCP  → Notion 搜索、读取、建页
   │    ├─ image_gen       → 生成正文配图
   │    └─ rclone          → 上传图片到 Cloudflare R2
   │
   ├─ 🧩 工程协作层
   │    └─ Superpowers     → 规划、调试、验证、代码评审流程
   │
   └─ 🧠 信息沉淀层
        ├─ Notion          → 项目上下文和后续恢复材料
        ├─ TickTick        → 明确下一步和时间提醒
        └─ Flomo           → 跨项目可复用经验
```


## 📦 六个自定义 Skill


### 🧭 dev-info-router - 开发信息分流

> 这是 Codex 里最像“中枢”的自定义 Skill，负责判断一轮开发上下文应该沉淀到哪里。

触发词：沉淀一下、整理开发上下文、做一次信息分流、线程收尾、判断放到哪里


职责边界：

- 项目相关分析 → Notion
- 明确行动提醒 → TickTick
- 跨项目复用洞察 → Flomo
- 默认先给分流草案，不直接写入

核心规则：

- 不把项目细节塞进 Flomo
- 不把长分析塞进 TickTick
- 不把个人洞察误写成项目记录
- 不确定时先放 Notion 项目分析 inbox

### 📝 flomo-engineering-insights - Flomo 工程洞察

> 用于把 Codex 协作中的可复用经验沉淀成 Flomo 笔记。

触发词：总结到 Flomo、保存工程洞察、整理成笔记、今天做了什么


职责边界：

- 只记录跨项目仍有价值的判断
- 支持工程原则、问题模式、Codex 协作方法、轻量 day log
- 写入前读取 Flomo 格式规范和标签规则

核心规则：

- 所有新笔记带 `#Inbox`
- 不写项目局部细节、日志、代码片段
- 默认先出草稿，用户确认后再写入

### ✅ ticktick-action-capture - TickTick 行动捕获

> 用于把对话里的明确下一步转成滴答清单任务。

触发词：提醒我、加到滴答、创建待办、TODO、下周跟进


职责边界：

- TickTick 是执行系统，不是知识库
- 只捕获有明确动作的任务
- 按清单、标签、优先级、时间组织

核心规则：

- 一个任务只放一个动作
- 长分析不进 TickTick
- 模糊时间先确认
- 复杂任务用结构化批量写入

### 📚 notion-project-dev-record - Notion 项目记录

> Codex 的会话搜索有点难用，有时候分析出来的一些项目BUG/优化，但目前暂时不开发就会扔到Notion。把项目分析、bug 假设、架构判断、恢复上下文写入既有 Notion 项目库。

触发词：记录到 Notion、保存项目分析、写入项目记录、后面恢复用


职责边界：

- 只写已有项目数据库
- 不默认新建项目页
- 严格按项目 reference 里的 data source、字段名、枚举值写入

核心规则：

- 项目上下文优先 Notion
- 写入前确认目标项目
- 不猜 schema
- 对 connector 敏感字段保持保守

### 🖼️ ian-xiaohei-illustrations - 小黑正文配图

> 利用 GPT 的文生图给博客文章配图

触发词：配图、文章插图、小黑、正文图、shot list、生成图片


职责边界：

- 先理解文章结构和认知转折
- 优先产出 4-8 张 shot list
- 明确要求生成时直接调用 image generation

核心规则：

- 小黑必须参与核心动作
- 纯白背景、黑色手绘、少量红橙蓝批注
- 不做 PPT 风流程图
- 不复刻旧案例构图

### ☁️ r2-image-upload - R2 图片上传

> 懒得自己上传了，直接让 Codex 把生成的博客封面图上传到 R2 然后更新到 Notion 文章里

触发词：上传图片、转成 CDN 链接、发到 R2


职责边界：

- 使用现有 `rclone` 配置
- 默认上传到 `r2:image/blog/`

核心规则：

- 不打印、不检查 rclone secrets
- 不返回原始 R2 URL
- 保留本地文件不移动
- 随机 32 位 hex 文件名

## 🔄 Skill 之间的配合


```javascript
用户说「帮我整理并记录下这个问题」
    ↓ 触发
dev-info-router 🧭
    ↓ 判断信息归属
    ├─ 项目分析
    │    ↓
    │  notion-project-dev-record 📚
    │    ↓
    │  写入 Notion 项目记录
    │
    ├─ 明确下一步
    │    ↓
    │  ticktick-action-capture ✅
    │    ↓
    │  创建或草拟 TickTick 任务
    │
    └─ 可复用经验
         ↓
       flomo-engineering-insights 📝
         ↓
       草拟或写入 Flomo 笔记
```


```javascript
用户说「给这篇文章配个封面图并更新到Notion中」
    ↓ 触发
ian-xiaohei-illustrations 🖼️
    ↓ 读取文章、生成 shot list
    ↓ 用户要求生成
image_gen
    ↓ 本地图片产物
    ↓ 发布到R2
r2-image-upload ☁️
    ↓
将图片更新到 Notion 封面图
```


## 🔌 外部工具配合


| 工具             | 主要用途                | 被哪个 Skill 使用                                |
| -------------- | ------------------- | ------------------------------------------- |
| Flomo MCP      | 笔记搜索、创建、标签查询、格式规范   | flomo-engineering-insights                  |
| Dida365 MCP    | 任务创建、项目列表、标签管理      | ticktick-action-capture                     |
| Notion App MCP | 页面搜索、读取、创建项目记录      | notion-project-dev-record / dev-info-router |
| image_gen      | 生成中文正文配图            | ian-xiaohei-illustrations                   |
| rclone         | 上传图片到 Cloudflare R2 | r2-image-upload                             |


## 🧩 和通用插件的关系


自定义 Skill 解决的是“我的个人工作流应该怎么走”，而插件能力解决的是“Codex 能做哪些通用事情”。


例如：

- 写代码、跑测试、做验证时，主要依赖 Codex 自身能力和 Superpowers 的工程流程。
- 处理 GitHub PR、CI、review comments 时，主要依赖 GitHub 插件。
- 做前端页面验证时，主要依赖 Browser / Playwright。
- 需要把开发过程沉淀下来时，才进入 dev-info-router 这组自定义 Skill。

所以这套架构里，自定义 Skill 更像是我的工作方式说明书，插件和 MCP 则是具体执行工具。

