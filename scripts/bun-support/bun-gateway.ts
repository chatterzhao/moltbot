#!/usr/bin/env bun
/**
 * Bun Gateway 启动脚本
 */

import { $ } from 'bun';
import { join } from 'path';

const ROOT_DIR = process.cwd();

console.log('🚀 启动 Gateway (Bun)...');

async function main() {
  const args = process.argv.slice(2);

  try {
    // 使用 Bun 直接运行
    if (args.length > 0) {
      await $`bun run dist/index.js gateway ${args}`;
    } else {
      await $`bun run dist/index.js gateway`;
    }
  } catch (error) {
    console.error('❌ Gateway 启动失败:', error);
    process.exit(1);
  }
}

main();