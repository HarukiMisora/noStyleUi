
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useClass } from 'propstyle'
useClass('w','',['50%','100%'])
import { CartSharp } from '@vicons/ionicons5'
const  bucketRef = ref()
const cartNumber = ref(0)
const GoodsRefs = ref()
function addGoods (e:MouseEvent,index:number){
  
  bucketRef.value.recycle(GoodsRefs.value[index-1],{
    callBack:()=>{
      cartNumber.value++
    }
  })
  // bucketRef.value.recycle(e.target)
  
  
}


const as = { 
  head:'https://www.iamwzc.com/TMXK/noStyleUiDoc/head.png', 
  img:'https://www.iamwzc.com/TMXK/noStyleUiDoc/img.png'    
}
const img = ref(as.img)
</script>   
<template> 
    <w-recycling-bucket ref="bucketRef" mt="20"  position="abs r-50 t--50" :delay="100" :duration="1000" easing="ease" effect="shake" :move-effect="['rotate','small']">
      <w-div f="18" w="50" position="rel" >
        <CartSharp></CartSharp>
        <span v-if="cartNumber" c="#fff" bg="red" w="25" h="25" fw="800" flex="center" radius="50%" position="abs l-50 b-40 ">{{ cartNumber }}</span>
      </w-div>
    </w-recycling-bucket>
    <w-div flex="g-10 wrap" p="20">
      <w-group hover="bd=1;red;solid"  bd="1 #0000 solid" p="5" radius="8" transition bg=" contain r-n" w="200"    >
        <w-div v-for="i in 10" :key="i" @click="addGoods($event,i)" ref="GoodsRefs">
          <w-div  h="200" w="188" :bg="as.img" s.-bg="size-500 p-5--50 r-n" radius="8">
          </w-div>
          <w-p px="5">商品名称</w-p>
          <w-p px="5" c="red">
            ￥99999 元
            <w-button></w-button>
          </w-p>

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
