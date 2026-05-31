/**
 * @fileoverview Minimal WHIP (WebRTC-HTTP Ingestion Protocol) client.
 *
 * WHIP is the IETF standard for one-shot WebRTC publication to a server.
 * It boils down to:
 *   1. Create an RTCPeerConnection with sendonly transceivers
 *   2. Generate an SDP offer
 *   3. POST that offer to the WHIP endpoint
 *   4. The server returns an SDP answer + a Location header
 *   5. Apply the answer; we're publishing
 *   6. DELETE the Location URL to stop
 *
 * @see https://datatracker.ietf.org/doc/draft-ietf-wish-whip/
 */

/** Why the WHIP handshake failed. Used for surfacing actionable errors to the UI. */
export type WhipErrorCode =
  | 'ice_failed'
  | 'sdp_handshake_failed'
  | 'unauthorized'
  | 'not_found'
  | 'rate_limited'
  | 'transport_error'
  | 'unsupported';

export class WhipError extends Error {
  constructor(
    public readonly code: WhipErrorCode,
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = 'WhipError';
  }
}

/**
 * Connection-lifecycle event names emitted by WhipClient.
 */
export type WhipEvent = 'connecting' | 'connected' | 'disconnected' | 'failed';

/**
 * One-broadcast WHIP publisher.
 *
 * Single-use — instantiate per broadcast, call {@link publish}, then
 * {@link stop}. Do not reuse across broadcasts; the WebRTC peer is
 * permanently closed after stop.
 */
export class WhipClient {
  private pc: RTCPeerConnection | null = null;
  private resourceUrl: string | null = null;
  private listeners: Partial<Record<WhipEvent, Array<() => void>>> = {};

  /**
   * @param whipUrl  Full WHIP ingest URL from the backend session.
   * @param token    Optional Bearer token. Mux embeds auth in the URL so
   *                 this is typically `null`.
   * @param iceServers Optional STUN/TURN list. Default: Google's public STUN.
   */
  constructor(
    private readonly whipUrl: string,
    private readonly token: string | null = null,
    private readonly iceServers: RTCIceServer[] = [{ urls: 'stun:stun.l.google.com:19302' }],
  ) {}

  /**
   * Begin publishing `stream` to the WHIP endpoint.
   *
   * Resolves once the WebRTC peer connection is in the `connected` state
   * (i.e. media is actually flowing). Rejects with {@link WhipError} on
   * any failure during the handshake.
   *
   * @param stream Local media stream from getUserMedia/getDisplayMedia.
   */
  async publish(stream: MediaStream): Promise<void> {
    this.emit('connecting');

    this.pc = new RTCPeerConnection({
      iceServers: this.iceServers,
      bundlePolicy: 'max-bundle',
    });

    // sendonly transceivers — we're not receiving anything.
    for (const track of stream.getTracks()) {
      this.pc.addTransceiver(track, { direction: 'sendonly' });
    }

    // Wire ICE/peer state for higher-level observers.
    this.pc.addEventListener('connectionstatechange', () => {
      const state = this.pc?.connectionState;
      if (state === 'connected') {
        this.emit('connected');
      } else if (state === 'failed') {
        this.emit('failed');
      } else if (state === 'disconnected') {
        this.emit('disconnected');
      }
    });

    let offer: RTCSessionDescriptionInit;
    try {
      offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);
      await this.waitForIceGathering();
    } catch (e) {
      throw new WhipError('ice_failed', `ICE gathering failed: ${this.errMsg(e)}`);
    }

    // POST the (now ICE-complete) offer SDP to the WHIP endpoint.
    const localSdp = this.pc.localDescription?.sdp ?? offer.sdp ?? '';

