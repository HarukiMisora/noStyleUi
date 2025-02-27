# 从最近思考的问题中诞生的框架

最近我在思考一问题，css我们应该写在哪里？

写在.css | .scss | .sass文件里面吗？不

写在head->style 里 还是.Vue->style里？不

以上方法我们需要跳来跳去编辑，一会编辑dom,一会编辑css，不是上上下下来回翻阅,就是跨文件翻阅，dom和css的“上下文”太远了，这会影响到我们工作效率，甚至是思维。

这也是我再使用vue3的时候喜欢把`<script></script>`放在`<template></template>`之前的原因，这样做，尽可能的让dom和css的距离更近。

那么我们可以使用类似 tailwindcss 的框架只写class吗？好的。

这个写法我认为是very good，它解决了跳来跳去的痛点，但是它也有个缺点，这样写下来，你的HTML模板就是一大堆得class

like 随手 写一段没跑过的不知道什么效果的 `tailwindcss` 代码吧。
```html
<div class="flex flex-col gap-20">
    <div class="w-50 h-50 p-5 pl-0 m-5 text-[#e1e1e1] bg-red" >some text</div>
    <div class="w-50 h-50 p-5 pl-0 m-5 text-[#e1e1e1] bg-yellow" >some text</div>
    <div class="w-50 h-50 p-5 pl-0 m-5 text-[#e1e1e1] bg-green" >some text</div>
    <span class="w-50 h-50 p-5 pl-0 m-5 text-[#e1e1e1] bg-red" >some text</span>
    <div class="w-full h-25 p-5 pl-0 m-5 text-[#e1e1e1] bg-red" >some text</div>
    <div class="w-50 h-75 p-5 pl-0 m-5 text-[#e1e1e1] bg-red" >some text</div>
</div>
```
也或许看上去还好，好的现在我们需要让这6个的盒子宽和高变成40*20px，我们需要一个一个修改，这让我感到不痛快。

为了解决这个问题，我有了自己全新的写法，noStyleUi就此诞生了

# 安装 noStyleUi

```bash
npm i nostyleui
```
# 使用 / 导入 

```js
import { createApp } from 'vue'
import App from './App.vue'
import nostyleui from 'nostyleui/index'

createApp(App).use(nostyleui).mount('#app')
```

### 提示：如果代码提示没有生效，可以再 tsconfig.json 或者 tsconfig.app.json 里面 include 手动加入`"node_modules/nostyleui/interface.d.ts"`。

### 文档地址:https://www.iamwzc.com/TMXK/noStyleUiDoc/

### 注意：该框架目前阶段还在基板开发中，仅供参考，现在可以观望。不建议现在就拿去当作生产工具，因为我还会更改很多东西，会影响后续版本的使用方法，会导致你更新框架时有概率也跟着改你自己的代码。

# noStyleUi -> DOM



什么是noStyleUi，字面意思，no need to write css in `<style></style>`。这个东西可以尽量帮助我们不用写class和css,思路和 tailwindcss 类似，但是我把class变成了属性。

让我用自己的写法去完成上面那段一样效果的html代码,解决的是 `tailwindcss` 一样的子元素重复写class的问题
```html
<w-div :flex=['col','g-20']>
    <w-group w="50" h="50" pl="0" m="5" c="&#e1e1e1" bg="red">
        <w-div            >some text</w-div>
        <w-div bg="yellow">some text</w-div>
        <w-div bg="green" >some text</w-div>
        <w-span            >some text</w-span>
        <w-div w='p100' h="25">some text</w-div>
        <w-div h="75"     >some text</w-div>
    </w-group>
</w-div>
```
嗯...看上去是简便了一点点，但是好像有点杂乱无章了，当然一般情况下我们`<w-group></w-group>`里面的子元素不需要自定义那么多区别的css属性，而且，不可能所有子元素都只是`some text`，使用 tailwindcss 也不一定能对齐。

`<w-group></w-group>`不渲染任何dom，它只是负责给自己的一级子元素提供样式，它下面的所有一级子元素继承它的样式，但是它自身并不产生dom。注意，只影响第一级子元素，子元素的子元素不归它管。

attribute="`p{number}`" 百分比%

attribute="`v{number}`" vh/vw

attribute="`$10px`" -> `$`符号会将样式挂载到`style`而不是`class`，这给我提供了更便捷的自定义样式的写法。

`:flex=['col','g-20']`集成了`class="flex flex-col gap-20"`，如果只想要 `class="flex"` 可以直接`flex`不带任何参数,就像下面这样。





```html
    <w-div flex></w-div> === <w-span flex=""></w-span>

    单一参数时也可以传入字符串
    <w-div flex="col"></w-div>
    <w-div flex="row"></w-div>
    <w-div flex="g-20"></w-div>
```


# noStyleUi -> UI库

`noStyleUi` 和 `Element Plus`/`Ant Design Vue`/`Naive Ui`库一样内置了自己的组件库

`noStyleUi` 组件库的组件`继承` 上面的属性写法

这里只介绍一个 `BUTTON` 组件的用法，预览组件效果或者查阅其它组件请前往 noStyleUi 文档地址阅读。

文档地址:https://www.iamwzc.com/TMXK/noStyleUiDoc/

当然，UI库的部分现在我只实现了0.5个 `BUTTON`

## `button`
`type` 按钮的 类型 默认值为 `default`

`effect` 按钮的 点击特效 默认值为`box` 
```html
    <w-button type="default"  >default</w-button>
    <w-button type="primary"  >box</w-button>
    <w-button type="success"  effect="text">text</w-button>
    <w-button type="info" effect="biger">biger</w-button>
    <w-button type="warning" effect="small">small</w-button>
    <w-button type="error"  effect="rotate">rotate</w-button>
    <w-button type="error"  effect="rotate">rotate长按我</w-button>
```


  