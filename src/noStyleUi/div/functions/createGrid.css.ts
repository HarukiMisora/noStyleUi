
interface classNameT{
  [key:string]:boolean
}
interface styleWithValuesT{
  style:CSSStyleDeclaration,
  value:string[]
}
interface classNameWithValuesT{
  className:classNameT,
  value:string[]
}



const actions:{[key:string]:Function} = {
  col:({style,value}:styleWithValuesT)=>{
    const col = value[1]&&value[1]!== 'auto'?value[1]:'auto-fit'
    const w = value[2]?value[2]:'auto'
    const maxW = value[3]==='w'?value[2]:(value[3]?value[3]:'1fr')
    console.log(col,w);
    
    style.gridTemplateColumns  = `repeat(${col},minmax(${w},${maxW})`
  },
  row:({style,value}:styleWithValuesT)=>{
    const row = value[1]&&value[1]!== 'auto'?value[1]:'auto-fit'
    const h = value[2]?value[2]:'auto'
    const maxH = value[3]==='h'?value[2]:(value[3]?value[3]:'1fr')
    if(row === 'auto-fit'){
      style.gridAutoRows = `minmax(${h},${maxH})`
    }else{
      style.gridTemplateRows = `repeat(${row},minmax(${h},${maxH})`
    }
  },
  g:({className,value}:classNameWithValuesT)=>{
    className[`g-${value[1]}`] = true
  },
  //如果是子元素，则不设置grid属性
  item:({className,value}:classNameWithValuesT)=>{
    className.grid = value?.[1] ==='grid'?true:false
  },
  gcol:({style,value}:styleWithValuesT)=>{
    const colStart = value[1]||'1'
    const colEnd = value[2]||'1'
    style.gridColumn = `${colStart}/${colEnd}`
  },
  grow:({style,value}:styleWithValuesT)=>{
    const rowStart = value[1]||'1'
    const rowEnd = value[2]||'1'
    style.gridRow = `${rowStart}/${rowEnd}`
  },
}

export default function (options:string[]|string){
  const arr = typeof options === 'string'?options.split(' '):options
  const arrLength = arr.length
  const className:classNameT= {
    grid:true
  }
  const style = {}
  for(let i =0;i<arrLength;i++){
    if(arr[i].includes('-')){
      const propAndValue = arr[i].split('-')
      actions[propAndValue[0]]?.({className,style,value:propAndValue})
    }else{
      actions[arr[i]]?.({className,style})
    }
  }
  return {
    style,
    className
  }
}
