<script setup lang="ts">
import {Accessibility} from '@vicons/ionicons5'
import { ref } from 'vue'
let urls:string ='https://www.iamwzc.com/TMXK/noStyleUiDoc/head.png'

const as ={
  head:urls
}
const color = ref('#000')
</script>

<template>
  <w-div class="flex-1 test" bg="red" p="40"   >
    <template></template>
     {{color}}
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
