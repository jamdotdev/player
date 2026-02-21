import { TimeRange } from '../time-ranges';
import { boundTime, mediaState } from './player-state';

describe('mediaState.seekableEnd', () => {
  const getSeekableEnd = Object.getOwnPropertyDescriptor(mediaState.record, 'seekableEnd')?.get;

  it('falls back to intrinsic duration when seekable range is collapsed at 0', () => {
    const value = getSeekableEnd?.call({
      providedDuration: -1,
      liveSyncPosition: 0,
      canPlay: true,
      seekable: new TimeRange(0, 0),
      intrinsicDuration: 42.5,
      clipEndTime: 0,
    });

    expect(value).to.equal(42.5);
  });

  it('uses seekable range end when available', () => {
    const value = getSeekableEnd?.call({
      providedDuration: -1,
      liveSyncPosition: 0,
      canPlay: true,
      seekable: new TimeRange(0, 30),
      intrinsicDuration: 42.5,
      clipEndTime: 0,
    });

    expect(value).to.equal(30);
  });
});

describe(boundTime.name, () => {
  function createStore({
    clipStartTime = 0,
    seekableStart = 0,
    seekableEnd = 0,
    isLiveDVR = false,
    liveDVRWindow = 0,
    bufferedStart = 0,
  }: {
    clipStartTime?: number;
    seekableStart?: number;
    seekableEnd?: number;
    isLiveDVR?: boolean;
    liveDVRWindow?: number;
    bufferedStart?: number;
  }) {
    return {
      clipStartTime: () => clipStartTime,
      seekableStart: () => seekableStart,
      seekableEnd: () => seekableEnd,
      isLiveDVR: () => isLiveDVR,
      liveDVRWindow: () => liveDVRWindow,
      bufferedStart: () => bufferedStart,
    } as any;
  }

  it('attempts requested seek time when seek window is collapsed', () => {
    const store = createStore({ seekableStart: 0, seekableEnd: 0 });
    expect(boundTime(25, store)).to.equal(25);
  });

  it('avoids invalid negative seek time when seek window is collapsed at 0', () => {
    const store = createStore({ seekableStart: 0, seekableEnd: 0 });
    expect(boundTime(1, store)).to.equal(1);
  });

  it('keeps existing clamping behavior for normal seek windows', () => {
    const store = createStore({ seekableStart: 0, seekableEnd: 100 });
    expect(boundTime(500, store)).to.equal(99.9);
  });
});
