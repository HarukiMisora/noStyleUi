<script setup lang="ts">
import {Accessibility} from '@vicons/ionicons5'
let urls:string ='https://www.iamwzc.com/Resources/back_class_normal.png'





const test =(e:MouseEvent)=>{
  window.alert('111')
}




</script>

<template>
  <div @mouseenter="" style="display: flex;flex-direction:column;" class="test test1" >
    <w-div bg="red"   c="red" h="400" w="p100" p="20" flex radius="25" style="text-align: center;">
    <w-div w="p50" p="10" bc="$#fff" flex="col" > 
      <w-span c="red-blue" :hover="`green blue bg-red-green-#000 ${urls} red blue #fff #000`" >基础</w-span>
      <w-div  w="p100" :flex="['g-10','wrap','row-r']" mb="20" radius="" >
        <w-button type="default" disabled  @click="test" size="small" round hover="red bg-red-green">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M256 112a56 56 0 1 1 56-56a56.06 56.06 0 0 1-56 56z" fill="currentColor"></path><path d="M432 112.8l-.45.12l-.42.13c-1 .28-2 .58-3 .89c-18.61 5.46-108.93 30.92-172.56 30.92c-59.13 0-141.28-22-167.56-29.47a73.79 73.79 0 0 0-8-2.58c-19-5-32 14.3-32 31.94c0 17.47 15.7 25.79 31.55 31.76v.28l95.22 29.74c9.73 3.73 12.33 7.54 13.6 10.84c4.13 10.59.83 31.56-.34 38.88l-5.8 45l-32.19 176.19q-.15.72-.27 1.47l-.23 1.27c-2.32 16.15 9.54 31.82 32 31.82c19.6 0 28.25-13.53 32-31.94s28-157.57 42-157.57s42.84 157.57 42.84 157.57c3.75 18.41 12.4 31.94 32 31.94c22.52 0 34.38-15.74 32-31.94a57.17 57.17 0 0 0-.76-4.06L329 301.27l-5.79-45c-4.19-26.21-.82-34.87.32-36.9a1.09 1.09 0 0 0 .08-.15c1.08-2 6-6.48 17.48-10.79l89.28-31.21a16.9 16.9 0 0 0 1.62-.52c16-6 32-14.3 32-31.93S451 107.81 432 112.8z" fill="currentColor"></path></svg>
          </template>
          default
        </w-button>
        <w-button type="primary"  @click="test" size="biger" round>
          <template #icon>
            <Accessibility></Accessibility>
          </template>
          primary
        </w-button>
        <w-button type="success" @click="test" size="mini" round>success</w-button>
        <w-button type="info"  disabled round>info</w-button>
        <w-button type="warning" disabled>warning</w-button>
        <w-button type="error" disabled>error</w-button>
        <w-button type="tertiary" disabled>tertiary</w-button>
        <w-button type="none" loading disabled>none</w-button>
      </w-div>
      <w-span>点击特效</w-span>
      <w-div  bc="$#fff"  :flex="['g-10','wrap']" mb="20"  >
        <w-button type="default"   disabled>default</w-button>
        <w-button type="primary"   disabled>box</w-button>
        <w-button type="success" loading disabled effect="text">
          text
        </w-button>
        <w-button type="info" round effect="biger">biger</w-button>
        <w-button type="warning" disabled effect="small">small</w-button>
        <w-button type="error" loading  effect="rotate">rotate</w-button>
        <w-button type="error"  disabled effect="rotate">rotate长按我</w-button>
        <w-button  type="success" disabled effect="none">none</w-button>
      </w-div>
      <w-span  >抽象按钮</w-span>
      <w-div   :flex="['g-10','wrap']" mb="20"  >
        <w-button type="default" disabled >default</w-button>
        <w-button type="primary" round loading disabled  abstract="unseen">unseen</w-button>
        <w-button type="success" round loading disabled abstract="dash" >dash</w-button>
        <w-button type="info"    round disabled abstract="glass">glass</w-button>
        <w-button type="warning" round size="biger" disabled abstract="round" >round</w-button>
      </w-div>
    </w-div>

      <w-div w="p50" p="10"  bd="#1f1" >
        右面
      <w-div 
        bg="https://www.iamwzc.com/Resources/back_class_normal.png  red blue r-n w-p50  center #123456 green-red-blue-pink" 
        h="300" 
        
        hover="bg-left-bottom-fill--w:p100-h:auto"
        style="transition:all .5s ease;"
      >
        卧槽啊
      </w-div>

      </w-div>

    </w-div>
    <w-group  :cus-props="[['type','error']]" hover="center " bg="center" c="#f00" >
      <w-div :bg="`${urls}`"  >asd</w-div>
      <w-button type="success">asd</w-button>
      <w-button>asd</w-button>
      <w-button hover="bg-red">asd</w-button>
      <w-div>asdasd</w-div>
    </w-group>
    <div style="margin: 20px;text-align: center;font-size: 24px;">比对</div>

    <div class="bg-black c-red h-400 w-p100 flex p-20">
      <div class="bg-green w-p50 p-10">左面</div>
      <div class="w-p50 p-10" :style="{background: `url(${urls})`}">右面</div>
    </div>

  </div>
  <!-- <w-button type="default">asdsd</w-button> -->
</template>

<style scoped>
.test{

  margin: 20px;
}
/* .test1{
  padding-left: 0;
} */
</style>
