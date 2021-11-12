# 搭建自己的脚手架

### 关联测试

npm link

### 发布项目

上面都是在本地测试，实际在使用的时候，可能就需要发布到 npm 仓库，通过 npm 全局安装之后，直接到目标目录下面去创建项目，如何发布呢？

第一步，在 git 上建好仓库
第二步，完善 package.json 中的配置

```
{
"name": "@imbacc/uni-cli",
"version": "1.0.4",
"description": "",
"main": "index.js",
"bin": {
    "zr": "./bin/cli.js"
},
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
},
"files": [
    "bin",
    "lib"
],
"author": {
    "name": "T-Roc",
    "email": "lxp_work@163.com"
},
"keywords": [
    "zhurong-cli",
    "zr",
    "脚手架"
],
"license": "MIT",
    "dependencies": {
        "axios": "^0.21.1",
        "chalk": "^4.1.1",
        "commander": "^7.2.0",
        "download-git-repo": "^3.0.2",
        "figlet": "^1.5.0",
        "fs-extra": "^10.0.0",
        "inquirer": "^8.0.0",
        "ora": "^5.4.0"
    }
}
```

第三步，使用 npm publish 进行发布，更新到时候，注意修改版本号
这样就发布成功了，我们打开 npm 网站搜索一下 🔍
已经可以找到它了，这样我们就可以通过 npm 或者 yarn 全局安装使用了

作者：ITEM
链接：<https://juejin.cn/post/6966119324478079007>
