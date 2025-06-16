import { camelToHyphen } from "../untils";
import type { myCSSStyleDeclaration,keyofCSSStyleDeclaration } from "../interface/css";
import type { logOutF } from "./vite-plugin-propStyleCompileDom";
//css编译
export default function compileCss(arr: {key:string,value:myCSSStyleDeclaration,sort:number}[],logOut:logOutF,id:string):string{
  let css = '';
  arr.sort((a,b)=>a.sort-b.sort);
  for(let i=0;i<arr.length;i++){
    let {key,value} = arr[i];
    const values = Object.keys(value);
    if(key.startsWith('.hover-')){
      key +=':hover';
    }
    // console.log({key},'className');
    
    css += `\n${key} {\n`;
    for(let j=0;j<values.length;j++){
      const prop = values[j] as keyofCSSStyleDeclaration;
      const val = value[prop];
      css += `  ${camelToHyphen(<string>prop)}:${val};\n`; 
    }
    css += `}`;
  }
  logOut({id,message:{injected:arr},fucName:'compileCss',time:Date.now()}) 
  return css;
}
 


