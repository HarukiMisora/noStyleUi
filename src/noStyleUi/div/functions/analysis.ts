
import { isValidColor } from "../../test"
import colorValues from "../../var/colorValues"


//属性集分析
export function analysisProps(options:string[]|string,callback:Function){
  const arr = typeof options === 'string'?options.split(' '):options
  const arrLength = arr.length

  for(let i =0;i<arrLength;i++){
      const propAndValue = arr[i].split('-')
      callback(propAndValue)
  }

}

//像素值分析
export function analysisPxs(pxNumber:string,defalut:string='0',unit:string='px'){
  return !pxNumber?defalut:!Number.isNaN(Number(pxNumber))?pxNumber+unit:pxNumber
}

//颜色分析
export function analysisColor(color:string,validColor:Function,cssColor:Function){
  const colors = color.split('&')
  // console.log(colors);

  if(colors.length>1||colors[0].includes('+')){
    validColor(setNestedMixColor(colors))
    return true
  }
  if(isValidColor(color)){
    validColor(color)
    return true
  }
  if(colorValues.includes(color)){
    cssColor(color)
    return true
  }
  return false
}
//颜色混合
export const setMixColor = (colors:string[])=>{
  if(!isValidColor(colors[0])&&!colorValues.includes(colors[0])){
      return console.error(colors[0] + '不是一个合法颜色')
  }
  let lastColor = colors[0]
  let mixColor =''
  const l = colors.length
  for(let i=1;i<l;i++){
      if(!isValidColor(colors[i])&&!colorValues.includes(colors[i])){
          console.warn(colors[i],'不是一个合法颜色')
          continue
      }
      mixColor= `color-mix(in lch, ${lastColor}, ${colors[i]})`
      lastColor=mixColor
  }
  // console.log(lastColor,mixColor);
  return l>2?mixColor:lastColor
  
}
//颜色嵌套混合
export const setNestedMixColor = (mixColors:string[])=>{
  
  let lastMixColor = setMixColor(mixColors[0].split('+'))
  let finalColor =''
  const l = mixColors.length
  for(let i=1;i<l;i++){
    finalColor = `color-mix(in lch, ${lastMixColor}, ${setMixColor(mixColors[i].split('+'))})`
    lastMixColor = finalColor
  }
  return l>2?finalColor:lastMixColor

  // let mixColor =''
}
