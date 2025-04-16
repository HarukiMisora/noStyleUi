
import { WButton, WDiv, WSpan,WGroup,WA,WP,WH1,WCanvas,WDetailes,WLi,WMeter,WOl,WSummary,WTarck,WUl,WVideo,WImg,WGhost} from './index'
import './noStyleUi/div/style/css.scss'
// import variables from './noStyleUi/style/variables.module.scss'
import {vUpdate} from './noStyleUi/directive/update.ts'
export {
    div as WDiv,
    span as WSpan,
    wa as WA,
    wp as WP,
    h1 as WH1,
    ul as WUl,
    li as WLi,
    ol as WOl,
    canvas as WCanvas,
    video as WVideo,
    tarck as WTarck,
    meter as WMeter,
    details as WDetailes,
    summary as WSummary,
    img as WImg,

} from './noStyleUi/div/Div.ts'
export{
    button as WButton,
}from './noStyleUi/button/button.ts'
export {group as WGroup} from './noStyleUi/group/group.ts'
export {ghost as WGhost} from './noStyleUi/ghost/ghost.ts'
export default function install(Vue:any){
    // console.log(variables);
    Vue.component('WGroup',WGroup)
    Vue.component('WButton',WGhost)


    Vue.component('WA',WA)
    Vue.component('WDiv',WDiv)
    Vue.component('WSpan',WSpan)
    Vue.component('WP',WP)
    Vue.component('WH1',WH1)
    Vue.component('WUl',WUl)
    Vue.component('WLi',WLi)
    Vue.component('WOl',WOl)
    Vue.component('WCanvas',WCanvas)
    Vue.component('WVideo',WVideo)
    Vue.component('WTarck',WTarck)
    Vue.component('WMeter',WMeter)
    Vue.component('WDetailes',WDetailes)
    Vue.component('WSummary',WSummary)
    Vue.component('WImg',WImg)

    Vue.component('WButton',WButton)

    Vue.directive('update',vUpdate)
    
}



