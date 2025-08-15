
import { parse,type RootNode} from '@vue/compiler-dom';
import type { keyofCSSStyleDeclaration, myCSSStyleDeclaration, Pxs, setClassNameT, setStyleT } from '../interface/css';
import createGridCss from '../div/functions/createGrid.css';
import createBgCss from '../div/functions/createBg.css';
import { createFontColorCss } from '../div/functions/createFontColor.css';
import { creatFlexCss } from '../div/functions/createFlex.css';
import { createBdCss } from '../div/functions/createBd.css';
import { createTransition } from '../div/functions/createTransition';
import { attributeGrop, config } from '../config/config';
import createPixCss from '../div/functions/createPix.css';
import createPositionCss from '../div/functions/createPosition.css';
import { camelToHyphen } from '../untils';
import abbreviationToFull, { getPxsSort } from './abbreviationToFull';
import { createHoverCss } from '../div/functions/createHover.css';
import type { logOutF } from './vite-plugin-propStyleCompileDom';
import { analyzeStringEnhanced, generateBindProp, generateProp } from './functions';

type injectedCSST = {key:string,value:myCSSStyleDeclaration,sort:number}[]

interface optionsT{
  code:string
  WGroupNames:string[]
  injectedCSS:injectedCSST
}

const mergeProps = [
  "flex",
  "grid",
  "bd",
  "bg",
  "position",
  "hover"
]

const transformStyleName:{[key:string]:string} = {
  borderTopWidth:'bd-t',
  borderBottomWidth:'bd-b',
  borderLeftWidth:'bd-l',
  borderRightWidth:'bd-r',
  borderLeftColor:'bd-l-c',
  borderRightColor:'bd-r-c',
  borderTopColor:'bd-t-c',
  borderBottomColor:'bd-b-c',
  backgroundColor:'bg-c',
  backgroundPositionX:'bpx',
  backgroundPositionY:'bpy',
  top:'position-t',
  bottom:'position-b',
  left:'position-l',
  right:'position-r',
  zIndex:'z'
}


