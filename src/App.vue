
<script setup lang="ts">
import { ref } from 'vue'
import { useClass } from './interface'
 
    

const test = ref(useClass('flex','center')) 

const bottom = ref(100)
const as = { 
  head:'https://www.iamwzc.com/TMXK/noStyleUiDoc/head.png',
  img:'https://www.iamwzc.com/TMXK/noStyleUiDoc/img.png'  
}
const img = ref(as.img)
   
</script>  
<template> 
 
<w-div :flex="['g-10','wrap']" c="green">
  <w-group bd="solid #87ceeb 1" radius="p50" w="100" h="100" flex="center" :bg="as.head+' fill'" >
    <w-div bd="x-red"  >
      <w-span bg="#1e1e1eff" c="white">red生效</w-span>
    </w-div>
    <w-div bd="x-#f00">
      <w-span bg="#1e1e1eff" c="white">#F00生效</w-span>
    </w-div>
    <w-div bd="x-rgb(255,0,0)">
      <w-span bg="#1e1e1eff" c="white">rgb(255,0,0)生效</w-span>
    </w-div>
    <w-div bd="x-red-red">
      <w-span bg="#1e1e1eff" c="white">red-red生效</w-span>
    </w-div>
  </w-group>
</w-div>
<w-div :flex="['g-10','wrap']">
  <w-group bd="solid-skyblue-1" radius="5" w="100" h="100" flex="center" :bg="[as.head,'fill']" >
    <w-div bd="x-red"  >
      <w-span bg="#1e1e1eff" c="white">red生效</w-span>
    </w-div>
    <w-div bd="x-#f00">
      <w-span bg="#1e1e1eff" c="white">#F00生效</w-span>
    </w-div>
    <w-div bd="x-rgb(255,0,0)">
      <w-span bg="#1e1e1eff" c="white">rgb(255,0,0)生效</w-span>
    </w-div>
    <w-div bd="x-red">
      <w-span bg="#1e1e1eff" c="white">red+red生效</w-span>
    </w-div>
  </w-group>
</w-div>

</template> 






<style scoped lang="scss">
.test{
  // width: 100vw;
  height: 10vh;
  overflow: scroll; 
  position: relative;
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
 

<style lang="scss">

</style>
