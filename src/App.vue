<script setup lang="ts">
// import {Accessibility} from '@vicons/ionicons5'
let urls:string ='https://www.iamwzc.com/Resources/back_class_normal.png'





// const test =()=>{
//   window.alert('111')
// }




</script>

<template>
  <div @mouseenter="" style="display: flex;flex-direction:column;" class="test test1" >
    <w-group hover="#fff bg-#FF0-left">
      <w-div :bg="urls+' black w-500 r-n'" h="500"  hover="#fff bg-#FF0-center-x:200">asd</w-div>

    </w-group>
  </div>
</template>

<style scoped>
.test{

  margin: 20px;
}
/* .test1{
  padding-left: 0;
} */
</style>
