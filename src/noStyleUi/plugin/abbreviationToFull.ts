
type resT = [string|undefined,string|Object|undefined,number]


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

const displayValues:any = {
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
    },
    x:{
      left:{
        backgroundPositionX: '0%',
        sort:1
      },
      right:{
        backgroundPositionX: '100%',
        sort:1
      }
    },
    r:{
      n:{
        backgroundRepeat: 'no-repeat',
      },
      x:{
        backgroundRepeat: 'repeat-x',
      },
      y:{
        backgroundRepeat: 'repeat-y',
      }
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
  },
}


export default function (short:string):resT{
  const [prop,value,childValue] =short.split('-')
  
  console.log({prop,value,childValue,short},'class');  

  const group = getGroup(prop,value,childValue)
  if(group !== void 0){
    return group
  }
  const childGroup = getClass(prop,value,childValue)
  if(childGroup!== void 0){
    return childGroup
  }



  if(prop in pxs){
    return [pxs[prop as keyof typeof pxs],value+'px',0] 
  }
  if(prop in colors){
    return [colors[prop as keyof typeof colors],value,0]
  }
  if(displays.includes(prop)){ 

    return ['display',prop,0]  
  }
  return [undefined,undefined,0] 
  
}
function getGroup(prop:string,value:string,childValue:string|undefined):resT|undefined{
  const displays = displayValues[prop as keyof typeof displayValues]
    if(displays!==void 0&&value in displays){
      const displayValue = displays[value as keyof typeof displays]
      const resValue = childValue?displayValue[childValue as keyof typeof displayValue]||{}:displayValue
      console.log({resValue,displays,prop,value,childValue},'resValue');
       
      const sort = resValue?.sort||0
      if(sort!==void 0){
        delete resValue.sort 
      }
      return [prop+'-'+value,resValue,sort] 
    }
    return undefined
}
function getClass(prop:string,value:string,childValue:string|undefined):resT|undefined{
  const styleName = childValues[prop as keyof typeof childValues]
  if(styleName !== void 0){
    // console.log(94,{styleName},value in styleName);   
  }
  
  if(styleName!==void 0&&value in styleName){
    return [styleName[value as keyof typeof styleName],childValue,0]
  }
  return undefined
}