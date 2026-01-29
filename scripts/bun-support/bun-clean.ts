#!/usr/bin/env bun
/**
 * Bun 清理脚本
 * 清理构建产物和临时文件
 */

import { $ } from 'bun';
import { existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const ROOT_DIR = process.cwd();

console.log('🧹 开始清理 (Bun)...');

// 获取命令行参数
const args = process.argv.slice(2);
const isDeep = args.includes('--deep');
const isDryRun = args.includes('--dry-run');

// 清理目录列表
const cleanDirs = [
  'dist',
  '.turbo',
  '.vite',
  'coverage',
  'node_modules/.cache',
];

// 深度清理目录列表
const deepCleanDirs = [
  ...cleanDirs,
  'node_modules',
];

// 清理文件模式列表
const cleanPatterns = [
  '**/*.log',
  '**/.DS_Store',
  '**/Thumbs.db',
  '**/*.tsbuildinfo',
];

// 清理目录
async function cleanDirectory(dir: string) {
  const dirPath = join(ROOT_DIR, dir);

  if (!existsSync(dirPath)) {
    console.log(`⏭️  跳过不存在的目录: ${dir}`);
    return;
  }

  if (isDryRun) {
    console.log(`🔍 将删除目录: ${dirPath}`);
    return;
  }

  console.log(`🗑️  删除目录: ${dirPath}`);
  await $`rm -rf ${dirPath}`;
}

// 清理文件
async function cleanFiles(pattern: string) {
  if (isDryRun) {
    console.log(`🔍 将删除文件模式: ${pattern}`);
    return;
  }

  console.log(`🗑️  删除文件模式: ${pattern}`);
  await $`find ${ROOT_DIR} -type f -name "${pattern}" -delete`;
}

// 主清理流程
async function main() {
  const dirsToClean = isDeep ? deepCleanDirs : cleanDirs;

  try {
    // 清理目录
    for (const dir of dirsToClean) {
      await cleanDirectory(dir);
    }

    // 深度清理时清理文件
    if (isDeep) {
      for (const pattern of cleanPatterns) {
        await cleanFiles(pattern);
      }
    }

    if (isDryRun) {
      console.log('✅ 清理预览完成 (未实际删除)');
    } else {
      console.log('✅ 清理完成!');
    }
  } catch (error) {
    console.error('❌ 清理失败:', error);
    process.exit(1);
  }
}

main();