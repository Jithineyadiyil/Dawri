import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-admin-streams',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="streams-page">
  <div class="streams-header">
    <div>
      <h1 class="streams-title">YouTube Live Streams</h1>
      <p class="streams-sub">Create and manage YouTube Live events for tournaments. Each tournament gets its own stream key.</p>
    </div>
  </div>

  <!-- Setup reminder -->
  <div class="setup-reminder">
    <div class="setup-reminder__icon">⚙️</div>
    <div>
      <div class="setup-reminder__title">One-time setup required</div>
      <div class="setup-reminder__text">
        Add to your <code>.env</code>:
        <code>YOUTUBE_CLIENT_ID</code>, <code>YOUTUBE_CLIENT_SECRET</code>, <code>YOUTUBE_REFRESH_TOKEN</code>
        — see <code>backend_config_readme.txt</code> in the deployment package for instructions.
      </div>
    </div>
  </div>

  <!-- Tournament search -->
  <div class="stream-search">
    <input class="search-input" [value]="searchQuery()"
           (input)="searchQuery.set($any($event.target).value)"
           placeholder="Enter tournament ID or paste from /tournaments page…"/>
    <button class="btn-primary" (click)="lookupTournament()" [disabled]="!searchQuery() || looking()">
      {{ looking() ? 'Looking up…' : 'Look Up Tournament' }}
    </button>
  </div>

  @if (error()) {
    <div class="alert alert--error">{{ error() }}</div>
  }

  <!-- Tournament found -->
  @if (tournament()) {
    <div class="tournament-card">
      <div class="tc-info">
        <div class="tc-name">{{ tournament()!.name }}</div>
        <div class="tc-meta">{{ tournament()!.game_label }} · {{ tournament()!.format_label }} · {{ tournament()!.starts_at | date:'d MMM yyyy HH:mm' }}</div>
        <div class="tc-id">ID: {{ tournament()!.id }}</div>
      </div>

      <!-- Stream status -->
      @if (tournament()!.youtube_broadcast_id) {
        <div class="tc-stream">
          <div class="stream-exists-badge">
            <span class="dot" [class.dot--live]="streamStatus() === 'live'"></span>
            {{ streamStatus() === 'live' ? 'LIVE NOW' : streamStatus() === 'ended' ? 'Ended' : 'Stream Ready' }}
          </div>
          <div class="tc-stream-key">
            <span class="key-label">🔑 Stream Key:</span>
            <code class="key-val">{{ tournament()!.youtube_stream_key }}</code>
          </div>
          <div class="tc-stream-url">
            <a [href]="tournament()!.youtube_stream_url" target="_blank" rel="noopener" class="watch-link">
              ▶ Watch on YouTube ↗
            </a>
          </div>
          <div class="tc-actions">
            <button class="btn-ghost btn-sm" (click)="refreshStatus()">↻ Refresh Status</button>
            <button class="btn-danger btn-sm" (click)="endStream()" [disabled]="ending()">
              {{ ending() ? 'Ending…' : '⏹ End Broadcast' }}
            </button>
          </div>
        </div>
      } @else {
        <div class="tc-no-stream">
          <p>No YouTube stream configured for this tournament.</p>

          <!-- Option A: Auto-create via YouTube API -->
          <div class="stream-option">
            <div class="stream-option__label">Option A — Auto-create via YouTube API</div>
            <div class="stream-option__hint">Requires YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, YOUTUBE_REFRESH_TOKEN in .env</div>
            <button class="btn-primary" (click)="createStream()" [disabled]="creating()">
              {{ creating() ? 'Creating on YouTube…' : '📡 Create YouTube Live Event' }}
            </button>
          </div>

          <!-- Option B: Manual URL -->
          <div class="stream-option stream-option--manual">
            <div class="stream-option__label">Option B — Manual URL (use while setting up YouTube API)</div>
            <div class="stream-option__hint">Start a YouTube Live stream manually, paste the watch URL here</div>
            <div class="manual-url-row">
              <input class="search-input" [value]="manualUrl()"
                     (input)="manualUrl.set($any($event.target).value)"
                     placeholder="https://www.youtube.com/watch?v=… or https://twitch.tv/channel"/>
              <button class="btn-ghost" (click)="saveManualUrl()" [disabled]="savingManual() || !manualUrl()">
                {{ manualSaved() ? '✓ Saved!' : (savingManual() ? 'Saving…' : 'Save URL') }}
              </button>
            </div>
            <div class="manual-url-hint">
              💡 To get a YouTube URL: go to studio.youtube.com → Go Live → copy the share link
            </div>
          </div>
        </div>
      }
    </div>
  }

  <!-- Success result -->
  @if (newStream()) {
    <div class="new-stream-result">
      <div class="nsr-title">✅ YouTube Live Event Created!</div>
      <div class="nsr-grid">
        <div class="nsr-field">
          <label>Stream Key (give to organizer)</label>
          <div class="nsr-key-wrap">
            <code>{{ newStream()!.stream_key }}</code>
            <button (click)="copyText(newStream()!.stream_key)">{{ copied() ? '✓' : '📋' }}</button>
          </div>
        </div>
        <div class="nsr-field">
          <label>RTMP URL</label>
          <code>{{ newStream()!.rtmp_url }}</code>
        </div>
        <div class="nsr-field">
          <label>Watch URL (embed on tournament page)</label>
          <code>{{ newStream()!.watch_url }}</code>
        </div>
      </div>

      <div class="nsr-instructions">
        <h4>📋 Send this to the organizer:</h4>
        <div class="instruction-box">
          <p><strong>PS5 Setup:</strong></p>
          <ol>
            <li>PS5 → Settings → Captures and Broadcasts → Broadcast → Custom RTMP</li>
            <li>RTMP URL: <code>{{ newStream()!.rtmp_url }}</code></li>
            <li>Stream Key: <code>{{ newStream()!.stream_key }}</code></li>
            <li>Press Start Broadcasting when the match begins</li>
          </ol>
          <p><strong>OBS Setup:</strong></p>
          <ol>
            <li>OBS → Settings → Stream → Service: Custom…</li>
            <li>Server: <code>{{ newStream()!.rtmp_url }}</code></li>
            <li>Stream Key: <code>{{ newStream()!.stream_key }}</code></li>
          </ol>
        </div>
      </div>
    </div>
  }
