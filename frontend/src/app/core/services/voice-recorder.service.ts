import { Injectable, signal } from '@angular/core';

export interface VoiceClip { blob: Blob; durationMs: number; mime: string; }

/**
 * VoiceRecorderService — records a short voice note from the microphone.
 *
 * Singleton: only one recording at a time (fine for chat composers). UI
 * reads `recording` + `elapsedMs` signals and renders its own controls.
 */
@Injectable({ providedIn: 'root' })
export class VoiceRecorderService {
  readonly recording = signal(false);
  readonly elapsedMs = signal(0);

  private recorder: MediaRecorder | null = null;
  private stream: MediaStream | null = null;
  private chunks: Blob[] = [];
  private startedAt = 0;
  private timer: ReturnType<typeof setInterval> | null = null;
  private mime = 'audio/webm';

  /** Whether the browser supports recording at all. */
  supported(): boolean {
    return typeof navigator !== 'undefined'
      && !!navigator.mediaDevices?.getUserMedia
      && typeof MediaRecorder !== 'undefined';
  }

  /** Begin recording. Throws if mic permission is denied. */
  async start(): Promise<void> {
    if (this.recording()) return;
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mime   = this.pickMime();
    this.recorder = new MediaRecorder(this.stream, this.mime ? { mimeType: this.mime } : undefined);
    this.chunks = [];
    this.recorder.ondataavailable = (e) => { if (e.data.size > 0) this.chunks.push(e.data); };
    this.recorder.start();
    this.startedAt = performance.now();
    this.recording.set(true);
    this.elapsedMs.set(0);
    this.timer = setInterval(() => this.elapsedMs.set(performance.now() - this.startedAt), 100);
  }

  /** Stop and return the recorded clip. */
  stop(): Promise<VoiceClip> {
    return new Promise((resolve, reject) => {
      const rec = this.recorder;
      if (!rec) { reject(new Error('Not recording.')); return; }
      const durationMs = Math.round(performance.now() - this.startedAt);
      rec.onstop = () => {
        const blob = new Blob(this.chunks, { type: this.mime || 'audio/webm' });
        this.cleanup();
        resolve({ blob, durationMs, mime: this.mime || 'audio/webm' });
      };
      rec.stop();
    });
  }

  /** Discard the in-progress recording. */
  cancel(): void {
    const rec = this.recorder;
    if (rec && rec.state !== 'inactive') { rec.onstop = null as any; rec.stop(); }
    this.cleanup();
  }

  private cleanup(): void {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
    this.stream?.getTracks().forEach(t => t.stop());
    this.stream = null;
    this.recorder = null;
    this.chunks = [];
    this.recording.set(false);
    this.elapsedMs.set(0);
  }

  private pickMime(): string {
    const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4'];
    for (const c of candidates) {
      if (MediaRecorder.isTypeSupported?.(c)) return c;
    }
    return '';
  }
}
