# 🔄 ChatGPT35-LoopPool

ChatGPT35-LoopPool 是一个基于 Node.js 的服务器请求负载均衡器🚀。它通过循环池策略在多个服务器之间均匀地分配传入的请求，以优化处理能力和提高响应速度。

## ⚙️ 功能概述

- **循环池策略**：在一组服务器中均匀地分配请求。
- **故障重试**：如果请求失败，则自动尝试将请求发送到另一个服务器。
- **灵活配置**：服务器列表和配置存储在 `servers.json` 中，便于管理和更新。
- **实时日志输出**：在处理请求时提供实时的日志反馈。

## 🚀 快速开始

您可以选择使用 Node.js 直接运行服务，或通过 Docker 进行部署。

### 🌐 使用 Node.js

#### 📋 环境要求

- Node.js
- npm 或 yarn

#### 📦 安装步骤

1. 克隆仓库：

   ```bash
   git clone https://github.com/jianzhis/ChatGPT35-LoopPool.git
   cd ChatGPT35-LoopPool
   ```

2. 安装依赖：

   ```bash
   npm install
   ```

   或者如果您使用 yarn：

   ```bash
   yarn install
   ```

3. 配置 `servers.json`：

   在 `servers.json` 文件中定义您的服务器列表和相关配置。

4. 运行服务：

   ```bash
   npm start
   ```

   或者如果您使用 yarn：

   ```bash
   yarn start
   ```

   服务器将在端口 3000 上运行，等待接收和分配请求。

### 🐳 使用 Docker

#### 🚢 Docker 部署

1. 从 GitHub Container Registry 拉取最新的 Docker 镜像：

   ```bash
   docker pull ghcr.io/jianzhis/chatgpt35-looppool:latest
   ```

2. 运行 Docker 容器：

   ```bash
   docker run -d -p 3000:3000 ghcr.io/jianzhis/chatgpt35-looppool:latest
   ```

   此命令将在后台启动容器，并将容器的 3000 端口映射到主机的同一端口。

### 🖥️ 使用 API

通过向 `/v1/chat/completions` 端点发送 POST 请求来使用服务。

## 🤝 贡献

我们欢迎开发者参与项目的贡献。您可以通过 GitHub Issues 报告问题或提交拉取请求来改进代码。

## 📜 许可证

该项目采用 MIT 许可证。详细信息请参阅 [LICENSE](LICENSE) 文件。