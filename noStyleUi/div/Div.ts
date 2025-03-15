

import { defineComponent , h} from 'vue'
import { config } from '../config/config'
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



export function renderHelper(props:PropT){

    const className:{[key:string]:Boolean} ={}
    const styles:{[key:string]:string|undefined} ={}
    const attributeGrop:(keyof Omit<typeof props,'flex'>)[] = ['w','h','x','y','f','fw','p','px','py','pl','pt','pb','pr','m','mx','my','ml','mt','mb','mr','bc','c','radius']
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
                if(new RegExp('^.*.(jpg|png|gif|webp|avif|svg)$').test(i)){
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
            console.log(bgColors);

    }
    
    if(props.bg!==undefined){
        console.log(props.bg);
        
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
        className.flex =  <string|boolean>props.flex !==false
        if(Array.isArray(props.flex)){
            for(let i of props.flex){
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
            console.log(arr);
            setBdOptions(arr)
            
        }
    }

    // console.log(className,styles,borderColors);

    
    return {className,styles}





    

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
        setup(){


    
        },
        render(){
            const {className,styles} = renderHelper(<PropT>this.$props)
            return h(tag,{
                class:className,
                style:{
                    ...styles,
                },
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