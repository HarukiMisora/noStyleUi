<script setup lang="ts">
import { ref } from 'vue';

const a = ref(<string>'a')
let urls:string ='https://www.iamwzc.com/Resources/back_class_normal.png'
import { WData } from '../noStyleUi/test/data';



const testData = ref([
  {
    type:1,
    sex:0,
    like:'red'
  },
  {
    type:0,
    sex:0,
    like:'red'
  },
  {
    type:1,
    sex:0,
    like:'red'
  },
  {
    type:1,
    sex:0,
    like:'blue'
  },
  {
    type:1,
    sex:1,
    like:'blue'
  },
  {
    type:0,
    sex:1,
    like:'red'
  },
  {
    type:1,
    sex:0,
    like:'red'
  },
  {
    type:1,
    sex:0,
    like:'blue'
  },
  {
    type:1,
    sex:1,
    like:'red'
  }
])
const green = ref('blue')
const colors = ['red','black','green','white','blue']







</script>

<template>
  <div style="display: flex;flex-direction:column;" class="test test1">
    <w-div :bg="['c-black',urls,'s-fill','r-n']"  c="red" h="400" w="p100" p="20" flex radius="25" style="text-align: center;">
    <w-div w="p50" p="10" bc="$#fff" flex="col" > 
      <w-span>基础</w-span>
      <w-div  w="p100" :flex="['g-10','wrap']" mb="20" radius="">
        <w-button type="default" >default</w-button>
        <w-button type="primary" >primary</w-button>
        <w-button type="success" >success</w-button>
        <w-button type="info"  >info</w-button>
        <w-button type="warning" >warning</w-button>
        <w-button type="error" >error</w-button>
        <w-button type="tertiary">tertiary</w-button>
        <w-button type="none">none</w-button>
      </w-div>
      <w-span>点击特效</w-span>
      <w-div bc="$#fff"  :flex="['g-10','wrap']" mb="20"  >
        <w-button type="default"  >default</w-button>
        <w-button type="primary"  >box</w-button>
        <w-button type="success"  effect="text">text</w-button>
        <w-button type="info" effect="biger">biger</w-button>
        <w-button type="warning" effect="small">small</w-button>
        <w-button type="error"  effect="rotate">rotate</w-button>
        <w-button type="error"  effect="rotate">rotate长按我</w-button>

        <w-button type="success" effect="none">none</w-button>
      </w-div>
      <w-span  >抽象按钮</w-span>
      <w-div :bg="['s-fill']"  :flex="['g-10','wrap']" mb="20"  >
        <w-button type="default"  >default</w-button>
        <w-button type="primary"  abstract="unseen">unseen</w-button>
        <w-button type="success" abstract="dash" >dash</w-button>
        <w-button type="info"    abstract="glass">glass</w-button>
        <w-button type="warning" abstract="round" >round</w-button>
      </w-div>
    </w-div>
      <w-div w="p50" p="10"  >右面</w-div>
    </w-div>
    <w-div :bg="['red','s-fill']">卧槽啊</w-div>
    <w-group  :cus-props="[['type','error']]">
      <w-button>asd</w-button>
      <w-button type="success">asd</w-button>
      <w-button>asd</w-button>
      <w-button>asd</w-button>
    </w-group>
    <div style="margin: 20px;text-align: center;font-size: 24px;">比对</div>

    <div class="bg-black c-red h-400 w-p100 flex p-20">
      <div class="bg-green w-p50 p-10">左面</div>
      <div class="w-p50 p-10" :style="{background: `url(${urls})`}">右面</div>
    </div>

  </div>
  <w-button type="default">asdsd</w-button>
</template>

<style scoped>
.test{

  margin: 20px;
}
/* .test1{
  padding-left: 0;
} */
</style>
