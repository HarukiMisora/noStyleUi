import {WDiv,WSpan,WButton,WVar,WGroup} from './index'

declare var require :any
declare module 'vue'{
    export interface GlobalComponents{
        WDiv:typeof WDiv
        WSpan:typeof WSpan
        WButton:typeof WButton
        WVar:typeof WVar
        WGroup:typeof WGroup

    }
}
export{}