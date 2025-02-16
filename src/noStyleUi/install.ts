
import { WButton, WDiv, WSpan } from './index'
import './div/style/css.scss'

export default function install(Vue:any){
    // console.log(Vue);
    Vue.component('WDiv',WDiv)
    Vue.component('WSpan',WSpan)
    Vue.component('WButton',WButton)

    

    
}