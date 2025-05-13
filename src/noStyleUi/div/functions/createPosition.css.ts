import type { createCssFuncT,setStyleT, styleWithValuesT } from "../../interface/css";
import { analysisProps,analysisPxs } from "./analysis";


const createPositionCss:createCssFuncT = (options,setClassName,setStyle)=>{
  console.log(options)
  analysisProps(options,(propAndValue:string[])=>{
    actions[propAndValue[0]]?.({setClassName,setStyle,value:propAndValue})
  })
}


const actions:{[key:string]:Function} = {
  l:({setStyle,value}:styleWithValuesT)=>{
    setStyle('left',analysisPxs(value[1],0))
  },
  r:({setStyle,value}:styleWithValuesT)=>{
    setStyle('right',analysisPxs(value[1],0))
  },
  t:({setStyle,value}:styleWithValuesT)=>{
    setStyle('top',analysisPxs(value[1],0))
  },
  b:({setStyle,value}:styleWithValuesT)=>{
    setStyle('bottom',analysisPxs(value[1],0))
  },
  rel:({setStyle}:{setStyle:setStyleT})=>{
    setStyle('position','relative')
  },
  abs:({setStyle}:{setStyle:setStyleT})=>{
    setStyle('position','absolute')
  },
  fixed:({setStyle}:{setStyle:setStyleT})=>{
    setStyle('position','fixed')
  }
}

export { createPositionCss as default }