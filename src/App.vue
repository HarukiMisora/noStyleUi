<script setup lang="ts">
import {Accessibility} from '@vicons/ionicons5'
let urls:string ='https://www.iamwzc.com/Resources/back_class_normal.png'





const test =(e:MouseEvent)=>{
  window.alert('111')
}

;


</script>

<template>
  <w-div class="test" bg="#1e1e1e" w="v100" p="20" grid="col-2 row--200px g-20" >
    <w-group bg="#e1e1e1" hover="bg-red"  >
      <w-div>1</w-div>
      <w-div>2</w-div>
      <w-div>3</w-div>
      <w-div bg="red" grid="item gcol-1-3 grow-1-2" >4</w-div>
      <w-div :bg="urls+'  h-50 w-500 r-n'">5</w-div>
      <w-div>5</w-div>
      <w-div>5</w-div>
      <w-div>5</w-div>
      <w-div>5</w-div>
      <w-div>5</w-div>
      <w-div>5</w-div>
    </w-group>
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
