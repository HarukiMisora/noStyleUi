

import {  defineComponent , h, ref} from 'vue'
import { config } from '../config/config'
import colorValues from '../var/colorValues'
import {isImage, isValidColor} from '../test/index'
// import   './style/css.scss'



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

export function renderHelper(props:PropT,options:renderHelperOptionsT){

    const className:{[key:string]:Boolean} ={}
    const styles:{[key:string]:string|undefined} ={}
    const hoverStyles:{[key:string]:string|undefined} ={}
    const attributeGrop:(keyof Omit<typeof props,'flex'|'hover'>)[] = ['w','h','x','y','f','fw','p','px','py','pl','pt','pb','pr','m','mx','my','ml','mt','mb','mr','bc','c','radius']
    const attributeGropStyle: {[key in typeof attributeGrop[number]]:string} = {
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

        c:'color',
        bg:'background',
        bc:'background-color',
        bd:'border'
        
    }
    
    //
    for(const i  of attributeGrop){
        if(props[i] !== undefined){
            // console.log(props[i],i);
            if(props[i][0] ==='$'){
                styles[attributeGropStyle[i]] = props[i].slice(1)
            }else{
                className[`${i}-${props[i]}`] = true
                delete styles[attributeGropStyle[i]]
            }
        }
    }

    const bgColors:string[] = [];
    const setBgOptions = (arr:any[])=>{
        const size =['auto','auto']
            for(let i of arr){
                // console.log(i);
                
                
                if(!i){
                    continue
                }
                if(isImage(i)){
                    // console.log(props.bg);
                    styles.backgroundImage = `url("${i}")`
                    continue
                }
                if(['fill','contain','cover','cover','none'].includes(i)){
                    
                    className[`bs-${i}`] = true
                    continue
                }
                if('center' === i){
                    className['bp-center'] = true
                    continue
                }

                if(new RegExp('^.*(left|bottom|top|right|center)$').test(i)){
                    const options = i.split('-');
                    for(let d of options){
                        // console.log(d);
                        switch(d){
                            case 'left':className['bp-x-left']=true;break;
                            case 'right':className['bp-x-right']=true;break;
                            case 'top':className['bp-y-top']=true;break;
                            case 'bottom':className['bp-y-bottom']=true;break;
                            case 'center':className['bp-center']=true;break;
                        }
                        
                    }
                    continue
                }
                // console.log(i.slice(0,1));
            
                 

                if(i.slice(0,1)==='#'){
                    // console.log(i);
                    bgColors.push(i)
                    // console.log(bgColors[0]);
                    
                    if(bgColors.length>1){
                        const lastColor = styles.backgroundColor?styles.backgroundColor:bgColors[0]
                        className[`bc-${bgColors[0]}`] = false
                        className[`bc-${i}`] = false
                        styles.backgroundColor = `color-mix(in lch, ${lastColor}, ${i})`
                    }else{
                        styles.backgroundColor = i
                    }

                    continue
                }
                if(i.indexOf('-') === -1){
                    className[`bc-${i}`] = true
                    bgColors.push(i)
                    delete styles.background

                    if(bgColors.length>1){
                        className[`bc-${bgColors[0]}`] = false
                        className[`bc-${i}`] = false
                        
                        const lastColor = styles.backgroundColor?styles.backgroundColor:bgColors[0]
                        
                        styles.backgroundColor = `color-mix(in lch, ${lastColor}, ${i})`
                    }
                    // console.log(i);
                    
                    continue
                }
                
                
         


                
                const option = i.split('-')
                // console.log(option);
                let thisClass = ''
                const sizePix = option[1]?.indexOf('p')?(option[1]?.indexOf('v')?'px':`v${option[0]}`):'%'
                const sizeValue = sizePix === 'px'?option[1]:option[1]?.slice(1)

                switch(option[0]){
                    case 'w':size[0] = sizeValue + sizePix;break;
                    case 'h':size[1] = sizeValue + sizePix;break;
                    case 'c':className[`bc-${option?.[1]}`] = true;break;
                    case 's':className[`bs-${option?.[1]}`] = true;break;
                    case 'x':className[`bp-x-${option?.[1]}`] = true;break;
                    case 'y':className[`bp-y-${option?.[1]}`] = true;break;
                    case 'r':className[`bp-r-${option?.[1]}`] = true;break;
                    default:{
                        for(let i of option){
                            bgColors.push(i)
                            if(bgColors.length>1){
                                className[`bc-${bgColors[0]}`] = false
                                className[`bc-${i}`] = false
                                
                                const lastColor = styles.backgroundColor?styles.backgroundColor:bgColors[0]
                                
                                styles.backgroundColor = `color-mix(in lch, ${lastColor}, ${i})`
                            }
                        }

                        // thisClass = bgOptionActive[<keyof typeof bgOptionActive>option?.[0]]?.(option?.[1])
                    }break;
                }
                if(thisClass){
                    className[thisClass] = true
                }

                // console.log(size,styles);
                if(size[0]!=='auto'||size[1]!=='auto'){
                    styles.backgroundSize = `${size[0]} ${size[1]}`
                }
                

                // console.log(styles);
                
            }
            // console.log(bgColors);

    }
    
    if(props.bg!==undefined){
        // console.log(props.bg);
        
        if(Array.isArray(props.bg)){
            
            setBgOptions(props.bg)
        }else if(props.bg[0] ==='$'){
            styles.background = props.bg.slice(1)
        }else if(new RegExp('^.*.(jpg|png|gif|webp|avif|svg)$').test(props.bg)){
            // console.log(props.bg);
            styles.backgroundImage = `url("${props.bg}")`
        }
        else{
            const arr = props.bg.split(' ')
            if(arr.length>1){
                setBgOptions(arr)
            }else{
                className[`bg-${props.bg}`] = true
                delete styles.background
            }
 
        }
    }



    if(props.flex!==undefined){
        // console.log(props.flex);
        
        className.flex =  <string|boolean>props.flex !==false
        if(Array.isArray(props.flex)){
            for(let i of props.flex){
                // console.log(i);
                
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
    const setBorderMixColor = (direction:keyof typeof borderColors,styleName:string)=>{


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
        if(borderColors[''].length>1){
            setBorderMixColor('','borderColor')
        }
        if(borderColors['x-'].length>1){
            styles.borderLeftColor = ''
            styles.borderRightColor = ''
            setBorderMixColor('x-','borderLeftColor')
            setBorderMixColor('x-','borderRightColor')
        }
        else if(borderColors['x-']?.[0]?.slice(0,1) === '#'){
            styles.borderLeftColor = borderColors['x-'][0]
            styles.borderRightColor = borderColors['x-'][0]
        }
        if(borderColors['y-'].length>1){
            styles.borderTopColor = ''
            styles.borderBottomColor = ''
            setBorderMixColor('y-','borderTopColor')
            setBorderMixColor('y-','borderBottomColor')
        }
        else if(borderColors['y-']?.[0]?.slice(0,1) === '#'){
            styles.borderTopColor = borderColors['y-'][0]
            styles.borderBottomColor = borderColors['y-'][0]
        }
        if(borderColors['l-'].length>1){
            styles.borderLeftColor = ''
            setBorderMixColor('l-','borderLeftColor')
        }
        else if(borderColors['l-']?.[0]?.slice(0,1) === '#'){
            styles.borderLeftColor = borderColors['l-'][0]
        }
        if(borderColors['r-'].length>1){
            styles.borderRightColor = ''
            setBorderMixColor('r-','borderRightColor')
        }
        else if(borderColors['r-']?.[0]?.slice(0,1) === '#'){
            styles.borderRightColor = borderColors['r-'][0]
        }
        if(borderColors['t-'].length>1){
            styles.borderTopColor = ''
            setBorderMixColor('t-','borderTopColor')
        }
        else if(borderColors['t-']?.[0]?.slice(0,1) === '#'){
            styles.borderTopColor = borderColors['t-'][0]
        }
        if(borderColors['b-'].length>1){
            styles.borderBottomColor = ''
            setBorderMixColor('b-','borderBottomColor')
        }
        else if(borderColors['b-']?.[0]?.slice(0,1) === '#'){
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
        for(let com of arr){
            if(!com)continue

      
            
            if(isValidColor(com)||colorValues.includes(com)){
                
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
                            console.log(value);

                            hoverStyles.backgroundImage = `url("${value}")`
                            continue
                        }
                        if(['fill','contain','cover','cover','none'].includes(value)){
                            className[`hover-bs-${value}`] = true
                            continue
                        }
                        if(isValidColor(value)||colorValues.includes(value)){
                
                            if(lastBackgroundColor !==null){
                                className[`hover-bg-${lastBackgroundColor}`] = false
                                hoverStyles.backgroundColor = `color-mix(in lch, ${lastBackgroundColor}, ${value})`
                                lastBackgroundColor = hoverStyles.backgroundColor
                            }else{
                                className[`hover-bg-${value}`] = true
                                lastBackgroundColor = value
                            }
                            continue
                        }
                        if(['left','bottom','top','right','center'].includes(value)){
                            switch(value){
                                case 'left':className['hover-bp-x-left']=true;break;
                                case 'right':className['hover-bp-x-right']=true;break;
                                case 'top':className['hover-bp-y-top']=true;break;
                                case 'bottom':className['hover-bp-y-bottom']=true;break;
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
                            const backgroundSizeY = hoverStyles.backgroundSizeY||styles.backgroundSize?.split(' ')[1]||'auto'

                            hoverStyles.backgroundSize = `${backgroundSizeX} ${backgroundSizeY}`
                            hoverStyles.backgroundSizeX = backgroundSizeX
                            
                            continue
                        }
                        if((/^h:.*/).test(value)){
                            // console.log(value);
                            let trueValue = value.slice(2)

                            const sizePix = trueValue?.indexOf('p')?(trueValue?.indexOf('v')?'px':`v${trueValue}`):'%'
                            const sizeValue = sizePix === 'px'?trueValue:trueValue?.slice(1)

                            const backgroundSizeX = hoverStyles.backgroundSizeX||styles.backgroundSize?.split(' ')[0]||'auto'
                            const backgroundSizeY = trueValue==='auto'?trueValue:(sizeValue + sizePix) 

                            hoverStyles.backgroundSize = `${backgroundSizeX} ${backgroundSizeY}`
                            hoverStyles.backgroundSizeY = backgroundSizeY
                            continue

                        }
                        
                        
                    }
                    continue
                }


                
                continue
            }
            
        }
        
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