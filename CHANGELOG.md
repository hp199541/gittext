## [1.0.8] - 2020-04-24
### update
+ 不再要求生产环境去掉URL中的access_token

## [1.0.7] - 2020-03-27
### update
+ 删除.babelrc的browser配置

## [1.0.6] - 2020-03-26
### update
+ 更新browserslist

## [1.0.5] - 2020-03-08
### update
+ 添加本地mock数据模拟

## [1.0.4] - 2020-03-06
### update
+ 默认引入 [`common-components`](https://gitgcloud.garenanow.com/sh-web/common-components) 子模块，放置于 `src/components/common/`

克隆一个包含子模块项目的方法：
```bash
git clone https://gitlab.jingle.cn/websh/ff_frontend_template.git
git submodule init
git submodule update --remote # 使用 --remote 确保和远端分支同步 获取最新代码
```
有关子模块的更多操作可戳：[Git submodule 子模块的管理和使用](https://www.jianshu.com/p/9000cd49822c)

## [1.0.3] - 2020-03-05
### update
+ 将`getCSS`方法中传递的参数由`region_lang`修改为`region`和`lang`
+ 更新通用图片uri（favicon.png 和 scape.png）
+ `request.js`中增加对`errorMsg`的重置处理，避免出现缓存问题

## [1.0.2] - 2020-03-04
### update
+ 修改`images.json`中`localUrl`值为cdn地址

## [1.0.1] - 2020-02-23
### Bug Fixes
+ 修改`px2vw`和`px2vh` SCSS预处理函数，允许调用的时候不限制是否带`px`单位

## [1.0.0] - 2020-02-20
第一版
