import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserverMock;

// Mock IntersectionObserver
class IntersectionObserverMock {
  constructor(_callback: IntersectionObserverCallback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.IntersectionObserver =
  IntersectionObserverMock as unknown as typeof IntersectionObserver;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock HTMLMediaElement methods with proper type signatures
HTMLMediaElement.prototype.play = function (): Promise<void> {
  return Promise.resolve();
};

HTMLMediaElement.prototype.pause = function (): void {
  // No-op for tests
};

HTMLMediaElement.prototype.load = function (): void {
  // No-op for tests
};

// Mock fullscreen API
Object.defineProperty(document, 'fullscreenEnabled', {
  writable: true,
  value: true,
});

Object.defineProperty(HTMLElement.prototype, 'requestFullscreen', {
  writable: true,
  value: () => Promise.resolve(),
});

Object.defineProperty(document, 'exitFullscreen', {
  writable: true,
  value: () => Promise.resolve(),
});

// Mock Picture-in-Picture API
Object.defineProperty(HTMLVideoElement.prototype, 'requestPictureInPicture', {
  writable: true,
  value: () => Promise.resolve({} as PictureInPictureWindow),
});

Object.defineProperty(document, 'exitPictureInPicture', {
  writable: true,
  value: () => Promise.resolve(),
});

Object.defineProperty(document, 'pictureInPictureEnabled', {
  writable: true,
  value: true,
});

// Suppress console warnings in tests
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

beforeEach(() => {
  console.warn = (...args: unknown[]) => {
    // Filter out expected Maverick.js and vidstack dev mode warnings
    const message = args[0];
    if (
      typeof message === 'string' &&
      (message.includes('[vidstack]') || message.includes('[maverick]'))
    ) {
      return;
    }
    originalConsoleWarn(...args);
  };

  console.error = (...args: unknown[]) => {
    // Filter out expected React hydration warnings in tests
    const message = args[0];
    if (
      typeof message === 'string' &&
      (message.includes('Warning: An update to') ||
        message.includes('act(...)') ||
        message.includes('[vidstack]'))
    ) {
      return;
    }
    originalConsoleError(...args);
  };
});

afterEach(() => {
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
});
