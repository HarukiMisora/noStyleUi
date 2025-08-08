
import { attributeGrop } from "../../config/config";
import type { Pxs, setClassNameT, setStyleT, styleWithValuesT } from "../../interface/css";
import { analysisColor } from "./analysis";
import { createBdCss } from "./createBd.css";
import createBgCss from "./createBg.css";
import createPixCss from "./createPix.css";



const actions:{[key:string]:Function} = {

  bg:({value,setClassName,setStyle}:{value:string[],setClassName:setClassNameT,setStyle:setStyleT})=>{
    const prop = value[1].split(';')
    // console.log(prop);
    
    createBgCss(prop,setClassName,setStyle)
  },
  c:({value,setStyle}:styleWithValuesT)=>{
    const colors = value[1].split(';')
    
    analysisColor(colors[colors.length-1],(color:string)=>{

      setStyle('color',color)
    },(color:string)=>{
      
      setStyle('color',color)
    })

  },
  bd:({value,setClassName,setStyle}:{value:string[],setClassName:setClassNameT,setStyle:setStyleT})=>{
    // console.log(value);
    
    const prop = value[1].split(';')
    createBdCss(prop,setClassName,setStyle)
  },


}




export function createHoverCss(options:string[]|string,setClassName:setClassNameT,setStyle:setStyleT){

  // console.log(options.split(' '));
  
  const arr = mergeUniqueItems(Array.isArray(options)?options:options.split(' '))
  // console.log({arr});

  for(let com of arr){ 
    // console.log(com);
    const option = com.split('=')
    const prop =option[0]
    if(attributeGrop.includes(<keyof Pxs>prop)){
    
      createPixCss(prop,option[1],setClassName,setStyle)
    }



    
    actions[prop]?.({value:option,setClassName,setStyle})
    
  }

}
//合并
function mergeUniqueItems(arr:string[]) {
    // console.log({arr});
    
    const map = new Map();
    
    for (const item of arr) {
        const [key, values] = item.split('=');
        // console.log({key,values});
        
        if (!map.has(key)&&values!==void 0) {
            map.set(key, new Set());
        }
        if (values!==void 0) {
          const valueParts = values.split(';').filter(Boolean);

          const existingSet = map.get(key);
          
          for (const part of valueParts) {
              existingSet.add(part);
          }

        }

    }
    
    const result = [];
    for (const [key, valueSet] of map) {
        const mergedValues = Array.from(valueSet).join(';');
        result.push(`${key}=${mergedValues}`);
    }
    
    return result;
}