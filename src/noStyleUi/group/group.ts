import { config } from '../config/config'
import { defineComponent } from "vue";


const groupProps = {
    ...config.props,
    ...config.groupProps
}as const
//合并命令集
const matchArrAtt = (prop1:unknown,prop2:unknown)=>{
    if(prop1==undefined&&prop2==undefined){
        return undefined
    }
    return [...(Array.isArray(prop1)?prop1:[prop1]),...( Array.isArray(prop2)?prop2:[prop2] )]
}


const matchArrAttToStr =(prop1?:string|string[],prop2?:string|string[])=>{
    if(prop1==void 0&&prop2==void 0){
        return void 0
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
                const flex =  matchArrAttToStr(<string|string[]>this.$props.flex,i.props?.flex)
                const hover = TheHover + ' '+ (Array.isArray(i.props?.hover)?i.props?.hover.toString().replace(/,/g,' '):i.props?.hover)
                // console.log(hover);
                
                
                
                i.props = {
                    ...this.$props,
                    ...cusProps,
                    ...i.props,
                    bg,
                    bd,
                    flex:flex,
                    // flex:flex?.length?flex:undefined,
                    hover

                }
            }
        }

        return vNodes
        
    }

    
})