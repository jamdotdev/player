import * as React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { FullscreenButton, MediaPlayer } from '../../../../index';

describe('FullscreenButton', () => {
  describe('Rendering', () => {
    it('should render with children', async () => {
      render(
        <MediaPlayer src="">
          <FullscreenButton data-testid="fs-button">Fullscreen</FullscreenButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('fs-button')).toBeInTheDocument();
        expect(screen.getByTestId('fs-button')).toHaveTextContent('Fullscreen');
      });
    });

    it('should render as a button element', async () => {
      render(
        <MediaPlayer src="">
          <FullscreenButton data-testid="fs-button">Fullscreen</FullscreenButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('fs-button').tagName).toBe('BUTTON');
      });
    });

    it('should have proper display name', () => {
      expect(FullscreenButton.displayName).toBe('FullscreenButton');
    });

    it('should forward ref', async () => {
      const ref = React.createRef<HTMLButtonElement>();

      render(
        <MediaPlayer src="">
          <FullscreenButton ref={ref}>Fullscreen</FullscreenButton>
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
          <FullscreenButton data-testid="fs-button">Fullscreen</FullscreenButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        const button = screen.getByTestId('fs-button');
        button.focus();
        expect(document.activeElement).toBe(button);
      });
    });

    it('should support aria-label', async () => {
      render(
        <MediaPlayer src="">
          <FullscreenButton aria-label="Toggle fullscreen" data-testid="fs-button">
            Fullscreen
          </FullscreenButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('fs-button')).toHaveAttribute('aria-label', 'Toggle fullscreen');
      });
    });
  });

  describe('User Interaction', () => {
    it('should be clickable', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <MediaPlayer src="">
          <FullscreenButton onClick={onClick} data-testid="fs-button">
            Fullscreen
          </FullscreenButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('fs-button')).toBeInTheDocument();
      });

      await user.click(screen.getByTestId('fs-button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Styling', () => {
    it('should accept className prop', async () => {
      render(
        <MediaPlayer src="">
          <FullscreenButton className="custom-button" data-testid="fs-button">
            Fullscreen
          </FullscreenButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('fs-button')).toHaveClass('custom-button');
      });
    });

    it('should accept style prop', async () => {
      render(
        <MediaPlayer src="">
          <FullscreenButton style={{ backgroundColor: 'green' }} data-testid="fs-button">
            Fullscreen
          </FullscreenButton>
        </MediaPlayer>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('fs-button').style.backgroundColor).toBe('green');
      });
    });
  });
});
