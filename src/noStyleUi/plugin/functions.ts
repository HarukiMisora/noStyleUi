

interface IAnalyzeStringResult {
  type: 'string'|'number'|'expression'|'variable'|'invalid'|'unknown';
  value: any;
  original: string;
}


//检验变量类型
export function analyzeStringEnhanced(str:string):IAnalyzeStringResult {
  // 去除前后空格
  const trimmedStr = str.trim();
  
  // 检查是否是字符串值
  if ((trimmedStr.startsWith("'") && trimmedStr.endsWith("'")) || 
      (trimmedStr.startsWith('"') && trimmedStr.endsWith('"'))) {
    return {
      type: 'string',
      value: trimmedStr.slice(1, -1),
      original: str
    };
  }
  
  // 检查是否是数字字面量
  if (!isNaN(Number(trimmedStr)) && trimmedStr !== '') {
    return {
      type: 'number',
      value: parseFloat(trimmedStr),
      original: str
    };
  }
  
  // 更精确的表达式检测
  const expressionPattern = /[+\-*/%=()\[\]{}<>&|^~!?:, ]|=>|&&|\|\||\.\.\./;
  if (expressionPattern.test(trimmedStr)) {
    try {
      // 尝试解析表达式
      new Function(trimmedStr);
      return {
        type: 'expression',
        value: trimmedStr,
        original: str
      };
    } catch {
      // 解析失败，可能是无效的变量名
      return {
        type: 'invalid',
        value: trimmedStr,
        original: str
      };
    }
  }
  
  // 检查是否是有效的变量名
  const variablePattern = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
  if (variablePattern.test(trimmedStr)) {
    return {
      type: 'variable',
      value: trimmedStr,
      original: str
    };
  }
  
  // 无法识别的类型
  return {
    type: 'unknown',
    value: trimmedStr,
    original: str
  };
}

//生成普通prop
export function generateProp(name:string, value:any):any {
  return {
    type:6,
    name,
    value:{
      type:2,
      content:value.replace(/'/g,'')
    }
  }
}
//生成bindProp
export function generateBindProp(name:string, value:any):any {
  return {
    type:7,
    name:'bind',
    rawName:':'+name,
    exp:{
      type:4,
      content:value
    },
    arg:{
      type:4,
      content:name
    }
  }
}