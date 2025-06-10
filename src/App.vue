
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
 
<w-div mb="5">直接输入1-solid-red默认是应用到4个方向。现在我们可以用前缀t、r、b、l、x、y去告诉它我要指定方向的样式</w-div>
<w-div :flex="['g-10','wrap']" c="green" bd="solid">
  <w-group radius="50%" w="100" h="100" flex="center" :bg="as.head+' fill'" >
    <w-div bd="l-solid t-dashed r-double b-dotted" bg="fill"></w-div>
    <w-div bd="dashed-red x-solid"></w-div>
    <w-div bd="dotted blue y-red"></w-div>
    <w-div bd="double r-solid-red+#fff"></w-div>
  </w-group>
</w-div>
<w-div :flex="['g-10','wrap']">
  <w-group radius="50%" w="100" h="100" flex="center" :bg="as.head+' fill'" c="green">
    <w-div bd="t-groove"></w-div>
    <w-div bd="r-outset-red"></w-div>
    <w-div bd="b-inset blue"></w-div>
    <w-div bd="l-ridge"></w-div>
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
