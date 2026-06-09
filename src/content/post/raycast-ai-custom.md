---
date: '2026-06-09 08:00:00'
description: 通过在 Raycast 设置中启用 Custom Providers 并编辑 providers.yaml，可将火山方舟、Doubao、DeepSeek 等模型接入 Raycast AI，支持温度、系统消息、工具调用和视觉输入等能力。配置后可为 Quick AI 和自定义翻译等功能指定首选模型，实现系统级实时翻译并通过快捷键快速调用，提升工作流效率。
hidden: false
urlname: raycast-ai-custom
title: Raycast AI 接入自定义 Providers
tags:
  - 赛博空间
cover: 'https://image.1874.run/blog/c6134313479be0678da9ce61d7aa7eb7.png'
updated: '2026-06-09 23:56:00'
draft: false
---

## 前言


为了榨干我订阅的火山引擎的 Coding Plan Pro 价值，我最近都在绞尽脑汁用 AI 优化我现有的工作流。


我从很早就开始用 Raycast 了，一开始的 Raycast AI 只能订阅它自己的套餐，最近发现竟然支持自定义Provider了（其实25年7月就支持了。。。）


然后就研究了一下，还真让我发现了一些好用的场景。


## 配置第三方 Provider


### 1. 在设置中打开 Custom Providers


![image.png](https://image.1874.run/blog/69cd79f15b584ab80ae91f5f56f25fa8.png)


### 2.配置 Providers.yaml 文件

> 初次配置时，文件名是：`providers.example.yaml` ，配置完成后需要改名为`providers.yaml` 才会生效

![image.png](https://image.1874.run/blog/70a53af75dd23a69a42fb434b9f4e7ab.png)


```javascript
providers:
  - id: ark-coding
    name: 火山方舟 Coding Plan
    base_url: https://ark.cn-beijing.volces.com/api/coding/v3
    api_keys:
      ark: 你的 API Key
    models:
      - id: glm-5.1
        name: GLM-5.1
        provider: ark
        context: 200000
        abilities:
          temperature:
            supported: true
          system_message:
            supported: true
          tools:
            supported: true
          vision:
            supported: true
      - id: doubao-seed-2.0-lite
        name: Doubao-Seed-2.0-lite
        provider: ark
        context: 256000
        abilities:
          temperature:
            supported: true
          system_message:
            supported: true
          tools:
            supported: true
          vision:
            supported: true
      - id: deepseek-v4-pro
        name: DeepSeek V4 Pro
        provider: ark
        context: 1024000
        abilities:
          temperature:
            supported: true
          system_message:
            supported: true
          tools:
            supported: true
          vision:
            supported: false
      - id: doubao-seed-2.0-pro
        name: Doubao-Seed-2.0-pro
        provider: ark
        context: 256000
        abilities:
          temperature:
            supported: true
          system_message:
            supported: true
          tools:
            supported: true
          vision:
            supported: true
```


```javascript
providers:
  - 一个服务商:
      id: Raycast内部服务商ID
      name: 界面显示名称
      base_url: OpenAI兼容API地址
      api_keys:
        key别名: API Key
      models:
        - 一个模型:
            id: 实际发送给API的模型名
            name: 界面显示模型名
            provider: 使用哪个key别名
            context: 上下文长度，具体得看模型本身支持的长度
            abilities: Raycast认为这个模型支持的能力
```


关键参数：

- `abilities.temperature.supported: true` 表示这个模型支持温度参数。Raycast 可以给它传 `temperature`，用于控制回答随机性。一般翻译、总结、代码建议可以低一点；创意写作可以高一点。
- `abilities.system_message.supported: true` 表示支持 system prompt。Raycast 可以把 AI Command、Preset、全局指令等作为 system message 传给模型。
如果这个能力不支持，很多“角色设定”“固定翻译风格”“命令模板”效果会变差。
- `abilities.tools.supported: true` 表示支持工具调用，也就是 OpenAI 风格的 function calling / tool calling。Raycast AI Extensions、一些需要调用扩展能力的场景可能会依赖它。不过这里要注意：你写 `true` 只是告诉 Raycast“这个模型支持工具”，但实际能不能跑通还取决于该模型的 OpenAI-compatible tools 格式支持得好不好。
- `abilities.tvision.supported: true` 表示支持图片输入。Raycast 会允许你给这个模型附带图片、截图等视觉输入。例如 `deepseek-v4-pro` 就不支持图片输入。
> `abilities.vision.supported: true`  这个参数貌似对第三方 Providers 支持不太好，我即使配置了 `true` ，模型也无法看到我发的图片。

## 使用场景


配置完成后可以自定义每个功能的首选 Model


![image.png](https://image.1874.run/blog/f4914a85597c09dd80094ed2d50f7de5.png)


Raycast AI 我目前常用的就是 Quick AI 和 AI Command 这两个


### Quick AI


唤醒 Raycast 框后按下 Tab 建可以与 AI 进行对话。我一般用于快速查询一些简单问题，复杂问题我都是直接使用 Chat GPT 了。


![image.png](https://image.1874.run/blog/658c86449c0cd462e6431d4b4ca60572.png)


### 智能翻译 AI Command


我把 Raycast 自带的 AI Command 全禁用了。我目前用的最多的就是自定义的「智能翻译」AI Command。其他 AI 功能我还在探索中，感觉现在 AI 工具实在是太多了，只能按便利性/专业程度使用多工具来处理日常比较好。


它的好处是系统级的翻译，只要是能选中文字的地方，就能即时翻译。虽然网页端的全文翻译我用的是插件，但是偶尔也只需要翻译一句话，就可以用这种方式来解决。


![image.png](https://image.1874.run/blog/eda81daf532d68935cbd4dff9170051f.png)


这是我的 Prompt


```javascript
你是一个双向翻译助手。

请自动判断输入文本的主要语言，并按下面规则处理。

规则：
1. 如果输入主要是英文：
   - 翻译成自然、准确的简体中文
   - 如果里面有重要术语、缩写、技术名词、产品名、概念词，请在译文后补充「名词解释」
   - 名词解释要简短，帮助中文用户理解背景和含义
   - 代码、命令、URL、文件路径、变量名、包名不要翻译

2. 如果输入主要是中文：
   - 翻译成自然、地道的英文
   - 语气简洁、清楚、适合日常沟通或技术交流
   - 不要额外解释

3. 如果输入中英文混合：
   - 根据主要语言判断翻译方向
   - 保留代码、命令、URL、文件路径、变量名、包名

输出格式：

如果是英译中：

【原文】
这里输出原始英文

【翻译】
这里输出中文译文

【名词解释】
- 术语 1：解释
- 术语 2：解释

如果没有需要解释的名词，可以省略「名词解释」。

如果是中译英：

【原文】
这里输出原始中文

【翻译】
这里输出英文译文

输入内容：
{selection}
```


![image.png](https://image.1874.run/blog/1876fdc20d2938fc26bfec2412d74f2e.png)


Prompt 中是可以添加动态变量的

- Selected Text 当前光标选中的文本。我自己用的是这个
- Clipboard Text 剪贴板的文本

配置完成后设置一个快捷键触发，例如 `option + F` 。使用起来就非常舒服：

1. 选中需要翻译的文本
2. 按下`option + F` 就会开始翻译了

![image.png](https://image.1874.run/blog/fd5d26db050bc68c8cb6f750520db9aa.png)

> 当然，他也有个小问题：有点小慢。因为它的调用流程会多一层转发，先交给 Raycast 然后再转发到自定义 Provider。Raycast AI 官方订阅则没有这个问题，还挺快的，不知道是不是故意的。
