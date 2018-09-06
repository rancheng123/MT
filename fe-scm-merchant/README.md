# era 项目目录


### Development Setup 
``` bash
# 安装npm包
npm install

# 跑本地开发环境 at localhost:7070
npm run local

# 跑本地编译环境 at ./node_modules/.bin/pm2 list or monit
npm run local:pm2
```

### Plus发布 
``` bash
# 安装 era 命令
npm install @fdfe/era -g

# 执行 era 发布命令
era deploy

# 选择项目的发布模式
client or server

# server模式的话选择发布的server环境env (以集团Plus的env为准)
dev beta test staging prod

# 生成发布需要的deploy文件夹和pm2.conf.js配置文件
deploy and pm2.conf.js
```

### 技术栈
``` bash
SPA(Vue + Vuex + Vue-Router) + NodeJS

待补充...
```

## [关于pm2](http://pm2.keymetrics.io)

## [dev 环境地址](http://merchant.fe.dev.sankuai.com/zcm)
## [test 环境地址](http://merchant.fe.test.sankuai.com/zcm)
## [staging 环境地址](http://merchant.fe.st.sankuai.com/zcm)

