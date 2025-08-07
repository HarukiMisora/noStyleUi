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
    name: 'WGroup',
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
                const grid =  matchArrAttToStr(<string|string[]>this.$props.grid,i.props?.grid||false)
                const hover = (TheHover||'') + ' '+ ((Array.isArray(i.props?.hover)?i.props?.hover.toString().replace(/,/g,' '):i.props?.hover)||'')
                // console.log(hover);
                // console.log(i.props,i,i.type.name);
                // console.log(i.props?.style);
                //ts-ignore
                const isGroup = (i.type as { name?: string })?.name === 'WGroup'
                const styleString = this.$props?._style+';'+(isGroup?i.props?._style:Object.keys(i.props?.style||{}).map((item:string)=>`${camelToHyphen(item)}:${i.props?.style[item]}`).join(';'))
                const classString = ((isGroup?i.props?._class:i.props?.class)||'') + ' '+(this.$props?._class||'')
                // console.log(this.$props,i.props);
                
                i.props = {
                    ...this.$props,
                    ...cusProps,
                    ...i.props,
                    bg, 
                    bd,
                    flex:flex||void 0,
                    grid:grid||void 0,
                    class:classString,
                    _class:classString,
                    style:styleString,
                    _style:styleString,
                    hover:hover === ' '?void 0:hover,
                }
                // console.log(i.transition);
                
                // if(!i.transition){
                //     delete i.props?.transition
                // }
                delete i.props?.cusProps
                if(!isGroup){
                    delete i.props?._class
                    delete i.props?._style
                }else{
                    delete i.props?.class
                    delete i.props?.style
                    // console.log(i.props,'卧槽');
                }
                
  
            }
        }

        return vNodes
        
    }

    
})