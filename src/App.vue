<script setup lang="ts">

let urls:string ='https://www.iamwzc.com/Resources/back_class_normal.png'





const test =(e:MouseEvent)=>{
  window.alert('111')
}




</script>

<template>
  <div style="display: flex;flex-direction:column;" class="test test1">
    <w-div :bg="['c-black',urls,'s-fill','r-n']"  c="red" h="400" w="p100" p="20" flex radius="25" style="text-align: center;">
    <w-div w="p50" p="10" bc="$#fff" flex="col" > 
      <w-span>基础</w-span>
      <w-div  w="p100" :flex="['g-10','wrap']" mb="20" radius="">
        <w-button type="default" disabled @click="test" >default</w-button>
        <w-button type="primary" disabled @click="test">primary</w-button>
        <w-button type="success" @click="test">success</w-button>
        <w-button type="info"  disabled>info</w-button>
        <w-button type="warning" disabled>warning</w-button>
        <w-button type="error" disabled>error</w-button>
        <w-button type="tertiary" disabled>tertiary</w-button>
        <w-button type="none" disabled>none</w-button>
      </w-div>
      <w-span>点击特效</w-span>
      <w-div  bc="$#fff"  :flex="['g-10','wrap']" mb="20"  >
        <w-button type="default"  disabled>default</w-button>
        <w-button type="primary"  disabled>box</w-button>
        <w-button type="success" loading disabled effect="text">
          <template #icon>
            <svg style="width: 16px;margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M20 6h-8l-1.41-1.41C10.21 4.21 9.7 4 9.17 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7 7v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H9.21c-.45 0-.67-.54-.35-.85l2.8-2.79c.2-.2.51-.19.71 0l2.79 2.79c.3.31.08.85-.36.85H13z" fill="currentColor"></path></svg>
          </template>
          text
        </w-button>
        <w-button type="info" disabled effect="biger">biger</w-button>
        <w-button type="warning" disabled effect="small">small</w-button>
        <w-button type="error" loading  effect="rotate">rotate</w-button>
        <w-button type="error"  disabled effect="rotate">rotate长按我</w-button>
        <w-button  type="success" disabled effect="none">none</w-button>
      </w-div>
      <w-span  >抽象按钮</w-span>
      <w-div :bg="['s-fill']"  :flex="['g-10','wrap']" mb="20"  >
        <w-button type="default" disabled >default</w-button>
        <w-button type="primary" loading disabled  abstract="unseen">unseen</w-button>
        <w-button type="success" loading disabled abstract="dash" >dash</w-button>
        <w-button type="info"    disabled abstract="glass">glass</w-button>
        <w-button type="warning" loading disabled abstract="round" >round</w-button>
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
