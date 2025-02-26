import { config } from '../config/config'
import { defineComponent, render } from "vue";


const groupProps = {
    ...config.props,
    ...config.groupProps
}as const
//合并命令集
const matchArrAtt = (prop1:unknown,prop2:unknown)=>{
    return [...(Array.isArray(prop1)?prop1:[prop1]),...( Array.isArray(prop2)?prop2:[prop2] )]
}

export const group = defineComponent({
    props:groupProps,
    render(){
        console.log(this.$props);
        
        const vNodes = this.$slots.default?.()
        const cusProps:any = {}
        this.$props.cusProps?.forEach(value => {
            cusProps[value[0]] =value[1]
        });
        
        if(Array.isArray(vNodes)){
            for(let i of vNodes){
                const bg = matchArrAtt(this.$props?.bg,i.props?.bg)
                const flex = matchArrAtt(this.$props?.flex,i.props?.flex).filter((item)=>{return item!==false&&item!==undefined})                
                i.props = {
                    ...this.$props,
                    ...cusProps,
                    ...i.props,
                    bg,
                    flex,

                }
            }
        }

        return vNodes
        
    }

    
})