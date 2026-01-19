import * as React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { MediaPlayer, MuteButton } from '../../../../index';

describe('MuteButton', () => {
  describe('Rendering', () => {
    it('should render with children', async () => {
      render(
        <MediaPlayer src="">
          <MuteButton data-testid="mute-button">Mute</MuteButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('mute-button')).toBeInTheDocument();
        expect(screen.getByTestId('mute-button')).toHaveTextContent('Mute');
      });
    });

    it('should render as a button element', async () => {
      render(
        <MediaPlayer src="">
          <MuteButton data-testid="mute-button">Mute</MuteButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('mute-button').tagName).toBe('BUTTON');
      });
    });

    it('should have proper display name', () => {
      expect(MuteButton.displayName).toBe('MuteButton');
    });

    it('should forward ref', async () => {
      const ref = React.createRef<HTMLButtonElement>();

      render(
        <MediaPlayer src="">
          <MuteButton ref={ref}>Mute</MuteButton>
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
          <MuteButton data-testid="mute-button">Mute</MuteButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        const button = screen.getByTestId('mute-button');
        button.focus();
        expect(document.activeElement).toBe(button);
      });
    });

    it('should support aria-label', async () => {
      render(
        <MediaPlayer src="">
          <MuteButton aria-label="Toggle mute" data-testid="mute-button">
            Mute
          </MuteButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('mute-button')).toHaveAttribute('aria-label', 'Toggle mute');
      });
    });
  });

  describe('User Interaction', () => {
    it('should be clickable', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <MediaPlayer src="">
          <MuteButton onClick={onClick} data-testid="mute-button">
            Mute
          </MuteButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('mute-button')).toBeInTheDocument();
      });

      await user.click(screen.getByTestId('mute-button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Styling', () => {
    it('should accept className prop', async () => {
      render(
        <MediaPlayer src="">
          <MuteButton className="custom-button" data-testid="mute-button">
            Mute
          </MuteButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('mute-button')).toHaveClass('custom-button');
      });
    });

    it('should accept style prop', async () => {
      render(
        <MediaPlayer src="">
          <MuteButton style={{ backgroundColor: 'blue' }} data-testid="mute-button">
            Mute
          </MuteButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('mute-button').style.backgroundColor).toBe('blue');
      });
    });
  });
});
