



import type { Plugin } from 'vite';
import { config } from '../config/config';
import type { keyofCSSStyleDeclaration, myCSSStyleDeclaration, Pxs, setClassNameT, setStyleT } from '../interface/css';
import createBgCss from '../div/functions/createBg.css';
import createGridCss from '../div/functions/createGrid.css';
import { createTransition } from '../div/functions/createTransition';
import { createBdCss } from '../div/functions/createBd.css';
import { creatFlexCss } from '../div/functions/createFlex.css';
import { createFontColorCss } from '../div/functions/createFontColor.css';

export default function propStyleCompile():Plugin{
  return {
    name: 'prop-style-compile',
    enforce: 'pre',

    transform(code, id) {
      if (id.endsWith('.vue')) {
        //匹配开标签
        const newCode = code.replace(/(<(?!\/)[^>]*>)/g,(match)=>{
          if(match.includes('w-group')||match.includes('Wgroup')){
            return match
          }
          console.log('\n正在解析一个标签头',{match})
          const styles = {} as myCSSStyleDeclaration
          const className:{[key:string]:Boolean} ={}
          const setClassName:setClassNameT = (name,value=true) =>{
            className[name]= value
          }
          const setStyle:setStyleT = (name,value) =>{
            styles[name] = value
          }
          //匹配prop属性
          const res = match.replace(/([:a-zA-Z0-9-]+)=("[^"]*")/g, (match, prop, value:string) => {
            console.log(`${prop}=>`,{match , value});

            if (allProps.includes(prop)){

              if(attributeGrop.includes(prop)){
                if(prop[0] ==='$'){
                  styles[<keyofCSSStyleDeclaration>attributeGropStyle[<keyof Pxs>prop]] = value.slice(1)
                }
                else{
                    className[`${prop}-${value.slice(1,-1)}`] = true
                    delete styles[<keyofCSSStyleDeclaration>attributeGropStyle[<keyof Pxs>prop]]
                }

              }else{
                createStyles[prop]?.(value.slice(1,-1),setClassName,setStyle)
              }


              return prop === 'hover'?match:''
            }
            
            return match 
          }).slice(0,-1)+
          (Object.keys(className).length?` class="${Object.keys(className).join(' ')}"`:'')+
          (Object.keys(styles).length?` style='${JSON.stringify(styles)}'`:'')+`>`

          console.log('得到样式',{styles,className});
          console.log('最终标签',res)

          return res

        })
        // const newCode = code.replace(/([:a-zA-Z0-9-]+)=("[^"]*")/g, (match, prop, value) => {
        //   console.log({match, prop, value});
        //   if (allProps.includes(prop)){
        //     return ''
        //   }
        //   return match
        // })
        console.log(newCode);
        return {
          code:newCode
        };
      }
    }
  }
}
const allProps = Object.keys(config.props)
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

