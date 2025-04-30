



import type { Plugin } from 'vite';
import { config } from '../config/config';

export default function propStyleCompile():Plugin{
  return {
    name: 'prop-style-compile',
    enforce: 'pre',

    transform(code, id) {
      if (id.endsWith('.vue')) {
        const newCode = code.replace(/(<(?!\/)[^>]*>)/g,(match,p1,p2)=>{
          // console.log({match, p1, p2});

          return match.replace(/([:a-zA-Z0-9-]+)=("[^"]*")/g, (match, prop, value) => {
            console.log({match, prop, value});
            
              
              if (allProps.includes(prop)){
                return ''
              }
              return match
            })
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