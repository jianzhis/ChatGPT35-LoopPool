# 使用官方 Node.js 作为基础镜像
FROM node:14

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件
COPY . .

# 暴露容器端口
EXPOSE 3000

# 定义运行时命令
CMD ["npm", "start"]