</div>
  `,
  styles: [`
    .streams-page { padding: 32px; max-width: 860px; margin: 0 auto; color: #fff; }
    .streams-header { margin-bottom: 20px; }
    .streams-title { font-size: 32px; font-weight: 800; margin: 0; }
    .streams-sub { color: #6b7280; font-size: 13px; margin: 4px 0 0; }
    .btn-primary { padding: 10px 20px; background: #f0a500; border: none; border-radius: 8px; color: #0b1022; font-weight: 700; cursor: pointer; font-size: 14px; }
    .btn-primary:disabled { opacity: .5; cursor: not-allowed; }
    .btn-ghost { padding: 8px 14px; background: transparent; border: 1px solid rgba(255,255,255,.15); border-radius: 8px; color: #9ca3af; cursor: pointer; font-size: 13px; }
    .btn-danger { padding: 8px 14px; background: rgba(239,68,68,.15); border: 1px solid rgba(239,68,68,.3); border-radius: 8px; color: #ef4444; cursor: pointer; font-size: 13px; }
    .btn-sm { font-size: 12px; padding: 6px 12px; }

    .setup-reminder { display: flex; gap: 12px; padding: 14px 16px; background: rgba(240,165,0,.06); border: 1px solid rgba(240,165,0,.2); border-radius: 10px; margin-bottom: 24px; font-size: 22px; align-items: flex-start; }
    .setup-reminder__title { font-weight: 700; font-size: 14px; color: #f0a500; margin-bottom: 4px; }
    .setup-reminder__text { font-size: 12px; color: #9ca3af; line-height: 1.6; }
    .setup-reminder__text code { background: rgba(255,255,255,.08); padding: 1px 5px; border-radius: 4px; font-size: 11px; color: #d1d5db; }

    .stream-search { display: flex; gap: 10px; margin-bottom: 20px; }
    .search-input { flex: 1; padding: 10px 14px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 8px; color: #fff; font-size: 14px; outline: none; }

    .alert { padding: 12px 16px; border-radius: 8px; font-size: 13px; margin-bottom: 16px; }
    .alert--error { background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.3); color: #fca5a5; }

    .tournament-card { padding: 20px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1); border-radius: 12px; margin-bottom: 20px; }
    .tc-name { font-size: 18px; font-weight: 700; }
    .tc-meta { font-size: 12px; color: #6b7280; margin-top: 4px; }
    .tc-id { font-size: 11px; color: #4b5563; font-family: monospace; margin-top: 4px; }
    .tc-stream { margin-top: 16px; display: flex; flex-direction: column; gap: 10px; }
    .stream-exists-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; background: rgba(16,185,129,.1); border-radius: 100px; color: #10b981; font-size: 11px; font-weight: 700; letter-spacing: 1px; width: fit-content; }
    .dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; }
    .dot--live { background: #ef4444; animation: pulse 1.4s infinite; }
    .tc-stream-key { display: flex; align-items: center; gap: 8px; }
    .key-label { font-size: 12px; color: #6b7280; font-family: monospace; white-space: nowrap; }
    .key-val { font-size: 13px; color: #10b981; background: rgba(16,185,129,.08); padding: 4px 10px; border-radius: 6px; }
    .watch-link { color: #ff4444; font-size: 13px; font-weight: 700; text-decoration: none; }
    .tc-actions { display: flex; gap: 8px; }
    .tc-no-stream { display: flex; flex-direction: column; gap: 16px; margin-top: 16px; }
    .stream-option { padding: 16px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); border-radius: 10px; display: flex; flex-direction: column; gap: 10px; }
    .stream-option--manual { border-style: dashed; }
    .stream-option__label { font-size: 13px; font-weight: 700; color: #fff; }
    .stream-option__hint { font-size: 12px; color: #6b7280; }
    .manual-url-row { display: flex; gap: 8px; }
    .manual-url-hint { font-size: 11px; color: #4b5563; font-style: italic; }

    .new-stream-result { padding: 24px; background: rgba(16,185,129,.05); border: 1px solid rgba(16,185,129,.2); border-radius: 12px; }
    .nsr-title { font-size: 18px; font-weight: 700; color: #10b981; margin-bottom: 16px; }
    .nsr-grid { display: flex; flex-direction: column; gap: 12px; }
    .nsr-field label { font-size: 11px; color: #6b7280; font-family: monospace; letter-spacing: .5px; text-transform: uppercase; display: block; margin-bottom: 6px; }
    .nsr-field code { font-size: 12px; color: #10b981; background: rgba(16,185,129,.08); padding: 8px 12px; border-radius: 6px; display: block; word-break: break-all; }
    .nsr-key-wrap { display: flex; gap: 8px; align-items: center; }
    .nsr-key-wrap code { flex: 1; }
    .nsr-key-wrap button { padding: 6px 12px; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1); border-radius: 6px; color: #9ca3af; cursor: pointer; font-size: 13px; }
    .nsr-instructions { margin-top: 20px; }
    .nsr-instructions h4 { margin: 0 0 10px; font-size: 14px; color: #fff; }
    .instruction-box { background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07); border-radius: 8px; padding: 16px; font-size: 13px; color: #9ca3af; }
    .instruction-box p { margin: 12px 0 6px; color: #fff; font-weight: 600; }
    .instruction-box p:first-child { margin-top: 0; }
    .instruction-box ol { margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 6px; }
    .instruction-box code { color: #10b981; font-size: 12px; background: rgba(16,185,129,.08); padding: 1px 5px; border-radius: 4px; }
  `]
})
export class AdminStreamsComponent implements OnInit {
  private api = inject(ApiService);

  readonly searchQuery  = signal('');
  readonly looking      = signal(false);
  readonly creating     = signal(false);
  readonly ending       = signal(false);
  readonly copied       = signal(false);
  readonly error        = signal<string | null>(null);
  readonly tournament   = signal<any>(null);
  readonly newStream    = signal<any>(null);
  readonly streamStatus   = signal<string>('pending');
  readonly manualUrl      = signal('');
  readonly savingManual   = signal(false);
  readonly manualSaved    = signal(false);

  ngOnInit(): void {}

  lookupTournament(): void {
    const id = this.searchQuery().trim();
    if (!id) return;
    this.looking.set(true);
    this.error.set(null);
    this.tournament.set(null);
    this.newStream.set(null);
    // Use existing tournament endpoint
    this.api.getTournament(id).pipe(catchError(err => {
      this.error.set(err?.error?.message ?? 'Tournament not found. Check the ID.');
      this.looking.set(false);
      return of(null);
    })).subscribe((r: any) => {
      if (r) {
        this.tournament.set(r.data ?? r);
        this.streamStatus.set((r as any)?.data?.youtube_stream_status ?? (r as any)?.youtube_stream_status ?? 'pending');
      }
      this.looking.set(false);
    });
  }

  createStream(): void {
    const t = this.tournament();
    if (!t) return;
    this.creating.set(true);
    this.error.set(null);
    this.api.createYouTubeStream(t.id, t.name + ' — Dawri Esports').pipe(catchError(err => {
      this.error.set(err?.error?.message ?? 'Failed to create YouTube stream. Check YOUTUBE_* env variables.');
      this.creating.set(false);
      return of(null);
    })).subscribe((r: any) => {
      if (r) {
        const broadcast = r.data ?? r;
        this.newStream.set({
          broadcast_id: broadcast.id,
          stream_key:   broadcast.stream_key ?? '(key revealed after credentials endpoint)',
          watch_url:    broadcast.watch_url,
          rtmp_url:     broadcast.rtmp_url ?? 'rtmp://a.rtmp.youtube.com/live2',
        });
        this.tournament.update(t => ({
          ...t,
          youtube_broadcast_id: broadcast.id,
          youtube_stream_url:   broadcast.watch_url,
        }));
        this.creating.set(false);
      }
    });
  }

  refreshStatus(): void {
    const t = this.tournament();
    const broadcastId = t?.youtube_broadcast_id;
    if (!t || !broadcastId) return;
    this.api.getYouTubeStreamStatus(broadcastId).pipe(catchError(() => of(null))).subscribe((r: any) => {
      if (r) this.streamStatus.set(r.data?.status ?? r.status ?? 'pending');
    });
  }

  endStream(): void {
    const t = this.tournament();
    if (!t || !confirm('End this YouTube broadcast?')) return;
    this.ending.set(true);
    const broadcastId = t?.youtube_broadcast_id;
    if (!broadcastId) { this.ending.set(false); return; }
    this.api.endYouTubeStream(broadcastId).pipe(catchError(() => of(null))).subscribe(() => {
      this.ending.set(false);
      this.streamStatus.set('ended');
    });
  }

  saveManualUrl(): void {
    const t = this.tournament();
    const url = this.manualUrl().trim();
    if (!t || !url) return;
    // Validate it's a YouTube or Twitch URL
    if (!url.includes('youtube.com') && !url.includes('youtu.be') && !url.includes('twitch.tv')) {
      this.error.set('Please enter a valid YouTube or Twitch URL.');
      return;
    }
    this.savingManual.set(true);
    this.error.set(null);
    // Use the existing tournament PATCH endpoint to store youtube_stream_url
    this.api.updateTournamentStream(t.id, url).pipe(catchError(err => {
      this.error.set(err?.error?.message ?? 'Failed to save stream URL.');
      this.savingManual.set(false);
      return of(null);
    })).subscribe((r: any) => {
      if (r) {
        this.savingManual.set(false);
        this.manualSaved.set(true);
        this.tournament.update(t => ({ ...t, youtube_stream_url: url, youtube_stream_status: 'pending' }));
        setTimeout(() => this.manualSaved.set(false), 3000);
      }
    });
  }

  copyText(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
