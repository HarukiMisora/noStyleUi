<script setup lang="ts">
import {Accessibility} from '@vicons/ionicons5'
let urls:string ='https://www.iamwzc.com/Resources/back_class_normal.png'


</script>

<template>
  <w-div class="test"  w="v100" p="20"  >
    <w-group bg="#e1e1e1" c="red+blue" bd="solid #000 10px" hover="bg=red; bd=l-red;5;"  w="200" h="200"  :transition="0.3"    >
      <w-div>1</w-div>
      <w-div>2</w-div>
      <w-div flex="flex center">3</w-div>
      <w-div c="black+white&pink+black" :bg="`red+blue+green ${urls}  r-n size-500 center`"  hover="bg=right c=red+green"  >4</w-div>
      <w-div :bg="urls+'  h-50 w-500 r-n'">5</w-div>
      <w-div c="red-blue">5</w-div>
      <w-div>5</w-div>
      <w-div>5</w-div>
      <w-div>5</w-div>
      <w-div>5</w-div>
      <w-div>5</w-div>
    </w-group>
    <w-button type="primary" hover="bg=red; bd=l-red;5;" >按钮</w-button>
  </w-div>

</template>

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
