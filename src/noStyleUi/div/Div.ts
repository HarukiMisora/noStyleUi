

import {  defineComponent , h, ref} from 'vue'
import { config } from '../config/config'
import colorValues from '../var/colorValues'
import {isImage, isValidColor} from '../test/index'
// import   './style/css.scss'
import createteGridCss from './functions/createGrid.css'
import createBgCss from './functions/createBg.css'


const styleProps = {
    ...config.props,
}as const

type PropT = {[key in keyof typeof styleProps]?:string}

const flexOptionActive = {
    col:()=>'flex-col',
    row:()=>'flex-row',
    'col-r':()=>'flex-col-r',
    'row-r':()=>'flex-row-r',
    inh:()=>'flex-inh',
    ini:()=>'flex-ini',
    un:()=>'flex-un',
    g:(value:string)=>`g-${value}`,
    wrap:()=>`flex-wrap`,
    nowrap:()=>`flex-nowrap`,
    center:()=>'flex-center',
    i:(value:string)=>`items-${value}`,
    j:(value:string)=>`justify-${value}`,
    1:()=>'flex-1',
    undefined:()=>''
}


interface renderHelperOptionsT {
    disabled?:boolean
}
//颜色混合
const setMixColor =(colors:string[])=>{
    if(!isValidColor(colors[0])&&!colorValues.includes(colors[0])){
        console.error(colors[0],'不是一个合法颜色')
        return ''
    }else{
        let lastColor = colors[0]
        let mixColor =''
        const l = colors.length
        let e = 0
        for(let i=1;i<l;i++){
            if(!isValidColor(colors[i])&&!colorValues.includes(colors[i])){
                console.warn(colors[i],'不是一个合法颜色')
                e += 1;
                continue
            }
            mixColor= `color-mix(in lch, ${lastColor}, ${colors[i]})`
            lastColor=mixColor
        }
        // console.log(lastColor,mixColor);
        
        return l-e>1?mixColor:lastColor
    }
}
//遍历属性集合
// const mapProps =(values:string[],call:(value:string)=>void) =>{
//     let l = values.length
//     for(let i=0;i<l;i++){
//         call(values[i])
//     }
    
// }


