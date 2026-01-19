import * as React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { MediaPlayer, PlayButton } from '../../../../index';

describe('PlayButton', () => {
  describe('Rendering', () => {
    it('should render with children', async () => {
      render(
        <MediaPlayer src="">
          <PlayButton data-testid="play-button">Play</PlayButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('play-button')).toBeInTheDocument();
        expect(screen.getByTestId('play-button')).toHaveTextContent('Play');
      });
    });

    it('should render as a button element', async () => {
      render(
        <MediaPlayer src="">
          <PlayButton data-testid="play-button">Play</PlayButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('play-button').tagName).toBe('BUTTON');
      });
    });

    it('should have proper display name', () => {
      expect(PlayButton.displayName).toBe('PlayButton');
    });

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
  });

  describe('Accessibility', () => {
    it('should be focusable', async () => {
      render(
        <MediaPlayer src="">
          <PlayButton data-testid="play-button">Play</PlayButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        const button = screen.getByTestId('play-button');
        button.focus();
        expect(document.activeElement).toBe(button);
      });
    });

    it('should support aria-label', async () => {
      render(
        <MediaPlayer src="">
          <PlayButton aria-label="Toggle playback" data-testid="play-button">
            Play
          </PlayButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('play-button')).toHaveAttribute('aria-label', 'Toggle playback');
      });
    });
  });

  describe('User Interaction', () => {
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

    it('should respond to Enter key', async () => {
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

      const button = screen.getByTestId('play-button');
      button.focus();
      await user.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalled();
    });

    it('should respond to Space key', async () => {
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

      const button = screen.getByTestId('play-button');
      button.focus();
      await user.keyboard(' ');
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('Styling', () => {
    it('should accept className prop', async () => {
      render(
        <MediaPlayer src="">
          <PlayButton className="custom-button" data-testid="play-button">
            Play
          </PlayButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('play-button')).toHaveClass('custom-button');
      });
    });

    it('should accept style prop', async () => {
      render(
        <MediaPlayer src="">
          <PlayButton style={{ backgroundColor: 'red' }} data-testid="play-button">
            Play
          </PlayButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('play-button').style.backgroundColor).toBe('red');
      });
    });
  });

  describe('Disabled State', () => {
    it('should support aria-disabled prop', async () => {
      render(
        <MediaPlayer src="">
          <PlayButton disabled data-testid="play-button">
            Play
          </PlayButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        // The component uses aria-disabled for accessibility
        expect(screen.getByTestId('play-button')).toHaveAttribute('aria-disabled', 'true');
      });
    });
  });
});
