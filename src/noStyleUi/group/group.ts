import { config } from '../config/config'
import { defineComponent } from "vue";
import { camelToHyphen } from '../untils';


const groupProps = {
    ...config.props,
    ...config.groupProps
}as const
//合并命令集
// const matchArrAtt = (prop1:unknown,prop2:unknown)=>{
//     if(prop1==undefined&&prop2==undefined){
//         return undefined
//     }
//     return [...(Array.isArray(prop1)?prop1:[prop1]),...( Array.isArray(prop2)?prop2:[prop2] )]
// }


const matchArrAttToStr =<T = string|string[],U = undefined>(prop1:T,prop2:T):U|string=>{
    // console.log(prop1,prop2);
    
    if(prop1==void 0&&prop2==void 0){
        return void 0 as U
    }
    if(prop1===false&&prop2===false){
        return false as U
    }
    return (Array.isArray(prop1)?prop1.toString().replace(/,/g,' '):prop1!==void 0?prop1:'') + ' '
          +(Array.isArray(prop2)?prop2.toString().replace(/,/g,' '):prop2!==void 0?prop2:'')
}

export const group = defineComponent({
    props:groupProps,
    render(){
        // console.log(this.$props);
        
        const vNodes = this.$slots.default?.()
        const cusProps:any = {}
        this.$props.cusProps?.forEach((value:[string,string]) => {
            cusProps[value[0]] =value[1]
        });
        let TheHover = Array.isArray(this.$props.hover)?this.$props.hover.toString().replace(/,/g,' '):this.$props.hover
        
        if(Array.isArray(vNodes)){
            for(let i of vNodes){
                const bg =  matchArrAttToStr(<string|string[]>this.$props.bg,i.props?.bg)
                const bd =  matchArrAttToStr(<string|string[]>this.$props.bd,i.props?.bd)
                const flex =  matchArrAttToStr(<string|string[]>this.$props.flex,i.props?.flex||false)
                const hover = TheHover + ' '+ (Array.isArray(i.props?.hover)?i.props?.hover.toString().replace(/,/g,' '):i.props?.hover)
                // console.log(hover);
                // console.log(i.props);
                // console.log(i.props?.style);
                
                const styleString = Object.keys(i.props?.style||{}).map((item:string)=>`${camelToHyphen(item)}:${i.props?.style[item]}`).join(';')

                // console.log(this.$props.flex,i.props?.flex);
                
                i.props = {
                    ...this.$props,
                    ...cusProps,
                    ...i.props,
                    bg, 
                    bd,
                    flex:flex,
                    class:(i.props?.class||'') + ' '+(this.$props?._class||''),
                    style:styleString+';'+this.$props?._style,
                    hover,
                }
                delete i.props?.cusProps
                delete i.props?._class
                delete i.props?._style
            }
        }

        return vNodes
        
    }

    
})