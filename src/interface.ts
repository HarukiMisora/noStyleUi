import {WDiv,WSpan,WButton,WGroup,WA,WP,WH1,WCanvas,WDetailes,WLi,WMeter,WOl,WSummary,WTarck,WUl,WVideo,WImg,WGhost} from './index'
export {propStyle,propStyleCompile,useClass} from './index'
declare module 'vue'{
    export interface GlobalComponents{
        WDiv:typeof WDiv
        WSpan:typeof WSpan
        WButton:typeof WButton
        WGroup:typeof WGroup
        WGhost:typeof WGhost
        WA:typeof WA
        WP:typeof WP
        WH1:typeof WH1
        WCanvas:typeof WCanvas
        WDetailes:typeof WDetailes
        WLi:typeof WLi
        WMeter:typeof WMeter
        WOl:typeof WOl
        WSummary:typeof WSummary
        WTarck:typeof WTarck
        WUl:typeof WUl
        WVideo:typeof WVideo
        WImg:typeof WImg
    }
}

