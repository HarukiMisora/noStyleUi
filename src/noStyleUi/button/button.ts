import { defineComponent, h, ref } from 'vue'
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
            if (!props.disabled&&!props.loading) {
              const { onClick } = props
              if (onClick)onClick(e)
            }
        }

        let activeHover = ref(false)
        const mouseEnterFunction = ()=>{
            // console.log(props);
            
            if(!props.hover||props.disabled)return
            activeHover.value = true
        }
        const mouseOutFunction =()=>{
            if(!props.hover||props.disabled)return
            activeHover.value = false
        }





        return{
            handleClick,
            mouseEnterFunction,
            mouseOutFunction,
            activeHover
        }

        
    },
    render(){
        
        const {className,styles,hoverStyles} = renderHelper(<PropT>this.$props)

        if(this.$props.type !=='none'){
            className[buttonS.default] = true 
        }
        className[buttonS[this.$props.type]] = true 
        if(this.$props.abstract!=='default'){
            className[buttonS[this.$props.abstract]] = true 
        }
        if(this.$props.effect!=='box'){
            className[buttonS[this.$props.effect]] = true 
        }
        if(this.$props.disabled||this.$props.loading){
            className[buttonS.disabled] = true
        }
        if(this.$props.loading && this.$props.type !=='none'){
            className[buttonS.loading] = true
        }
        if(this.$props.size !=='default'){
            className[buttonS[`size-${this.$props.size}`]] = true
        }
        if(this.$props.round){
            className[buttonS.roundRadius] = true 
        }
        const loadingIcon = h('svg',{
            xmlns:'http://www.w3.org/2000/svg',
            'xmlns:xlink':'http://www.w3.org/1999/xlink',
            viewBox:"0 0 24 24",
            class:'w-button-loading',
            style:{
                width:16,
                marginRight:this.$props.abstract==='round'?0:5
            }
        },[
            h('g',{
                fill:'none',
                stroke:'currentColor',
                'stroke-width':'2',
                'stroke-linecap':'round',
                'stroke-linejoin':'round',
            },[
                h('path',{d:'M12 6V3'}),
                h('path',{d:'M6 12H3'}),
                h('path',{d:'M7.75 7.75L5.6 5.6'}),
            ])
        ])
        
        const icon = this.$props.loading && this.$props.type !=='none'?loadingIcon:this.$slots.icon?.()
        if(icon!==undefined&&!this.$props.loading){
            if(Array.isArray(icon)){
                icon[0].props = icon[0].props ||{}
                icon[0].props.style = icon[0]?.props?.style||{};
                icon[0].props.style.width =16
                icon[0].props.style.marginRight =5
            }
        }
        const styleAll = (()=>{
            return this.activeHover?{...styles,...hoverStyles}:styles
        })
        return h('button',{
            class:className,
            style:styleAll(),
            onClick:this.handleClick,
            onMouseenter:this.mouseEnterFunction,
            onMouseleave:this.mouseOutFunction
    
        },[
            icon,
            this.$props.loading&&this.$props.abstract==='round'?'':this.$slots.default?.()
        ])
    }
    
})
