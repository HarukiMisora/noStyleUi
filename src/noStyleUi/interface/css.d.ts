

type keyofCSSStyleDeclaration =keyof Omit<CSSStyleDeclaration, 'length'|'parentRule'>
type valueOfCSSStyleDeclaration = string|undefined
type myCSSStyleDeclaration = {
    [key in keyofCSSStyleDeclaration]: valueOfCSSStyleDeclaration
}
type createCssFuncT = (options:string[]|string,setClassName:setClassNameT,setStyle:setStyleT)=>void
type setClassNameT =(name:string,value:boolean)=>void
type setStyleT = (name:keyofCSSStyleDeclaration,value:valueOfCSSStyleDeclaration)=>void

interface styleWithValuesT{
  setStyle:setStyleT,
  value:string[]
}
interface classNameWithValuesT{
  setClassName:setClassNameT,
  value:string[]
}
interface classNameWithStyleT{
  setClassName?:setClassNameT,
  setStyle:setStyleT,
  value:string[]
}


keyof ['w','h','x','y','f','fw','p','px','py','pl','pt','pb','pr','m','mx','my','ml','mt','mb','mr','bc','radius']['number']
interface Pxs {
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
