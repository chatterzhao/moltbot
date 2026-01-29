#!/usr/bin/env bun
/**
 * Bun 开发环境构建脚本
 * 使用 Bun 运行 TypeScript 构建流程
 */

import { $ } from 'bun';
import { existsSync } from 'fs';
import { join } from 'path';

const ROOT_DIR = process.cwd();

console.log('🚀 开始开发环境构建 (Bun)...');

// 清理 dist 目录
async function cleanDist() {
  console.log('🧹 清理 dist 目录...');
  if (existsSync(join(ROOT_DIR, 'dist'))) {
    await $`rm -rf ${join(ROOT_DIR, 'dist')}`;
  }
}

// 打包 A2UI
async function bundleA2UI() {
  console.log('📦 打包 A2UI...');
  await $`bash ${join(ROOT_DIR, 'scripts/bundle-a2ui.sh')}`;
}

// TypeScript 编译
async function buildTypeScript() {
  console.log('🔨 TypeScript 编译...');
  await $`bunx tsc -p ${join(ROOT_DIR, 'tsconfig.json')}`;
}

// 复制 A2UI 文件
async function copyA2UI() {
  console.log('📋 复制 A2UI 文件...');
  await $`bun ${join(ROOT_DIR, 'scripts/canvas-a2ui-copy.ts')}`;
}

// 复制 hook 元数据
async function copyHookMetadata() {
  console.log('📋 复制 hook 元数据...');
  await $`bun ${join(ROOT_DIR, 'scripts/copy-hook-metadata.ts')}`;
}

// 写入构建信息
async function writeBuildInfo() {
  console.log('📝 写入构建信息...');
  await $`bun ${join(ROOT_DIR, 'scripts/write-build-info.ts')}`;
}

// 主构建流程
async function main() {
  try {
    await cleanDist();
    await bundleA2UI();
    await buildTypeScript();
    await copyA2UI();
    await copyHookMetadata();
    await writeBuildInfo();
    console.log('✅ 开发环境构建完成!');
  } catch (error) {
    console.error('❌ 构建失败:', error);
    process.exit(1);
  }
}

main();