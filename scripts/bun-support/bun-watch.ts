#!/usr/bin/env bun
/**
 * Bun 开发模式监听脚本
 * 使用 Chokidar 监听文件变化并自动构建
 */

import { $ } from 'bun';
import { watch } from 'chokidar';
import { join } from 'path';

const ROOT_DIR = process.cwd();

console.log('👀 启动开发模式监听 (Bun)...');

// 监听路径
const watchPaths = [
  join(ROOT_DIR, 'src/**/*.ts'),
  join(ROOT_DIR, 'test/**/*.ts'),
  join(ROOT_DIR, 'scripts/**/*.ts'),
  join(ROOT_DIR, 'tsconfig.json'),
];

// 忽略路径
const ignorePaths = [
  '**/dist/**',
  '**/node_modules/**',
  '**/.git/**',
  '**/*.test.ts',
];

// 防抖时间（毫秒）
const DEBOUNCE_TIME = 500;

// 构建函数
async function build() {
  console.log('🔨 检测到文件变化，开始构建...');
  try {
    await $`bun ${join(ROOT_DIR, 'scripts/bun-support/bun-build-dev.ts')}`;
    console.log('✅ 构建完成!');
  } catch (error) {
    console.error('❌ 构建失败:', error);
  }
}

// 防抖函数
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

function debouncedBuild() {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(() => {
    build();
    debounceTimer = null;
  }, DEBOUNCE_TIME);
}

// 初始化监听器
function initWatcher() {
  const watcher = watch(watchPaths, {
    ignored: ignorePaths,
    persistent: true,
    ignoreInitial: true,
  });

  watcher
    .on('change', (path) => {
      console.log(`📝 文件变更: ${path}`);
      debouncedBuild();
    })
    .on('add', (path) => {
      console.log(`➕ 新增文件: ${path}`);
      debouncedBuild();
    })
    .on('unlink', (path) => {
      console.log(`🗑️ 删除文件: ${path}`);
      debouncedBuild();
    })
    .on('error', (error) => {
      console.error('❌ 监听器错误:', error);
    });

  console.log('✅ 监听器已启动，按 Ctrl+C 退出');
}

// 主流程
async function main() {
  try {
    // 首次构建
    console.log('🔨 首次构建...');
    await build();

    // 启动监听器
    initWatcher();
  } catch (error) {
    console.error('❌ 启动失败:', error);
    process.exit(1);
  }
}

// 处理退出信号
process.on('SIGINT', () => {
  console.log('\n👋 停止监听...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 停止监听...');
  process.exit(0);
});

main();