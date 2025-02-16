<script setup lang="ts">
import { ref } from 'vue';

const a = ref(<string>'a')
const urls:string ='http://www.iamwzc.com/TMXK/jigsaw/jigsaw.png'

setTimeout(()=>{
  a.value = 'p25'
},1000)
setTimeout(()=>{
  a.value = '$1000%'
},2000)
setTimeout(()=>{
  
  a.value = '200'
},3000)
</script>

<template>
  <div style="display: flex;flex-direction: column;" class="test test1">

    <w-div bg="black" c="red" h="400" w="p100" p="20" flex >
    <w-div w="p50" p="10" bc="$#fff" flex="col">
      <w-span>基础</w-span>
      <w-div  w="p100" flex="g-10" mb="20" >
        <w-button type="default" >default</w-button>
        <w-button type="primary" >primary</w-button>
        <w-button type="success" >success</w-button>
        <w-button type="info"  >info</w-button>
        <w-button type="warning" >warning</w-button>
        <w-button type="error" >error</w-button>
        <w-button type="tertiary">tertiary</w-button>
        <w-button >none</w-button>
      </w-div>
      <w-span>点击特效</w-span>
      <w-div bc="$#fff"  flex="g-10" mb="20"  >
        <w-button type="default"  >default</w-button>
        <w-button type="primary"  >box</w-button>
        <w-button type="success"  effect="text">text</w-button>
        <w-button type="info" effect="biger">biger</w-button>
        <w-button type="warning" effect="small">small</w-button>
        <w-button type="error"  effect="rotate">rotate</w-button>
        <w-button type="error"  effect="rotate">rotate长按我</w-button>

        <w-button type="success" effect="none">none</w-button>
      </w-div>
    </w-div>
      <w-div w="p50" p="10" :bg="urls">右面</w-div>
    </w-div>

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
