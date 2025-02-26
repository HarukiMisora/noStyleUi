


export const vUpdate = {


    updated:(el,binding,vNode)=> {
        vNode.ctx.props[binding.arg]=binding.value?.()

        
        
    },
    mounted:(el,binding,vNode)=> {
        vNode.ctx.props[binding.arg]=binding.value?.()
    }
}