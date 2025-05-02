

import type { Plugin } from 'vite';
import { parse,type RootNode} from '@vue/compiler-dom';
import type { keyofCSSStyleDeclaration, myCSSStyleDeclaration, Pxs, setClassNameT, setStyleT } from '../interface/css';
import createGridCss from '../div/functions/createGrid.css';
import createBgCss from '../div/functions/createBg.css';
import { createFontColorCss } from '../div/functions/createFontColor.css';
import { creatFlexCss } from '../div/functions/createFlex.css';
import { createBdCss } from '../div/functions/createBd.css';
import { createTransition } from '../div/functions/createTransition';
import { config } from '../config/config';
import { camelToHyphen } from '../untils';

interface PluginOptions {
  justForBuild?: boolean; // 仅在构建时生效
  wGroupSpecialName?: string[]; // WGroup用到过的别名
  debug?: boolean; // 调试模式
  log?:(...args:any[])=>void // 日志函数
}




export default function propStyleCompile(options:PluginOptions={}):Plugin{
  const justForBuild = options.justForBuild || false;
  const logOut = options.debug? (options.log || console.log):()=>{}
  const WGroupNames = [...(options.wGroupSpecialName || []),'w-group','WGroup','wGroup'];

  return {
    name: 'prop-style-compile',
    enforce: 'pre',

    transform(code, id) {
      if (id.endsWith('.vue')&&!justForBuild) {
   
 
        const newCode = transformTemplate(code,(match)=>{
          // logOut({match,attrs,content}); 
          const ast:RootNode = parse(match)
          eachTree(ast,(node)=>{
            const styles = {} as myCSSStyleDeclaration
            const className:{[key:string]:Boolean} ={}
            const setClassName:setClassNameT = (name,value=true) =>{
              className[name]= value
            }
            const setStyle:setStyleT = (name,value) =>{
              styles[name] = value
            }
            let classIndex = -1
            let styleIndex = -1
            const nodeClassName = WGroupNames.includes(node.tag)? '_class':'class'
            const nodeStyleName = WGroupNames.includes(node.tag)? '_style':'style'
            logOut({node,nodeClassName,nodeStyleName});
            
            for(let i=0;i<node.props.length;i++){  
              const prop = node.props[i]
              if(prop.name !== 'bind'){
                logOut('prop=>'+i,prop.type,{[prop.name]:prop.value?.content});  
                classIndex = prop.name === nodeClassName? i:classIndex
                styleIndex = prop.name === nodeStyleName? i:styleIndex
                if(allProps.includes(prop.name)){
                  
                  if(attributeGrop.includes(prop.name)){
                    if(prop.name[0] ==='$'){ 
                      styles[<keyofCSSStyleDeclaration>attributeGropStyle[<keyof Pxs>prop.name]] = prop.value?.content
                    }
                    else{
                        className[`${prop.name}-${prop.value?.content}`] = true
                        delete styles[<keyofCSSStyleDeclaration>attributeGropStyle[<keyof Pxs>prop.name]]
                    }

                  }else{
                    createStyles[prop.name]?.(prop.value?.content,setClassName,setStyle)
                  }




                  createStyles[prop.name]?.(prop.value?.content,setClassName,setStyle) 
                  node.props.splice(i--,1)
                } 
              }
 
            }
            // logOut(node.props.map((item:any)=>item.name));
            const classString = Object.keys(className).filter(item=>className[item]).join(' ')
            const styleString = Object.keys(styles).map((item:string)=>`${camelToHyphen(item)}:${styles[<keyofCSSStyleDeclaration>item]}`).join(';')
            if(classString.length>0){
              if(classIndex === -1){
                node.props.push({
                  type: 6,
                  name: nodeClassName,
                  value: {
                    type: 2,
                    content: classString,
                  },
                  
                })
                logOut(node.props[node.props.length-1].value.content);
              }else{
                node.props[classIndex].value.content +=' '+classString 
                logOut(node.props[classIndex].value.content);
              }
            }
            if(styleString.length>0){
              if(styleIndex === -1){
                
                node.props.push({
                  type: 6,
                  name:'style',
                  value: {
                    type: 2,
                    content: styleString, 
                  },
                  
                })
                logOut(node.props[node.props.length-1].value.content);
              }else{
                node.props[styleIndex].value.content +=';'+styleString 
                logOut(node.props[styleIndex].value.content);
              }
            }
            logOut({styles,className});
            
            
             

          },logOut)
          const newTmeplate = generateTemplate(ast)
          logOut({newTmeplate},'--------------------------------------');

          return newTmeplate
        })

      
        return {
          code:newCode,
        };
      }
    }
  }
}


//匹配template标签
function transformTemplate(html: string,after:(match:string)=>string){//,attrs:string,content:string)=>string) {
  return html.replace(
    /<template(\b[^>]*)>([\s\S]*?)<\/template>/,
    (_match) => { 

      return after(_match)//, attrs, content) 
    }
  )
}
function eachTree(node:any,callback:(node:any,index:number,parent:any)=>void,logOut:any){
  if(node.children){
    for(let i=0;i<node.children.length;i++){
      if(node.children[i].type === 1){
        logOut('\nnode=>'+i,node.children[i].tag);
        
        callback(node.children[i],i,node)
        eachTree(node.children[i],callback,logOut)
      }
    } 
  }
}



