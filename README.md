# Core Library

A TypeScript library featuring a functional singleton pattern with configuration options.

## Installation

```bash
pnpm add @alvarosabu/core-pkg-test
```

## Usage

```typescript
import { coreLibrary } from '@alvarosabu/core-pkg-test';

// Create the library instance with options
const lib = coreLibrary({
  debug: true,
  onInit: async () => {
    console.log('Custom initialization logic');
  }
});

// Initialize the library
await lib.initialize();

// Check if initialized
console.log(lib.isInitialized()); // true

// Get current options
console.log(lib.getOptions()); // { debug: true, onInit: [Function: onInit] }
```

## Development

```bash
# Install dependencies
pnpm install

# Build the library
pnpm build

# Run in development mode with watch
pnpm dev

# Run linting
pnpm lint

# Format code
pnpm format

# Type checking
pnpm typecheck
```

## License

ISC 