
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
 
<w-div flex="g-10"> 
  <w-div flex="row">
    <w-group w="30" h="30">  
      row
      <w-div bg="red"></w-div>
      <w-div bg="green"></w-div>
      <w-div bg="blue"></w-div>
      <w-div bg="#FF0"></w-div>
      <w-div bg="#00FFFF"></w-div>
      <w-div bg="rgb(255,0,255)"></w-div>
      <w-div bg="rgba(255,0,255,0.5)"></w-div>
      <w-div bg="red+green+#00f+rgba(255,255,0,0.5)"></w-div>
    </w-group>
  </w-div>
  <w-div :flex="['row-r']">
    <w-group w="30" h="30">
      row-r
      <w-div bg="red"></w-div>
      <w-div bg="green"></w-div>
      <w-div bg="blue"></w-div>
      <w-div bg="#FF0"></w-div>
      <w-div bg="#00FFFF"></w-div>
      <w-div bg="rgb(255,0,255)"></w-div>
      <w-div bg="rgba(255,0,255,0.5)"></w-div>
      <w-div bg="red+green+#00f+rgba(255,255,0,0.5)"></w-div>
    </w-group>
  </w-div>
</w-div>
<w-div flex="row g-10" mt="10">
  <w-div flex="col">
    <w-group w="30" h="30">
      col
      <w-div bg="red"></w-div>
      <w-div bg="green"></w-div>
      <w-div bg="blue"></w-div>
      <w-div bg="#FF0"></w-div>
      <w-div bg="#00FFFF"></w-div>
      <w-div bg="rgb(255,0,255)"></w-div>
      <w-div bg="rgba(255,0,255,0.5)"></w-div>
      <w-div bg="red+green+#00f+rgba(255,255,0,0.5)"></w-div>
    </w-group>
  </w-div>
  <w-div :flex="['col-r']">
    <w-group w="30" h="30">
      col-r
      <w-div bg="red"></w-div>
      <w-div bg="green"></w-div>
      <w-div bg="blue"></w-div>
      <w-div bg="#FF0"></w-div>
      <w-div bg="#00FFFF"></w-div>
      <w-div bg="rgb(255,0,255)"></w-div>
      <w-div bg="rgba(255,0,255,0.5)"></w-div>
      <w-div bg="red+green+#00f+rgba(255,255,0,0.5)"></w-div>
    </w-group>
  </w-div>
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
