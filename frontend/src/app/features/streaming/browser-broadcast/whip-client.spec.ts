/**
 * @fileoverview Jest tests for {@see WhipClient}.
 *
 * Mocks `RTCPeerConnection` and `fetch` so the tests can run in jsdom
 * without any browser or network.
 */

import { WhipClient, WhipError } from './whip-client';

// ─────────────────── Fake RTCPeerConnection ────────────────────────────

class FakePeerConnection {
  static lastInstance: FakePeerConnection | null = null;

  connectionState: RTCPeerConnectionState = 'new';
  iceGatheringState: RTCIceGatheringState = 'new';
  localDescription: RTCSessionDescription | null = null;

  private connectionListeners: Array<() => void> = [];
  private gatheringListeners: Array<() => void> = [];

  constructor() {
    FakePeerConnection.lastInstance = this;
  }

  addTransceiver = jest.fn();
  getSenders = jest.fn(() => []);
  close = jest.fn();

  addEventListener(event: string, fn: () => void): void {
    if (event === 'connectionstatechange') this.connectionListeners.push(fn);
    if (event === 'icegatheringstatechange') this.gatheringListeners.push(fn);
  }

  removeEventListener(event: string, fn: () => void): void {
    if (event === 'connectionstatechange') {
      this.connectionListeners = this.connectionListeners.filter((l) => l !== fn);
    }
    if (event === 'icegatheringstatechange') {
      this.gatheringListeners = this.gatheringListeners.filter((l) => l !== fn);
    }
  }

  async createOffer(): Promise<RTCSessionDescriptionInit> {
    return { type: 'offer', sdp: 'v=0\r\nm=video 9 UDP/TLS/RTP/SAVPF 100\r\n' };
  }

  async setLocalDescription(desc: RTCSessionDescriptionInit): Promise<void> {
    this.localDescription = { ...desc, toJSON: () => ({}) } as RTCSessionDescription;
    // Simulate immediate ICE-gathering completion.
    setTimeout(() => {
      this.iceGatheringState = 'complete';
      this.gatheringListeners.forEach((l) => l());
    }, 0);
  }

  async setRemoteDescription(_desc: RTCSessionDescriptionInit): Promise<void> {
    // Simulate the peer reaching connected state.
    setTimeout(() => {
      this.connectionState = 'connected';
      this.connectionListeners.forEach((l) => l());
    }, 0);
  }
}

// Install the fake in the global scope before each test.
beforeEach(() => {
  (globalThis as unknown as { RTCPeerConnection: typeof FakePeerConnection }).RTCPeerConnection =
    FakePeerConnection;
  FakePeerConnection.lastInstance = null;
});

// ─────────────────── helpers ────────────────────────────────────────────

function fakeMediaStream(): MediaStream {
  return {
    getTracks: () => [],
    getSenders: () => [],
    getAudioTracks: () => [],
    getVideoTracks: () => [],
  } as unknown as MediaStream;
}

function mockFetchOk(headers: Record<string, string> = {}): jest.Mock {
  const fn = jest.fn().mockResolvedValue({
    ok: true,
    status: 201,
    statusText: 'Created',
    headers: {
      get: (k: string) => headers[k] ?? null,
    },
    text: async () => 'v=0\r\nm=video 9 UDP/TLS/RTP/SAVPF 100\r\n',
  });
  global.fetch = fn as unknown as typeof fetch;
  return fn;
}

// ─────────────────── tests ──────────────────────────────────────────────

describe('WhipClient', () => {
  it('completes a successful WHIP publish round-trip', async () => {
    const fetchMock = mockFetchOk({ Location: 'https://mux.test/whip/abc' });

    const client = new WhipClient('https://mux.test/whip/key-1', null);
    await client.publish(fakeMediaStream());

    expect(fetchMock).toHaveBeenCalledWith(
      'https://mux.test/whip/key-1',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/sdp' }),
      }),
    );
  });

  it('sends Authorization header when a token is provided', async () => {
    const fetchMock = mockFetchOk();
    const client = new WhipClient('https://x.test/whip', 'tok-xyz');
    await client.publish(fakeMediaStream());

    const headers = (fetchMock.mock.calls[0][1] as RequestInit).headers as Record<string, string>;
    expect(headers.Authorization).toBe('Bearer tok-xyz');
  });

  it('maps 401 → unauthorized', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      headers: { get: () => null },
      text: async () => '',
    }) as unknown as typeof fetch;

    const client = new WhipClient('https://x.test/whip', null);
    await expect(client.publish(fakeMediaStream())).rejects.toMatchObject({
      code: 'unauthorized',
    });
  });

  it('maps 429 → rate_limited', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 429,
      statusText: 'Too Many Requests',
      headers: { get: () => null },
      text: async () => '',
    }) as unknown as typeof fetch;

    const client = new WhipClient('https://x.test/whip', null);
    await expect(client.publish(fakeMediaStream())).rejects.toMatchObject({
      code: 'rate_limited',
    });
  });

  it('treats network errors as transport_error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('fetch failed')) as unknown as typeof fetch;

    const client = new WhipClient('https://x.test/whip', null);
    const err = await client.publish(fakeMediaStream()).catch((e) => e);

    expect(err).toBeInstanceOf(WhipError);
    expect((err as WhipError).code).toBe('transport_error');
  });

  it('DELETE-s the resource URL on stop', async () => {
    const fetchMock = mockFetchOk({ Location: 'https://mux.test/whip/abc' });
    const client = new WhipClient('https://mux.test/whip/key', null);
    await client.publish(fakeMediaStream());

    fetchMock.mockClear();
    fetchMock.mockResolvedValueOnce({ ok: true } as Response);

    await client.stop();
    expect(fetchMock).toHaveBeenCalledWith(
      'https://mux.test/whip/abc',
      expect.objectContaining({ method: 'DELETE' }),
    );
  });

  it('stop() is idempotent', async () => {
    const client = new WhipClient('https://x.test/whip', null);
    await client.stop(); // no publish yet
    await client.stop(); // and again
    expect(true).toBe(true);
  });
});
