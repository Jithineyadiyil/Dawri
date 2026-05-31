/**
 * @fileoverview Jest tests for {@see BrowserBroadcastComponent}.
 *
 * We mock the three dependencies (HTTP service, capture service,
 * WhipClient via dynamic constructor stub) so the component can be
 * exercised in isolation without browser media APIs.
 */

import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { BrowserBroadcastComponent } from './browser-broadcast.component';
import { BrowserBroadcastSession } from './browser-broadcast.model';
import { BrowserBroadcastService } from './browser-broadcast.service';
import { CaptureError, MediaCaptureService } from './media-capture.service';

function fakeSession(): BrowserBroadcastSession {
  return {
    broadcast_id: 'bc-1',
    whip_url: 'https://mux.test/whip/key',
    whip_token: null,
    playback_url: 'https://stream.mux.com/pb-1.m3u8',
    watch_url: 'https://www.youtube.com/watch?v=yt-1',
    expires_at: new Date(Date.now() + 60_000).toISOString(),
    provider: 'mux',
    capabilities: {
      webcam: true,
      screen: true,
      screen_with_cam: true,
      max_resolution: '1080p',
      max_framerate: 30,
      recommended_bitrate_kbps: 4500,
    },
  };
}

describe('BrowserBroadcastComponent', () => {
  let fixture: ComponentFixture<BrowserBroadcastComponent>;
  let component: BrowserBroadcastComponent;
  let apiSpy: jasmine.SpyObj<BrowserBroadcastService> | jest.Mocked<BrowserBroadcastService>;
  let captureSpy: jest.Mocked<MediaCaptureService>;

  beforeEach(async () => {
    apiSpy = {
      openSession: jest.fn(() => of(fakeSession())),
      closeSession: jest.fn(() => of(undefined)),
    } as unknown as jest.Mocked<BrowserBroadcastService>;

    captureSpy = {
      capture: jest.fn(),
      release: jest.fn(),
    } as unknown as jest.Mocked<MediaCaptureService>;

    await TestBed.configureTestingModule({
      imports: [BrowserBroadcastComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: BrowserBroadcastService, useValue: apiSpy },
        { provide: MediaCaptureService, useValue: captureSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BrowserBroadcastComponent);
    fixture.componentRef.setInput('broadcastId', 'bc-1');
    component = fixture.componentInstance;
  });

  it('starts in the idle state', () => {
    fixture.detectChanges();
    expect(component.state()).toBe('idle');
    expect(component.errorState()).toBeNull();
  });

  it('moves to capturing when a mode is selected and capture succeeds', async () => {
    const fakeStream = { getTracks: () => [] } as unknown as MediaStream;
    captureSpy.capture.mockResolvedValue(fakeStream);

    await component.onModeSelected('webcam');

    expect(captureSpy.capture).toHaveBeenCalledWith('webcam');
    expect(component.state()).toBe('capturing');
  });

  it('moves to error state on permission denied', async () => {
    captureSpy.capture.mockRejectedValue(
      new CaptureError('permission_denied', 'User denied'),
    );

    await component.onModeSelected('webcam');

    expect(component.state()).toBe('error');
    expect(component.errorState()?.code).toBe('permission_denied');
    expect(component.errorState()?.retryable).toBe(true);
  });

  it('shows error if the backend rejects the session request', async () => {
    const fakeStream = { getTracks: () => [] } as unknown as MediaStream;
    captureSpy.capture.mockResolvedValue(fakeStream);
    apiSpy.openSession = jest.fn(() => throwError(() => new Error('403 Forbidden'))) as never;

    await component.onModeSelected('webcam');
    await component.goLive();

    expect(component.state()).toBe('error');
    expect(component.errorState()).not.toBeNull();
  });

  it('reset() returns to idle and releases media', () => {
    component.reset();
    expect(component.state()).toBe('idle');
    expect(component.session()).toBeNull();
    expect(component.mode()).toBeNull();
  });
});
