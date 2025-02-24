import {WDiv,WSpan,WButton} from './index'

declare var require :any
declare module 'vue'{
    export interface GlobalComponents{
        WDiv:typeof WDiv
        WSpan:typeof WSpan
        WButton:typeof WButton
    }
}
export{}