export function compieCore({code,WGroupNames,injectedCSS}:optionsT,logOut:logOutF,id:string){ 
  return  restoreEscape(transformTemplate(code,
    (match)=>{  //coreNode
      // logOut({match},'卧槽'); 
      // console.log('match=>',match);  
      const ast:RootNode = parse(match)
      eachTree(ast,(node)=>{

        const styles = {} as myCSSStyleDeclaration
        const className:{[key:string]:Boolean} ={}

        // const setClassWihoutName:setClassNameT = (name) =>{
        //   injectCssByClassName(name,injectedCSS)
        // }
        //如果是WGroup组件，则将自有属性添加到子组件
        if(WGroupNames.includes(node.tag)){
          // generateCSS(Object.assign(node),className,injectedCSS,false,logOut,id)
          // console.log({node},{props:node.props?.[0]}); 
          const afterMergeProps:Function[] = []

          for(let prop of node.props){

            for( let child of node.children.filter((item:any)=>1 === (item.type))){ 
              //处理 cus-props的情况
              if(prop.name === 'bind'&&[':cus-props',':cusProps',':CusProps'].includes(prop.rawName)){
                const cusProps = prop.exp.content.slice(1,-1).split(',')
                // console.log(cusProps);
                for(let cusProp of cusProps){

                  const [key,...value] = cusProp.split(':')
                  
                  const trueValue = value.length===0? key : value.join(':')
                  
                  // console.log(key,trueValue,value);
                  if(child.props.map((item:any)=>{return item.name==='bind'? item.rawName.replace(':','') : item.name}).includes(key)){
                    continue
                  }
                  //检验value字面量
                  const enhanced = analyzeStringEnhanced(trueValue)
                  // console.log({enhanced});
                  if(['invalid','unknown'].includes(enhanced.type)){
                    throw new Error(`${enhanced.type} prop value: ${trueValue} in ${node.tag} component`)
                  }
                  //字符串，则创建普通prop属性，表达式、数字、变量则创建bind属性
                  const newProp = enhanced.type ==='string'?generateProp(key,trueValue):generateBindProp(key,trueValue)
                  child.props.push(newProp)
                  
                }

                continue
              }
          
            // console.log('child=>',prop.name,{child,prop});    


            //自有属性? 
              let isSelft:boolean = false 
              
              for(let childProp of child.props){
                const propName = prop.name === 'bind'? prop.rawName.replace(':','') : prop.name.replace(/s.-|static-/,'')
                
                const childPropName = childProp.name === 'bind'? childProp.rawName.replace(':','') : childProp.name
                
                const stateProp = prop.name === 'bind'? 0 : 1
                const steteChildProp = childProp.name === 'bind'? 2 : 4
                const stateGroup = stateProp + steteChildProp
         
                
                const acition:{[key:number]:Function} = { 
                  2:()=>{//两个都是Bind属性  
                    childProp.exp.content = childProp.exp.content.replace(/"/g,'') +"+ ' ' +"+prop.exp.content.replace(/"/g,'')
                  },
                  3:(child=childProp,parent=prop)=>{//父不为bind，子为bind
                    child.exp.content = child.exp.content.replace(/"/g,'') +" + ' "+parent.value.content.replace(/'/g,'\\\'')+"'"
                  },
                  4:()=>{//子不为bind，父为bind
                    const temp2 = JSON.parse(JSON.stringify(prop))
                    const bindProp = {
                      name:temp2.name,
                      exp:temp2.exp,
                      type:temp2.type,
                      rawName:temp2.rawName,
                      arg:temp2.arg,
                    }
                    
                    afterMergeProps.push(()=>child.props.push(bindProp))
                    // console.log(4,{temp2,childProp});   

                  },
                  5:()=>{//两个都是普通属性
                    childProp.value.content =  prop.value.content + " " + childProp.value.content 
                    // console.log(childProp.value.content);
                    
                  },
                }
                // if() 

                if(propName === childPropName){
                  // if(propName === 'hover'){
                  //   console.log(stateGroup,'stateGroup',propName);     
                  // }
                  
                  isSelft = true
                  if(mergeProps.includes(propName)){
                    // console.log({child,prop},'--------------');
                    acition?.[stateGroup]?.() 
                    // console.log({childProp});  
                    
                    
                  }
                }
                
           


              }

              if(!isSelft){
                child.props.push(prop) 
              } 
              // if(prop.name==='bind'&&[':cus-props',':cusProps',':CusProps'].includes(prop.rawName)){
              //     // child.props.push(prop) 
              //     // console.log(child.props,'child.props');
                  
              // }
            // console.log(isSelft,prop);
            
            }
          }

          afterMergeProps.forEach((item:Function)=>{
            item()
          })
          //清空WGroup的自有属性
          node.props.length = 0
          // console.log(node.children[0].props,'卧槽');    
          //添加删除标识
          node.tag = 'will-be-replace'
          // console.log(node); 
          
        }


        
        const nodeClassName = 'class'
        const nodeStyleName = 'style'
        let {classIndex,styleIndex} = generateCSS(node,className,injectedCSS,true,logOut,id)
        // console.log({classIndex,styleIndex});
        
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
            // logOut(node.props[node.props.length-1].value.content);
          }else{
            node.props[classIndex].value.content +=' '+classString 
            // logOut(node.props[classIndex].value.content);
          }
        }
        if(styleString.length>0){
          if(styleIndex === -1){
            
            node.props.push({
              type: 6,
              name: nodeStyleName,
              value: {
                type: 2,
                content: styleString, 
              },
              
            })
            // logOut(node.props[node.props.length-1].value.content);
          }else{
            node.props[styleIndex].value.content +=';'+styleString 
            // logOut(node.props[styleIndex].value.content);
          }
        }
        // logOut({styles,className});
        
        
          

      },()=>{})
      const newTmeplate = generateTemplate(ast)
      // logOut({newTmeplate},'--------------------------------------');

      return newTmeplate
    },
    (match)=>{ //useClass *********************************************************************************************************************
      const format = match.replace(/\r\n/g,'').trim()
      // console.log({format});

      const [prop,value,expects] = format.replace('useClass(','').slice(0,-1).split(/,(?![^\[]*\])/)
      const enhanced = analyzeStringEnhanced(value)
      const enhancedProp = analyzeStringEnhanced(prop)
      // console.log({prop,value,expects,enhanced,enhancedProp});
      //只允许字面量为字符串
      if(enhanced.type==='string'&&enhancedProp.type==='string'){
        if(enhancedProp.value in createStyles||attributeGrop.includes(enhancedProp.value)){
          injectedCSSAnly(enhancedProp.value,enhanced.value,injectedCSS,logOut)
        }else{
          throw new Error(`useClass得到了一个非法的Prop名称  ${enhancedProp.value}`)
        }
      }else{
        throw new Error(`useClass 的字面量只能为字符串`)
      }
      if(expects !== void 0){
        const values = expects.slice(1,-1).split(',')
        // console.log({values});
        for(let value of values){
          const enhancedValue = analyzeStringEnhanced(value)
          if(enhancedValue.type==='string'){
            injectedCSSAnly(enhancedProp.value,enhancedValue.value,injectedCSS,logOut)
          }
        }
        
      }
      return value
    }
  )).replace(/<will-be-replace>|<\/will-be-replace>/g,'')
}


