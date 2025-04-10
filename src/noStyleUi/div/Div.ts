

import {  defineComponent , h, ref} from 'vue'
import { config } from '../config/config'
import { isValidColor } from '../test/index'
// import   './style/css.scss'
import createteGridCss from './functions/createGrid.css'
import createBgCss from './functions/createBg.css'
import {  createHoverCss } from './functions/createHover.css'
import { createFontColorCss } from './functions/createFontColor.css'
import { creatFlexCss } from './functions/createFlex.css'
import { createBdCss } from './functions/createBd.css'


const styleProps = {
    ...config.props,
}as const

type PropT = {[key in keyof typeof styleProps]?:string}



interface renderHelperOptionsT {
    disabled?:boolean
}

export function renderHelper(props:PropT,options:renderHelperOptionsT){

    const className:{[key:string]:Boolean} ={}
    const hoverClassName:{[key:string]:Boolean} ={}
    const styles = {} as myCSSStyleDeclaration
    const hoverStyles = {} as myCSSStyleDeclaration
    const attributeGrop:(keyof Pxs)[] = ['w','h','x','y','f','fw','p','px','py','pl','pt','pb','pr','m','mx','my','ml','mt','mb','mr','radius']
    const attributeGropStyle: Pxs = {
        w:'width',
        h:'height',
        x:'x',
        y:'y',
        f:'font-size',
        fw:'font-weight',
        radius:'border-radius',
        p:'padding',
        pt:'padding-top',
        pb:'padding-bottom',
        pl:'padding-left',
        pr:'padding-right',
        px:'padding',
        py:'padding',
        
        m:'margin',
        mt:'margin-top',
        mb:'margin-bottom',
        ml:'margin-left',
        mr:'margin-right',
        mx:'margin',
        my:'margin',

        
    }
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
            if(props[i][0] ==='$'){
                styles[<keyofCSSStyleDeclaration>attributeGropStyle[i]] = props[i].slice(1)
            }
            else{
                className[`${i}-${props[i]}`] = true
                delete styles[<keyofCSSStyleDeclaration>attributeGropStyle[i]]
            }
        }
    }
    //grid属性集
    if(props.grid !== void 0){
        createteGridCss(props.grid,setClassName,setStyle)
    }
    //字体颜色
    if(props.c!== void 0){
        createFontColorCss(props.c,setClassName,setStyle)
    }
    //bg属性集
    if(props.bg !== void 0){
        createBgCss(props.bg,setClassName,setStyle)
    }

    if(props.flex!== void 0){
        creatFlexCss(props.flex,setClassName,setStyle)
        
    }
    if(props.bd!== void 0){
        createBdCss(props.bd,setClassName,setStyle)
    }
    if(props.hover !== void 0&&!options.disabled) {
        createHoverCss(props.hover,setHoverClassName,setHoverStyle)
        // console.log(hoverStyles,hoverClassName);
    }
    

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
            const {className,styles,hoverStyles} = renderHelper(<PropT>this.$props,{})
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