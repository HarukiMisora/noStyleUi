import { defineComponent, h } from 'vue'
import { config } from '../config/config'
import { renderHelper } from '../div/Div'


import buttonS from './style/index.module.scss'
import effectS from './style/effect.module.scss'

const buttonProps = {
    ...config.props,
    ...config.buttonProps
}as const

type PropT = {[key in keyof  typeof buttonProps]?:string}

export const button = defineComponent({
    name:`Wbutton`,
    props:buttonProps,
    setup(props){
        // console.log(buttonS);
        // console.log(props);
        
    },
    render(){
        // console.log(this.$slots.default());
        

        const {className,styles} = renderHelper(<PropT>this.$props)

        if(this.$props.type!==undefined){
            if(this.$props.type !=='none'){
                className[buttonS.default] = true 
            }
            className[buttonS[this.$props.type]] = true 
        }
        if(this.$props.effect!=='box'){
            // console.log(this.$props.effect);
            
            className[effectS[this.$props.effect]] = true 
            
        }

        // console.log(className);
        
        return h('button',{
            class:className,
            style:styles,
            // class:this.className,
            // style:this.styles
    
        },this.$slots.default?.())
        return h('div',{
            style:{
                display:'inline-flex'
            }
            // class:this.className,
            // style:this.styles
    
        },h('button',{
            class:className,
            style:styles,
        },this.$slots.default?.()))
    }
    
})
