

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
const bgOptionActive = {
   c:(value:string)=>`bc-${value}`,
   s:(value:string)=>`bs-${value}`,
   x:(value:string)=>`bp-x-${value}`,
   y:(value:string)=>`bp-y-${value}`,
   r:(value:string)=>`bp-r-${value}`,
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

    if(props.bg!==undefined){
        if(Array.isArray(props.bg)){
            const size =['auto','auto']
            for(let i of props.bg){
                if(i ===undefined){
                    continue
                }
                if(new RegExp('^.*.(jpg|png|gif)$').test(i)){
                    // console.log(props.bg);
                    styles.backgroundImage = `url("${i}")`
                    continue
                }else if(i.indexOf('-') === -1){
                    className[`bc-${i}`] = true
                    delete styles.background
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
                    default:{
                        thisClass = bgOptionActive[<keyof typeof bgOptionActive>option?.[0]]?.(option?.[1])
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
        }else if(props.bg[0] ==='$'){
            styles.background = props.bg.slice(1)
        }else if(new RegExp('^.*.(jpg|png|gif)$').test(props.bg)){
            console.log(props.bg);
            styles.backgroundImage = `url("${props.bg}")`
        }
        else{
            className[`bg-${props.bg}`] = true
            delete styles.background
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

    // console.log(className,styles);
    
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

export  {div,span}

// export default Div