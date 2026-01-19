import * as React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MediaPlayer, useMediaRemote } from '../../index';

// Test component that uses useMediaRemote hook
function MediaRemoteConsumer() {
  const remote = useMediaRemote();
  return (
    <div data-testid="remote-consumer">
      <span data-testid="has-remote">{remote !== null ? 'true' : 'false'}</span>
    </div>
  );
}

// Test component that demonstrates remote methods availability
function RemoteMethodsConsumer() {
  const remote = useMediaRemote();

  if (!remote) {
    return <div data-testid="no-remote">No remote</div>;
  }

  return (
    <div data-testid="remote-methods">
      <span data-testid="has-play">{typeof remote.play === 'function' ? 'true' : 'false'}</span>
      <span data-testid="has-pause">{typeof remote.pause === 'function' ? 'true' : 'false'}</span>
      <span data-testid="has-seek">{typeof remote.seek === 'function' ? 'true' : 'false'}</span>
      <span data-testid="has-mute">{typeof remote.mute === 'function' ? 'true' : 'false'}</span>
      <span data-testid="has-unmute">{typeof remote.unmute === 'function' ? 'true' : 'false'}</span>
      <span data-testid="has-toggle-muted">
        {typeof remote.toggleMuted === 'function' ? 'true' : 'false'}
      </span>
      <span data-testid="has-change-volume">
        {typeof remote.changeVolume === 'function' ? 'true' : 'false'}
      </span>
      <span data-testid="has-enter-fullscreen">
        {typeof remote.enterFullscreen === 'function' ? 'true' : 'false'}
      </span>
      <span data-testid="has-exit-fullscreen">
        {typeof remote.exitFullscreen === 'function' ? 'true' : 'false'}
      </span>
    </div>
  );
}

describe('useMediaRemote', () => {
  describe('Basic Usage', () => {
    it('should return remote instance when inside MediaPlayer', async () => {
      render(
        <MediaPlayer src="">
          <MediaRemoteConsumer />
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('has-remote')).toHaveTextContent('true');
      });
    });

    it('should provide access to remote control methods', async () => {
      render(
        <MediaPlayer src="">
          <RemoteMethodsConsumer />
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('remote-methods')).toBeInTheDocument();
        expect(screen.getByTestId('has-play')).toHaveTextContent('true');
        expect(screen.getByTestId('has-pause')).toHaveTextContent('true');
        expect(screen.getByTestId('has-seek')).toHaveTextContent('true');
        expect(screen.getByTestId('has-mute')).toHaveTextContent('true');
        expect(screen.getByTestId('has-unmute')).toHaveTextContent('true');
        expect(screen.getByTestId('has-toggle-muted')).toHaveTextContent('true');
        expect(screen.getByTestId('has-change-volume')).toHaveTextContent('true');
        expect(screen.getByTestId('has-enter-fullscreen')).toHaveTextContent('true');
        expect(screen.getByTestId('has-exit-fullscreen')).toHaveTextContent('true');
      });
    });
  });

  describe('Hook Behavior', () => {
    it('should work with nested components', async () => {
      function NestedConsumer() {
        return (
          <div>
            <div>
              <MediaRemoteConsumer />
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
        expect(screen.getByTestId('has-remote')).toHaveTextContent('true');
      });
    });
  });
});
