#!/usr/bin/env bun
/**
 * Bun 代码检查脚本
 * 使用 Oxlint 进行代码检查
 */

import { $ } from 'bun';
import { join } from 'path';

const ROOT_DIR = process.cwd();

console.log('🔍 开始代码检查 (Bun)...');

// 获取命令行参数
const args = process.argv.slice(2);
const isFix = args.includes('--fix');
const isAll = args.includes('--all');

// 运行 TypeScript/JavaScript lint
async function runLint() {
  console.log('🔍 检查 TypeScript/JavaScript 代码...');
  if (isFix) {
    await $`bunx oxlint --type-aware --fix src test`;
  } else {
    await $`bunx oxlint --type-aware src test`;
  }
}

// 运行 Swift lint
async function runSwiftLint() {
  console.log('🔍 检查 Swift 代码...');
  await $`bunx swiftlint lint --config ${join(ROOT_DIR, '.swiftlint.yml')} && cd ${join(ROOT_DIR, 'apps/ios')} && bunx swiftlint lint --config .swiftlint.yml`;
}

// 主 lint 流程
async function main() {
  try {
    await runLint();

    if (isAll) {
      await runSwiftLint();
    }

    console.log('✅ 代码检查完成!');
  } catch (error) {
    console.error('❌ 代码检查失败:', error);
    process.exit(1);
  }
}

main();