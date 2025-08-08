
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
const effect = ref('text') 
</script>   
<template> 
  <w-group :cus-props="{type:'primary',effect:''}"> 
    <w-button type="error" @click="effect = effect === 'text'? 'defalut' : 'text'" >沉</w-button>
    <!-- <w-button>鱼</w-button>
    <w-button>落</w-button>
    <w-button>雁</w-button> -->
  </w-group>
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
