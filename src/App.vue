
<script setup lang="ts">
import { ref } from 'vue'
import { useClass } from './interface'  
import Wocao from './pages/wocao.vue'
 
    
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
                    <w-div flex="g-10 wrap">
                        <w-group w="calc(95% / 3)" h="150" c="#fff" :bg="`green size-75-75 r-n ${as.img}`" >
                            <w-div bg="green size-75-75 r-n" >left</w-div>
                            <w-div bg="top center" >top center</w-div>
                            <w-div bg="right">right</w-div>
                            <w-div bg="left center">left center</w-div>
                            <w-div :bg="`${img} center`" transition>center</w-div>
                            <w-div bg="right center">right center</w-div>
                            <w-div bg="bottom left">bottom left</w-div>
                            <w-div bg="center bottom">center bottom</w-div>
                            <w-div bg="right bottom">right bottom</w-div>
                            <w-div bg="p-100">p-100 距离左边100px</w-div> 
                            <w-div bg="p-50%">p-50% 距离左边50%(position) </w-div>
                            <w-div bg="p-100-100%">p-100-100% 距离左边100px，距离顶边100% </w-div>
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
