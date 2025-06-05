
<script setup lang="ts">
import { ref } from 'vue'
import { useClass } from './interface'



const test = ref(useClass('flex','center')) 

let urls:string ='https://www.iamwzc.com/TMXK/noStyleUiDoc/head.png' 
const img = ref(urls)
const bottom = ref(100)
const as = {
  head:urls,
  img:'https://www.iamwzc.com/TMXK/noStyleUiDoc/img.png' 
}
const asd = ()=>{
  console.log('卧槽？');  
}
const color = ref('<template>123</template>')

const min = ref('10')
const max = ref('')
</script> 
<template> 

<w-div :flex="test" :bg="'#000'" hover="bg=#ff0" @click="test='right'"    >
  <w-group w="100" h="100" c="red" bg="center" >
    <w-div w="1000" :bg="`${as.img}`" >引入public目录下的图片</w-div>    
    <w-div :bg="`${as.img}`">引入组件相对路径的图片</w-div> 
    <w-div :bg="img" transition> 
      变量名动态引入
      <w-div  :flex="['j-around']" pt="20">  
        <w-button type="success" @click="img=as.img">图1</w-button>   
        <w-button type="success" @click="img=as.head">图2</w-button> 
      </w-div>
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
