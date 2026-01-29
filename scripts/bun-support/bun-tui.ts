#!/usr/bin/env bun
/**
 * Bun TUI 启动脚本
 */

import { $ } from 'bun';
import { join } from 'path';

const ROOT_DIR = process.cwd();

console.log('🚀 启动 TUI (Bun)...');

async function main() {
  const args = process.argv.slice(2);

  try {
    // 使用 Bun 直接运行
    if (args.length > 0) {
      await $`bun run dist/index.js tui ${args}`;
    } else {
      await $`bun run dist/index.js tui`;
    }
  } catch (error) {
    console.error('❌ TUI 启动失败:', error);
    process.exit(1);
  }
}

main();