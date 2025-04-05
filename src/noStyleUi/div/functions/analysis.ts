


export function analysisProps(options:string[]|string,callback:Function){
  const arr = typeof options === 'string'?options.split(' '):options
  const arrLength = arr.length

  for(let i =0;i<arrLength;i++){
    if(arr[i].includes('-')){
      const propAndValue = arr[i].split('-')
      callback(propAndValue)
    }
  }

}