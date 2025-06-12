
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
 <w-div flex bg="#e1e1e1" bd="solid 1">
                    <w-div px="50" pt="10vh" h="200" w="200" bg="gray" p="20" :flex="['g-10','col']">
                        <w-group flex hover="c=red bg=blue" transition>
                            <w-span >举世无双</w-span>
                            <w-span >聪明绝顶</w-span> 
                            <w-span >沉鱼落雁</w-span>
                            <w-span hover="c=red+blue+black bg=rgb(0,0,0)">hover字体的颜色也可以混合。</w-span>
                        </w-group>
                    </w-div>
                    <w-div  flex="1 col">
                        <w-group p="20" :bg="`${as.img} cover size--100% r-n center`" h="calc(100% / 4)" bd="b-1-solid-#0f0" transition>
                            <w-div bg="right r-n">
                                WGrop的作用是装载共有样式然后分发给子盒子,当然子盒自身的属性优先生效。
                            </w-div>
                            <w-div bg="red+blue+green" >
                                多个颜色拼接可以混合颜色，red+blue+green 就是这个背景色。
                                
                            </w-div>
                            <w-div bg="red+green+blue right" >
                                颜色混合的顺序是从左到右混合。red+green+blue 会是这个背景色
                            </w-div>
                            <w-div  hover="bg=right c=red" bd="none"  >
                                <w-span hover="c=blue">
                                    hover属性可以直接便捷的创建hover的样式,这里有红色(父)和蓝色(子)两种hover样式。
                                </w-span>
                            </w-div>
                        </w-group>
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
