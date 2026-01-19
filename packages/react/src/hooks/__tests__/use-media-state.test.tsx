import * as React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MediaPlayer, MediaProvider, useMediaState, useMediaStore } from '../../index';

// Test component that uses useMediaState hook
function MediaStateConsumer({ prop }: { prop: keyof ReturnType<typeof useMediaStore> }) {
  const value = useMediaState(prop);
  return <div data-testid="state-value">{String(value)}</div>;
}

// Test component that uses useMediaStore hook
function MediaStoreConsumer() {
  const store = useMediaStore();
  return (
    <div data-testid="store-container">
      <span data-testid="paused">{String(store.paused)}</span>
      <span data-testid="playing">{String(store.playing)}</span>
      <span data-testid="waiting">{String(store.waiting)}</span>
    </div>
  );
}

describe('useMediaState', () => {
  describe('Basic Usage', () => {
    it('should return paused state', async () => {
      render(
        <MediaPlayer src="">
          <MediaStateConsumer prop="paused" />
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('state-value')).toBeInTheDocument();
      });
    });

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

    it('should return currentTime state', async () => {
      render(
        <MediaPlayer src="">
          <MediaStateConsumer prop="currentTime" />
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('state-value')).toHaveTextContent('0');
      });
    });

    it('should return duration state', async () => {
      render(
        <MediaPlayer src="">
          <MediaStateConsumer prop="duration" />
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('state-value')).toHaveTextContent('0');
      });
    });

    it('should return volume state', async () => {
      render(
        <MediaPlayer src="">
          <MediaStateConsumer prop="volume" />
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('state-value')).toHaveTextContent('1');
      });
    });

    it('should return muted state', async () => {
      render(
        <MediaPlayer src="">
          <MediaStateConsumer prop="muted" />
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('state-value')).toHaveTextContent('false');
      });
    });

    it('should return waiting state', async () => {
      render(
        <MediaPlayer src="">
          <MediaStateConsumer prop="waiting" />
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('state-value')).toHaveTextContent('false');
      });
    });

    it('should return seeking state', async () => {
      render(
        <MediaPlayer src="">
          <MediaStateConsumer prop="seeking" />
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('state-value')).toHaveTextContent('false');
      });
    });

    it('should return ended state', async () => {
      render(
        <MediaPlayer src="">
          <MediaStateConsumer prop="ended" />
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('state-value')).toHaveTextContent('false');
      });
    });

    it('should return fullscreen state', async () => {
      render(
        <MediaPlayer src="">
          <MediaStateConsumer prop="fullscreen" />
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('state-value')).toHaveTextContent('false');
      });
    });

    it('should return canPlay state', async () => {
      render(
        <MediaPlayer src="">
          <MediaStateConsumer prop="canPlay" />
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('state-value')).toHaveTextContent('false');
      });
    });
  });

  describe('Media Type States', () => {
    it('should return viewType state', async () => {
      render(
        <MediaPlayer src="">
          <MediaStateConsumer prop="viewType" />
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('state-value')).toBeInTheDocument();
      });
    });

    it('should return streamType state', async () => {
      render(
        <MediaPlayer src="">
          <MediaStateConsumer prop="streamType" />
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('state-value')).toBeInTheDocument();
      });
    });
  });
});

describe('useMediaStore', () => {
  describe('Basic Usage', () => {
    it('should return all media states', async () => {
      render(
        <MediaPlayer src="">
          <MediaStoreConsumer />
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('store-container')).toBeInTheDocument();
        expect(screen.getByTestId('paused')).toBeInTheDocument();
        expect(screen.getByTestId('playing')).toHaveTextContent('false');
        expect(screen.getByTestId('waiting')).toHaveTextContent('false');
      });
    });
  });
});
