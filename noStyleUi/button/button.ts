import { defineComponent, h } from 'vue'
import { config } from '../config/config'
import { renderHelper } from '../div/Div'


import buttonS from './style/index.module.scss'
import effectS from './style/effect.module.scss'
import abstractS from './style/abstract.module.scss'
// console.log(buttonS);

const buttonProps = {
    ...config.props,
    ...config.buttonProps
}as const

type PropT = {[key in keyof  typeof buttonProps]?:string}

export const button = defineComponent({
    name:`Wbutton`,
    props:buttonProps,
    setup(){
        
    },
    render(){
        

        const {className,styles} = renderHelper(<PropT>this.$props)

        if(this.$props.abstract!=='default'){
            className[abstractS[this.$props.abstract]] = true 
            className[abstractS[this.$props.type]] = true 
        }
        if(this.$props.type!==undefined){
            if(this.$props.type !=='none'){
                className[buttonS.default] = true 
            }
            className[buttonS[this.$props.type]] = true 
        }
        if(this.$props.effect!=='box'){
            className[effectS[this.$props.effect]] = true 
        }


        return h('button',{
            class:className,
            style:styles,
    
        },this.$slots.default?.())
    }
    
})