//匹配template标签
function transformTemplate(html: string,template:(match:string)=>string,useClass:(match:string)=>string){//,attrs:string,content:string)=>string) {
  // 对script标签里面的template标签进行转义
  return html.replace(/<script[\s\S]*<\/script>/g,(match)=>{
    return setEscapeArr(match,[
      {key:'<template',escapeChart:'template'},
      {key:'</template',escapeChart:'templateEnd'},
    ])
    // return setEscape(setEscape(match,'<template','template'),'</template','templateEnd')
  }).replace(
    /<template[\s\S]*<\/template>/g,
    (match) => { 
      return template(setEscapeArr(match,[
        {key:'&',escapeChart:'AMT'},
        {key:'@',escapeChart:'AT'}
      ]))//, attrs, content) 
    } 
  ).replace(
    /useClass\s*\([\s\S]*?\)\s*(?=[);,}\n]|$)/g,
    useClass
  )
}
 
//遍历ast树
function eachTree(node:any,callback:(node:any,index:number,parent:any)=>void,logOut:any){
  if(node.children){
    for(let i=0;i<node.children.length;i++){
      if(node.children[i].type === 1){
        // logOut('\nnode=>'+i,node.children[i].tag);
        
        callback(node.children[i],i,node)

        eachTree(node.children[i],callback,logOut)
      }
    } 
  }
}



//接收一个node节点并生成css样式
function generateCSS(node:any,className:{[key:string]:Boolean} ={},injectedCSS:injectedCSST =[],wGroupProp:boolean=true,logOut:logOutF,id:string){
        // logOut({node,nodeClassName,nodeStyleName});
  let classIndex = -1
  let styleIndex = -1
  const nodeClassName = 'class'
  const nodeStyleName ='style'
        
  for(let i=0;i<node.props.length;i++){  
    const prop = node.props[i]
    //排除bind属性
    if(prop.name !== 'bind'){
      // logOut('prop=>'+i,prop.type,{[prop.name]:prop.value?.content});  
      classIndex = prop.name === nodeClassName? i:classIndex
      styleIndex = prop.name === nodeStyleName? i:styleIndex 
      // if(prop.name.startsWith('static-')){
      //   prop.name = prop.name.replace('static-','')
      // }
      if(allProps.includes(prop.name)){ 
        const propName = prop.name.replace(/static-|static|s.-/g,'').toLowerCase()
        // if(prop.name.startsWith('static-'))
        // console.log([prop.name,propName,'propName',node.tag],1111111111111111111111111,{prop});  
        
        const setStyle:setStyleT = (styleName,value) =>{  
          // console.log(styleName,value);
          
          const match:{[key:string]:string} = { 
            'px':'',
            '#':'c',
            '%':'p', 
            '(':'_',
            ')':'_',  
            ' ':'-',
            '+':'_',
            '-':'__',
            '*':'___',
            '\/':'____', 
            ',':'-',
            '.':'-',
            '"':'_',
            ":":'_'
          }
          const transformName = transformStyleName[<string>styleName] || propName
          
          let key = `${<string>transformName}-${String(value).replace(/(px|\/|#|%|\(|\)| |\+|\-|\*|\/|,|\.|"|:)/g,(_match)=>{
            // console.log(_match,index,str,'?');    
            return match[_match]||'' 
          })}`
          // console.log({transformName,key});
          
          if(propName === 'hover'){
            key = `hover-${key.replace(/hover-/g,'')}`
          }
          logOut({message:{styleName,value,key,transformName},fucName:'generateCSS',id,time:Date.now()})
          // if(propName === 'position')
          // console.log({propName,value,key,styleName,transformName},'style');
          
          if(value !== void 0){
            if(wGroupProp)className[key] = true;
            if(!checkClassWrited(injectedCSS,'.'+key)){ 
              injectedCSS.push({
                key:'.'+key,
                value:<myCSSStyleDeclaration>{ 
                  [styleName]:value
                },
                sort:getPxsSort(<string>propName,<string>styleName) 
              })
            }
            // console.log(injectedCSS);
            
          }else{
            className[key] = false;
          }

          
    
        }
        const setClassName:setClassNameT = (name,value=true) =>{
          
          if(propName === 'hover'){
            name = `hover-${name.replace(/hover-/g,'')}`
          }
          if(wGroupProp){
            className[name]= value  
          }
          if(value) injectCssByClassName(name,injectedCSS,logOut) 
        }
        
        if(attributeGrop.includes(propName)){

          createPixCss(propName,prop.value?.content,setClassName,setStyle,'node')
        }
        else{

          // try{
            
            createStyles[propName]?.(prop.value?.content||'',setClassName,setStyle) 

          // }catch(e){
          //   // console.log(e);
             
          //   const sourceLine = node.loc.source.split('\n')[0]
          //   const start = prop.loc.start.column-prop.name.length
          //   const end = prop.loc.end.column-prop.name.length
          //   throw new Error(
          //     `${prop.name} 得到了一个错误的值：${prop.value?.content}\n`+
          //     `at line ${prop.loc.start.line} column ${prop.loc.start.column}\n  `+
          //     sourceLine.slice(0,start)+underline(sourceLine.slice(start,end))+sourceLine.slice(end)+'\n'
          //   )
          // }
        } 
        // console.log({classIndex,styleIndex},i);
        

        // createStyles[prop.name]?.(prop.value?.content,setClassName,setStyle) 
        if(wGroupProp){
          node.props.splice(i--,1)
        }
      } 
    }

  }
  return {classIndex,styleIndex}
}
//只注入css样式,不用考虑类名的注入
function injectedCSSAnly(prop:string,content:string,injectedCSS:injectedCSST =[],logOut:logOutF){
  // console.log('injectedCSSAnly\n'); 
  
  const setStyle:setStyleT = (name,value) => {
    const key = `${prop}-${String(value).replace(/px|\(|,|\)| |\./g,'').replace(/\//g,'-').replace(/#/g,'c')}`
    if(value !== void 0){
      if(!checkClassWrited(injectedCSS,'.'+key)){
        const injectedCSSItem = {
          key:'.'+key,
          value:<myCSSStyleDeclaration>{
            [name]:value
          },
          sort:0
        }
        injectedCSS.push(injectedCSSItem)
        // console.log({injectedCSSItem});
      }

    }
  
  }
  const setClassName:setClassNameT = (name,value=true) =>{
    if(!value)return
    injectCssByClassName(name,injectedCSS,logOut)
  }
  if(attributeGrop.includes(<keyof Pxs>prop)){
    createPixCss(prop,content,setClassName,setStyle,'node')
  }else{
  createStyles[prop](content,setClassName,setStyle) 

  }
  

}

