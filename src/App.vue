
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
   <w-div  h="100vh" flex="col i-center j-center" class="main" radius="25" style="opacity: 0.9;">
    <w-div class="title" f="80" fw="800" c="primary"  style="text-align: center;" >
      <w-span   class="word"  v-for="(i,index) in title" :key="i">{{ i }}</w-span> 
    </w-div>
    <w-div   >FOR VUE3</w-div>
    <w-div flex="g-20" mt="50">
      <!-- <w-button type="primary">切换主题</w-button> -->
      <w-button  type="primary" >开始使用</w-button> 
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
