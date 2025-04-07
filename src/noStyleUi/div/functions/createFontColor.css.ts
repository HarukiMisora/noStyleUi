
import { analysisColor } from "./analysis"






export function createFontColorCss(options:string,setClassName:setClassNameT,setStyle:setStyleT){
  let lastItem:string = '' //这个lastItem是记录上一个设置的类名，用来清除上一个设置的类名
  analysisColor(options,(color:string)=>{
    setStyle('color',color)
  },(className:string)=>{
    setClassName(lastItem,false)
    setClassName(`c-${options}`,true)
    lastItem = className
  })

}