    let response: Response;
    try {
      response = await fetch(this.whipUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/sdp',
          ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        },
        body: localSdp,
      });
    } catch (e) {
      throw new WhipError('transport_error', `Network error during WHIP POST: ${this.errMsg(e)}`);
    }

    if (!response.ok) {
      throw new WhipError(
        this.mapStatus(response.status),
        `WHIP server returned ${response.status} ${response.statusText}`,
        response.status,
      );
    }

    this.resourceUrl = response.headers.get('Location');
    if (this.resourceUrl && !this.resourceUrl.startsWith('http')) {
      // Some servers return a relative Location.
      this.resourceUrl = new URL(this.resourceUrl, this.whipUrl).toString();
    }

    const answerSdp = await response.text();
    try {
      await this.pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });
    } catch (e) {
      throw new WhipError('sdp_handshake_failed', `Bad SDP answer: ${this.errMsg(e)}`);
    }

    // Wait up to 10s for connectionState=connected.
    await this.waitForConnected(10_000);
  }

  /**
   * Stop publishing and release all resources.
   *
   * Idempotent — safe to call multiple times. Errors during the cleanup
   * DELETE are swallowed because the local peer must be closed regardless.
   */
  async stop(): Promise<void> {
    if (this.resourceUrl) {
      try {
        await fetch(this.resourceUrl, {
          method: 'DELETE',
          ...(this.token ? { headers: { Authorization: `Bearer ${this.token}` } } : {}),
        });
      } catch {
        // Best-effort. Local cleanup proceeds regardless.
      }
      this.resourceUrl = null;
    }

    if (this.pc) {
      this.pc.getSenders().forEach((s) => s.track?.stop());
      this.pc.close();
      this.pc = null;
    }

    this.emit('disconnected');
  }

  /** Subscribe to a lifecycle event. Returns an unsubscribe function. */
  on(event: WhipEvent, handler: () => void): () => void {
    (this.listeners[event] ??= []).push(handler);
    return () => {
      this.listeners[event] = this.listeners[event]?.filter((h) => h !== handler);
    };
  }

  // ─────────────────── internals ───────────────────────────────────────

  private emit(event: WhipEvent): void {
    this.listeners[event]?.forEach((h) => {
      try {
        h();
      } catch {
        /* observer errors must never break the WHIP loop */
      }
    });
  }

  private waitForIceGathering(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.pc) {
        resolve();
        return;
      }
      if (this.pc.iceGatheringState === 'complete') {
        resolve();
        return;
      }
      const listener = () => {
        if (this.pc?.iceGatheringState === 'complete') {
          this.pc.removeEventListener('icegatheringstatechange', listener);
          resolve();
        }
      };
      this.pc.addEventListener('icegatheringstatechange', listener);

      // Hard timeout fallback — some browsers stall on gathering.
      setTimeout(() => resolve(), 3_000);
    });
  }

  private waitForConnected(timeoutMs: number): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.pc) {
        reject(new WhipError('transport_error', 'No peer connection'));
        return;
      }
      if (this.pc.connectionState === 'connected') {
        resolve();
        return;
      }

      const timer = setTimeout(() => {
        cleanup();
        reject(new WhipError('ice_failed', 'Timed out waiting for ICE connection'));
      }, timeoutMs);

      const listener = () => {
        const s = this.pc?.connectionState;
        if (s === 'connected') {
          cleanup();
          resolve();
        } else if (s === 'failed') {
          cleanup();
          reject(new WhipError('ice_failed', 'WebRTC peer connection failed'));
        }
      };

      const cleanup = () => {
        clearTimeout(timer);
        this.pc?.removeEventListener('connectionstatechange', listener);
      };

      this.pc.addEventListener('connectionstatechange', listener);
    });
  }

  private mapStatus(status: number): WhipErrorCode {
    if (status === 401 || status === 403) return 'unauthorized';
    if (status === 404 || status === 410) return 'not_found';
    if (status === 429) return 'rate_limited';
    if (status === 415) return 'unsupported';
    return 'transport_error';
  }

  private errMsg(e: unknown): string {
    return e instanceof Error ? e.message : String(e);
  }
}
