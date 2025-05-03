

import {  defineComponent , h, ref} from 'vue'
import { config } from '../config/config'
import createGridCss from './functions/createGrid.css'
import createBgCss from './functions/createBg.css'
import {  createHoverCss } from './functions/createHover.css'
import { createFontColorCss } from './functions/createFontColor.css'
import { creatFlexCss } from './functions/createFlex.css'
import { createBdCss } from './functions/createBd.css'
import { createTransition } from './functions/createTransition'
import type {  myCSSStyleDeclaration, Pxs, setClassNameT, setStyleT } from '../interface/css'
import createPixCss from './functions/createPix.css'


const styleProps = {
    ...config.props,
}as const

type PropT = {[key in keyof typeof styleProps]?:string}



// interface renderHelperOptionsT {
//     disabled?:boolean
// }

export function renderHelper(props:PropT){

    const className:{[key:string]:Boolean} ={}
    const hoverClassName:{[key:string]:Boolean} ={}
    const styles = {} as myCSSStyleDeclaration
    const hoverStyles = {} as myCSSStyleDeclaration
    const attributeGrop:(keyof Pxs)[] = ['w','h','x','y','f','fw','p','px','py','pl','pt','pb','pr','m','mx','my','ml','mt','mb','mr','radius']
    const setClassName:setClassNameT = (name,value=true) =>{
        className[name]= value
    }
    const setStyle:setStyleT = (name,value) =>{
        styles[name] = value
    }
    const setHoverStyle:setStyleT = (name,value) =>{
        hoverStyles[name] = value
    }
    const setHoverClassName:setClassNameT = (name,value=true) =>{
        className[`hover-${name}`] = value
    }

    for(const i  of attributeGrop){
        if(props[i] !== void 0){
           createPixCss(i,props[i],setClassName,setStyle)
        }
    }
    // console.log(props);
    
    const checkProp = <T>(prop:T,callback:(prop:T,setClassName:setClassNameT,setStyle:setStyleT) => void,checkFun:(prop:T)=>boolean=(prop)=>prop!== void 0)=>{
        if(checkFun(prop)) callback(prop,setClassName,setStyle)
    }
    //grid属性集
    checkProp(<string|boolean|string[]>props.grid,createGridCss,(prop)=>prop !== false)
    //字体颜色
    checkProp(<string>props.c,createFontColorCss)
    //bg属性集
    checkProp(<string|string[]>props.bg,createBgCss)
    //flex属性集
    checkProp(<string|boolean|string[]>props.flex,creatFlexCss,(prop)=>prop !== false)
    //边框属性集
    checkProp(<string|string[]>props.bd,createBdCss)
    //tansition属性集
    checkProp(<string|number>props.transition,createTransition)
    //hover属性集
    checkProp(<string|string[]>props.hover,(prop)=>createHoverCss(prop,setHoverClassName,setHoverStyle))



    

    // console.log(styles);

    // console.log(className,styles,hoverStyles);

    
    return {className,styles,hoverStyles,hoverClassName}





    

}
function createTag(tag:string){
    return defineComponent({
        name:`W${tag}`,
        props:{
            ...styleProps,
            test:{
                type:[String,Number],
                default:''
            }
        },
        setup(props){
 
            let activeHover = ref(false)
            const mouseEnterFunction = ()=>{
                // console.log(props);
                
                if(!props.hover)return
                activeHover.value = true
            }
            const mouseOutFunction =()=>{
                if(!props.hover)return
                activeHover.value = false
            }

            return {
                mouseEnterFunction,
                mouseOutFunction,
                activeHover
            }

        },
        render(){
            const {className,styles,hoverStyles} = renderHelper(<PropT>this.$props)
            // console.log(this.activeHover);
            
            const styleAll = (()=>{
                return this.activeHover?{...styles,...hoverStyles}:styles
            })
            

            return h(tag,{
                class:className,
                style:{
                    ...styleAll(),
                    // ...this.styles
                },
                onMouseenter:this.mouseEnterFunction,
                onmouseleave:this.mouseOutFunction
                // class:this.className,
                // style:this.styles
        
            },this.$slots.default?.())
        }
        
    })
}
const div = createTag('div')
const span = createTag('span')
const wp = createTag('p')
const wa = createTag('a')
const h1 = createTag('h1')
const img = createTag('img')

const ul = createTag('ul')
const ol = createTag('ol')
const li = createTag('li')

const canvas = createTag('canvas')
const video = createTag('video')
const tarck = createTag('tarck')

const meter = createTag('meter')

const details = createTag('details')
const summary = createTag('summary')
export  {div,span,wa,wp,h1,ul,ol,li,canvas,video,tarck,meter,details,summary,img}

// export default Div