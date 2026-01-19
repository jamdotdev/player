import * as React from 'react';

/**
 * Waits for an event to be dispatched on the target.
 */
export async function waitForEvent<T extends Event>(
  target: EventTarget,
  type: string,
  options?: { timeout?: number },
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeout = options?.timeout ?? 1000;
    const timerId = window.setTimeout(() => {
      reject(new Error(`Timed out waiting for event \`${type}\`.`));
    }, timeout);

    target.addEventListener(
      type,
      (event: Event) => {
        window.clearTimeout(timerId);
        resolve(event as T);
      },
      { once: true },
    );
  });
}

/**
 * Creates a mock media element for testing.
 */
export function createMockMediaElement(): HTMLVideoElement {
  const element = document.createElement('video');

  // Mock properties
  Object.defineProperties(element, {
    currentTime: {
      writable: true,
      value: 0,
    },
    duration: {
      writable: true,
      value: 100,
    },
    volume: {
      writable: true,
      value: 1,
    },
    muted: {
      writable: true,
      value: false,
    },
    paused: {
      writable: true,
      value: true,
    },
    readyState: {
      writable: true,
      value: 0,
    },
    buffered: {
      value: {
        length: 0,
        start: () => 0,
        end: () => 0,
      },
    },
    seekable: {
      value: {
        length: 1,
        start: () => 0,
        end: () => 100,
      },
    },
    played: {
      value: {
        length: 0,
        start: () => 0,
        end: () => 0,
      },
    },
    videoWidth: {
      writable: true,
      value: 1920,
    },
    videoHeight: {
      writable: true,
      value: 1080,
    },
  });

  return element;
}

/**
 * A simple mock MediaPlayer component for testing context consumers.
 * Note: This is a placeholder for future use. For actual tests, use the real MediaPlayer
 * component which properly initializes the Maverick.js context.
 */
export interface MockMediaPlayerProps {
  children: React.ReactNode;
}

export function MockMediaPlayer({ children }: MockMediaPlayerProps): React.ReactElement {
  // This is a placeholder - in actual tests we'll use the real MediaPlayer
  // or create more sophisticated mocks as needed
  return React.createElement('div', { 'data-testid': 'mock-media-player' }, children);
}
