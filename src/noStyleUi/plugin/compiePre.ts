
// import fs from 'fs';
import { compieCore } from './compieCore';
import compileCss from './cpmpieCss';
import type { myCSSStyleDeclaration } from '../interface/css';

//获取运行目录





export default async function compiePre(includes:string[],excludes:string[],WGroupNames:string[]=[]):Promise<{globalCSS:string,newCodes:{[key:string]:string}}>{
  if (process.env.BROWSER) return {globalCSS:`/* propStyleCompie */\n`,newCodes:{}};

  const injectedCSS = [] as {key:string,value:myCSSStyleDeclaration,sort:number}[]
  let globalCSS = ''
  const newCodes:{[key:string]:string} = {}
  
  const fs = await import('fs').then(res=>res.default)
  
  const runPath = process.cwd();

  console.log("runPath",runPath);

  function eachTree(includes:string[],excludes:string[]){
 for(let i of includes){
    //读取目录下所有文件 
    let files = fs.readdirSync(i);
    // console.log({files});
    
    for(let file of files){
      let filePath = i+'\\'+file
      if(fs.statSync(filePath).isFile()){
          //排除文件
          if(excludes.some(item=>filePath.includes(item))){ 
            continue;
          }
          if(file.endsWith(".vue")){
            //读取文件内容
            let code = fs.readFileSync(filePath,"utf-8");
            // console.log({filePath,code});
            //替换内容
            const newCode = compieCore({code,WGroupNames,injectedCSS});
            if (newCode) {
              newCodes[filePath.replace(/\\\\/g,'\\')] = newCode;
            }
            //写入文件
            // fs.writeFileSync(filePath,content,"utf-8");
          }
        }

      else if(fs.statSync(filePath).isDirectory()){
        
        //递归处理目录
        eachTree([filePath],excludes);
      }  
    }
  }

}



  eachTree(includes.map(item=>runPath + (item.startsWith("/")? item : "/" + item).replace(/\//g,"\\")),excludes);

  const css = compileCss(injectedCSS);
  // console.log({injectedCSS});
  if (css) {
    globalCSS += css + '\n'; 
  } 
 
  return {globalCSS:`/* propStyleCompie */\n${globalCSS}`,newCodes};

}




