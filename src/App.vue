<script setup lang="ts">
import {Accessibility} from '@vicons/ionicons5'
let urls:string ='https://www.iamwzc.com/TMXK/noStyleUiDoc/head.png'

const as ={
  head:urls
}
</script>

<template>
<!-- <w-div class="flex-1" bg="white" p="40" v-for="i in 50" > -->
  <w-div :flex="['g-10','wrap']">
    <w-group radius="p50" w="100" h="100" flex="center" :bg="[as.head,'fill']" c="green" hover="bd=solid;black;y-solid;10" _class="wocao" _style="background-size:cover;background-position:center;" transition>
        <w-div   bd="l-solid t-dashed r-double b-dotted"   ></w-div>
        <w-div :bd="['dashed','y-dashed-red','#0f0','10'] " ></w-div>
        <w-div bd="y-dashed solid y-red blue" radius="p50" ></w-div>
        <w-div bd="dotted blue y-red" radius="p50" ></w-div>
        <w-div bd="double r-solid-red+#fff" radius="p50" ></w-div>
    </w-group>

  </w-div>

  <w-div :flex="['g-15','wrap']" mb="15">
  <w-button type="default" size="mini">mini</w-button>
  <w-button type="primary" size="small">small</w-button>
  <w-button type="success" size="default">default</w-button>
  <w-button type="warning" size="biger">biger</w-button>
</w-div>
<w-div :flex="['g-15','wrap']" mb="15">
  <w-button type="default" size="mini" round>mini</w-button>
  <w-button type="primary" size="small" round>small</w-button>
  <w-button type="success" size="default" round>default</w-button>
  <w-button type="warning" size="biger" round>biger</w-button>
</w-div>
<w-div :flex="['g-15','wrap']">
  <w-button type="default" size="mini"    abstract="round">mini</w-button>
  <w-button type="primary" size="small"   abstract="round">small</w-button>
  <w-button type="success" size="default" abstract="round">default</w-button>
  <w-button type="warning" size="biger"   abstract="round">biger</w-button>
</w-div>

  
  <!-- <div w="100" h="500" bg="red"></div> -->

<!-- </w-div> -->
   

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
