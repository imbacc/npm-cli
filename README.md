# 搭建自己的脚手架

### 关联测试

npm link

### 发布项目

上面都是在本地测试，实际在使用的时候，可能就需要发布到 npm 仓库，通过 npm 全局安装之后，直接到目标目录下面去创建项目，如何发布呢？

第一步，在 git 上建好仓库
第二步，完善 package.json 中的配置

```
"name": "imba-cli",
 "version": "1.0.0",
 "description": "npm-cli imba-cli",
 "bin": {
  "imba": "./bin/cli.js"
 },
 "keywords": [
  "脚手架"
 ],
 "author": "imbacc",
 "license": "ISC",
 "dependencies": {
  "axios": "^0.24.0",
  "chalk": "^4.1.2",
  "commander": "^8.3.0",
  "download-git-repo": "^3.0.2",
  "figlet": "^1.5.2",
  "fs-extra": "^10.0.0"
 },
 "devDependencies": {
  "inquirer": "^8.2.0"
 }
```

第三步，使用 npm publish 进行发布，更新到时候，注意修改版本号
这样就发布成功了，我们打开 npm 网站搜索一下 🔍
已经可以找到它了，这样我们就可以通过 npm 或者 yarn 全局安装使用了

作者：ITEM
链接：<https://juejin.cn/post/6966119324478079007>
