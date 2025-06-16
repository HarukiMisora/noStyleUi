
import type { setClassNameT, setStyleT, styleWithValuesT } from "../../interface/css";
import { analysisColor } from "./analysis";
import { createBdCss } from "./createBd.css";
import createBgCss from "./createBg.css";



const actions:{[key:string]:Function} = {

  bg:({value,setClassName,setStyle}:{value:string[],setClassName:setClassNameT,setStyle:setStyleT})=>{
    const prop = value[1].split(';')
    createBgCss(prop,setClassName,setStyle)
  },
  c:({value,setStyle}:styleWithValuesT)=>{
    
    analysisColor(value[1],(color:string)=>{

      setStyle('color',color)
    },(color:string)=>{
      
      setStyle('color',color)
    })

  },
  bd:({value,setClassName,setStyle}:{value:string[],setClassName:setClassNameT,setStyle:setStyleT})=>{
    
    const prop = value[1].split(';')
    createBdCss(prop,setClassName,setStyle)
  },


}




export function createHoverCss(options:string[]|string,setClassName:setClassNameT,setStyle:setStyleT){


  const arr = Array.isArray(options)?options:options.split(' ')
  // console.log(arr);

  for(let com of arr){
    // console.log(com);
    const option = com.split('=')
    // console.log(option);
    
    actions[option[0]]?.({value:option,setClassName,setStyle})
    
  }
  
  // let lastColor = null
  // let lastBackgroundColor = null
  // // console.log(arr);
  // for(let com of arr){
  //     if(!com)continue
  //     // console.log(com);
      
  //     if(isValidColor(com)){
  //         if(lastColor !==null){
  //             className[`hover-c-${lastColor}`] = false
  //             hoverStyles.color = `color-mix(in lch, ${lastColor}, ${com})`
  //             lastColor = hoverStyles.color
  //         }else{
  //             hoverStyles.color = com
  //             lastColor = com
  //         }
  //         continue
  //     }
  //     if(colorValues.includes(com)){
  //         if(lastColor !==null){
  //             className[`hover-c-${lastColor}`] = false
  //             hoverStyles.color = `color-mix(in lch, ${lastColor}, ${com})`
  //             lastColor = hoverStyles.color
  //         }else{
  //             className[`hover-c-${com}`] = true
  //             lastColor = com
  //         }
  //         continue
  //     }
  //     if(isImage(com)){
  //         hoverStyles.backgroundImage = `url("${com}")`
  //         continue
  //     }
  //     if(com.indexOf('-')){
  //         const prop = com.split('-')
  //         const propName = prop[0]
  //         const propCount = prop.length - 1
  //         // console.log(prop);
          
  //         if(propName === 'bg'){
  //             for(let i =1;i<=propCount;i++){
  //                 const value = prop[i]
                  
  //                 if(isImage(value)){
  //                     // console.log(value);
  //                     hoverStyles.backgroundImage = `url("${value}")`
  //                     continue
  //                 }
  //                 if(['fill','contain','cover','none'].includes(value)){
  //                     className[`hover-bs-${value}`] = true
  //                     continue
  //                 }
  //                 if(isValidColor(value)||colorValues.includes(value)){
  //                     // console.log(value,lastBackgroundColor);
          
  //                     if(lastBackgroundColor !==null){
  //                         className[`hover-bg-${lastBackgroundColor}`] = false
  //                         hoverStyles.backgroundColor = `color-mix(in lch, ${lastBackgroundColor}, ${value})`
  //                         lastBackgroundColor = hoverStyles.backgroundColor
  //                     }else{
  //                         className[`hover-bg-${value}`] = false
  //                         hoverStyles.backgroundColor = value
  //                         lastBackgroundColor = value
  //                     }
  //                     continue
  //                 }
  //                 if(['left','bottom','top','right','center'].includes(value)){
  //                     switch(value){
  //                         case 'left':className['hover-bp-x-left']=true;className['hover-bp-x-right']=false;break;
  //                         case 'right':className['hover-bp-x-right']=true;className['hover-bp-x-left']=false;break;
  //                         case 'top':className['hover-bp-y-top']=true;className['hover-bp-x-bottom']=false;break;
  //                         case 'bottom':className['hover-bp-y-bottom']=true;className['hover-bp-x-top']=false;break;
  //                         case 'center':className['hover-bp-center']=true;break;
  //                     }
  //                     continue
  //                 }
  //                 if((/^w:.*/).test(value)){
  //                     // console.log(value);
  //                     let trueValue = value.slice(2)
  //                     const sizePix = trueValue?.indexOf('p')?(trueValue?.indexOf('v')?'px':`v${trueValue}`):'%'
  //                     const sizeValue = sizePix === 'px'?trueValue:trueValue?.slice(1)

  //                     const backgroundSizeX = trueValue==='auto'?trueValue:(sizeValue + sizePix) 
  //                     const backgroundSizeY = styles.backgroundSize?.split(' ')[1]||'auto'

  //                     hoverStyles.backgroundSize = `${backgroundSizeX} ${backgroundSizeY}`
  //                     // hoverStyles.backgroundSizeX = backgroundSizeX
                      
  //                     continue
  //                 }
  //                 if((/^h:.*/).test(value)){
  //                     // console.log(value);
  //                     let trueValue = value.slice(2)

  //                     const sizePix = trueValue?.indexOf('p')?(trueValue?.indexOf('v')?'px':`v${trueValue}`):'%'
  //                     const sizeValue = sizePix === 'px'?trueValue:trueValue?.slice(1)

  //                     const backgroundSizeX = styles.backgroundSize?.split(' ')[0]||'auto'
  //                     const backgroundSizeY = trueValue==='auto'?trueValue:(sizeValue + sizePix) 

  //                     hoverStyles.backgroundSize = `${backgroundSizeX} ${backgroundSizeY}`
  //                     // hoverStyles.backgroundSizeY = backgroundSizeY
  //                     continue
  //                 }
  //                 if((/^x:.*/).test(value)){
  //                     // console.log(value);
  //                     let trueValue = value.slice(2)
  //                     const sizePix = trueValue?.indexOf('p')?(trueValue?.indexOf('v')?'px':`v${trueValue}`):'%'
  //                     const sizeValue = sizePix === 'px'?trueValue:trueValue?.slice(1)

  //                     const backgroundPositionX = (sizeValue + sizePix) 
  //                     hoverStyles.backgroundPositionX = backgroundPositionX
                      
  //                     continue
  //                 }
  //                 if((/^y:.*/).test(value)){
  //                     // console.log(value);
  //                     let trueValue = value.slice(2)
  //                     const sizePix = trueValue?.indexOf('p')?(trueValue?.indexOf('v')?'px':`v${trueValue}`):'%'
  //                     const sizeValue = sizePix === 'px'?trueValue:trueValue?.slice(1)

  //                     const backgroundPositionY = (sizeValue + sizePix) 
  //                     hoverStyles.backgroundPositionY = backgroundPositionY
  //                     continue
  //                 }
                  
                  
  //             }
  //             continue
  //         }


          
  //         continue
  //     }
      
  // }
  

}