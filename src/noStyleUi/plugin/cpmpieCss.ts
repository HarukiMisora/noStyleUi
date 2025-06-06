import { camelToHyphen } from "../untils";
import type { myCSSStyleDeclaration,keyofCSSStyleDeclaration } from "../interface/css";
//css编译
export default function compileCss(arr: {key:string,value:myCSSStyleDeclaration}[]):string{
  let css = '';
  for(let i=0;i<arr.length;i++){
    const {key,value} = arr[i];
    const values = Object.keys(value);
    css += `\n${key} {\n`;
    for(let j=0;j<values.length;j++){
      const prop = values[j] as keyofCSSStyleDeclaration;
      const val = value[prop];
      css += `  ${camelToHyphen(<string>prop)}:${val};\n`;
    }
    css += `}`;
  }
  // console.log(css,arr); 
  return css;
}



