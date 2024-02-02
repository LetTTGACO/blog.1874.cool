---
date: '2022-07-16 00:00:00'
urlname: ovugli
title: Github Actions持续集成 Docker构建并部署Node项目到云服务器
tags:
  - Docker
  - CICD
  - Node
  - Github Actions
updated: '2024-02-03 01:57:00'
draft: false
---

## 引言


在之前的文章[语雀云端写作 Hexo+Github Actions+COS 持续集成](https://1874.cool/roeayv) 中，语雀`webhook`触发构建的流程如下：


![FmBBicekAEyyKQlzZSWZxgWjZ0Qn.jpeg](https://image.1874.cool/205ed1167b3e03641fee0dcf7c82ea99.jpeg)


而当时腾讯云函数对个人使用还是在一定条件下免费的，本着能白嫖就白嫖的心态就用它做中转服务调用了。结果从上个月开始，腾讯云函数涨价了，而且费用也不便宜，我看了下账单，一个月差不多要快 10 块钱了，这我可忍不了。 所以就打算自己搭建一个`node`服务，自己调用`Github Actions`的`API`触发构建。流程如下：


![FiOZZFrZK2WNImXPudM_Eggi4hCJ.jpeg](https://image.1874.cool/d3aacc6be4e8aea7a19e4130346483c7.jpeg)


## 部署流程


![FpafgH_mmn7S7Xdf2eI_tZuZUpco.jpeg](https://image.1874.cool/a27a873bb59b21dd083934b45f300811.jpeg)


## 搭建 Node 服务


搭建记录请看[Midway 项目搭建](https://1874.cool/zbbxv0)


## 开通腾讯云容器镜像服务（可选）


目前腾讯云容器镜像服务对个人还是免费的，我就先用这个，不免费了再说。也可以直接推送到`Docker Hub`


> 实操过程中发现：由于 Github Actions 使用的机器都是美国的，所以选择在香港/海外新建会快很多很多！


	![Fi5ZyPntP28VPpJP66tQDzSirGxn.png](https://image.1874.cool/ed62071316d2193973d1cff81ad5c509.png)


具体开通流程和快速入门请直接移步[腾讯云容器镜像服务个人版快速入门](https://cloud.tencent.com/document/product/1141/63910)


## 配置 Github Actions


### 编写 workflows 流程


在 Node 项目的根目录新建`.github/workflows/docker-build-deploy.yml`文件


```yaml
name: Docker Image CI & CD

on:
  # 在直接推送/pr到Master分支时触发
  push:
    branches: [ "master" ]
  pull_request:
    branches: [ "master" ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: 构建镜像
        # 选择推送到香港的镜像仓库会快很多
        run: docker build --file Dockerfile --tag hkccr.ccs.tencentyun.com/命名空间/镜像名称 .
      - name: 登录腾讯的 docker 镜像仓库
        run: echo "${{ secrets.TENCENT_REGISTRY_PASSWORD }}" | docker login hkccr.ccs.tencentyun.com --username=用户名 --password-stdin
      - name: 把构建好的镜像推送到腾讯仓库
        run: docker push hkccr.ccs.tencentyun.com/命名空间/镜像名称

  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 初始化ssh并执行sh启动镜像
        run: |
          eval $(ssh-agent -s)
          echo "${{secrets.SERVER_SSH_PRIV_KEY}}" > deploy.key
          mkdir -p ~/.ssh
          chmod 0600 deploy.key
          ssh-add deploy.key
          echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config
          ssh root@${{secrets.SERVER_IP}} "cd /home/deploy && sh deploy.sh"
    # 在build结束后才会运行deploy
    needs: build
```


### Github Secrets


上面 yml 文件中的 `secrets.XXX` 是一些秘钥，`Github` 为了保护你的秘钥，提供了使用变量的办法，我们可以在仓库的 `Settings -> Secrets`中定义变量，然后按照 `${{ secrets.XXX }}` 的格式，即可拿到变量值。


### 连接云服务器


`secrets.SERVER_SSH_PRIV_KEY` 是用来访问远程服务器的私钥，具体：

- 在云服务器生成密钥对
- 在远程服务器上添加公钥 (将公钥添加到服务器的 ~/.ssh/authorized_keys 文件中)
- 在 Github 仓库设置私钥 (Settings > Secrets)

`secrets.SERVER_IP` 是远程服务器地址


### deploy.sh


```shell
#/bin/bash
docker pull hkccr.ccs.tencentyun.com/命名空间/镜像名称docker stop 镜像名称docker rm 镜像名称docker run -d --name 镜像名称 -p 7001:7001 hkccr.ccs.tencentyun.com/命名空间/镜像名称
```


## 配置 DockerFile


### Dockerfile


在 Node 项目的根目录新建`Dockerfile`文件


```docker
FROM node:12 AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM node:12-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/bootstrap.js ./
COPY --from=build /app/package.json ./

RUN apk add --no-cache tzdata

ENV TZ="Asia/Shanghai"
# 只安装生产的包
RUN npm install --production

# 暴露端口号
EXPOSE 7001
# 使用pm2启动项目
RUN npm install pm2 -g
CMD [ "pm2-runtime", "npm", "--", "start" ]
```


上述相关的 npm 命令需要根据自己实际命令修改。


### .dockerignore


在 Node 项目的根目录新建`.dockerignore`文件，可以将`.gitignore`中的配置复制过去


## Done！


接下来就可以推送代码到 master 分支，就会自动部署项目了！


![FgtBByqByzlP4sMg5Ibn8-8xhuLX.png](https://image.1874.cool/fe39bd1b9a1da1fc4d1c005ff1a23c90.png)