const allProps = Object.keys(config.props).filter(item=>item!=='hover')
const createStyles:{[key:string]:Function} = {
  grid:createGridCss,
  bg:createBgCss,
  c:createFontColorCss,
  flex:creatFlexCss,
  bd:createBdCss,
  transition:createTransition
}
const attributeGrop:(keyof Pxs)[] = ['w','h','x','y','f','fw','p','px','py','pl','pt','pb','pr','m','mx','my','ml','mt','mb','mr','radius']

const attributeGropStyle: Pxs = {
  w:'width',
  h:'height',
  x:'x',
  y:'y',
  f:'font-size',
  fw:'font-weight',
  radius:'border-radius',
  p:'padding',
  pt:'padding-top',
  pb:'padding-bottom',
  pl:'padding-left',
  pr:'padding-right',
  px:'padding',
  py:'padding',
  
  m:'margin',
  mt:'margin-top',
  mb:'margin-bottom',
  ml:'margin-left',
  mr:'margin-right',
  mx:'margin',
  my:'margin',

  
}
// 重建模板字符串
function generateTemplate(ast: any): string {
  if (!ast || !ast.children) return '';

  let result = '';
  
  const processNode = (node: any): string => {
    switch (node.type) {
      // 根节点 (0)
      case 0: 
        return node.children?.map(processNode).join('') || '';
      
      // 元素节点 (1)
      case 1: {
        let attrs = '';
        if (node.props) {
          attrs = node.props.map((prop: any) => {
            if (prop.type === 6) { // 普通属性 (6)
              return prop.value 
                ? `${prop.name}="${prop.value.content}"` 
                : prop.name;
            } else if (prop.type === 7) { // 指令 (7)
              const dirName = prop.name === 'on' ? '@' : `v-${prop.name}`;
              const dirArg = prop.arg ? `:${prop.arg.content}` : '';
              const dirValue = prop.exp ? `="${prop.exp.content}"` : '';
              return `${dirName}${dirArg}${dirValue}`;
            }
            return '';
          }).join(' ');
        }

        const tag = node.tag;
        const isSelfClosing = node.isSelfClosing || [
          'img', 'input', 'br', 'hr', 'meta', 'link'
        ].includes(tag);

        let children = '';
        if (node.children) {
          children = node.children.map(processNode).join('');
        }

        if (isSelfClosing) {
          return `<${tag}${attrs ? ' ' + attrs : ''} />`;
        } else {
          return `<${tag}${attrs ? ' ' + attrs : ''}>${children}</${tag}>`;
        }
      }
      
      // 文本节点 (2)
      case 2:
        return node.content;
      
      // 注释节点 (3)
      case 3:
        return `<!--${node.content}-->`;
      
      // 插值表达式 (5)
      case 5:
        return `{{ ${processNode(node.content)} }}`;
      
      // 简单表达式 (4)
      case 4:
        return node.content;
      
      // 复合表达式 (8)
      case 8:
        return node.children.map((child: any) => 
          typeof child === 'string' ? child : processNode(child)
        ).join('');
      
      // v-if 节点 (9)
      case 9: {
        const branches = node.branches.map(processNode).join('');
        return branches;
      }
      
      // v-if 分支 (10)
      case 10: {
        // const condition = node.condition ? ` v-if="${processNode(node.condition)}"` : '';
        const children = node.children ? node.children.map(processNode).join('') : '';
        return children;
      }
      
      // v-for 节点 (11)
      case 11: {
        const source = processNode(node.source);
        const value = node.value ? processNode(node.value) : '';
        const key = node.key ? ` :key="${processNode(node.key)}"` : '';
        const children = node.children ? node.children.map(processNode).join('') : '';
        return ` v-for="(${value}) in ${source}"${key}>${children}`;
      }
      
      // 其他JS相关节点（通常不会出现在模板中）
      case 12: // TEXT_CALL
      case 13: // VNODE_CALL
      case 14: // JS_CALL_EXPRESSION
      case 15: // JS_OBJECT_EXPRESSION
      case 16: // JS_PROPERTY
      case 17: // JS_ARRAY_EXPRESSION
      case 18: // JS_FUNCTION_EXPRESSION
      case 19: // JS_CONDITIONAL_EXPRESSION
      case 20: // JS_CACHE_EXPRESSION
      case 21: // JS_BLOCK_STATEMENT
      case 22: // JS_TEMPLATE_LITERAL
      case 23: // JS_IF_STATEMENT
      case 24: // JS_ASSIGNMENT_EXPRESSION
      case 25: // JS_SEQUENCE_EXPRESSION
      case 26: // JS_RETURN_STATEMENT
        return '';
      
      default:
        console.warn(`Unhandled node type: ${node.type}`, node);
        return '';
    }
  };

  ast.children.forEach((node: any) => {
    result += processNode(node);
  });

  return result;
}




