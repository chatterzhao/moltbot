#!/usr/bin/env bun
/**
 * Bun 运行脚本
 * 直接使用 Bun 运行 TypeScript 代码
 */

import { $ } from 'bun';
import { join } from 'path';

const ROOT_DIR = process.cwd();

console.log('🚀 启动应用 (Bun)...');

// 主函数
async function main() {
  const args = process.argv.slice(2);

  try {
    // 直接使用 Bun 运行主入口
    if (args.length > 0) {
      await $`bun run dist/index.js ${args}`;
    } else {
      await $`bun run dist/index.js`;
    }
  } catch (error) {
    console.error('❌ 启动失败:', error);
    process.exit(1);
  }
}

main();