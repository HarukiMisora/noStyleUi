import {WDiv,WSpan,WButton,WVar} from './index'

declare var require :any
declare module 'vue'{
    export interface GlobalComponents{
        WDiv:typeof WDiv
        WSpan:typeof WSpan
        WButton:typeof WButton
        WVar:typeof WVar

    }
}
export{}