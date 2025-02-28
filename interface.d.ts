export {WDiv,WSpan,WButton,WGroup} from './index'

declare var require :any
declare module 'vue'{
    export interface GlobalComponents{
        WDiv:typeof WDiv
        WSpan:typeof WSpan
        WButton:typeof WButton
        WGroup:typeof WGroup

    }
}
export{}