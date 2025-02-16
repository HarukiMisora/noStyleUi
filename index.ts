
import { WButton, WDiv, WSpan } from './index'
import './noStyleUi/div/style/css.scss'

export {
    div as WDiv,
    span as WSpan,
    
    
} from './noStyleUi/div/Div.ts'
export{
    button as WButton,
}from './noStyleUi/button/button.ts'




export default function install(Vue:any){
    console.log(Vue);
    Vue.component('WDiv',WDiv)
    Vue.component('WSpan',WSpan)
    Vue.component('WButton',WButton)
    
}