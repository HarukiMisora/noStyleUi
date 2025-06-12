

import type { Plugin } from 'vite';
import compiePre from './compiePre';
// type entityType = 'nbsp'|'lt'|'gt'|'quot'|'#39'|'amp'|'copy'|'reg'|'trade'|'times'|'divide'
interface PluginOptions {
  justForBuild?: boolean; // 仅在构建时生效
  wGroupSpecialName?: string[]; // WGroup用到过的别名
  debug?: boolean; // 调试模式
  log?:(...args:any[])=>void // 日志函数 
  indexFile?:(url:string)=>boolean // 入口文件
  includePath?:string[] // 包含的目录
  excludePath?:string[] // 排除的目录
}


export default async function propStyleCompile(options:PluginOptions={}):Promise<Plugin>{ 
  const justForBuild = options.justForBuild || false;
  if(justForBuild)return {name:'prop-style-compile'} //什么都不做
  // const logOut = options.debug? (options.log || console.log):()=>{}
  const WGroupNames = [...(options.wGroupSpecialName || []),'w-group','WGroup','wGroup'];
  const indexFile = options.indexFile || function (url){return url.includes('src/main.')};
  // const injectedCSS = [] as {key:string,value:myCSSStyleDeclaration}[]
  const includePath = options.includePath || ['src/'];
  const excludePath = options.excludePath || [];
  const VIRTUAL_CSS_ID = 'virtual:prop-style-compile-css'
  let RESOLVED_VIRTUAL_CSS_ID = '\0' + VIRTUAL_CSS_ID+'.css'; 
  let {globalCSS,newCodes} = await compiePre(includePath,excludePath,WGroupNames); 

  //扫描.vue文件，收集所有组件的style，并返回style和新的code
  // let server = null as any; // 保存 ViteDevServer 实例
  return {
    name: 'prop-style-compile',
    enforce: 'pre',
 
    configureServer() {
      
      // server = ser; // 保存 ViteDevServer 实例
    },
    resolveId(id) {
      if (id === VIRTUAL_CSS_ID || id === RESOLVED_VIRTUAL_CSS_ID) return RESOLVED_VIRTUAL_CSS_ID;
    },
    load(id) {
      
      if (id.startsWith(RESOLVED_VIRTUAL_CSS_ID)) { 
        return {
          code: globalCSS,  
          map: null,
          // 标记为 CSS 资源
          meta: { vite: { isCSS: true,lang:'css' },id:'asd' }
        };
      }
    }, 
    transform(code, id) {
      // 入口文件处理
      if (indexFile(id)) {
        const injectImortJs = `
          import '${VIRTUAL_CSS_ID}';
        `
        const injectHRM = `
          if (import.meta.hot) {
            import.meta.hot.on('special-update', (data:{globalCSS:string}) => {
              // 执行自定义更新
              console.log('[prop-style] hot update', data.changeFile);
              const styles= document.getElementsByTagName('style')
              console.log(styles)
              let propStyle:any = null
              for (let i = 0; i < styles.length; i++) {
                const style = styles[i]
                
                if (style.textContent?.startsWith(\`/* propStyleCompie */\`)) {
                  propStyle = style
                  propStyle.textContent = data.globalCSS

                }
              }
              // console.log(propStyle,data.globalCSS);
            })
          }
        `
        return `${injectImortJs}\n${code}\n${injectHRM}`


        // return code.replace(/<script?[^>]*>/, (match, p1) => {
        //   console.log({match,p1});
        //   return match + `
        //     import '${VIRTUAL_CSS_ID}'
          
        //   `
        // })
      }
      
      // Vue 文件处理
      if (id.endsWith('.vue')) {
        const normalizedId = id.replace(/\//g, '\\');
        // console.log(newCodes,{normalizedId}); 
        
        if (newCodes[normalizedId]) {
          console.log({new:newCodes[normalizedId]});
          
          return { code: newCodes[normalizedId], map: null };
        }
      }
      
      return code;
    },
    
    async handleHotUpdate({ file, server }) {
      if (file.endsWith('.vue')){
        globalCSS = ''
        console.log(`[prop-style-compile] File changed: ${file}`);
        // 重新编译
        const result = await compiePre(includePath, excludePath, WGroupNames);
        globalCSS = result.globalCSS;
        newCodes = result.newCodes;
        
        // 处理虚拟模块更新
        const virtualModule = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_CSS_ID); 
        if (virtualModule) {
            server.moduleGraph.invalidateModule(virtualModule);
            server.ws.send({
            type: 'custom',
            event: 'special-update',
            data: {
              globalCSS,
              changeFile: file,
            }
          })
          
        }

        const vuewModule = server.moduleGraph.getModuleById(file); 
        const updates = []
        if (vuewModule) {
          server.moduleGraph.invalidateModule(vuewModule);
          updates.push(vuewModule)
        }

        return updates;
      }
    }
  }
}

