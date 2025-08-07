
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
<w-div :flex="['g-10','wrap']">
    <w-group transition radius="50%" w="100" h="100" flex="center" :bg="as.head" s.-bg="r-n fill" hover="bg=cover;size-50-50">
        <w-div bd="t-groove" hover="bg=left"></w-div>
        <w-div bd="r-outset-red" hover="bg=right"></w-div>
        <w-div bd="b-inset blue" hover="bg=top;center"></w-div>
        <w-div bd="l-ridge" hover="bg=bottom;center"></w-div> 
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
