
<template>
  <w-div p="40" bg="red" :flex="['col','1','g-20']">
    {{ color }}
      <code-preview title="安装" text="nmp i -D nostyleui" lang="bash" :show="true">
          <notice class="mt-5" title="警告" msg='因为目前还在开发调试阶段，写得&比较随缘也不全面，碎片化时间更新，也没做版本管理，我写一点往上面发布一点。所以目前非常不建议投入生产。' type="danger"></notice>

      </code-preview>
      <CodePreview  title="全局引入" :text="allCode" lang="ts" :show="true">
          
      </CodePreview>
      <CodePreview  title="按需引入" :text="needCode" :show="true">
          <Notice class="mt-5" title="注意" msg='目前按需引入还是需要在main.ts中引入全局css。这是因为所有组件都依赖于这个全局css' type="warning"></Notice>

      </CodePreview>
  </w-div>   

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
