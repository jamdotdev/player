# Testing Guide for @vidstack/react

This document provides comprehensive guidelines for testing the `@vidstack/react` package.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Test Organization](#test-organization)
- [Writing Tests](#writing-tests)
- [Testing Patterns](#testing-patterns)
- [Running Tests](#running-tests)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

The `@vidstack/react` package uses the following testing stack:

- **[Vitest](https://vitest.dev/)** - Fast, Vite-native testing framework
- **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)** - Testing utilities focused on user behavior
- **[@testing-library/jest-dom](https://github.com/testing-library/jest-dom)** - Custom matchers for DOM elements
- **[@testing-library/user-event](https://github.com/testing-library/user-event)** - Simulates real user interactions

## Getting Started

### Prerequisites

Ensure you have the project dependencies installed:

```bash
pnpm install
```

### Quick Start

Run all tests:

```bash
pnpm test
```

Run tests in watch mode (for development):

```bash
pnpm test:watch
```

Run tests with coverage:

```bash
pnpm test:coverage
```

## Test Organization

### Directory Structure

```
packages/react/src/
├── components/
│   ├── __tests__/              # Core component tests
│   │   └── player.test.tsx
│   └── ui/
│       ├── __tests__/          # UI component tests
│       └── buttons/
│           └── __tests__/      # Button component tests
├── hooks/
│   └── __tests__/              # Hook tests
│       ├── use-media-state.test.tsx
│       ├── use-media-player.test.tsx
│       └── use-media-remote.test.tsx
└── test-utils/                 # Shared test utilities
    ├── setup.ts                # Test setup and global mocks
    ├── index.ts                # Exported utilities
    └── helpers.ts              # Helper functions
```

### Naming Conventions

- Test files: `*.test.tsx` or `*.test.ts`
- Test utilities: placed in `test-utils/` directory
- Describe blocks: Use component/hook names
- Test cases: Start with "should"

## Writing Tests

### Basic Component Test

```tsx
import * as React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MediaPlayer, PlayButton } from '../../../../index';

describe('PlayButton', () => {
  it('should render with children', async () => {
    render(
      <MediaPlayer src="">
        <PlayButton data-testid="play-button">Play</PlayButton>
      </MediaPlayer>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('play-button')).toBeInTheDocument();
    });
  });
});
```

### Testing Hooks

```tsx
import * as React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MediaPlayer, useMediaState } from '../../index';

// Create a consumer component to test the hook
function MediaStateConsumer({ prop }: { prop: string }) {
  const value = useMediaState(prop as any);
  return <div data-testid="state-value">{String(value)}</div>;
}

describe('useMediaState', () => {
  it('should return playing state', async () => {
    render(
      <MediaPlayer src="">
        <MediaStateConsumer prop="playing" />
      </MediaPlayer>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('state-value')).toHaveTextContent('false');
    });
  });
});
```

### Testing User Interactions

```tsx
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('PlayButton', () => {
  it('should be clickable', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <MediaPlayer src="">
        <PlayButton onClick={onClick} data-testid="play-button">
          Play
        </PlayButton>
      </MediaPlayer>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('play-button')).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('play-button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

## Testing Patterns

### Pattern 1: Async Component Testing

Since Maverick.js components need time to initialize, always use `waitFor`:

```tsx
await waitFor(() => {
  expect(screen.getByTestId('my-component')).toBeInTheDocument();
});
```

### Pattern 2: Testing Without MediaProvider

Many tests work without `MediaProvider` since it requires complex media loading:

```tsx
// ✅ Good - works without MediaProvider
render(
  <MediaPlayer src="">
    <PlayButton data-testid="play-button">Play</PlayButton>
  </MediaPlayer>,
);

// ⚠️ Requires media element - MediaProvider needs special handling in tests
render(
  <MediaPlayer src="">
    <MediaProvider />
    <PlayButton data-testid="play-button">Play</PlayButton>
  </MediaPlayer>,
);
```

### Pattern 3: Testing Refs

```tsx
it('should forward ref', async () => {
  const ref = React.createRef<HTMLButtonElement>();

  render(
    <MediaPlayer src="">
      <PlayButton ref={ref}>Play</PlayButton>
    </MediaPlayer>,
  );

  await waitFor(() => {
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
```

### Pattern 4: Testing Styles and Classes

```tsx
it('should accept className prop', async () => {
  render(
    <MediaPlayer src="">
      <PlayButton className="custom-button" data-testid="button">
        Play
      </PlayButton>
    </MediaPlayer>,
  );

  await waitFor(() => {
    expect(screen.getByTestId('button')).toHaveClass('custom-button');
  });
});
```

### Pattern 5: Testing Accessibility

```tsx
it('should support aria-label', async () => {
  render(
    <MediaPlayer src="">
      <PlayButton aria-label="Toggle playback" data-testid="button">
        Play
      </PlayButton>
    </MediaPlayer>,
  );

  await waitFor(() => {
    expect(screen.getByTestId('button')).toHaveAttribute('aria-label', 'Toggle playback');
  });
});
```

## Running Tests

### Available Commands

| Command              | Description                    |
| -------------------- | ------------------------------ |
| `pnpm test`          | Run all tests once             |
| `pnpm test:watch`    | Run tests in watch mode        |
| `pnpm test:coverage` | Run tests with coverage report |

### Running from Root

```bash
# Run all package tests
pnpm test

# Run only React package tests
cd packages/react && pnpm test
```

### Running Specific Tests

```bash
# Run tests matching a pattern
pnpm test -- --grep "PlayButton"

# Run a specific test file
pnpm test -- src/components/__tests__/player.test.tsx
```

## Best Practices

### Do's ✅

1. **Use data-testid for querying elements**

   ```tsx
   <PlayButton data-testid="play-button">Play</PlayButton>
   ```

2. **Use waitFor for async assertions**

   ```tsx
   await waitFor(() => {
     expect(element).toBeInTheDocument();
   });
   ```

3. **Test user behavior, not implementation**

   ```tsx
   // Good - tests what user sees
   expect(screen.getByTestId('button')).toHaveTextContent('Play');

   // Avoid - tests implementation details
   expect(component.state.text).toBe('Play');
   ```

4. **Use userEvent over fireEvent**

   ```tsx
   const user = userEvent.setup();
   await user.click(button);
   ```

5. **Test accessibility attributes**
   ```tsx
   expect(button).toHaveAttribute('aria-label', 'Play');
   expect(button).toHaveAttribute('role', 'button');
   ```

### Don'ts ❌

1. **Don't test implementation details**
2. **Don't use `act()` unnecessarily** - Testing Library handles this
3. **Don't test third-party library behavior**
4. **Don't make assertions before waitFor in async tests**
5. **Don't use snapshot tests for dynamic content**

## Troubleshooting

### Common Issues

#### "Cannot destructure property ... as it is null"

This occurs when a component tries to access Maverick.js state that isn't initialized. Solutions:

- Test the component without `MediaProvider` if possible
- Use simpler assertions that don't require full state

#### Tests timeout

- Increase `testTimeout` in `vite.config.ts`
- Use `waitFor` with appropriate timeout:
  ```tsx
  await waitFor(() => { ... }, { timeout: 3000 });
  ```

#### "Not wrapped in act(...)" warnings

React Testing Library usually handles this. If you see warnings:

- Ensure async operations complete before assertions
- Use `waitFor` for state updates

#### Mock not working

Ensure mocks are defined in `test-utils/setup.ts` and the file is included in vitest config:

```ts
test: {
  setupFiles: ['src/test-utils/setup.ts'],
}
```

## Coverage Targets

The project aims for the following coverage thresholds:

| Metric     | Target |
| ---------- | ------ |
| Statements | 60%    |
| Branches   | 60%    |
| Functions  | 60%    |
| Lines      | 60%    |

## Test Priority Levels

### P0 (Critical)

- MediaPlayer rendering and lifecycle
- Core hooks (useMediaState, useMediaPlayer, useMediaRemote)
- Playback controls (PlayButton, MuteButton)

### P1 (Important)

- UI components (FullscreenButton, SeekButton, VolumeSlider)
- Layout components
- Accessibility features

### P2 (Nice to Have)

- Edge cases
- Performance optimizations
- Browser-specific behavior
