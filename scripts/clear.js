
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '../dist');

if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true });
  console.log('✅ dist 目录已清空');
} else {
  console.log('ℹ️ dist 目录不存在，无需清理');
}



