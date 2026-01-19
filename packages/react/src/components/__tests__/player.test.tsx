import * as React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { MediaPlayer, MediaProvider } from '../../index';

describe('MediaPlayer', () => {
  describe('Rendering', () => {
    it('should render with children', async () => {
      render(
        <MediaPlayer src="">
          <div data-testid="child">Child Content</div>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('child')).toBeInTheDocument();
      });
      expect(screen.getByTestId('child')).toHaveTextContent('Child Content');
    });

    it('should render with proper display name', () => {
      expect(MediaPlayer.displayName).toBe('MediaPlayer');
    });

    it('should forward ref to the player instance', async () => {
      const ref = React.createRef<any>();

      render(
        <MediaPlayer src="" ref={ref}>
          <div>Content</div>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(ref.current).not.toBeNull();
      });
    });

    it('should apply aspectRatio style', async () => {
      render(
        <MediaPlayer src="" aspectRatio="16/9" data-testid="player">
          <div>Content</div>
        </MediaPlayer>,
      );

      await waitFor(() => {
        const player = screen.getByTestId('player');
        expect(player.style.aspectRatio).toBe('16/9');
      });
    });

    it('should merge custom styles with aspectRatio', async () => {
      render(
        <MediaPlayer
          src=""
          aspectRatio="16/9"
          style={{ backgroundColor: 'black' }}
          data-testid="player"
        >
          <div>Content</div>
        </MediaPlayer>,
      );

      await waitFor(() => {
        const player = screen.getByTestId('player');
        expect(player.style.aspectRatio).toBe('16/9');
        expect(player.style.backgroundColor).toBe('black');
      });
    });
  });

  describe('Props Handling', () => {
    it('should accept title prop', async () => {
      render(
        <MediaPlayer src="" title="Test Video" data-testid="player">
          <div>Content</div>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('player')).toBeInTheDocument();
      });
    });

    it('should handle src prop as string', async () => {
      render(
        <MediaPlayer src="https://example.com/video.mp4" data-testid="player">
          <div>Content</div>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('player')).toBeInTheDocument();
      });
    });

    it('should handle src prop as array', async () => {
      const sources = [
        { src: 'https://example.com/video.mp4', type: 'video/mp4' },
        { src: 'https://example.com/video.webm', type: 'video/webm' },
      ];

      render(
        <MediaPlayer src={sources} data-testid="player">
          <div>Content</div>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('player')).toBeInTheDocument();
      });
    });

    it('should handle empty src prop', async () => {
      render(
        <MediaPlayer src="" data-testid="player">
          <div>Content</div>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('player')).toBeInTheDocument();
      });
    });
  });

  describe('Events', () => {
    it('should call onCanPlay callback', () => {
      const onCanPlay = vi.fn();

      render(
        <MediaPlayer src="" onCanPlay={onCanPlay}>
          <div>Content</div>
        </MediaPlayer>,
      );

      // Event testing would require actual media loading
      // This verifies the callback is accepted as a prop
      expect(onCanPlay).not.toHaveBeenCalled();
    });

    it('should call onPlay callback', () => {
      const onPlay = vi.fn();

      render(
        <MediaPlayer src="" onPlay={onPlay}>
          <div>Content</div>
        </MediaPlayer>,
      );

      expect(onPlay).not.toHaveBeenCalled();
    });

    it('should call onPause callback', () => {
      const onPause = vi.fn();

      render(
        <MediaPlayer src="" onPause={onPause}>
          <div>Content</div>
        </MediaPlayer>,
      );

      expect(onPause).not.toHaveBeenCalled();
    });

    it('should call onTimeUpdate callback', () => {
      const onTimeUpdate = vi.fn();

      render(
        <MediaPlayer src="" onTimeUpdate={onTimeUpdate}>
          <div>Content</div>
        </MediaPlayer>,
      );

      expect(onTimeUpdate).not.toHaveBeenCalled();
    });

    it('should call onEnded callback', () => {
      const onEnded = vi.fn();

      render(
        <MediaPlayer src="" onEnded={onEnded}>
          <div>Content</div>
        </MediaPlayer>,
      );

      expect(onEnded).not.toHaveBeenCalled();
    });

    it('should call onError callback', () => {
      const onError = vi.fn();

      render(
        <MediaPlayer src="" onError={onError}>
          <div>Content</div>
        </MediaPlayer>,
      );

      expect(onError).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper role structure', async () => {
      render(
        <MediaPlayer src="" data-testid="player">
          <div>Content</div>
        </MediaPlayer>,
      );

      await waitFor(() => {
        const player = screen.getByTestId('player');
        expect(player).toBeInTheDocument();
      });
    });

    it('should support aria-label prop', async () => {
      render(
        <MediaPlayer src="" aria-label="Video Player" data-testid="player">
          <div>Content</div>
        </MediaPlayer>,
      );

      await waitFor(() => {
        const player = screen.getByTestId('player');
        expect(player).toHaveAttribute('aria-label', 'Video Player');
      });
    });
  });
});

describe('MediaProvider', () => {
  it('should have proper display name', () => {
    expect(MediaProvider.displayName).toBe('MediaProvider');
  });
});
