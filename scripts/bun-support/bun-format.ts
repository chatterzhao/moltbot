#!/usr/bin/env bun
/**
 * Bun 代码格式化脚本
 * 使用 Oxfmt 进行代码格式化
 */

import { $ } from 'bun';
import { join } from 'path';

const ROOT_DIR = process.cwd();

console.log('🎨 开始代码格式化 (Bun)...');

// 获取命令行参数
const args = process.argv.slice(2);
const isFix = args.includes('--fix') || args.includes('--write');
const isAll = args.includes('--all');
const isCheck = args.includes('--check');

// 运行 TypeScript/JavaScript 格式化
async function runFormat() {
  console.log('🎨 格式化 TypeScript/JavaScript 代码...');
  if (isFix) {
    await $`bunx oxfmt --write src test`;
  } else {
    await $`bunx oxfmt --check src test`;
  }
}

// 运行 Swift 格式化
async function runSwiftFormat() {
  console.log('🎨 格式化 Swift 代码...');
  await $`bunx swiftformat --lint --config ${join(ROOT_DIR, '.swiftformat')} ${join(ROOT_DIR, 'apps/macos/Sources')} ${join(ROOT_DIR, 'apps/ios/Sources')} ${join(ROOT_DIR, 'apps/shared/MoltbotKit/Sources')}`;
}

// 主格式化流程
async function main() {
  try {
    await runFormat();

    if (isAll) {
      await runSwiftFormat();
    }

    if (isCheck && !isFix) {
      console.log('✅ 代码格式检查完成!');
    } else {
      console.log('✅ 代码格式化完成!');
    }
  } catch (error) {
    console.error('❌ 代码格式化失败:', error);
    process.exit(1);
  }
}

main();