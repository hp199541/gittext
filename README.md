# ff_frontend

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production
npm run build

# build for production with all resources in cdn
npm run prod

# generate images.css template and images.json file
npm run tpl

```

## Checklist
+ 修改项目名称：`package.json`的`name`、`index.html`的`title`和`README.md`的标题
+ 更新GA id：`index.html`的`analyticsId`
+ 给点击事件埋GA code：可利用`utils/assist.js`中封装的`initGA`、`addGA`、`errorGA`方法
+ 项目中的`TODO`均为坑点，需要留意哦

## Mock Data
+ express起一个服务（端口为3000）模拟接口，将/api/的请求代理到该服务，代理配置在：config/index.js中dev.proxyTable。
+ 在mock/文件夹下，新建相应的接口数据，并引入到mock/index.js中
+ 运行npm run mock-dev即可请求本地数据

## 图片可配置
+ 配置方案说明，请戳[这里](http://wiki.jingle.cn/pages/viewpage.action?pageId=50601924)
+ 当前的处理逻辑封装在`App.vue`的`getCSS`方法中

## 样式说明
+ 网页活动设计稿的标准尺寸：1282*736
+ `src/assets/scss`中包含了前端开发的通用样式，入口为`src/assets/scss/index.scss`，`images.css` 在`static/css`中，仅在开发环境中引入该样式文件。
+ 通用样式中提供了一些单位转换的 mixins 可供使用。具体可查看`src/assets/scss/mixins.scss` 和 `src/assets/scss/variable.scss`。
+ webpack插件`px2vwh-loader`可自动将`px`单位响应式的转换成`vh`、`vw`（宽屏条件下）单位，无需开发时手动转换，也无需考虑响应式处理。当前默认关闭了该功能，通过将`config/index.js`中的`usePx2vwh`设置成`true`可开启该功能。

## 状态管理
+ 组件化开发时涉及到的状态管理，当前试用了bus（起初是eventBus，用于传递消息，这里将它的功能进行了拓展。可以把它想像成一辆往返于不同组件间的公交车，乘客则是组件间的共享数据和方法等）。
