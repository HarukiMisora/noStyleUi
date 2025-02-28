
import { WButton, WDiv, WSpan,WGroup} from './index'
import './noStyleUi/div/style/css.scss'
// import variables from './noStyleUi/style/variables.module.scss'
import {vUpdate} from './noStyleUi/directive/update.ts'
export {
    div as WDiv,
    span as WSpan,
} from './noStyleUi/div/Div.ts'
export{
    button as WButton,
}from './noStyleUi/button/button.ts'
export {group as WGroup} from './noStyleUi/group/group.ts'

export default function install(Vue:any){
    // console.log(variables);
    Vue.component('WGroup',WGroup)
    
    Vue.component('WDiv',WDiv)
    Vue.component('WSpan',WSpan)
    Vue.component('WButton',WButton)

    Vue.directive('update',vUpdate)
    
}