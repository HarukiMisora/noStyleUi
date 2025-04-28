<script setup lang="ts">
import {Accessibility} from '@vicons/ionicons5'
let urls:string ='https://www.iamwzc.com/TMXK/noStyleUiDoc/head.png'

const as ={
  head:urls
}
</script>

<template>
<!-- <w-div class="flex-1" bg="white" p="40" v-for="i in 50" > -->
  <w-div :flex="['g-10','wrap']">
            <w-group radius="p50" w="100" h="100" flex="center" :bg="[as.head,'fill']" c="green" hover="bd=solid;black;y-solid;10">
                <!-- <w-div bd="l-solid t-dashed r-double b-dotted"></w-div> -->
                <w-div :bd="['dashed','y-dashed-red','blue','10'] "></w-div>
                <w-div bd="y-dashed solid y-red blue"></w-div>
                <!-- <w-div bd="dotted blue y-red"></w-div> -->
                <!-- <w-div bd="double r-solid-red+#fff"></w-div> -->
            </w-group>
        </w-div>


<!-- </w-div> -->
   

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
