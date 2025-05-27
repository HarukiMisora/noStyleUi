





class ClassVal{
  useing:string[] = []
}

interface OptionsT{
  /** @description 选项的值 */
  value:string
  prop:string,
  type:'implicit'|'value'|'key'|'key-value'[]
}


/**
 * 
 * @param value 默认值
 * @param prop 生效属性
 * @param expects 预期值
 * @returns 
 */
export function useClass(prop:string[]|string,value:string,expects?:string[]):string{
  return value
}