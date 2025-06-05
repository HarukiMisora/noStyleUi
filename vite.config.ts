import { defineConfig ,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import {propStyleCompile} from './src/interface'
// import {propStyleCompile} from './dist/no-style-ui.es.js'
const pathResolve = (dir: string) => resolve(__dirname, dir)


// https://vite.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd());
  let buildWhat:string|'pack'|'test' = 'pack'

  console.log({mode});
  

  return { 
    plugins: [ 
      vue(),
      propStyleCompile({    
        debug: false,  
        justForBuild: false, 
        // entity:'all'
      })
    ],
    resolve: { 
      alias: { 
        '@': pathResolve('./src')  // 确保别名配置正确 
      }
    },
    server:{ 
      port:8088
    },
    build: buildWhat === 'pack'?({
      lib: {
        entry: pathResolve('./src/index.ts'),  
        name: 'noStyleUi',
        fileName: (format) => `no-style-ui.${format}.js` 
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖 
        external: ['vue'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue'
          }
        }
      },
      outDir: 'dist' // 指定输出目录
    }):({}),
  }
})
