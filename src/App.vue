
<template>
                         <w-group radius="50%" w="100" h="100" flex="center" :bg="`${as.head} fill`" c="red">
                          <div></div>
                          <w-div>沉</w-div>

                            <w-group>
                                <w-div>沉</w-div>
                                <w-div>鱼</w-div>
                            </w-group>
                            <w-group radius="25%"  :bg="['p-50']">
                                <w-div>落</w-div>
                                <w-div>雁</w-div>
                            </w-group>
                        </w-group>

</template> 


<script setup lang="ts">
import {Accessibility} from '@vicons/ionicons5'
import { ref } from 'vue'
let urls:string ='https://www.iamwzc.com/TMXK/noStyleUiDoc/head.png'

const as ={
  head:urls
}
const color = ref('<template>123</template>')
</script>



<style scoped lang="scss">
.test{
  // width: 100vw;
  height: 100vh;
  overflow: scroll;
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
