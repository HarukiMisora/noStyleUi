import type { keyofCSSStyleDeclaration, Pxs, setClassNameT, setStyleT } from "../../interface/css"
import { isIntegerString } from "../../test";
import {  analysisPxs } from "./analysis"







export default function (prop:string,value:string|number,setClassName:setClassNameT,setStyle:setStyleT,mode:string='brow'){
  //这里不需要单位
  const unit = mode === 'brow'? '' : ''
  value = analysisPxs(value,'0',unit)
    // console.log(prop,value);

  if(isIntegerString(<string>value)){
    setStyle(<keyofCSSStyleDeclaration>attributeGropStyle[<keyof Pxs>prop],undefined)
    setClassName(`${prop}-${value}`,true)

  }else{
    // console.log(setStyle);
    if(['px','py','mx','my'].includes(prop)){ 
      // setStyle(<keyofCSSStyleDeclaration>attributeGropStyle[<keyof Pxs>prop],prop.includes('x')?value+' 0':'0 '+value)
      setClassName(`${prop}-${value}`,true)
      

    }else{
      setStyle(<keyofCSSStyleDeclaration>attributeGropStyle[<keyof Pxs>prop],<string>value) 

    }
  }

}

const attributeGropStyle: Pxs = {
  w:'width',
  h:'height',
  x:'x',
  y:'y',
  f:'font-size',
  fw:'font-weight',
  radius:'border-radius',
  p:'padding',
  pt:'padding-top',
  pb:'padding-bottom',
  pl:'padding-left',
  pr:'padding-right',
  px:'padding',
  py:'padding',
  
  m:'margin',
  mt:'margin-top',
  mb:'margin-bottom',
  ml:'margin-left',
  mr:'margin-right',
  mx:'margin',
  my:'margin',

  
}