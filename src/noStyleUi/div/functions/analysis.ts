
import { getPropDedupeConfig } from "../../config/config"
import { isColor, isImage, isValidColor, isValidPixelValue } from "../../test"
import colorValues from "../../var/colorValues"


//属性集分析
export function analysisProps(options:string[]|string,callback:Function,propName:string=''){
  // console.log(options);
  
  const arr = propRepeatRemove((typeof options === 'string'?options.split(' '):options),propName) 
  // console.log(arr);
  
  
  const arrLength = arr.length

  for(let i =0;i<arrLength;i++){
      const propAndValue = arr[i].split('-')
      for(let j=0;j<propAndValue.length;j++){
        if(propAndValue[j]===''){
          propAndValue.splice(j,1)
          propAndValue[j]='-'+propAndValue[j]
        }
        if(propAndValue[j]==='?'){
          propAndValue[j] =''
        }
      }
      callback(propAndValue)
  }

}

//像素值分析
export function analysisPxs(pxNumber:string|number,defalut:string|number='0',unit:string='px'):string|number{
  return !pxNumber?defalut:!Number.isNaN(Number(pxNumber))?pxNumber+unit:pxNumber.toString()
}

//颜色分析
export function analysisColor(color:string,validColor:Function,cssColor:Function){
  const colors = color.split('&')
  // console.log(color);
  
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



export const propRepeatRemove:(words:string[],propName:string)=>string[] = (words,propName)=>{
  // const words = str;
//   const last:{[key:string]:string} = words.reduce((acc, word) => {
//     const prefix = prefixes.find(p => word.startsWith(p));
//     return prefix ? {...acc, [prefix]: word} : acc;
// }, {});

// const seen = new Set();
// return words.filter(word => {
//     const prefix = prefixes.find(p => word.startsWith(p));
//     return !prefix || (word === last[prefix] && !seen.has(prefix) && seen.add(prefix));
// });
// words = ['1','2','3']

const {pre,test} = getPropDedupeConfig(propName)
  
const withPre = pre.map((p)=>{
  return (value:string)=>{
    return value.startsWith(p)
  }
})
const testes = [isColor,isValidPixelValue,isImage,...withPre,...test]
const res = dedupeByType(words,testes)
// for(let k of pre){
//   for( let i=0;i<res.length;i++){
//       if(res[i].startsWith(k)){
//         console.log(res[i].replace(k,'').split('-'),'鸡巴哦'); 
//         res[i] = dedupeByType(res[i].replace(k,'').split('-'),testes)
//       } 
//   }   
// }


// console.log({words,pre,res});   

return res




}


//依据类型去重
export function dedupeByType(values:string[], typeCheckers:((value:string)=>boolean)[]) {
    const lastValues = new Map(); // 存储每种类型最后出现的值
    
    // 初始化Map，以验证函数为key
    for (const checker of typeCheckers) {
        lastValues.set(checker, null);
    }
    
    // 遍历所有值
    for (const value of values) {
        // 检查值属于哪种类型
        for (const checker of typeCheckers) {
            if (checker(value)) {
                lastValues.set(checker, value);
                break; // 假设类型互斥，找到后就可以跳出循环
            }
        }
    }
    
    // 收集结果，过滤掉未被匹配的类型(null)
    const result = [];
    for (const [_checker, value] of lastValues) {
        if (value !== null) {
            result.push(value);
        }
    }
    
    return result;
}