export function renderHelper(props:PropT,options:renderHelperOptionsT){

    const className:{[key:string]:Boolean} ={}
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
    //
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
        if(props.c.includes('-')){
            styles.color = setMixColor(props.c.split('-'))
        }else if(isValidColor(props.c)){
            styles.color = props.c
        }else{
            className[`c-${props.c}`] = true
        }
    }

    

    //bg属性集
    if(props.bg !== void 0){
        createBgCss(props.bg,setClassName,setStyle)
    }

    if(props.flex!==undefined){
        // console.log(props.flex);
        
        className.flex =  <string|boolean>props.flex !==false
        if(Array.isArray(props.flex)){
            for(let i of props.flex){
                // console.log(i);
                if(['row-r','col-r'].includes(i)){
                    className[flexOptionActive[<keyof typeof flexOptionActive>i]?.(i)] = true
                    continue
                }
                
                const option = i.split('-')
                // console.log(option);
                const thisClass = flexOptionActive[<keyof typeof flexOptionActive>option?.[0]]?.(option?.[1])
                if(thisClass){
                    className[thisClass] = true
                }
            }

        }else{

            const option = props?.flex?.split?.('-') ||''
            // console.log(option);
            const thisClass = flexOptionActive[<keyof typeof flexOptionActive>option?.[0]]?.(option?.[1])
            if(thisClass){
                className[thisClass] = true
            }
            // className['flex-'+<string>props.flex] = flexGrup[<keyof typeof flexGrup>props.flex]!==undefined
        }
        
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

    if(props.hover !== undefined&&!options.disabled) {
        const arr = Array.isArray(props.hover)?props.hover:props.hover.split(' ')
        let lastColor = null
        let lastBackgroundColor = null
        // console.log(arr);
        for(let com of arr){
            if(!com)continue
            // console.log(com);
            
            if(isValidColor(com)){
                if(lastColor !==null){
                    className[`hover-c-${lastColor}`] = false
                    hoverStyles.color = `color-mix(in lch, ${lastColor}, ${com})`
                    lastColor = hoverStyles.color
                }else{
                    hoverStyles.color = com
                    lastColor = com
                }
                continue
            }
            if(colorValues.includes(com)){
                if(lastColor !==null){
                    className[`hover-c-${lastColor}`] = false
                    hoverStyles.color = `color-mix(in lch, ${lastColor}, ${com})`
                    lastColor = hoverStyles.color
                }else{
                    className[`hover-c-${com}`] = true
                    lastColor = com
                }
                continue
            }
            if(isImage(com)){
                hoverStyles.backgroundImage = `url("${com}")`
                continue
            }
            if(com.indexOf('-')){
                const prop = com.split('-')
                const propName = prop[0]
                const propCount = prop.length - 1
                // console.log(prop);
                
                if(propName === 'bg'){
                    for(let i =1;i<=propCount;i++){
                        const value = prop[i]
                        
                        if(isImage(value)){
                            // console.log(value);
                            hoverStyles.backgroundImage = `url("${value}")`
                            continue
                        }
                        if(['fill','contain','cover','none'].includes(value)){
                            className[`hover-bs-${value}`] = true
                            continue
                        }
                        if(isValidColor(value)||colorValues.includes(value)){
                            // console.log(value,lastBackgroundColor);
                
                            if(lastBackgroundColor !==null){
                                className[`hover-bg-${lastBackgroundColor}`] = false
                                hoverStyles.backgroundColor = `color-mix(in lch, ${lastBackgroundColor}, ${value})`
                                lastBackgroundColor = hoverStyles.backgroundColor
                            }else{
                                className[`hover-bg-${value}`] = false
                                hoverStyles.backgroundColor = value
                                lastBackgroundColor = value
                            }
                            continue
                        }
                        if(['left','bottom','top','right','center'].includes(value)){
                            switch(value){
                                case 'left':className['hover-bp-x-left']=true;className['hover-bp-x-right']=false;break;
                                case 'right':className['hover-bp-x-right']=true;className['hover-bp-x-left']=false;break;
                                case 'top':className['hover-bp-y-top']=true;className['hover-bp-x-bottom']=false;break;
                                case 'bottom':className['hover-bp-y-bottom']=true;className['hover-bp-x-top']=false;break;
                                case 'center':className['hover-bp-center']=true;break;
                            }
                            continue
                        }
                        if((/^w:.*/).test(value)){
                            // console.log(value);
                            let trueValue = value.slice(2)
                            const sizePix = trueValue?.indexOf('p')?(trueValue?.indexOf('v')?'px':`v${trueValue}`):'%'
                            const sizeValue = sizePix === 'px'?trueValue:trueValue?.slice(1)

                            const backgroundSizeX = trueValue==='auto'?trueValue:(sizeValue + sizePix) 
                            const backgroundSizeY = styles.backgroundSize?.split(' ')[1]||'auto'

                            hoverStyles.backgroundSize = `${backgroundSizeX} ${backgroundSizeY}`
                            // hoverStyles.backgroundSizeX = backgroundSizeX
                            
                            continue
                        }
                        if((/^h:.*/).test(value)){
                            // console.log(value);
                            let trueValue = value.slice(2)

                            const sizePix = trueValue?.indexOf('p')?(trueValue?.indexOf('v')?'px':`v${trueValue}`):'%'
                            const sizeValue = sizePix === 'px'?trueValue:trueValue?.slice(1)

                            const backgroundSizeX = styles.backgroundSize?.split(' ')[0]||'auto'
                            const backgroundSizeY = trueValue==='auto'?trueValue:(sizeValue + sizePix) 

                            hoverStyles.backgroundSize = `${backgroundSizeX} ${backgroundSizeY}`
                            // hoverStyles.backgroundSizeY = backgroundSizeY
                            continue
                        }
                        if((/^x:.*/).test(value)){
                            // console.log(value);
                            let trueValue = value.slice(2)
                            const sizePix = trueValue?.indexOf('p')?(trueValue?.indexOf('v')?'px':`v${trueValue}`):'%'
                            const sizeValue = sizePix === 'px'?trueValue:trueValue?.slice(1)

                            const backgroundPositionX = (sizeValue + sizePix) 
                            hoverStyles.backgroundPositionX = backgroundPositionX
                            
                            continue
                        }
                        if((/^y:.*/).test(value)){
                            // console.log(value);
                            let trueValue = value.slice(2)
                            const sizePix = trueValue?.indexOf('p')?(trueValue?.indexOf('v')?'px':`v${trueValue}`):'%'
                            const sizeValue = sizePix === 'px'?trueValue:trueValue?.slice(1)

                            const backgroundPositionY = (sizeValue + sizePix) 
                            hoverStyles.backgroundPositionY = backgroundPositionY
                            continue
                        }
                        
                        
                    }
                    continue
                }


                
                continue
            }
            
        }
        // console.log(hoverStyles);
        
    }
    

    // console.log(styles);

    // console.log(className,styles,hoverStyles);

    
    return {className,styles,hoverStyles}





    

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