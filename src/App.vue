
<script setup lang="ts">
import { ref } from 'vue'
import { useClass } from './interface'  
 
    
const title = 'Prop Style !';

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
  <w-group  radius="50%" w="100" h="100" flex="center" :bg="[as.head,'fill']" hover="bd=gray;" >
    <w-div bd="l-solid t-dashed r-double b-dotted" ></w-div>
    <w-div bd="y-dashed black x-solid-red"></w-div>
    <w-div bd="dotted blue y-red" hover="bd=black"></w-div>
    <w-div bd="double r-solid-red+#fff"></w-div>
  </w-group>
</w-div>
<w-div :flex="['g-10','wrap']">
  <w-group transition=".1s" radius="50%" w="100" h="100" flex="center" :bg="[as.head,'fill','r-n']" hover="bd=solid;10">
    <w-div bd="t-groove" ></w-div>
    <w-div bd="r-outset-red" ></w-div>
    <w-div bd="b-inset blue" ></w-div>
    <w-div bd="l-ridge" ></w-div>
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
