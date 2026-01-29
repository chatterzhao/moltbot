# Bun Support Scripts

Fully compatible with existing pnpm workflow, no interference.

## Quick Start

```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash

# Install dependencies
cd moltbot
bun run bun:clean # Run when switching from npm/pnpm
bun install
```

## Command Comparison

### Development
| pnpm Command | bun Command | Description |
|--------------|-------------|-------------|
| pnpm dev | bun run bun:dev | Development mode with watch |
| pnpm start | bun run bun:start | Start application |
| pnpm build | bun run bun:build | Build project |

### Build
| pnpm Command | bun Command | Description |
|--------------|-------------|-------------|
| - | bun run bun:build:dev | Development build |
| - | bun run bun:build:prod | Production build |
| - | bun run bun:build:prod --skip-tests | Skip tests |
| - | bun run bun:build:prod --skip-lint | Skip lint |

### Test
| pnpm Command | bun Command | Description |
|--------------|-------------|-------------|
| pnpm test | bun run bun:test | Run tests |
| pnpm test:watch | bun run bun:test:watch | Watch mode |
| pnpm test:coverage | bun run bun:test:coverage | Coverage report |
| pnpm test:e2e | bun run bun:test:e2e | E2E tests |
| pnpm test:live | bun run bun:test:live | Live tests |
| pnpm test:ui | bun run bun:test:ui | Test UI |
| pnpm test:force | bun run bun:test --force | Force run tests |

### Lint
| pnpm Command | bun Command | Description |
|--------------|-------------|-------------|
| pnpm lint | bun run bun:lint | Lint code |
| pnpm lint:fix | bun run bun:lint:fix | Auto fix |
| pnpm lint:all | bun run bun:lint:all | Include Swift |
| pnpm lint:swift | bun run bun:lint:all | Swift lint |

### Format
| pnpm Command | bun Command | Description |
|--------------|-------------|-------------|
| pnpm format | bun run bun:format | Format check |
| pnpm format:fix | bun run bun:format:fix | Auto format |
| pnpm format:all | bun run bun:format:all | Include Swift |
| pnpm format:swift | bun run bun:format:all | Swift format |

### Gateway
| pnpm Command | bun Command | Description |
|--------------|-------------|-------------|
| pnpm gateway:watch | bun run bun:gateway:watch | Watch mode |
| pnpm gateway:dev | bun run bun:gateway:dev | Development mode |
| pnpm gateway:dev:reset | bun run bun:gateway:dev:reset | Reset development |

### TUI
| pnpm Command | bun Command | Description |
|--------------|-------------|-------------|
| pnpm tui | bun run bun:tui | Start TUI |
| pnpm tui:dev | bun run bun:tui:dev | Development mode |

### Clean
| pnpm Command | bun Command | Description |
|--------------|-------------|-------------|
| - | bun run bun:clean | Clean build artifacts |
| - | bun run bun:clean:deep | Deep clean |
| - | bun run bun:clean:preview | Preview clean |

### Other
| pnpm Command | bun Command | Description |
|--------------|-------------|-------------|
| - | bun run bun:watch | File watch |
| pnpm moltbot | bun run bun:start | Start application |

## Notes

- All `bun:` commands are fully powered by Bun, no Node.js dependency
- pnpm commands continue to work normally, no interference
- UI, docs, Docker test commands continue to use existing implementation
- iOS, Android, macOS specific commands continue to use existing implementation