
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
 <div w="600">
<w-div flex h="150"  c="#fff" bg="green" >
  <w-group flex="1" bd="solid red 1">
    <w-div  flex="i-start j-end" >
      <w-div>i-start</w-div>
      <w-div>j-end</w-div>
    </w-div>
    <w-div  flex="i-center j-center" >
      <w-div>i-center</w-div>
      <w-div>j-center</w-div>
    </w-div>
    <w-div  flex="i-end j-start" >
      <w-div>i-end</w-div>
      <w-div>j-start</w-div>
    </w-div>
  </w-group>
</w-div>
<w-div flex h="150"  c="#fff" bg="green" >
  <w-group flex="1" bd="solid red 1">
    <w-div  flex="i-start j-around" >
      <w-div>i-start</w-div>
      <w-div>j-around</w-div>
    </w-div>
    <w-div  flex="i-center j-between" >
      <w-div>i-center</w-div>
      <w-div>j-between</w-div>
    </w-div>
    <w-div  flex="i-end j-evenly" >
      <w-div>i-end</w-div>
      <w-div>j-start</w-div>
    </w-div>
  </w-group>
</w-div>
</div>
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
