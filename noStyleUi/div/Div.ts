

import {computed, defineComponent , h, ref, watch, watchEffect, type PropType} from 'vue'
import { config } from '../config/config'
// import   './style/css.scss'



const styleProps = {
    ...config.props,
}as const

type PropT = {[key in keyof typeof styleProps]?:string}

const flexOptionActive = {
    col:(value:string)=>'flex-col',
    row:(value:string)=>'flex-row',
    'col-r':(value:string)=>'flex-col-r',
    'row-r':(value:string)=>'flex-row-r',
    inh:(value:string)=>'flex-inh',
    ini:(value:string)=>'flex-ini',
    un:(value:string)=>'flex-un',
    g:(value:string)=>`g-${value}`,
    wrap:(value:string)=>`flex-wrap`,
    nowrap:(value:string)=>`flex-nowrap`,
    1:()=>'flex-1',
    undefined:()=>''
}


export function renderHelper(props:PropT){

    const className:{[key:string]:Boolean} ={}
    const styles:{[key:string]:string|undefined} ={}
    const attributeGrop:(keyof Omit<typeof props,'flex'>)[] = ['w','h','x','y','p','px','py','pl','pt','pb','pr','m','mx','my','ml','mt','mb','mr','bc','c']
    const attributeGropStyle: {[key in typeof attributeGrop[number]]:string} = {
        w:'width',
        h:'height',
        x:'x',
        y:'y',
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
    const flexGrup = {
        col:{
            type:'flex-direction',
            value:'column'
        },
        row:{
            type:'flex-direction',
            value:'row'
        },
        'col-r':{
            type:'flex-direction',
            value:'column-reverse'
        },
        'row-r':{
            type:'flex-direction',
            value:'row-reverse'
        },
        inh:{
            type:'flex-direction',
            value:'inherit'
        },
        ini:{
            type:'flex-direction',
            value:'initial'
        },
        un:{
            type:'flex-direction',
            value:'unset' 
        }
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
        // const type = props.bg.split('.')[1]
        // console.log(type);
        if(props.bg[0] ==='$'){
            styles.background = props.bg.slice(1)
        }else if(new RegExp('^.*.(jpg|png|gif)$').test(props.bg)){
            // console.log(props.bg);
            styles.background = `url("${props.bg}")`
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
                console.log(option);
                const thisClass = flexOptionActive[<keyof typeof flexOptionActive>option?.[0]]?.(option?.[1])
                if(thisClass){
                    className[thisClass] = true

                }
                
            }

        }else{

            const option = props?.flex?.split?.('-') ||''
            console.log(option);
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
        setup(props){
            
    
        },
        render(){
            const {className,styles} = renderHelper(<PropT>this.$props)
            return h(tag,{
                class:className,
                style:styles,
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