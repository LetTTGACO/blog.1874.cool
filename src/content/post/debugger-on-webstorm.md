---
date: '2024-02-02 08:00:00'
description: 在WebStorm中调试React/Vue等项目的正确姿势是通过"JavaScript调试"配置来设置调试模式，并在项目中打断点后刷新浏览器页面以进入WebStorm调试模式。
hidden: false
urlname: debugger-on-webstorm
title: 在 WebStorm 中调试 React/Vue 等项目
tags:
  - 赛博空间
updated: '2024-05-28 20:13:00'
draft: false
---

## 引言


关于调试前端代码，由于Webstorm 的使用基数确实比 VsCode 少一些，网上的教程也比较少，甚至还有一些胡说的，例如要下载浏览器插件。基于我对 Webstorm 的认知，这个团队是不会把这么基础的功能做复杂的，开箱即用才是 Jetbrains 团队所追求的，这也是我喜欢 Webstorm 的原因。


> 本教程基于 Webstorm 2023.3.3 实践，其他版本请参考[官方文档](https://www.jetbrains.com.cn/en-us/help/webstorm/debugging-code.html)


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/9ffa333b-8f47-42c5-9a0e-e1c087f417bb/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6VLECUU%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T004634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC9Xo0S%2FlMmCZ03Gb9kV5Mb7uBpeUXbGFnlAgndOt1r7wIhAJ%2Bg1xPxjM5TnzqmPKwh4dccXbkuhLD3UiOi0VEyjZqmKv8DCHEQABoMNjM3NDIzMTgzODA1IgxitQGHVbITLF3vrHAq3APg3Bd8u5pydhFlKctYtAfSJVSMZnqqhdQxNWz%2FXienEW11L3Z8nu4pGEOTb9zlyN0pJYVhz%2F2bfLtTW48o6Qeg9OzkpVhPq5G2%2BF%2FCpqjtd62ywCpwUbMeqbvRL1G%2Bmsxy7eT8A26Bk1slJ44YJLr4y%2BGvpnkcmhYklglK3tPO8kliqX%2BT1WttgaWaCW64YgwdjqnfA7ONQ83p92HyQ4QMf%2BEZOm2Pv%2BSpQOOUlwJnnorvlJMUvTcbmMnpI8%2FD%2B0KlcNx%2Bm5rr25y2jj3FOFdLo3tH%2FDXt%2BwHPqLVoIhOYe%2BECHiMN52HDRG%2FnVMxBxUV2bgWRzq%2B5dQOIEZCF6Va1ZjNApclCHscbc3m73HH%2BGBCwSCFHa%2F6p9bJxBT1BnX1%2FYd2ypMfqA%2FuLSK5%2FSBtZCGPvTaaQ5XJTxDckCSOE6FFCkbqwQHkgo9mfPcEmYJzneU%2F7Zmofu6L1RNG98RyAKqFQUG66UueIlQt%2FgnHzR8Zr5p7gmW5Lvc3uBoE929MCo0zEd75NOHNyGIUsvLCRnQP0L6xsXhD6QYwTjr%2BS6uK9xMT9D%2BInMqII11uBmVmXUbixKnkWPTLHhdNSF5SugdMi8OdfXXXLxK%2BzCcQ%2Fe6mj3KN%2FTCsMq9C%2FqzD694HOBjqkAc%2BzrZLCcfxIt%2Bb%2BKMxm4tWUJXRjuIUiFjoEeGIp%2BHLOgd0r%2Fhnf4XUJsp24s6DlJwyQ%2FO1VOnObI8Kfoi2kHNSlbfLcbjiweFjPoG1ajOO1ja5To0F04JETKYFIweB7EUQeHR4uQ9HRfERpHqKE6JydSvE9XZvORupaJNdj6e9X2wncIMJZXTfWp%2BEN5od8QqUBNy7KPDJez2Z6CP9fLP5sPcFm&X-Amz-Signature=bc23c98cea9b391d9e912add515a47dfa2b8451e4aec912cc5790fb4e0bd8f74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


可以看到，Webstorm 支持很多种形式的调试，这里以调试 NextJs + React 项目为例，其他项目的调试姿势基本一样。


## **调试姿势**


我原本以为 Webstorm 会将调试直接融入 `npm script` 命令中，直接使用 `debug` 模式启动 `npm script` 就可以开始调试。在网上找了一圈教程，好多都是需要新建配置，一开始我还不相信，直到我看了官方文档才相信。


### **错误的调试姿势**


> Node 项目可以直接在 npm script 中打断点直接进行调试，不需要新建「JavaScript 调试」配置


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/07f15c33-4414-48b4-a3c7-65b82c436fd5/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6VLECUU%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T004634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC9Xo0S%2FlMmCZ03Gb9kV5Mb7uBpeUXbGFnlAgndOt1r7wIhAJ%2Bg1xPxjM5TnzqmPKwh4dccXbkuhLD3UiOi0VEyjZqmKv8DCHEQABoMNjM3NDIzMTgzODA1IgxitQGHVbITLF3vrHAq3APg3Bd8u5pydhFlKctYtAfSJVSMZnqqhdQxNWz%2FXienEW11L3Z8nu4pGEOTb9zlyN0pJYVhz%2F2bfLtTW48o6Qeg9OzkpVhPq5G2%2BF%2FCpqjtd62ywCpwUbMeqbvRL1G%2Bmsxy7eT8A26Bk1slJ44YJLr4y%2BGvpnkcmhYklglK3tPO8kliqX%2BT1WttgaWaCW64YgwdjqnfA7ONQ83p92HyQ4QMf%2BEZOm2Pv%2BSpQOOUlwJnnorvlJMUvTcbmMnpI8%2FD%2B0KlcNx%2Bm5rr25y2jj3FOFdLo3tH%2FDXt%2BwHPqLVoIhOYe%2BECHiMN52HDRG%2FnVMxBxUV2bgWRzq%2B5dQOIEZCF6Va1ZjNApclCHscbc3m73HH%2BGBCwSCFHa%2F6p9bJxBT1BnX1%2FYd2ypMfqA%2FuLSK5%2FSBtZCGPvTaaQ5XJTxDckCSOE6FFCkbqwQHkgo9mfPcEmYJzneU%2F7Zmofu6L1RNG98RyAKqFQUG66UueIlQt%2FgnHzR8Zr5p7gmW5Lvc3uBoE929MCo0zEd75NOHNyGIUsvLCRnQP0L6xsXhD6QYwTjr%2BS6uK9xMT9D%2BInMqII11uBmVmXUbixKnkWPTLHhdNSF5SugdMi8OdfXXXLxK%2BzCcQ%2Fe6mj3KN%2FTCsMq9C%2FqzD694HOBjqkAc%2BzrZLCcfxIt%2Bb%2BKMxm4tWUJXRjuIUiFjoEeGIp%2BHLOgd0r%2Fhnf4XUJsp24s6DlJwyQ%2FO1VOnObI8Kfoi2kHNSlbfLcbjiweFjPoG1ajOO1ja5To0F04JETKYFIweB7EUQeHR4uQ9HRfERpHqKE6JydSvE9XZvORupaJNdj6e9X2wncIMJZXTfWp%2BEN5od8QqUBNy7KPDJez2Z6CP9fLP5sPcFm&X-Amz-Signature=6a3682ffb3d4e6ab86a25d3996448ab44db14e99496b36a6efdf01f451551004&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


### 正确的调试姿势


利用**「JavaScript 调试」**来配置调试模式 **⬇️**


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/c8fc5191-33d8-4d97-afd3-82d75a1c2db6/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6VLECUU%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T004634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC9Xo0S%2FlMmCZ03Gb9kV5Mb7uBpeUXbGFnlAgndOt1r7wIhAJ%2Bg1xPxjM5TnzqmPKwh4dccXbkuhLD3UiOi0VEyjZqmKv8DCHEQABoMNjM3NDIzMTgzODA1IgxitQGHVbITLF3vrHAq3APg3Bd8u5pydhFlKctYtAfSJVSMZnqqhdQxNWz%2FXienEW11L3Z8nu4pGEOTb9zlyN0pJYVhz%2F2bfLtTW48o6Qeg9OzkpVhPq5G2%2BF%2FCpqjtd62ywCpwUbMeqbvRL1G%2Bmsxy7eT8A26Bk1slJ44YJLr4y%2BGvpnkcmhYklglK3tPO8kliqX%2BT1WttgaWaCW64YgwdjqnfA7ONQ83p92HyQ4QMf%2BEZOm2Pv%2BSpQOOUlwJnnorvlJMUvTcbmMnpI8%2FD%2B0KlcNx%2Bm5rr25y2jj3FOFdLo3tH%2FDXt%2BwHPqLVoIhOYe%2BECHiMN52HDRG%2FnVMxBxUV2bgWRzq%2B5dQOIEZCF6Va1ZjNApclCHscbc3m73HH%2BGBCwSCFHa%2F6p9bJxBT1BnX1%2FYd2ypMfqA%2FuLSK5%2FSBtZCGPvTaaQ5XJTxDckCSOE6FFCkbqwQHkgo9mfPcEmYJzneU%2F7Zmofu6L1RNG98RyAKqFQUG66UueIlQt%2FgnHzR8Zr5p7gmW5Lvc3uBoE929MCo0zEd75NOHNyGIUsvLCRnQP0L6xsXhD6QYwTjr%2BS6uK9xMT9D%2BInMqII11uBmVmXUbixKnkWPTLHhdNSF5SugdMi8OdfXXXLxK%2BzCcQ%2Fe6mj3KN%2FTCsMq9C%2FqzD694HOBjqkAc%2BzrZLCcfxIt%2Bb%2BKMxm4tWUJXRjuIUiFjoEeGIp%2BHLOgd0r%2Fhnf4XUJsp24s6DlJwyQ%2FO1VOnObI8Kfoi2kHNSlbfLcbjiweFjPoG1ajOO1ja5To0F04JETKYFIweB7EUQeHR4uQ9HRfERpHqKE6JydSvE9XZvORupaJNdj6e9X2wncIMJZXTfWp%2BEN5od8QqUBNy7KPDJez2Z6CP9fLP5sPcFm&X-Amz-Signature=36c8db6af9d32fa85030c9e98f547423eb8b4eace315de6be4db9bf462337e86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


## 调试配置

1. 在项目的运行配置中新建「**JavaScript 调试**」

	![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/55918a48-b1db-4f24-836b-ad5978c9fe60/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W4D55VUW%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T004635Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCbXRNmjofYHTQyvihHWhwkmKhvcgX0PTSdeKfGzfgGMQIhAP2p23z%2BUuAtQxAZuMFQPcninsWjQy4df3YkPZsdCYcIKv8DCHEQABoMNjM3NDIzMTgzODA1IgxTyIP17BvTjs5tUwMq3ANw0UQ2nSos4IOKmIlLNRtHia70TAQadDlqqngnMIZ6lii7esIq4D%2BDD1wGPLxbBAfE10X7vymeUY2mJ3ZAd6ZdQqWxXxHDMCd1EoQfqQWkfmGp5zkUjAx3IVw%2FULS27R8DJKSNQbjqhcGHkrpNNKDRESC5QV8DQUL1nJZZjBPCuWf8aVGXwUdkirFmFgolAiaBVl8iXrRgx2swGWkHXEHkPmMUV2V3gj8IyV0gRNvgg2MK7Dakv2eQcDQCuP2eMBdmLEE%2B%2Fk4bQ8E%2FrvoERwbhDaBIrbhq13FvtwYrG1u3Gsf7VxTkxMgvAJDyP7HAgNHTyyJ0bFxwjCu2MpmnFsNxTe7oy5G2OdCSUeeNAjKjvuqM6RuD2Pg6%2BWJo8t9uPLr2OfIkwuOkLqk4xObC0gjHKevQsOLtFXwp9eqKhQoN68VIClhcFZAEV6a3r0iqNBIqDbWXxd%2BXtdpkZ%2BqX%2BR1vx3GX0ifIZFydFyFmNSS5iYOCh5AVV63THRPApoWXP8%2BDNIJ7ivKE8fnAe3cOVXXbd0n3b2dX6%2FGNzQDX2VQNOhQnJWfhCS07JZEW4sQolMXnhcc%2FYT6fMjBqKtLJsWUkA%2FPugwpEgcAQjxLE8P8ug3p3CN45%2B2UEyDjuUTCD%2BIHOBjqkAZoi5g6B%2FIG%2FJ9hB9A%2BrSFl6iqdm8xCw0J8p7OE%2F7lpey%2BpwJnz27OdDvbeH85tdI15Ld4WXmLVMrAW7NmOVDH%2B%2B6wZqO0rab66%2FYYV5ZTTkdWggQQrPLipl5OZ7Mubx4uNPHpAZaesL8NyMUbbACuk6KLbbMQN5A2hMiu0lMlwmqH9H2tpZE8Nb68Ec1KAIIjHwPjZWSKqls37i%2F4n5UhbU7LEH&X-Amz-Signature=577c2a953dc4071fa5afb9cc710a3311160378069471986e72990c1371efcfc0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

2. 将项目运行时的地址填入 URL 配置中
3. 正常通过 `npm script` 启动项目本体

	> 注意 ⚠️ ：如果有配置自动打开浏览器，项目会启动一个正常的浏览器窗口，可以关闭此窗口，调试模式并不运行在此窗口。

4. Debug 模式启动**「步骤 1 」**中的运行配置，系统会打开一个不带用户信息、插件、书签等功能的浏览器标签，**请不要关闭此浏览器标签！**
5. 在项目中正常打断点，并刷新**「步骤 4」**中的浏览器页面，成功断住并进入 Webstorm 调试模式。

	![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/a37c3a28-1bc2-49d8-8534-8d685cd73fbc/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665O7HHLZV%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T004636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGYwUh8VQ2%2FM7hQPu39ut0zubU4byvAb52G5iRNMDIn4AiABddq1nM4kWzEZ5v1IaziqG%2BF%2F4ENkN%2BDET5K95Q05%2FSr%2FAwhxEAAaDDYzNzQyMzE4MzgwNSIMG8d7VkdBq13QltD3KtwDRGI5rU9kfiX9YCTgMcbDY6v6ZleSquXxDJpxFgiVlfHUv%2BkkVYqpozRI%2B4iBp6lRxXn7dFIO3akNCKOnqQuS%2F1UYk1tXEJWWFfTr%2BC7FUTVxw6SmLhHToqP2lf%2FFMbDmcykx78Gn%2B2J%2Bol577eS%2B%2FNI4qoB7QU8pkS7ggw79kH2LyjRNnqmkMcN07RaOOyl9Hi2IJCaYN6kceGEjUXtA3pwqBLaZ9FZuEp3OFluF8CjvJxKPc%2BL9i5T%2BKzPFy6Ra8fRIbCDhV8U7Q3%2F8TQtthgatv4Ked5GvPG9n9jIXAsAbhylHOdL%2BOVXPWXqGVHhZgLXKfNZTIyRgeaQr9h4%2BKnNNmjtTUwO9gXUmbjmtMs%2FMOT235%2BH070MhUfmJSj%2ByFCbSrmRZ73EEZbt4xUZhrDEXqHonH7qdpjx9J9hRi6dP6bJS8dmeHk9w8hSvfSiTsA%2F8Tx5pW8DTRhhNZMDu3Vxj6wH8pNa4%2Fp5DE7hZgObEgpoJ%2BkYnV2sKx9ZTOmYF3nWL0Ka8DXGEDoWkE%2BjAbvfte8Xl%2FAoMP79MmeJD6jBi%2BZNe48RmaYH79HeNZMN92lFxC8Brs8E7pZRLEqn57VFvBuayAG9muK2tXr67ykBBxW5M%2FPLRfKokS9ow8PaBzgY6pgHeHEQcv%2F0xfZLCm%2FupZYF2NJrl%2FT8SNbgJYvgq3zdB0X0nV0O6NlBQEdJhDLN0vl9PH8yBRzlYJakrXwrwwMMablLOOTYlNVWKChnW%2FEOPigIciZ6f%2FAYjx16P9rWQ1TgEV0V174TL%2F4oFuGDqj7X425jxD2w%2FdkgXQuzQSGd47P%2FhhPYUrE9YiZDK0LYQq0N6aYHrzS4WTqS3s410VtehbEZk%2BDLD&X-Amz-Signature=2a5c4b1dd47891c64f03d049070aa04d7a6a49fe2285ef20594bad8e8a8b49b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


## 参考资料

- [Debug Code ｜ Webstorm Doc](https://www.jetbrains.com.cn/en-us/help/webstorm/debugging-code.html)
- [使用 Webstorm 调试 Vue/React 项目](https://iming.work/detail/6093709a5b51982eaf7f7b1d.html)
