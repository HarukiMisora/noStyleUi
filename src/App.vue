<script setup lang="ts">
import {Accessibility} from '@vicons/ionicons5'
import { ref } from 'vue'
let urls:string ='https://www.iamwzc.com/TMXK/noStyleUiDoc/head.png'

const as ={
  head:urls
}
const color = ref('#000')
</script>

<template>
  <w-div class="flex-1" bg="white" p="20">
    <w-div p="20" flex="col" >
        <w-h1 mb="10">什么是prop style?</w-h1>
        <w-div>
          通过vue的prop来控制组件的样式，这就是prop style。<br/>
          (计划后续版本中会实现)→非VUE组件的原生盒子，也可以生效。(动态样式还是需要依赖VUE的prop)<br/><br/>
          这样做的好处是：
          <w-ul mt="15">
            <w-li>1. 缩短DOM与CSS的“上下文”。</w-li>
            <w-li>2. 样式能够简洁的动态修改。</w-li>
            <w-li>3. 简化样式的书写，比如更方便的颜色混合，更方便的hover效果。</w-li>
          </w-ul>
        </w-div>
    </w-div>
    <w-div p="20" flex="col" >
        <w-h1 mb="10"></w-h1>
        <CodePreview title="基本示例" :show="true" >
          <w-div mb="5" flex="g-5">
            <w-button @click="color='#'+Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0')" type="success">随机颜色</w-button>
            <w-button @click="color='red+green'">red+green混合</w-button>
            <w-button @click="color='yellow+blue'">yellow+blue混合</w-button>
            <w-button @click="color='red+green&yellow+blue'">red+green&yellow+blue混合</w-button>
          </w-div>
          <w-div my="5">
            color = {{ color }}
          </w-div>
          <w-div h="100" :bg="`${as.head} ${color} contain p-0 r-n`" transition hover="bg=p-50%"></w-div>
          <w-div>上面的所有效果实现一共写了{ 0 } 行css代码 与 { 0 } 行style内联样式！ 是不是很方便？</w-div>
        </CodePreview>
    </w-div>
    <w-div p="20" flex="col" >
        <w-h1 mb="10">你是否正在想？</w-h1>
        <w-ul mt="15">
          <w-li>1.如果我需要给一排的盒子全部加上red背景，我是不是得每个盒子都得写一遍color=red？ </w-li>
          <w-ol>No：我提供了一个WGroup组件，可以方便的给一组组件设置相同的样式。</w-ol>
          <w-li>2. css的规则是非常复杂且庞大的，通过prop来控制样式是否会存在性能或渲染问题？</w-li>
          <w-ol>try🐒:：我会尽力去优化。如果一个组件使用到了很多很多的prop style，我就不得不去依次解析prop style的规则才能为组件挂载对应的css类名与style样式。而这个解析挂载的过程全都是在客户端的浏览器上完成的，大量的解析过程确实会造成性能问题。
            <br/>后续我会把部分解析放在node环境，凡是没有用到变量的静态的样式，我会再node环境拦截它直接解析生成对应的样式，避免它往vue的prop流程里面走一遭的同时对于非VUE组件的原生盒子也将有效！</w-ol>
        </w-ul>
    </w-div>
    <w-div p="20">
      <w-h1 mb="10">基本概念</w-h1>
      <w-group  mb="10" :cus-props="[['show',true]]">
        <CodePreview title="普通的属性/prop" >
          <CodePreviewTip>{组件的属性，或者说prop} = "value"的写法是最简单的写法，普通的属性只支持一个值。</CodePreviewTip>
          <w-div w="50" h="50" bg="red+blue"></w-div>
        </CodePreview>

        <CodePreview title="属性集" >
          <CodePreviewTip>属性集是指多个参数样式的集合属性，它可以声明多个样式组合，通过空格符分隔，比如 :bg="`red+blue &nbsp;&nbsp;${as.head}`"同时声明背景颜色与背景图片。</CodePreviewTip>
          <w-div w="50" h="50" :bg="`red+blue ${as.head} fill`"></w-div>
          <CodePreviewTip>属性集也支持数组的形式</CodePreviewTip>
          <w-div w="50" h="50" :bg="['red+blue',as.head,'fill']"></w-div>
        </CodePreview>

        <CodePreview title="属性集 隐式参数与显示参数" >
          <CodePreviewTip>
            属性集的显示参数写法应该是 prop="key-value key2-value"，比如bg里面size-50% &nbsp; r-n <br/>
            而隐式参数，是没有参数名/key的，它只有参数值，比如bg="颜色 &nbsp;图片地址&nbsp; center" 
          </CodePreviewTip>
          <w-div w="150" h="150" :bg="`red+blue ${as.head} center size-50% r-n `"></w-div>
        </CodePreview>
      </w-group>
    </w-div>


  </w-div>
  
   

</template>

<style scoped lang="scss">
.test{
  // width: 100vw;
  height: 100vh;
  overflow: scroll;
  // display: grid;
  // grid-gap: 20px;
  // grid-template-columns: repeat(auto-fit,minmax(700px,1fr));
  // grid-auto-rows: 100px 200px 300px;
  // justify-content: center;
  .item4{
    grid-row:1 2 3 4/5;
    grid-column: 2/3;
  }
  
  // &::-webkit-scrollbar{
  //   width: 0;
  // }
}

</style>
