

import type { Plugin } from 'vite';
import type { myCSSStyleDeclaration } from '../interface/css';
import { compieCore } from './compieCore';
import compileCss from './cpmpieCss';

// type entityType = 'nbsp'|'lt'|'gt'|'quot'|'#39'|'amp'|'copy'|'reg'|'trade'|'times'|'divide'
interface PluginOptions {
  justForBuild?: boolean; // 仅在构建时生效
  wGroupSpecialName?: string[]; // WGroup用到过的别名
  debug?: boolean; // 调试模式
  log?:(...args:any[])=>void // 日志函数 
  indexFile?:(url:string)=>boolean // 入口文件
}



export default function propStyleCompile(options:PluginOptions={}):Plugin{ 
  const justForBuild = options.justForBuild || false;
  if(justForBuild)return {name:'prop-style-compile'} //什么都不做
  const logOut = options.debug? (options.log || console.log):()=>{}
  const WGroupNames = [...(options.wGroupSpecialName || []),'w-group','WGroup','wGroup'];
  const indexFile = options.indexFile || function (url){return url.includes('src/main.')};
  const injectedCSS = [] as {key:string,value:myCSSStyleDeclaration}[]

  const VIRTUAL_CSS_ID = 'virtual:prop-style-compile-css';
  const RESOLVED_VIRTUAL_CSS_ID = '\0' + VIRTUAL_CSS_ID; 
  let globalCSS = '';
  let server = null as any; // 保存 ViteDevServer 实例
  return {
    name: 'prop-style-compile',
    enforce: 'pre',
    configureServer(ser) {
      server = ser; // 保存 ViteDevServer 实例
    },
    resolveId(id) {
      if (id === VIRTUAL_CSS_ID || id === RESOLVED_VIRTUAL_CSS_ID) return RESOLVED_VIRTUAL_CSS_ID+'.css';
    },
    load(id) {
      if (id.startsWith(RESOLVED_VIRTUAL_CSS_ID)) {
        // console.log('[CSS CONTENT]', globalCSS); 
        return {
          code: globalCSS,  
          map: null,
          // 标记为 CSS 资源
          meta: { vite: { isCSS: true } }
        };
      }
    },
    async transform(code, id) {
      // console.log('正在处理',id);
      if(indexFile(id)){
        // console.log('indexFile\n',code.split('\r\n'));
        return `import '${VIRTUAL_CSS_ID}';\r\n${code}`;
      }
      if (id.endsWith('.vue')&&!justForBuild) { 
          const newCode = compieCore({code,WGroupNames,injectedCSS});
          const css = compileCss(injectedCSS);
          console.log(injectedCSS,css);
          if (css) {
            globalCSS += css + '\n'; 
            // 更新样式
            const module = await this.resolve(VIRTUAL_CSS_ID);
            if (module) {
              const cssModule = await server.moduleGraph.getModuleById(module.id);
              if (cssModule) {
                // 清除模块缓存
                server.moduleGraph.invalidateModule(cssModule);
                // 触发浏览器更新
                server.ws.send({
                  type: 'full-reload',
                  path: '*'
                });
              }
            }
            // processedFiles.add(id); 
          } 
          
        return {
          code:newCode,
          // map:id
        };
      }
    },
    handleHotUpdate(ctx) {
      globalCSS = '';
      injectedCSS.length = 0;
      if (ctx.file.endsWith('.vue')) {
        ctx.server.ws.send({
          type: 'custom',
          event: 'css-update',
          data: { timestamp: Date.now() }
        });
      }
    }

  }
}

