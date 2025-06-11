




<script setup lang="ts">
import { ref } from 'vue'
import { useClass } from '../interface'  
 
    

const test = ref(useClass('flex','center'))  

const bottom = ref(100)
const as = { 
  head:'https://www.iamwzc.com/TMXK/noStyleUiDoc/head.png', 
  img:'https://www.iamwzc.com/TMXK/noStyleUiDoc/img.png'    
}
const img = ref(as.img)
   
</script>  
<template> 
<w-div grid="col-3 row--45-40 g-4" >    
  <w-div   v-for="i in '12346789'" :key="i" transition radius="4"  bg="#44567245" flex="center" hover="bg=#123456 c=white">🎄{{ i }}</w-div>
  <w-div grid="item grow-1-5 gcol-2-3" transition radius="4"  bg="#44567245" flex="center" hover="bg=#123456 c=white">🧦5</w-div>
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
