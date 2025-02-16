import {WDiv,WSpan,WButton} from './index'


declare module 'vue'{
    export interface GlobalComponents{
        WDiv:typeof WDiv
        WSpan:typeof WSpan
        WButton:typeof WButton
    }
}
export{}