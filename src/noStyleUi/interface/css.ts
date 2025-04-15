

export type keyofCSSStyleDeclaration =keyof Omit<CSSStyleDeclaration, 'length'|'parentRule'>
export type valueOfCSSStyleDeclaration = string|undefined
export type myCSSStyleDeclaration = {
    [key in keyofCSSStyleDeclaration]: valueOfCSSStyleDeclaration
}
export type createCssFuncT = (options:string[]|string,setClassName:setClassNameT,setStyle:setStyleT)=>void
export type setClassNameT =(name:string,value:boolean)=>void
export type setStyleT = (name:keyofCSSStyleDeclaration,value:valueOfCSSStyleDeclaration)=>void

export interface styleWithValuesT{
  setStyle:setStyleT,
  value:string[]
}
export interface classNameWithValuesT{
  setClassName:setClassNameT,
  value:string[]
}
export interface classNameWithStyleT{
  setClassName?:setClassNameT,
  setStyle:setStyleT,
  value:string[]
}


export interface Pxs {
  w:string
  h:string
  x:string
  y:string 
  f:string
  fw:string
  p:string
  px:string
  py:string
  pl:string
  pr:string
  pt:string,
  pb:string,
  m:string
  mx:string
  my:string
  ml:string
  mr:string
  mt:string,
  mb:string,
  radius:string
}
