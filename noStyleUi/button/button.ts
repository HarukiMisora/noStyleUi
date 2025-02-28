import { defineComponent, h } from 'vue'
import { config } from '../config/config'
import { renderHelper } from '../div/Div'


import buttonS from './style/index.module.scss'
// console.log(buttonS);

const buttonProps = {
    ...config.props,
    ...config.buttonProps
}as const

type PropT = {[key in keyof  typeof config.props]?:string}

export const button = defineComponent({
    name:`Wbutton`,
    props:buttonProps,
    setup(props){
        const handleClick = (e: MouseEvent): void => {
            if (!props.disabled) {
              const { onClick } = props
              if (onClick)onClick(e)
            }
        }
        return{
            handleClick
        }
        
    },
    render(){
        
        const {className,styles} = renderHelper(<PropT>this.$props)


        if(this.$props.type!==undefined){
            if(this.$props.type !=='none'){
                className[buttonS.default] = true 
            }
            className[buttonS[this.$props.type]] = true 
        }
        if(this.$props.abstract!=='default'){
            className[buttonS[this.$props.abstract]] = true 
        }
        if(this.$props.effect!=='box'){
            className[buttonS[this.$props.effect]] = true 
        }
        if(this.$props.disabled){
            className[buttonS.disabled] = true
        }



        return h('button',{
            class:className,
            style:styles,
            onClick:this.handleClick
    
        },this.$slots.default?.())
    }
    
})
