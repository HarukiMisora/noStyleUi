

import {  defineComponent , h, ref} from 'vue'
import { config } from '../config/config'
import { isValidColor } from '../test/index'
// import   './style/css.scss'
import createteGridCss from './functions/createGrid.css'
import createBgCss from './functions/createBg.css'
import {  createHoverCss } from './functions/createHover.css'
import { createFontColorCss } from './functions/createFontColor.css'
import { creatFlexCss } from './functions/createFlex.css'


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

    const borderStyles = ['dashed','dotted','double','groove','hidden','inset','none','outset','ridge','solid']
    let   borderColors = {
        '':new Array(0),
        'l-':new Array(0),
        'r-':new Array(0),
        't-':new Array(0),
        'b-':new Array(0),
        'x-':new Array(0),
        'y-':new Array(0)
    }

    const setBdOptionActive = (value:any)=>{
        const option = value.toString().split('-')
        let direction = <keyof typeof borderColors> (['l','r','t','b','x','y'].includes(option[0])?option[0]+'-':'')
        value = direction?option[1]:value
        // console.log(option);
        
        for(let i of option){
            if(direction.includes(i))continue
            if(borderStyles.includes(i)){
                 className[`bd-s-${direction+i}`] = true
                 continue
            }
            if(!Number.isNaN(i*1)){
                className[`bd-w-${direction+i}`] = true
                continue
            }
            borderColors[direction].push(i)
            className[`bd-c-${direction+i}`] = true
        }
    }
    const setBorderMixColor = (direction:keyof typeof borderColors,styleName:keyofCSSStyleDeclaration)=>{


        className[`bd-c-${direction+borderColors[direction][0]}`] = false
        
        for(let color of borderColors[direction].slice(1)){
            
            className[`bd-c-${direction+color}`] = false
            const lastColor = styles[styleName]?styles[styleName]:borderColors[direction][0] 
            // console.log(color,lastColor);

            styles[styleName] = `color-mix(in lch, ${lastColor}, ${color})`
        }
    }
    const setBdOptions = (arr:string[])=>{
        for(let i of arr){
            setBdOptionActive(i)
        }
        // console.log(borderColors);
        if(borderColors[''].length>1){
            setBorderMixColor('','borderColor')
        }else if(isValidColor(borderColors[''][0])){
            // console.log(11111);
            
            styles.borderColor = borderColors[''][0]
        }
        if(borderColors['x-'].length>1){
            styles.borderLeftColor = ''
            styles.borderRightColor = ''
            setBorderMixColor('x-','borderLeftColor')
            setBorderMixColor('x-','borderRightColor')
        }
        else if(isValidColor(borderColors['x-'][0])){
            styles.borderLeftColor = borderColors['x-'][0]
            styles.borderRightColor = borderColors['x-'][0]
        }
        if(borderColors['y-'].length>1){
            styles.borderTopColor = ''
            styles.borderBottomColor = ''
            setBorderMixColor('y-','borderTopColor')
            setBorderMixColor('y-','borderBottomColor')
        }
        else if(isValidColor(borderColors['y-'][0])){
            styles.borderTopColor = borderColors['y-'][0]
            styles.borderBottomColor = borderColors['y-'][0]
        }
        if(borderColors['l-'].length>1){
            styles.borderLeftColor = ''
            setBorderMixColor('l-','borderLeftColor')
        }
        else if(isValidColor(borderColors['l-'][0])){
            styles.borderLeftColor = borderColors['l-'][0]
        }
        if(borderColors['r-'].length>1){
            styles.borderRightColor = ''
            setBorderMixColor('r-','borderRightColor')
        }
        else if(isValidColor(borderColors['r-'][0])){
            styles.borderRightColor = borderColors['r-'][0]
        }
        if(borderColors['t-'].length>1){
            styles.borderTopColor = ''
            setBorderMixColor('t-','borderTopColor')
        }
        else if(isValidColor(borderColors['t-'][0])){
            styles.borderTopColor = borderColors['t-'][0]
        }
        if(borderColors['b-'].length>1){
            styles.borderBottomColor = ''
            setBorderMixColor('b-','borderBottomColor')
        }
        else if(isValidColor(borderColors['b-'][0])){
            styles.borderBottomColor = borderColors['b-'][0]
        }

    }
    if(props.bd!==undefined){
        
        if(Array.isArray(props.bd)){
            setBdOptions(props.bd)
       
        }else if(typeof props.bd === 'string'){
            const arr = props.bd.split(' ')
            // console.log(arr);
            setBdOptions(arr)
            
        }
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