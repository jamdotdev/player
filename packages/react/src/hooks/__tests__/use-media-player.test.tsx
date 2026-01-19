import * as React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MediaPlayer, useMediaPlayer } from '../../index';

// Test component that uses useMediaPlayer hook
function MediaPlayerConsumer() {
  const player = useMediaPlayer();
  return (
    <div data-testid="player-consumer">
      <span data-testid="has-player">{player !== null ? 'true' : 'false'}</span>
    </div>
  );
}

// Test component that demonstrates player methods availability
function PlayerMethodsConsumer() {
  const player = useMediaPlayer();

  if (!player) {
    return <div data-testid="no-player">No player</div>;
  }

  return (
    <div data-testid="player-methods">
      <span data-testid="has-play">{typeof player.play === 'function' ? 'true' : 'false'}</span>
      <span data-testid="has-pause">{typeof player.pause === 'function' ? 'true' : 'false'}</span>
      <span data-testid="has-seek">
        {typeof player.seekToLiveEdge === 'function' ? 'true' : 'false'}
      </span>
    </div>
  );
}

describe('useMediaPlayer', () => {
  describe('Basic Usage', () => {
    it('should return player instance when inside MediaPlayer', async () => {
      render(
        <MediaPlayer src="">
          <MediaPlayerConsumer />
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('has-player')).toHaveTextContent('true');
      });
    });

    it('should provide access to player methods', async () => {
      render(
        <MediaPlayer src="">
          <PlayerMethodsConsumer />
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('player-methods')).toBeInTheDocument();
        expect(screen.getByTestId('has-play')).toHaveTextContent('true');
        expect(screen.getByTestId('has-pause')).toHaveTextContent('true');
        expect(screen.getByTestId('has-seek')).toHaveTextContent('true');
      });
    });
  });

  describe('Hook Behavior', () => {
    it('should work with nested components', async () => {
      function NestedConsumer() {
        return (
          <div>
            <div>
              <MediaPlayerConsumer />
            </div>
          </div>
        );
      }

      render(
        <MediaPlayer src="">
          <NestedConsumer />
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('has-player')).toHaveTextContent('true');
      });
    });

    it('should work with sibling consumers', async () => {
      render(
        <MediaPlayer src="">
          <MediaPlayerConsumer />
          <PlayerMethodsConsumer />
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('has-player')).toHaveTextContent('true');
        expect(screen.getByTestId('player-methods')).toBeInTheDocument();
      });
    });
  });
});
