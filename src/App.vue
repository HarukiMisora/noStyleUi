
<template>
<w-ul px="20">
                <w-group pt="10">
                    <w-li>
                        &lt;w-div&gt;&lt;/w-div&gt;
                    </w-li>
                    <w-li>
                        &lt;w-span&gt;&lt;/w-span&gt;
                    </w-li>
                    <w-li>
                        &lt;w-p&gt;&lt;/w-p&gt;
                    </w-li>
                    <w-li>
                        &lt;w-a&gt;&lt;/w-a&gt;
                    </w-li>
                    <w-li>
                        &lt;w-h1&gt;&lt;/w-h1&gt;
                    </w-li>
                    <w-li>
                        &lt;w-img&gt;&lt;/w-img&gt;
                    </w-li>
                    <w-li>
                        &lt;w-ul&gt;&lt;/w-ul&gt;
                    </w-li>
                    <w-li>
                        &lt;w-ol&gt;&lt;/w-ol&gt;
                    </w-li>
                    <w-li>
                        &lt;w-li&gt;&lt;/w-li&gt;
                    </w-li>
                    <w-li>
                        &lt;w-canvas&gt;&lt;/w-canvas&gt;
                    </w-li>
                    <w-li>
                        &lt;w-video&gt;&lt;/w-video&gt;
                    </w-li>
                    <w-li>
                        &lt;w-tarck&gt;&lt;/w-tarck&gt;
                    </w-li>
                    <w-li>
                        &lt;w-meter&gt;&lt;/w-meter&gt;
                    </w-li>
                    <w-li>
                        &lt;w-details&gt;&lt;/w-details&gt;
                    </w-li>
                    <w-li>
                        &lt;w-summary&gt;&lt;/w-summary&gt;
                    </w-li>
                    <w-div>asd</w-div>
                </w-group>
            </w-ul>

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
