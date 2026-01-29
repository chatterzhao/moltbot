#!/usr/bin/env bun
/**
 * Bun 测试脚本
 * 使用 Vitest 运行测试
 */

import { $ } from 'bun';
import { join } from 'path';

const ROOT_DIR = process.cwd();

console.log('🧪 开始运行测试 (Bun)...');

// 获取命令行参数
const args = process.argv.slice(2);
const isCoverage = args.includes('--coverage');
const isWatch = args.includes('--watch');
const isUi = args.includes('--ui');
const isRun = args.includes('--run');
const isE2E = args.includes('--e2e');
const isLive = args.includes('--live');
const isForce = args.includes('--force');

// 构建 vitest 命令参数
async function buildVitestArgs() {
  let args = [];

  if (isCoverage) {
    args = ['run', '--coverage'];
  } else if (isRun) {
    args = ['run'];
  } else if (isWatch) {
    args = [];
  }

  if (isUi) {
    args.push('--ui');
  }

  if (isE2E) {
    args.push('--config', join(ROOT_DIR, 'vitest.e2e.config.ts'));
  } else if (isLive) {
    args.push('--config', join(ROOT_DIR, 'vitest.live.config.ts'));
  } else {
    args.push('--config', join(ROOT_DIR, 'vitest.config.ts'));
  }

  return args;
}

// 强制运行测试
async function runForceTests() {
  console.log('🔄 强制运行测试...');
  await $`bun ${join(ROOT_DIR, 'scripts/test-force.ts')}`;
}

// 主测试流程
async function main() {
  try {
    if (isForce) {
      await runForceTests();
    } else {
      const args = await buildVitestArgs();
      console.log(`执行命令: bunx vitest ${args.join(' ')}`);
      await $`bunx vitest ${args}`;
    }
    console.log('✅ 测试完成!');
  } catch (error) {
    console.error('❌ 测试失败:', error);
    process.exit(1);
  }
}

main();