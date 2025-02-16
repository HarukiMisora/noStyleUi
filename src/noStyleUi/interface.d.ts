import {WDiv,WSpan,WButton} from './index'

import MyTest from './test/MyTest.vue'

declare module 'vue'{
    export interface GlobalComponents{
        WDiv:typeof WDiv,
        WSpan:typeof WSpan,
        WButton:typeof WButton,
        MyTest:typeof MyTest
    }
}
export{}