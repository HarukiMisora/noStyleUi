



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
  }
}


export default function (short:string):[string|undefined,string|Object|undefined]{
  const [prop,value] =short.split('-')
  // console.log({prop,value},'class');

  const group = getGroup(prop,value)
  if(group !== void 0){
    return group
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