import { isImage } from "../../test";
import { analysisColor, analysisProps, analysisPxs } from "./analysis";


const actions:{[key:string]:Function} = {
  //图片大小
  size:({setStyle,value}:styleWithValuesT)=>{
    const w = analysisPxs(value[1],'auto')
    const h = analysisPxs(value[2],'auto')
    
    setStyle('backgroundSize',`${w} ${h}`)  
    return true
  },
  //图片位置
  p:(option:any)=>actions.posn(option),
  posn:({setStyle,value}:styleWithValuesT)=>{
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

  let lastItem = '' //这个lastItem是记录上一个设置的类名，用来清除上一个设置的类名
  analysisProps(options,(propAndValue:string[])=>{
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
    if(isColor){return}

    //图片背景
    if(isImage(propAndValue[0])){
        setStyle('backgroundImage',`url("${propAndValue[0]}")`)
        return
    }



    //填充样式
    if(['fill','contain','cover','none'].includes(propAndValue[0])){
        setClassName(lastItem,false)
        setClassName(`bs-${propAndValue[0]}`,true)
        lastItem = `bs-${propAndValue[0]}`
        return
    }
 
    
    if(!actions[propAndValue[0]]?.({setClassName,setStyle,value:propAndValue})){
      //处理图片位置
      if(new RegExp('^.*(left|bottom|top|right|center)$').test(propAndValue.toString())){
        setClassName('bp-x-left',false)
        setClassName('bp-x-right',false)
        setClassName('bp-y-top',false)
        setClassName('bp-y-bottom',false)
        setClassName('bp-center',false)
        const options = propAndValue.toString().split(',');
        for(let d of options){
            switch(d){
                case 'left':setClassName('bp-x-left',true);break;
                case 'right':setClassName('bp-x-right',true);break;
                case 'top':setClassName('bp-y-top',true);break;
                case 'bottom':setClassName('bp-y-bottom',true);break;
                case 'center':setClassName('bp-center',true);break;
                default:console.warn(d,'不是一个合法的backgroundPosition option')
            }
        }
        return
      }

    }
  })

  

}



export default createBgCss ; 