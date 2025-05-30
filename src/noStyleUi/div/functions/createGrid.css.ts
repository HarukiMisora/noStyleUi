import { analysisProps, analysisPxs } from "./analysis"
import type { setClassNameT, setStyleT, styleWithValuesT, classNameWithValuesT } from "../../interface/css.ts"


const actions:{[key:string]:Function} = {
  col:({setStyle,value}:styleWithValuesT)=>{
    // console.log(value);
    
    const col = value[1]&&value[1]!== 'auto'?value[1]:'auto-fit'
    const w = analysisPxs(value[2],'auto')
    const maxW = value[3]==='w'?value[2]:analysisPxs(value[3],'1fr')
    // console.log(col,w,maxW);
    
    setStyle("gridTemplateColumns",`repeat(${col},minmax(${w},${maxW}))`)
  },
  row:({setStyle,value}:styleWithValuesT)=>{
    const row = value[1]&&value[1]!== 'auto'?value[1]:'auto-fit'
    const h = analysisPxs(value[2],'auto')
    const maxH = value[3]==='h'?value[2]:analysisPxs(value[3],'1fr')
    if(row === 'auto-fit'){
      setStyle("gridAutoRows",`minmax(${h},${maxH})`)
    }else{
      setStyle("gridTemplateRows",`repeat(${row},minmax(${h},${maxH}))`)
    }
  },
  g:({setClassName,value}:classNameWithValuesT)=>{
    // console.log(setClassName);
    setClassName(`g-${value[1]}`,true)
  },
  //如果是子元素，则不设置grid属性
  item:({setClassName,value}:classNameWithValuesT)=>{
    
    setClassName('grid',value?.[1] ==='grid'?true:false)
  },
  gcol:({setStyle,value}:styleWithValuesT)=>{
    const colStart = value[1]||'1'
    const colEnd = value[2]||'1'
    setStyle("gridColumn",`${colStart}/${colEnd}`)
  },
  grow:({setStyle,value}:styleWithValuesT)=>{
    const rowStart = value[1]||'1'
    const rowEnd = value[2]||'1'
    setStyle("gridRow",`${rowStart}/${rowEnd}`)
  },
}

export default function (options:string[]|string|boolean,setClassName:setClassNameT,setStyle:setStyleT){
  setClassName('grid',true)
  if(typeof options !== 'boolean'){
    analysisProps(options,(propAndValue:string[])=>{
      actions[propAndValue[0]]?.({setClassName,setStyle,value:propAndValue})
    })
  }

}
