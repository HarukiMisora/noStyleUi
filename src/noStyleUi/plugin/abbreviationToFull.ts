



 const pxs = {
  w: "width",
  h: "height",
  m: "margin",
  mt: "margin-top",
  mb: "margin-bottom",
  ml: "margin-left",
  mr: "margin-right",
  p: "padding",
  pt: "padding-top",
  pb: "padding-bottom",
  pl: "padding-left",
  pr: "padding-right",
  bg: "background",
  radius: "border-radius",
  g:"gap",
} 

const colors = {
  c:'color',
  bc: "background-color",
}
const displays = ['flex','grid']

const displayValues = {
  flex:{
    center:{
      alignItems:'center',
      justifyContent:'center'
    }
  },
  grid:{
    center:{
      justifyItems:'center',
      alignItems:'center'
    }
  },
  bp:{
    center:{
      backgroundPosition: `50% 50%`,
    }
  },
}
const childValues = {
  bd:{
    s:'border-style',
    w:'border-width',
    c:'border-color',
    r:'border-radius',
    b:'border',
  }
}


export default function (short:string):[string|undefined,string|Object|undefined]{
  const [prop,value,childValue] =short.split('-')
  
  console.log({prop,value,childValue},'class'); 

  const group = getGroup(prop,value)
  if(group !== void 0){
    return group
  }
  const childGroup = getClass(prop,value,childValue)
  if(childGroup!== void 0){
    return childGroup
  }



  if(prop in pxs){
    return [pxs[prop as keyof typeof pxs],value+'px'] 
  }
  if(prop in colors){
    return [colors[prop as keyof typeof colors],value]
  }
  if(displays.includes(prop)){ 

    return ['display',prop]  
  }
  return [undefined,undefined] 
  
}
function getGroup(prop:string,value:string):[string|undefined,string|Object|undefined]|undefined{
  const displays = displayValues[prop as keyof typeof displayValues]
    if(displays!==void 0&&value in displays){
      return [prop+'-'+value,displays[value as keyof typeof displays]]
    }
    return undefined
}
function getClass(prop:string,value:string,childValue:string|undefined):[string|undefined,string|Object|undefined]|undefined{
  const styleName = childValues[prop as keyof typeof childValues]
  if(styleName !== void 0){
    console.log(94,{styleName},value in styleName);  
  }
  
  if(styleName!==void 0&&value in styleName){
    return [styleName[value as keyof typeof styleName],childValue]
  }
  return undefined
}