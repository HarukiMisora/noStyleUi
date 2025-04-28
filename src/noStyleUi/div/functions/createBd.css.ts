import type { classNameWithStyleT, keyofCSSStyleDeclaration, setClassNameT, setStyleT } from "../../interface/css";
import { isIntegerString, isValidPixelValue } from "../../test";
import { analysisColor, analysisProps, analysisPxs } from "./analysis";




const actions:{[key:string]:Function} = {

  solid:({setClassName}:classNameWithStyleT)=>{
    // console.log(setClassName);
    
    setClassName?.('bd-s-solid',true)
    return true
  },
  dotted:({setClassName,setStyle}:classNameWithStyleT)=>{
    setClassName?.('bd-s-dotted',true)
    return true
  },
  dashed:({setClassName,setStyle}:classNameWithStyleT)=>{
    // console.log(setClassName);

    setClassName?.('bd-s-dashed',true)
    return true
  },
  double:({setClassName,setStyle}:classNameWithStyleT)=>{
    setClassName?.('bd-s-double',true)
    return true
  },
  groove:({setClassName,setStyle}:classNameWithStyleT)=>{
    setClassName?.('bd-s-groove',true)
    return true
  },
  hidden:({setClassName,setStyle}:classNameWithStyleT)=>{
    setClassName?.('bd-s-hidden',true)
    return true
  },
  inset:({setClassName,setStyle}:classNameWithStyleT)=>{
    setClassName?.('bd-s-inset',true)
    return true
  },
  none:({setClassName,setStyle}:classNameWithStyleT)=>{
    setClassName?.('bd-s-none',true)
    return true
  },
  outset:({setClassName,setStyle}:classNameWithStyleT)=>{
    setClassName?.('bd-s-outset',true)
    return true
  },
  ridge:({setClassName,setStyle}:classNameWithStyleT)=>{
    setClassName?.('bd-s-ridge',true)
    return true
  },
  t:(options:classNameWithStyleT)=>{
    actions['*dir'](options,'t','Top')
    return true
  },
  b:(options:classNameWithStyleT)=>{
    actions['*dir'](options,'b','Bottom')
    return true
  },
  l:(options:classNameWithStyleT)=>{
    // console.log(1111);
    
    actions['*dir'](options,'l','Left')
    return true
  },
  r:(options:classNameWithStyleT)=>{
    actions['*dir'](options,'r','Right')
    return true
  },
  x:(options:classNameWithStyleT)=>{
    actions['*dir'](options,'x','Left','Right')
    return true
  },
  y:(options:classNameWithStyleT)=>{
    actions['*dir'](options,'y','Top','Bottom')
    return true
  },
  '*dir':({setStyle,setClassName,value}:classNameWithStyleT,dir:string,dirFull:string,dirFull2:string)=>{
    const setTopClassName:setClassNameT = (name,value=true) =>{
      // console.log(`${name}-${dir}`);
      setClassName?.(`${name}-${dir}`,value)
    }
    const setTopStyle:setStyleT = (name,value) =>{
      let newName =(typeof name ==='string'?name.substring(0, 6) + dirFull + name.substring(6):'name') as keyofCSSStyleDeclaration
      setStyle(newName,value)
      if(dirFull2){
        newName =(typeof name ==='string'?name.substring(0, 6) + dirFull2 + name.substring(6):'name') as keyofCSSStyleDeclaration
        setStyle(newName,value)
      }
    }
    const newOptions = value.filter(i=>!['t','r','b','l','x','y'].includes(i))
    // console.log(value,newOptions);
    return createBdCss(newOptions,setTopClassName,setTopStyle,dir)

  }
  
}
export function createBdCss(options:string[]|string,setClassName:setClassNameT|undefined,setStyle:setStyleT,_dir:string='n'){
    // console.log(options,_dir);
    let lastColor:string = ''
    analysisProps(options,(propAndValue:string[])=>{
      if(isValidPixelValue(propAndValue[0])){
        const size = analysisPxs(propAndValue[0],'0','px')
        // if(isIntegerString(size)&&setClassName !== void 0){
        //   setClassName(`bd-w-${size}`,true)
        // }else{
          setStyle("borderWidth",size)
        // }
        return
      }
      
      if(!actions[propAndValue[0]]?.({setClassName,setStyle,value:propAndValue})){
        // console.log(propAndValue[0]);
        
        analysisColor(propAndValue[0],(color:string)=>{
          setStyle("borderColor",color)
        },(color:string)=>{
          if(setClassName){
            setClassName?.(`bd-c-${lastColor}`,false)
            setClassName?.(`bd-c-${color}`,true)
            lastColor = color

          }else{
            setStyle("borderColor",color)
          }
        })
      }
    },['t-','l-','b-', 'r-','x-','y-'])
}

