
import type { setClassNameT, setStyleT, styleWithValuesT } from "../../interface/css";
import { analysisColor } from "./analysis";
import { createBdCss } from "./createBd.css";
import createBgCss from "./createBg.css";



const actions:{[key:string]:Function} = {

  bg:({value,setClassName,setStyle}:{value:string[],setClassName:setClassNameT,setStyle:setStyleT})=>{
    const prop = value[1].split(';')
    createBgCss(prop,setClassName,setStyle)
  },
  c:({value,setStyle}:styleWithValuesT)=>{
    
    analysisColor(value[1],(color:string)=>{

      setStyle('color',color)
    },(color:string)=>{
      
      setStyle('color',color)
    })

  },
  bd:({value,setClassName,setStyle}:{value:string[],setClassName:setClassNameT,setStyle:setStyleT})=>{
    
    const prop = value[1].split(';')
    createBdCss(prop,setClassName,setStyle)
  },


}




export function createHoverCss(options:string[]|string,setClassName:setClassNameT,setStyle:setStyleT){


  const arr = mergeUniqueItems(Array.isArray(options)?options:options.split(' '))
  // console.log({arr});

  for(let com of arr){ 
    // console.log(com);
    const option = com.split('=')
    // console.log(option);
    
    actions[option[0]]?.({value:option,setClassName,setStyle})
    
  }

}
//合并
function mergeUniqueItems(arr:string[]) {
    const map = new Map();
    
    for (const item of arr) {
        const [key, values] = item.split('=');
        if (!map.has(key)) {
            map.set(key, new Set());
        }
        
        const valueParts = values.split(';').filter(Boolean);
        const existingSet = map.get(key);
        
        for (const part of valueParts) {
            existingSet.add(part);
        }
    }
    
    const result = [];
    for (const [key, valueSet] of map) {
        const mergedValues = Array.from(valueSet).join(';');
        result.push(`${key}=${mergedValues}`);
    }
    
    return result;
}