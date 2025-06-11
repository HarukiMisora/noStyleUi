

type resT = [string|undefined,string|Object|undefined,number]
  const dirs = {
    t:'top',
    r:'right',
    b:'bottom',
    l:'left',
    y:['top','bottom'],
    x:['left','right'],
  }

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
    },
    row(short:string){
      console.log({short},'...row');
      const value = short.endsWith('-r')?'row-reverse':'row'
      return {
       flexDirection:value,
      }
    },
    col(short:string){
      console.log({short},'...col');
      const value = short.endsWith('-r')?'column-reverse':'column'
      return {
       flexDirection:value, 
      }
    },
    1:{
      flexGrow:1,
    },
  },
  items:{
    start:{
      alignItems:'flex-start',
    },
    end:{
      alignItems:'flex-end',
    },
    center:{
      alignItems:'center',
    },
    stretch:{
      alignItems:'stretch',
    },
    baseline:{
      alignItems:'baseline',
    },
  },
  justify:{
    start:{
      justifyContent:'flex-start',
    },
    end:{
      justifyContent:'flex-end',
    },
    center:{
      justifyContent:'center',
    },
    between:{
      justifyContent:'space-between',
    },
    around:{
      justifyContent:'space-around',
    },
    evenly:{
      justifyContent:'space-evenly',
    },
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
      },
    },
    y:{
      top:{
        backgroundPositionY: '0%',
        sort:1
      },
      bottom:{
        backgroundPositionY: '100%',
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
  bs:{
    fill:{
      backgroundSize: '100% 100%',  
    },
    contain:{
      backgroundSize: 'auto 100%',
      backgroundPosition: '50% 50%'
    },
    cover:{
      backgroundSize: '100% auto',
      backgroundPosition: '50% 50%'
    },
    none:{
      backgroundPosition: '50% 50%'
    }

  },
  bd:{
    s(short:string){
      const shorts = short.split('-')
      const drs = dirs[<'t'|'b'|'l'|'r'>shorts[3]]
      console.log({drs,short});
      
      if(Array.isArray(drs)){
        let res:any = {}
        for(const dr of drs){
          const char = `-${dr}-`
          const fullName = `border${char}style`
          // return{
            res[fullName]=shorts[2] 
          // }
        }
        
        return res
      }else{
        const char = drs?('-'+drs+'-'):'-'
        const fullName = `border${char}style`
        return{
          [fullName]: shorts[2]
        }
      }
    },
    c(short:string){
      const shorts = short.split('-')
      const drs = dirs[<'t'|'b'|'l'|'r'>shorts[3]]
      console.log({drs,short});
      
      if(Array.isArray(drs)){
        let res:any = {}
        for(const dr of drs){
          const char = `-${dr}-`
          const fullName = `border${char}color`
          // return{
            res[fullName]=shorts[2] 
          // }
        }
        
        return res
      }else{
        const char = drs?('-'+drs+'-'):'-'
        const fullName = `border${char}color`
        return{
          [fullName]: shorts[2]
        }
      }
    }
  }
}


export default function (short:string):resT{
  const [prop,value,childValue] = short.split('-')
  
  console.log({prop,value,childValue,short},'class');  

  const group = getGroup(prop,value,childValue,short)
  if(group !== void 0){
    console.log({group});
    
    return group
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
function getGroup(prop:string,value:string,childValue:string|undefined,short:string|undefined):resT|undefined{
  const displays = displayValues[prop as keyof typeof displayValues]
    if(displays!==void 0&&value in displays){
      const displayValue = displays[value as keyof typeof displays]
      let resValue = typeof displayValue ==='function'?displayValue(short):{...(childValue?displayValue[childValue as keyof typeof displayValue]||{}:displayValue)}

      console.log({resValue,displays,prop,value,childValue},'resValue');
      const sort = resValue?.sort||0 
      // if(sort!==void 0){
        delete resValue.sort 
      // }
        // delete resValue['*suffix']
      return [prop+'-'+value,resValue,sort] 
    }
    return undefined
}
