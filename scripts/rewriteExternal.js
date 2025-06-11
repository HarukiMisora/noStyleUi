


import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '../dist');

if (fs.existsSync(distPath)) {
  let files = fs.readdirSync(distPath);
  files.forEach(file => {
    if(file.startsWith('__vite-browser-external')){
      fs.writeFileSync(
        path.join(distPath, file),
        `
import e from 'fs'
export {
  e as default
};
        `
      );
      fs.renameSync(path.join(distPath, file), path.join(distPath, file.replace('__vite-browser-external', 'prop-style-compie-external')));
    }
  })
  let code = fs.readFileSync(path.join(distPath, 'no-style-ui.es.js'),"utf-8");
  let newCode = code.replace(/__vite-browser-external/g, 'prop-style-compie-external');
  fs.writeFileSync(path.join(distPath, 'no-style-ui.es.js'), newCode);

} else {
    console.log('没有找到 dist 目录');
}