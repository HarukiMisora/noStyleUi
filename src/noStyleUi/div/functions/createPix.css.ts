import type { keyofCSSStyleDeclaration, Pxs, setClassNameT, setStyleT } from "../../interface/css"
import { isIntegerString } from "../../test";
import {  analysisPxs } from "./analysis"







export default function (prop:string,value:string|number,setClassName:setClassNameT,setStyle:setStyleT){

  value = analysisPxs(value,'0','')
  if(isIntegerString(<string>value)){
    setStyle(<keyofCSSStyleDeclaration>attributeGropStyle[<keyof Pxs>prop],undefined)
    setClassName(`${prop}-${value}`,true)
  }else{
    console.log(setStyle);
    
    setStyle(<keyofCSSStyleDeclaration>attributeGropStyle[<keyof Pxs>prop],<string>value)
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