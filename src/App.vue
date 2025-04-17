<script setup lang="ts">
import {Accessibility} from '@vicons/ionicons5'
let urls:string ='https://www.iamwzc.com/Resources/back_class_normal.png'

const as ={
  head:urls
}
</script>

<template>
<w-div class="flex-1" bg="white" p="40"  >
        <w-div p="20">
            <h1>bd 属性集</h1>
            <notice class="mt-10" title="作用" msg="定义盒子的border边框样式"></notice>
        </w-div>
        <w-div :flex="['wrap','j-evenly']">
            <w-div w="p48">
                <w-div :flex="['col','g-10']">
                      <w-div pb="5">
                        border和其它属性有点小区别，其它的标准格式是 prop-value。而border有着灵活的写法，color-borderStyle-color-number-color...不需用key告诉它要定义color或size，没顺序限制，输入你想要的value就行。比如1-solid-red；把它拆分成多条参数1 solid red同样生效。多个color混合不要求你连在一起，但我建议你最好把它们连在一起。
                      </w-div>
                      <w-div :flex="['g-10','wrap']">
                            <w-group radius="p50" w="100" h="100" flex="center" :bg="[as.head,'s-fill']" c="green">
                                <w-div bd="solid-#f00"></w-div>
                                <w-div bd="dashed-red"></w-div>
                                <w-div bd="dotted blue"></w-div>
                                <w-div bd="double-red-blue"></w-div>
                            </w-group>
                        </w-div>
                        <w-div :flex="['g-10','wrap']">
                            <w-group radius="p50" w="100" h="100" flex="center" :bg="[as.head,'s-fill']" c="green">
                                <w-div bd="groove"></w-div>
                                <w-div bd="outset-red"></w-div>
                                <w-div bd="inset blue"></w-div>
                                <w-div bd="ridge"></w-div>
                            </w-group>
                        </w-div>
                        <w-div :flex="['g-10','wrap']" c="green">
                                <w-group radius="p50" w="100" h="100" flex="center" :bg="[as.head,'s-fill']" >
                                    <w-div bd="l-solid t-dashed r-double b-dotted 10"></w-div>
                                    <w-div bd="dashed-red-10 x-solid-5"></w-div>
                                    <w-div bd="dotted blue y-red-10"></w-div>
                                    <w-div bd="double r-solid-red-#fff-1"></w-div>
                                </w-group>
                        </w-div>
                        <w-div :flex="['g-10','wrap']">
                            <w-group radius="p50" w="100" h="100" flex="center" :bg="[as.head,'s-fill']" c="green">
                                <w-div bd="t-groove-7"></w-div>
                                <w-div bd="r-outset-red-8"></w-div>
                                <w-div bd="b-9-inset blue"></w-div>
                                <w-div bd="l-ridge-10"></w-div>
                            </w-group>
                        </w-div>
                </w-div>

            </w-div>
            <w-div w="p48" :flex="['col','g-10']">
                    <w-div mb="5">直接输入1-solid-red默认是应用到4个方向。现在我们可以用前缀t、r、b、l、x、y去告诉它我要指定方向的样式</w-div>
                    <w-div :flex="['g-10','wrap']" c="green">
                            <w-group radius="p50" w="100" h="100" flex="center" :bg="[as.head,'s-fill']" >
                                <w-div bd="l-solid t-dashed r-double b-dotted"></w-div>
                                <w-div bd="dashed-red x-solid"></w-div>
                                <w-div bd="dotted blue y-red"></w-div>
                                <w-div bd="double r-solid-red-#fff"></w-div>
                            </w-group>
                    </w-div>
                    <w-div :flex="['g-10','wrap']">
                        <w-group radius="p50" w="100" h="100" flex="center" :bg="[as.head,'s-fill']" c="green">
                            <w-div bd="t-groove"></w-div>
                            <w-div bd="r-outset-red"></w-div>
                            <w-div bd="b-inset blue"></w-div>
                            <w-div bd="l-ridge"></w-div>
                        </w-group>
                    </w-div>
                    <w-div mb="5">仅设定了一个被允许的HEX|RGB|RGBA规则的颜色时，你的这个颜色会被挂载到style属性上。然后你还需要将左右两边的颜色设置为被允许的cssColor颜色时，它不会生效。这是因为cssColor是默认挂载了一个对应样式的类名。这时候问题就产生了，style的优先级大于class的优先级，那么我们要如何让我们的颜色生效呢？参考如下</w-div>
                    <w-div :flex="['g-10','wrap']" c="green">
                        <w-group bd="solid-#87ceeb-1" radius="p50" w="100" h="100" flex="center" :bg="[as.head,'s-fill']" >
                            <w-div bd="x-red"  >
                                <w-span bg="#1e1e1e80" c="red">red不生效</w-span>
                            </w-div>
                            <w-div bd="x-#f00">
                                <w-span bg="#1e1e1e80" c="red">#F00生效</w-span>
                            </w-div>
                            <w-div bd="x-rgb(255,0,0)">
                                <w-span bg="#1e1e1e80" c="red">rgb(255,0,0)生效</w-span>
                            </w-div>
                            <w-div bd="x-red-red">
                                <w-span bg="#1e1e1e80" c="red">red-red生效</w-span>
                            </w-div>
                        </w-group>
                        </w-div>
                    <w-div :flex="['g-10','wrap']">
                        <w-group bd="solid-skyblue-1" radius="p50" w="100" h="100" flex="center" :bg="[as.head,'s-fill']" >
                            <w-div bd="x-red"  >
                                <w-span bg="#1e1e1e80" c="red">red生效</w-span>
                            </w-div>
                            <w-div bd="x-#f00">
                                <w-span bg="#1e1e1e80" c="red">#F00生效</w-span>
                            </w-div>
                            <w-div bd="x-rgb(255,0,0)">
                                <w-span bg="#1e1e1e80" c="red">rgb(255,0,0)生效</w-span>
                            </w-div>
                            <w-div bd="x-red-red">
                                <w-span bg="#1e1e1e80" c="red">red-red生效</w-span>
                            </w-div>
                        </w-group>
                    </w-div>
            </w-div>
            
 
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
