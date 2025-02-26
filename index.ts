
import { WButton, WDiv, WSpan,WVar,WGroup} from './index'
import './noStyleUi/div/style/css.scss'
import variables from './noStyleUi/style/variables.module.scss'
import {vUpdate} from './noStyleUi/directive/update.ts'
export {
    div as WDiv,
    span as WSpan,
} from './noStyleUi/div/Div.ts'
export{
    button as WButton,
}from './noStyleUi/button/button.ts'
export{
    WVar as WVar
}from './noStyleUi/test/WVar.ts'
export {group as WGroup} from './noStyleUi/group/group.ts'

export default function install(Vue:any){
    // console.log(Vue);
    console.log(variables);
    Vue.component('WVar',WVar)
    Vue.component('WGroup',WGroup)
    
    Vue.component('WDiv',WDiv)
    Vue.component('WSpan',WSpan)
    Vue.component('WButton',WButton)

    Vue.directive('update',vUpdate)
    
}