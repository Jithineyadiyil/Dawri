import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ObsWizardService } from './obs-wizard.service';
import { environment } from '../../../../environments/environment';
import type { WizardConfig } from './wizard.model';

describe('ObsWizardService', () => {
  let service: ObsWizardService;
  let http:    HttpTestingController;
  const base = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [HttpClientTestingModule],
      providers: [ObsWizardService],
    });
    service = TestBed.inject(ObsWizardService);
    http    = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  describe('getConfig()', () => {
    it('hits the broadcast endpoint when scope=broadcast', (done) => {
      const fake: WizardConfig = makeFakeConfig();
      service.getConfig('broadcast', 'bc-uuid').subscribe(c => {
        expect(c.scope).toBe('broadcast');
        expect(c.broadcast_id).toBe('bc-uuid');
        done();
      });
      const req = http.expectOne(`${base}/broadcasts/bc-uuid/setup-wizard/config`);
      expect(req.request.method).toBe('GET');
      req.flush({ data: fake });
    });

    it('hits the tournament endpoint when scope=tournament', (done) => {
      const fake: WizardConfig = { ...makeFakeConfig(), scope: 'tournament' };
      service.getConfig('tournament', 't-uuid').subscribe(c => {
        expect(c.scope).toBe('tournament');
        done();
      });
      http.expectOne(`${base}/tournaments/t-uuid/setup-wizard/config`).flush({ data: fake });
    });

    it('maps 403 to a human-readable error', (done) => {
      service.getConfig('broadcast', 'bc').subscribe({
        next: () => done.fail('should have errored'),
        error: (e: Error) => {
          expect(e.message.toLowerCase()).toContain('not allowed');
          done();
        },
      });
      http.expectOne(`${base}/broadcasts/bc/setup-wizard/config`).flush(
        { error: { code: 'forbidden', message: 'You are not allowed to use this wizard.' } },
        { status: 403, statusText: 'Forbidden' },
      );
    });

    it('maps 429 to a rate-limit message', (done) => {
      service.getConfig('broadcast', 'bc').subscribe({
        next: () => done.fail('should have errored'),
        error: (e: Error) => {
          expect(e.message.toLowerCase()).toContain('too many');
          done();
        },
      });
      http.expectOne(`${base}/broadcasts/bc/setup-wizard/config`).flush({}, { status: 429, statusText: 'Too Many Requests' });
    });
  });

  describe('logEvent()', () => {
    it('posts payload with nulls for omitted optional fields', (done) => {
      service.logEvent('broadcast', 'bc', 'step_viewed', { stepNumber: 3, platform: 'windows' })
        .subscribe(() => done());
      const req = http.expectOne(`${base}/broadcasts/bc/setup-wizard/event`);
      expect(req.request.body).toEqual({
        event: 'step_viewed', step_number: 3, platform: 'windows', metadata: null,
      });
      req.flush({ data: { id: 'log', event: 'step_viewed', created_at: '2026-05-18T12:00:00Z' } });
    });

    it('never surfaces HTTP errors to subscribers (analytics is best-effort)', (done) => {
      service.logEvent('broadcast', 'bc', 'wizard_completed').subscribe({
        next: () => done(),
        error: () => done.fail('logEvent must not error'),
      });
      http.expectOne(`${base}/broadcasts/bc/setup-wizard/event`).flush({}, { status: 500, statusText: 'Server Error' });
    });
  });

  describe('finish()', () => {
    it('POSTs the go-live transition and returns LiveBroadcast', (done) => {
      service.finish('bc-uuid').subscribe(b => {
        expect(b.id).toBe('bc-uuid');
        expect(b.status).toBe('live');
        done();
      });
      const req = http.expectOne(`${base}/broadcasts/bc-uuid/setup-wizard/finish`);
      expect(req.request.method).toBe('POST');
      req.flush({ data: { id: 'bc-uuid', status: 'live', is_live: true, is_terminal: false } });
    });

    it('maps 410 (broadcast terminal) cleanly', (done) => {
      service.finish('bc').subscribe({
        next: () => done.fail('should have errored'),
        error: (e: Error) => {
          expect(e.message.toLowerCase()).toContain('already ended');
          done();
        },
      });
      http.expectOne(`${base}/broadcasts/bc/setup-wizard/finish`).flush({}, { status: 410, statusText: 'Gone' });
    });
  });

  describe('detectPlatform()', () => {
    const ua = Object.getOwnPropertyDescriptor(window.navigator, 'userAgent');
    afterEach(() => { if (ua) { Object.defineProperty(window.navigator, 'userAgent', ua); } });

    it.each([
      ['Mozilla/5.0 (Windows NT 10.0; Win64)',           'windows'],
      ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)',  'macos'],
      ['Mozilla/5.0 (X11; Linux x86_64)',                'linux'],
      ['Mozilla/5.0 (PlayStation 5)',                    'unknown'],
    ])('detects %s', (uaStr, expected) => {
      Object.defineProperty(window.navigator, 'userAgent', { value: uaStr, configurable: true });
      expect(service.detectPlatform()).toBe(expected);
    });
  });
});

function makeFakeConfig(): WizardConfig {
  return {
    scope: 'broadcast',
    broadcast_id: 'bc-uuid',
    broadcast_status: 'ready',
    broadcast_source: 'obs',
    has_broadcast: true,
    is_live: false,
    is_terminal: false,
    tournament_id: 't-uuid',
    tournament_name: 'EA FC Cup',
    watch_url: 'https://www.youtube.com/watch?v=YT123',
    embed_url: 'https://www.youtube.com/embed/YT123',
    credentials_url: '/api/v1/broadcasts/bc-uuid/credentials',
    go_live_url: '/api/v1/broadcasts/bc-uuid/setup-wizard/finish',
    create_broadcast_url: null,
    download_links: { main: 'https://obsproject.com/download' },
    encoder_profiles: {},
    default_profile: 'pc_high',
    troubleshooting: [],
    already_completed: false,
  };
}
