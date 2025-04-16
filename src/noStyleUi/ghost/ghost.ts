import { defineComponent, h, ref } from 'vue'
import { config } from '../config/config'
import { renderHelper } from '../div/Div'



const GhostProps = {
    ...config.props,
    ...config.ghostProps
}as const

type PropT = {[key in keyof  typeof config.props]?:string}
export const ghost = defineComponent({
    name:`WGhost`,
    props:GhostProps,
    setup(props){
      
      let activeHover = ref(false)
      const mouseEnterFunction = ()=>{
          // console.log(props);
          
          if(!props.hover)return
          activeHover.value = true
      }
      const mouseOutFunction =()=>{
          if(!props.hover)return
          activeHover.value = false
      }

      return {
          mouseEnterFunction,
          mouseOutFunction,
          activeHover
      }

      
      

        

        
    },
    render(){
      const {className,styles,hoverStyles} = renderHelper(<PropT>this.$props)
      // console.log(this.activeHover);
      
      const styleAll = (()=>{
          return this.activeHover?{...styles,...hoverStyles}:styles
      })
      //临时处理仅bool类型的ghost，后续优化
      const flag = this.$props.ghost
      if(flag === true)return this.$slots.default?.()

      return h('div',{
          class:className,
          style:{
              ...styleAll(),
              // ...this.styles
          },
          onMouseenter:this.mouseEnterFunction,
          onmouseleave:this.mouseOutFunction
          // class:this.className,
          // style:this.styles
  
      },this.$slots.default?.())
    }
    
})