function injectCssByClassName(className:string,injectedCSS:injectedCSST =[],logOut:logOutF){
  const [full,relValue,sort] = abbreviationToFull(className.replace(/hover-/g,''),logOut)
  const key = '.'+className
  
  if(full!==void 0&& !checkClassWrited(injectedCSS,key)){
    const value = (typeof relValue === 'object'? relValue : {[full]:relValue}) as myCSSStyleDeclaration
    injectedCSS.push({
      key,
      value,
      sort
    })
  }
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

//用到的转义
const usedEscape: {[key:string]:string} = {}
//设置转义
// function setEscape(text:string,target:string,escapeChar:string){
//   usedEscape[target] = escapeChar
//   return text.replace(new RegExp(target,'g'),`{→_→_PropStyle_${escapeChar.toLowerCase()}_${escapeChar.toUpperCase()}_←_←_0_0_X_X}`)
// }
//批量设置转义
function setEscapeArr(text:string,target:{key:string,escapeChart:string}[]){
  // const temp:{[key:string]:string} = {}
  const test = new RegExp(target.map((item)=>{
    // temp[item.key] = item.escapeChart
    usedEscape[item.key] = item.escapeChart
    return item.key
  }).join('|'),'g')
  return text.replace(test,(match)=>{
    const escapeChar = usedEscape[match]
    return `{→_→_PropStyle_${escapeChar.toLowerCase()}_${escapeChar.toUpperCase()}_←_←_0_0_X_X}`
  })
}
//还原转义
function restoreEscape(text: string){
  for(let key in usedEscape){
    const escapeChar = usedEscape[key]
    text = text.replace(new RegExp(`{→_→_PropStyle_${escapeChar.toLowerCase()}_${escapeChar.toUpperCase()}_←_←_0_0_X_X}`,'g'),key)
  }
  return text
}

//获取要解析的属性
const allProps = [
  ...Object.keys(config.props), 
  ...Object.keys(config.props).map(item=>`static-${item}`),
  ...Object.keys(config.props).map(item=>`static${item[0].toUpperCase()}${item.slice(1)}`),
  ...Object.keys(config.props).map(item=>`s.-${item}`),//设置s.语法糖
]
// console.log(allProps,'allProps');

//生成样式函数
const createStyles:{[key:string]:Function} = {
  grid:createGridCss,
  bg:createBgCss,
  c:createFontColorCss,
  flex:creatFlexCss,
  bd:createBdCss,
  transition:createTransition,
  position:createPositionCss,
  attributeGrop:createPixCss,
  hover:createHoverCss
}
//检查这个样式有没有被书写过
function checkClassWrited(css:injectedCSST,name:string){
  for(let i=0;i<css.length;i++){
    if(css[i].key === name){
      return true
    }
  }
  return false
}


//下划线(node环境下)
// function underline(text: string): string {
//   return `\x1b[4m${text}\x1b[0m`;
// }