/**
 * @fileoverview Browser media-capture service.
 *
 * Wraps the three browser APIs we use to capture media:
 *   - getUserMedia()    — webcam + mic
 *   - getDisplayMedia() — screen + (optional) system audio
 *   - Canvas + WebAudio — to compose PIP (screen + webcam overlay)
 *
 * Returns a single MediaStream regardless of which mode is selected,
 * so callers (WhipClient) don't need to special-case PIP.
 */

import { Injectable } from '@angular/core';

import { CaptureMode } from './browser-broadcast.model';

/** A capture-related error with a stable code for UI mapping. */
export class CaptureError extends Error {
  constructor(
    public readonly code:
      | 'permission_denied'
      | 'no_device'
      | 'unsupported'
      | 'aborted'
      | 'unknown',
    message: string,
  ) {
    super(message);
    this.name = 'CaptureError';
  }
}

/**
 * Captures local media according to the requested mode and returns
 * a single, ready-to-publish MediaStream.
 */
@Injectable({ providedIn: 'root' })
export class MediaCaptureService {
  /** Composition resources — kept on the instance so {@link release} can clean up. */
  private composition: {
    canvasStream?: MediaStream;
    audioCtx?: AudioContext;
    rafId?: number;
    sourceStreams: MediaStream[];
  } | null = null;

  /**
   * Capture media for the given mode.
   *
   * @param mode One of: `webcam`, `screen`, `screen_with_cam`.
   *
   * @throws {@link CaptureError} on user denial, no device, etc.
   */
  async capture(mode: CaptureMode): Promise<MediaStream> {
    this.ensureSupported();

    try {
      switch (mode) {
        case 'webcam':
          return await this.captureWebcam();
        case 'screen':
          return await this.captureScreen();
        case 'screen_with_cam':
          return await this.captureScreenWithCam();
        default:
          throw new CaptureError('unsupported', `Unknown capture mode: ${mode as string}`);
      }
    } catch (e) {
      throw this.wrap(e);
    }
  }

  /**
   * Release any captured media + composition resources.
   * Safe to call multiple times.
   */
  release(stream?: MediaStream): void {
    stream?.getTracks().forEach((t) => t.stop());

    if (this.composition) {
      this.composition.sourceStreams.forEach((s) => s.getTracks().forEach((t) => t.stop()));
      this.composition.canvasStream?.getTracks().forEach((t) => t.stop());

      if (this.composition.rafId !== undefined) {
        cancelAnimationFrame(this.composition.rafId);
      }

      if (this.composition.audioCtx && this.composition.audioCtx.state !== 'closed') {
        this.composition.audioCtx.close().catch(() => undefined);
      }

      this.composition = null;
    }
  }

  // ─────────────────── private ──────────────────────────────────────────

  private async captureWebcam(): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } },
      audio: { echoCancellation: true, noiseSuppression: true },
    });
  }

  private async captureScreen(): Promise<MediaStream> {
    return navigator.mediaDevices.getDisplayMedia({
      video: { frameRate: { ideal: 30 }, width: { ideal: 1920 }, height: { ideal: 1080 } },
      // System audio capture varies wildly by browser — request it; it's OK if denied.
      audio: true,
    });
  }

  private async captureScreenWithCam(): Promise<MediaStream> {
    // 1. Get the two source streams.
    const screen = await this.captureScreen();
    const webcam = await this.captureWebcam();

    // 2. Compose video on a canvas.
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new CaptureError('unsupported', '2D canvas context is unavailable.');
    }

    const screenVideo = await this.streamToVideo(screen);
    const camVideo = await this.streamToVideo(webcam);

    const draw = (): void => {
      // Background: screen fills the canvas.
      ctx.drawImage(screenVideo, 0, 0, canvas.width, canvas.height);

      // Overlay: webcam in bottom-right, ~25% width.
      const camW = canvas.width / 4;
      const camH = camW * 0.75;
      ctx.drawImage(camVideo, canvas.width - camW - 16, canvas.height - camH - 16, camW, camH);

      const id = requestAnimationFrame(draw);
      if (this.composition) {
        this.composition.rafId = id;
      }
    };
    draw();

    const canvasStream = (canvas as HTMLCanvasElement).captureStream(30);

    // 3. Mix audio tracks (screen audio + mic) into one track.
    const audioCtx = new AudioContext();
    const dest = audioCtx.createMediaStreamDestination();

    for (const src of [screen, webcam]) {
      const audioTrack = src.getAudioTracks()[0];
      if (audioTrack) {
        const node = audioCtx.createMediaStreamSource(new MediaStream([audioTrack]));
        node.connect(dest);
      }
    }
    dest.stream.getAudioTracks().forEach((t) => canvasStream.addTrack(t));

    this.composition = {
      canvasStream,
      audioCtx,
      sourceStreams: [screen, webcam],
    };

    return canvasStream;
  }

  private streamToVideo(stream: MediaStream): Promise<HTMLVideoElement> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.srcObject = stream;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.onloadedmetadata = () => {
        video.play().then(() => resolve(video)).catch(reject);
      };
      video.onerror = () => reject(new Error('Video element failed to load'));
    });
  }

  private ensureSupported(): void {
    if (!navigator.mediaDevices) {
      throw new CaptureError('unsupported', 'navigator.mediaDevices is not available.');
    }
    if (typeof RTCPeerConnection === 'undefined') {
      throw new CaptureError('unsupported', 'WebRTC is not supported by this browser.');
    }
  }

  private wrap(e: unknown): CaptureError {
    if (e instanceof CaptureError) return e;

    if (e instanceof Error) {
      switch (e.name) {
        case 'NotAllowedError':
        case 'SecurityError':
          return new CaptureError('permission_denied', e.message);
        case 'NotFoundError':
        case 'OverconstrainedError':
          return new CaptureError('no_device', e.message);
        case 'AbortError':
          return new CaptureError('aborted', e.message);
        default:
          return new CaptureError('unknown', e.message);
      }
    }

    return new CaptureError('unknown', String(e));
  }
}
