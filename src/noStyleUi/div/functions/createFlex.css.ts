import { analysisProps } from "./analysis"


const actions:{[key:string]:Function} = {

  row:({setClassName,value}:classNameWithValuesT)=>{
    setClassName("flex-row",false)
    setClassName("flex-col",false)
    setClassName("flex-col-r",false)
    setClassName("flex-row-r",false)
    setClassName(value.includes('r')?'flex-row-r':'flex-row',true)
  },
  col:({setClassName,value}:classNameWithValuesT)=>{
    setClassName("flex-row",false)
    setClassName("flex-col",false)
    setClassName("flex-col-r",false)
    setClassName("flex-row-r",false)
    setClassName(value.includes('r')?'flex-col-r':'flex-col',true)
  },
  wrap:({setClassName}:classNameWithValuesT)=>{
    setClassName('flex-nowrap',false)
    setClassName(`flex-wrap`,true)
  },
  nowrap:({setClassName}:classNameWithValuesT)=>{
    setClassName('flex-wrap',false)
    setClassName(`flex-nowrap`,true)
  },
  center:({setClassName}:classNameWithValuesT)=>{
    setClassName(`flex-center`,true)
  },
  j:({setClassName,value}:classNameWithValuesT)=>{
    setClassName('justify-start',false)
    setClassName('justify-end',false)
    setClassName('justify-center',false)
    setClassName('justify-between',false)
    setClassName('justify-evenly',false)
    setClassName(`justify-${value[1]}`,true)
  },
  i:({setClassName,value}:classNameWithValuesT)=>{
    setClassName('items-start',false)
    setClassName('items-end',false)
    setClassName('items-center',false)
    setClassName('items-stretch',false)
    setClassName('items-baseline',false)
    setClassName(`items-${value[1]}`,true)
  },
  g:({setClassName,value}:classNameWithValuesT)=>{
    setClassName(`g-${value[1]}`,true)
  },
  item:({setClassName}:classNameWithValuesT)=>{
    setClassName('flex',false)
  },
  flex:({setClassName}:classNameWithValuesT)=>{
    setClassName('flex',true)
  },
  1:({setClassName}:classNameWithValuesT)=>{
    setClassName(`flex-1`,true)
  }
}




export function creatFlexCss(options:string,setClassName:setClassNameT,setStyle:setStyleT){
    setClassName('flex',true)
    
    analysisProps(options,(propAndValue:string[])=>{
      actions[propAndValue[0]]?.({setClassName,setStyle,value:propAndValue})
    })
}
