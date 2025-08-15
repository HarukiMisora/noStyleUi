import { isImage } from "../../test";
import { analysisColor, analysisProps, analysisPxs } from "./analysis";
import type { createCssFuncT, styleWithValuesT, classNameWithValuesT } from "../../interface/css.ts"


const actions:{[key:string]:Function} = {
  //图片大小
  size:({setStyle,value}:styleWithValuesT)=>{
    const w = analysisPxs(value[1],'auto')
    const h = analysisPxs(value[2],'auto')
    // console.log(w,h);
    
    setStyle('backgroundSize',`${w} ${h}`)  
    return true
  },
  //图片位置
  p:(option:any)=>actions.posn(option),
  posn:({setStyle,value}:styleWithValuesT)=>{
    // console.log(1111);
    
    const x = analysisPxs(value[1],'0')
    const y = analysisPxs(value[2],'0') 
    // console.log(x,y);
    
    setStyle('backgroundPositionX',x)
    setStyle('backgroundPositionY',y)
    return true
  },
  //图片重复
  r:(option:any)=>actions.rept(option),
  rept:({setClassName,value}:classNameWithValuesT)=>{
    setClassName(`bp-r-${value[1]}`,true)
    return true
  }

}



const createBgCss:createCssFuncT = (options,setClassName,setStyle)=>{
  // console.log(options);

  analysisProps(options,(propAndValue:string[])=>{
  let lastItem = '' //这个lastItem是记录上一个设置的类名，用来清除上一个设置的类名

    // console.log(propAndValue);


    //颜色背景
    const isColor = analysisColor(propAndValue[0],(color:string)=>{
      setStyle('backgroundColor',color)
    },(color:string)=>{
      setStyle('backgroundColor',undefined)
      setClassName(lastItem,false)
      setClassName(`bc-${color}`,true)
      lastItem = `bc-${color}`
    })
    // console.log(isColor,propAndValue[0]);
    
    if(isColor){return}

    //图片背景
    if(isImage(propAndValue[0])){
        setStyle('backgroundImage',`url("${propAndValue[0]}")`)
        return
    }



    //填充样式
    if(['fill','contain','cover','none'].includes(propAndValue[0])){
        // console.log({lastItem});  
        
        setClassName(lastItem,false)
        setClassName(`bs-${propAndValue[0]}`,true)
        lastItem = `bs-${propAndValue[0]}`
        return
    }
 
    if(!actions[propAndValue[0]]?.({setClassName,setStyle,value:propAndValue})){
      // console.log(propAndValue);
      
      //处理图片位置
      if(['left','right','top','bottom','center'].includes(propAndValue[0])){
            switch(propAndValue[0]){
                case 'left':setClassName('bp-x-left',true);setClassName('bp-x-right',false);break;
                case 'right':setClassName('bp-x-right',true);setClassName('bp-x-left',false);break;
                case 'top':setClassName('bp-y-top',true);setClassName('bp-y-bottom',false);break;
                case 'bottom':setClassName('bp-y-bottom',true);setClassName('bp-y-top',false);break;
                case 'center':setClassName('bp-center',true);break;
                default:console.warn(propAndValue[0],'不是一个合法的backgroundPosition option')
            }
        
        return
      }

    }
  },'bg')

  

}



export default createBgCss ; 