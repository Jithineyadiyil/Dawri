import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription, interval, switchMap } from 'rxjs';

import { LiveBroadcastService } from '../live-broadcast.service';
import { ObsWizardService } from './obs-wizard.service';
import type { BroadcastCredentials, LiveBroadcast } from '../live-broadcast.model';
import {
  ClientPlatform,
  EncoderProfile,
  WIZARD_STEPS,
  WizardConfig,
  WizardScope,
  WizardStep,
} from './wizard.model';

/**
 * SetupWizardComponent
 *
 * Six-step bilingual (EN / AR + RTL) wizard for configuring OBS Studio
 * to push RTMP to a Dawri-managed YouTube Live broadcast.
 *
 * Two route shapes (both supported):
 *   /broadcasts/:id/setup-wizard
 *   /tournaments/:id/setup-wizard
 *
 * Detection is automatic via ActivatedRoute snapshot URL inspection.
 *
 * @file   setup-wizard.component.ts
 */
@Component({
  selector: 'dw-setup-wizard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="wizard" [class.rtl]="lang() === 'ar'">

      <header class="wiz-head">
        <div>
          <a [routerLink]="backLink()" class="back">← {{ lang() === 'ar' ? 'رجوع' : 'Back' }}</a>
          <h1>
            <span class="accent">OBS</span>
            {{ lang() === 'ar' ? 'دليل الإعداد' : 'Streaming Setup' }}
          </h1>
          <p class="sub" *ngIf="config() as c">
            {{ c.tournament_name }}
            <span class="badge" *ngIf="config()?.broadcast_status as s" [attr.data-s]="s">{{ s }}</span>
          </p>
        </div>
        <button class="lang" type="button" (click)="toggleLang()">
          {{ lang() === 'ar' ? 'English' : 'العربية' }}
        </button>
      </header>

      <div *ngIf="errorMessage()" class="banner err">⚠ {{ errorMessage() }}</div>
      <div *ngIf="config()?.already_completed" class="banner ok">
        ✓ {{ lang() === 'ar' ? 'لقد أكملت هذا الدليل من قبل.' : 'You completed this wizard before — re-running as a refresher.' }}
      </div>
      <div *ngIf="!loading() && config() && !config()!.has_broadcast" class="banner warn">
        ⚠ {{ lang() === 'ar'
              ? 'لم يتم إنشاء بث لهذه البطولة بعد. أنشئ بثاً أولاً من صفحة المباراة.'
              : 'No broadcast has been created for this tournament yet. Create one from the match page first.' }}
      </div>

      <div *ngIf="loading()" class="loader">
        <div class="spin"></div>
        <span>{{ lang() === 'ar' ? 'جارٍ التحميل...' : 'Loading wizard...' }}</span>
      </div>

      <div *ngIf="!loading() && config()" class="grid">

        <!-- Stepper -->
        <aside class="stepper">
          <ol>
            <li *ngFor="let s of steps; trackBy: trackByStep"
                [class.active]="s.number === currentStep()"
                [class.done]="s.number < currentStep()"
                (click)="goToStep(s.number)">
              <span class="num">{{ s.number }}</span>
              <span class="lbl">
                <strong>{{ lang() === 'ar' ? s.title_ar : s.title }}</strong>
                <small>{{ lang() === 'ar' ? s.subtitle_ar : s.subtitle }}</small>
              </span>
            </li>
          </ol>
        </aside>

        <!-- Body -->
        <article class="body">
          <ng-container [ngSwitch]="currentStep()">

            <!-- ── STEP 1: DOWNLOAD ─────────────────────────────────── -->
            <div *ngSwitchCase="1" class="step">
              <h2>1. {{ lang() === 'ar' ? 'نزّل OBS Studio' : 'Download OBS Studio' }}</h2>
              <p>{{ lang() === 'ar'
                  ? 'OBS Studio برنامج بث مجاني ومفتوح المصدر. تحتاجه مرة واحدة فقط.'
                  : 'OBS Studio is the free, open-source streaming standard. One-time install.' }}</p>
              <div class="dl">
                <div class="dl-i">⬇</div>
                <div class="dl-b">
                  <strong>OBS Studio · {{ platformLabel() }}</strong>
                  <small>{{ lang() === 'ar' ? 'تنزيل مجاني من الموقع الرسمي' : 'Free download from the official site' }}</small>
                </div>
                <a class="btn cyan" [href]="downloadUrl()" target="_blank" rel="noopener" (click)="markCompleted(1)">
                  {{ lang() === 'ar' ? 'تنزيل' : 'Download' }}
                </a>
              </div>
              <p class="hint">💡 {{ lang() === 'ar'
                  ? 'عند أول تشغيل، اضغط Cancel على معالج الإعداد التلقائي — سنضبط كل شيء يدوياً.'
                  : 'On first launch, click "Cancel" on the Auto-Configuration Wizard — we will configure manually.' }}</p>
            </div>

            <!-- ── STEP 2: CREDENTIALS ──────────────────────────────── -->
            <div *ngSwitchCase="2" class="step">
              <h2>2. {{ lang() === 'ar' ? 'احصل على بيانات البث' : 'Get Stream Credentials' }}</h2>
              <p>{{ lang() === 'ar'
                  ? 'انقر لعرض رابط RTMP ومفتاح البث. سيظهر المفتاح مرة واحدة فقط — انسخه فوراً.'
                  : 'Click to reveal your RTMP URL and stream key. The key is shown once — copy it immediately.' }}</p>

              <ng-container *ngIf="!credentials() && config()?.has_broadcast">
                <button class="btn gold lg" type="button" (click)="revealCredentials()" [disabled]="credLoading()">
                  {{ credLoading()
                      ? (lang() === 'ar' ? 'جارٍ الكشف...' : 'Revealing...')
                      : (lang() === 'ar' ? '🔓 اعرض البيانات' : '🔓 Reveal Credentials') }}
                </button>
                <p class="hint warn-tone">
                  ⚠ {{ lang() === 'ar'
                       ? 'محدود بـ 5 طلبات في الدقيقة. لا تشارك المفتاح مع أي شخص.'
                       : 'Rate-limited to 5 reveals per minute. Never share the key with anyone.' }}
                </p>
              </ng-container>

              <ng-container *ngIf="credentials() as cred">
                <div class="cred">
                  <label>RTMP URL <span class="muted">{{ lang() === 'ar' ? '(ثابت)' : '(constant)' }}</span></label>
                  <div class="row">
                    <input type="text" [value]="cred.rtmp_url" readonly />
                    <button class="btn cyan-sm" type="button" (click)="copy(cred.rtmp_url, 'rtmp')">
                      {{ copied() === 'rtmp' ? '✓' : (lang() === 'ar' ? 'نسخ' : 'Copy') }}
                    </button>
                  </div>
                </div>
                <div class="cred">
                  <label>
                    Stream Key
                    <span class="warn-tone">⚠ {{ lang() === 'ar' ? 'سري' : 'Secret' }}</span>
                  </label>
                  <div class="row">
                    <input [type]="keyHidden() ? 'password' : 'text'" [value]="cred.stream_key" readonly />
                    <button class="btn ghost-sm" type="button" (click)="keyHidden.set(!keyHidden())">
                      {{ keyHidden() ? (lang() === 'ar' ? 'إظهار' : 'Show') : (lang() === 'ar' ? 'إخفاء' : 'Hide') }}
                    </button>
                    <button class="btn cyan-sm" type="button" (click)="copy(cred.stream_key, 'key')">
                      {{ copied() === 'key' ? '✓' : (lang() === 'ar' ? 'نسخ' : 'Copy') }}
                    </button>
                  </div>
                </div>
                <p class="hint">💡 {{ cred.instructions.obs }}</p>
              </ng-container>
            </div>

            <!-- ── STEP 3: ENCODER ──────────────────────────────────── -->
            <div *ngSwitchCase="3" class="step">
              <h2>3. {{ lang() === 'ar' ? 'إعدادات الترميز' : 'Encoder Settings' }}</h2>
              <p>{{ lang() === 'ar'
                  ? 'في OBS: Settings ← Output. غيّر Output Mode إلى Advanced ثم انسخ هذه القيم.'
                  : 'In OBS: Settings → Output. Switch Output Mode to Advanced, then copy these values.' }}</p>

              <div class="tabs">
                <button *ngFor="let p of profileKeys()" type="button"
                        [class.active]="selectedProfile() === p"
                        (click)="selectedProfile.set(p)">
                  {{ config()!.encoder_profiles[p].label }}
                </button>
              </div>
              <table class="tbl" *ngIf="currentProfile() as p">
                <tr><th>{{ lang() === 'ar' ? 'الترميز' : 'Encoder' }}</th><td>{{ p.encoder }}</td></tr>
                <tr><th>{{ lang() === 'ar' ? 'التحكم بالمعدل' : 'Rate Control' }}</th><td>{{ p.rate_control }}</td></tr>
                <tr><th>{{ lang() === 'ar' ? 'معدل البت' : 'Bitrate' }}</th><td>{{ p.bitrate_kbps }} Kbps</td></tr>
                <tr><th>{{ lang() === 'ar' ? 'الإطار الرئيسي' : 'Keyframe Interval' }}</th><td>{{ p.keyframe_interval }} s <small class="must">{{ lang() === 'ar' ? '(إلزامي)' : '(required)' }}</small></td></tr>
                <tr><th>{{ lang() === 'ar' ? 'الدقة' : 'Resolution' }}</th><td>{{ p.resolution }}</td></tr>
                <tr><th>FPS</th><td>{{ p.fps }}</td></tr>
                <tr><th>{{ lang() === 'ar' ? 'صوت' : 'Audio' }}</th><td>{{ p.audio_bitrate }} Kbps · 48 kHz · Stereo</td></tr>
              </table>
              <p class="hint">💡 {{ lang() === 'ar'
                  ? 'الإعداد الأهم: Keyframe Interval = 2 ثانية. هذا شرط من يوتيوب.'
                  : 'Most important: Keyframe Interval = 2 seconds. YouTube enforces this strictly.' }}</p>
            </div>

            <!-- ── STEP 4: SOURCE ───────────────────────────────────── -->
            <div *ngSwitchCase="4" class="step">
              <h2>4. {{ lang() === 'ar' ? 'أضف مصدر التقاط' : 'Add a Capture Source' }}</h2>
              <p>{{ lang() === 'ar' ? 'في لوحة Sources في OBS اضغط + واختر:' : 'In the OBS Sources panel, click + and pick:' }}</p>
              <div class="sources">
                <div class="src"><strong>🎮 Game Capture</strong><p>{{ lang() === 'ar' ? 'الأفضل لألعاب PC.' : 'Best for PC games — hardware accelerated.' }}</p></div>
                <div class="src"><strong>🖥 Display Capture</strong><p>{{ lang() === 'ar' ? 'يلتقط الشاشة كاملة.' : 'Captures the whole screen.' }}</p></div>
                <div class="src"><strong>📹 Video Capture Device</strong><p>{{ lang() === 'ar' ? 'لكاميرا الويب أو بطاقة التقاط.' : 'For webcam or capture card (PS5/Xbox).' }}</p></div>
                <div class="src"><strong>🎤 Audio Input</strong><p>{{ lang() === 'ar' ? 'اختياري للتعليق الصوتي.' : 'Optional for mic commentary.' }}</p></div>
              </div>
            </div>

            <!-- ── STEP 5: START IN OBS ─────────────────────────────── -->
            <div *ngSwitchCase="5" class="step">
              <h2>5. {{ lang() === 'ar' ? 'ابدأ البث في OBS' : 'Start Streaming in OBS' }}</h2>
              <ol class="num">
                <li>{{ lang() === 'ar' ? 'في OBS اضغط Start Streaming (أسفل اليمين).' : 'In OBS click <strong>Start Streaming</strong> (bottom-right).' }}</li>
                <li>{{ lang() === 'ar' ? 'تأكد أن المؤشر السفلي أخضر أو أصفر.' : 'Confirm the bottom-right indicator turns green or yellow.' }}</li>
                <li>{{ lang() === 'ar' ? 'انتظر 15-30 ثانية حتى يكتشف يوتيوب الإشارة.' : 'Wait 15–30 seconds for YouTube to detect the signal.' }}</li>
                <li>{{ lang() === 'ar' ? 'ثم اضغط Next للذهاب إلى آخر خطوة.' : 'Then click Next to go to the final step.' }}</li>
              </ol>
              <p class="hint warn-tone">⚠ {{ lang() === 'ar'
                  ? 'لا تضغط الزر التالي قبل التأكد أن OBS يرسل البث فعلياً، وإلا سيرفض يوتيوب الانتقال للبث المباشر.'
                  : 'Do NOT proceed until OBS is actually pushing data — YouTube returns 403 if it cannot see your stream when we Go Live.' }}</p>
            </div>

            <!-- ── STEP 6: GO LIVE ──────────────────────────────────── -->
            <div *ngSwitchCase="6" class="step">
              <h2>6. {{ lang() === 'ar' ? 'بث مباشر على Dawri' : 'Go Live on Dawri' }}</h2>
              <div class="status-card" [attr.data-s]="config()!.broadcast_status">
                <div class="dot"></div>
                <div class="text">
                  <strong>{{ statusLabel() }}</strong>
                  <small>{{ lang() === 'ar' ? 'يحدث كل 5 ثوانٍ' : 'Auto-refreshes every 5 s' }}</small>
                </div>
              </div>

              <button class="btn gold lg" type="button"
                      [disabled]="!canFinish() || finishing()"
                      (click)="finish()">
                {{ finishing()
                    ? (lang() === 'ar' ? 'جارٍ الإطلاق...' : 'Going live...')
                    : (lang() === 'ar' ? '🔴 إطلاق البث المباشر' : '🔴 Go Live Now') }}
              </button>

              <h3>{{ lang() === 'ar' ? 'مشاكل شائعة' : 'Common issues' }}</h3>
              <details *ngFor="let t of config()!.troubleshooting; trackBy: trackByTitle">
                <summary>{{ t.title }}</summary>
                <p>{{ t.body }}</p>
              </details>
            </div>

          </ng-container>

          <nav class="nav">
            <button type="button" class="btn ghost" [disabled]="currentStep() === 1" (click)="goToStep(currentStep() - 1)">
              ← {{ lang() === 'ar' ? 'السابق' : 'Previous' }}
            </button>
            <span class="count">{{ currentStep() }} / 6</span>
            <button type="button" class="btn cyan" *ngIf="currentStep() < 6" (click)="advance()">
              {{ lang() === 'ar' ? 'التالي' : 'Next' }} →
            </button>
          </nav>
        </article>
      </div>
    </section>
  `,
  styles: [`
    :host { display:block; --gold:#f0a500; --cyan:#00e5ff; --bg:#0b1022; --bg2:#0f1530; --bg3:#1a1f3a; --br:#252b4a; --mu:#7c8aa5; --red:#ff4d6d; --green:#5cd75c; --text:#e8ecf5; }
    .wizard { max-width:1200px; margin:0 auto; padding:32px 24px 80px; color:var(--text); font-family:Rajdhani,system-ui,sans-serif; }
    .wizard.rtl { direction:rtl; font-family:'Noto Sans Arabic',Rajdhani,system-ui,sans-serif; }
    .wiz-head { display:flex; justify-content:space-between; align-items:flex-start; gap:24px; margin-bottom:32px; padding-bottom:20px; border-bottom:1px solid var(--br); }
    .wiz-head h1 { font-family:'Bebas Neue',Rajdhani,sans-serif; font-size:2.4rem; letter-spacing:.04em; margin:8px 0 4px; }
    .accent { color:var(--cyan); }
    .sub { color:var(--mu); font-size:.95rem; display:flex; align-items:center; gap:10px; }
    .badge { background:var(--bg3); border:1px solid var(--br); padding:2px 8px; border-radius:4px; font-family:'Space Mono',monospace; font-size:.72rem; text-transform:uppercase; }
    .badge[data-s='live'] { color:var(--green); border-color:var(--green); }
    .badge[data-s='ready'] { color:var(--gold); border-color:var(--gold); }
    .badge[data-s='complete'], .badge[data-s='failed'] { color:var(--red); border-color:var(--red); }
    .back { color:var(--mu); font-size:.85rem; text-decoration:none; }
    .back:hover { color:var(--cyan); }
    .lang { background:transparent; border:1px solid var(--br); color:var(--text); padding:8px 16px; font-family:'Space Mono',monospace; font-size:.8rem; border-radius:4px; cursor:pointer; }
    .lang:hover { border-color:var(--cyan); color:var(--cyan); }
    .banner { padding:14px 18px; border-radius:6px; margin-bottom:20px; font-size:.92rem; }
    .banner.err  { background:rgba(255,77,109,.1); border:1px solid var(--red); color:var(--red); }
    .banner.ok   { background:rgba(92,215,92,.1);  border:1px solid var(--green); color:var(--green); }
    .banner.warn { background:rgba(240,165,0,.08); border:1px solid var(--gold);  color:var(--gold); }
    .loader { display:flex; align-items:center; gap:14px; padding:48px; justify-content:center; color:var(--mu); }
    .spin { width:28px; height:28px; border:3px solid var(--br); border-top-color:var(--cyan); border-radius:50%; animation:s .9s linear infinite; }
    @keyframes s { to { transform:rotate(360deg); } }
    .grid { display:grid; grid-template-columns:280px 1fr; gap:32px; align-items:start; }
    @media (max-width:900px) { .grid { grid-template-columns:1fr; } }
    .stepper { background:var(--bg2); border:1px solid var(--br); border-radius:8px; padding:18px; position:sticky; top:24px; }
    .stepper ol { list-style:none; padding:0; margin:0; }
    .stepper li { display:flex; gap:14px; align-items:flex-start; padding:12px 8px; cursor:pointer; border-radius:6px; transition:background .15s; }
    .stepper li:hover { background:var(--bg3); }
    .stepper li.active { background:var(--bg3); border-inline-start:3px solid var(--cyan); }
    .stepper li.done .num { background:var(--green); color:var(--bg); border-color:var(--green); }
    .num { flex:0 0 28px; width:28px; height:28px; border:1px solid var(--br); border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Space Mono',monospace; font-size:.85rem; color:var(--mu); }
    li.active .num { background:var(--cyan); color:var(--bg); border-color:var(--cyan); }
    .lbl { display:flex; flex-direction:column; gap:2px; }
    .lbl strong { font-size:.92rem; }
    .lbl small { font-size:.72rem; color:var(--mu); }
    .body { background:var(--bg2); border:1px solid var(--br); border-radius:8px; padding:32px; min-height:480px; display:flex; flex-direction:column; }
    .step { flex:1; }
    .step h2 { font-family:'Bebas Neue',Rajdhani,sans-serif; font-size:1.6rem; color:var(--gold); margin:0 0 12px; letter-spacing:.03em; }
    .step h3 { font-family:'Bebas Neue',Rajdhani,sans-serif; font-size:1.1rem; color:var(--cyan); margin:28px 0 12px; }
    .step p { line-height:1.6; margin-bottom:18px; }
    .hint { background:rgba(0,229,255,.06); border-inline-start:3px solid var(--cyan); padding:12px 16px; border-radius:0 6px 6px 0; font-size:.88rem; margin-top:18px; }
    .hint.warn-tone { background:rgba(240,165,0,.07); border-inline-start-color:var(--gold); color:var(--gold); }
    .dl { display:flex; align-items:center; gap:18px; padding:18px; background:var(--bg3); border:1px solid var(--br); border-radius:8px; margin:16px 0; }
    .dl-i { font-size:2rem; color:var(--cyan); }
    .dl-b { flex:1; display:flex; flex-direction:column; gap:4px; }
    .dl-b small { color:var(--mu); font-size:.82rem; }
    .cred { margin:18px 0; }
    .cred label { display:flex; justify-content:space-between; align-items:center; font-size:.82rem; text-transform:uppercase; letter-spacing:.06em; color:var(--mu); margin-bottom:6px; }
    .muted { color:var(--cyan); font-family:'Space Mono',monospace; text-transform:none; font-size:.7rem; }
    .warn-tone { color:var(--gold); font-size:.7rem; text-transform:none; }
    .row { display:flex; gap:8px; align-items:center; }
    .row input { flex:1; padding:11px 14px; background:var(--bg); border:1px solid var(--br); border-radius:6px; color:var(--text); font-family:'Space Mono',monospace; font-size:.9rem; }
    .row input:focus { outline:none; border-color:var(--cyan); }
    .btn { display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:6px; font-family:'Bebas Neue',Rajdhani,sans-serif; letter-spacing:.06em; font-size:.95rem; text-decoration:none; cursor:pointer; border:1px solid transparent; transition:all .15s; }
    .btn:disabled { opacity:.4; cursor:not-allowed; }
    .btn.lg { padding:14px 28px; font-size:1.05rem; }
    .btn.cyan { background:var(--cyan); color:var(--bg); }
    .btn.cyan-sm { background:var(--cyan); color:var(--bg); padding:8px 14px; font-size:.82rem; font-family:Rajdhani,sans-serif; font-weight:700; }
    .btn.gold { background:var(--gold); color:var(--bg); }
    .btn.ghost { background:transparent; border-color:var(--br); color:var(--text); }
    .btn.ghost:hover:not(:disabled) { border-color:var(--cyan); color:var(--cyan); }
    .btn.ghost-sm { background:transparent; border:1px solid var(--br); color:var(--text); padding:8px 14px; font-size:.82rem; font-family:Rajdhani,sans-serif; font-weight:700; }
    .tabs { display:flex; flex-wrap:wrap; gap:8px; margin:16px 0; }
    .tabs button { background:var(--bg3); border:1px solid var(--br); color:var(--mu); padding:10px 16px; border-radius:6px; font-family:Rajdhani,sans-serif; font-size:.86rem; cursor:pointer; }
    .tabs button.active { background:var(--cyan); color:var(--bg); border-color:var(--cyan); }
    .tbl { width:100%; border-collapse:collapse; margin-top:16px; background:var(--bg3); border-radius:8px; overflow:hidden; }
    .tbl th, .tbl td { padding:12px 16px; text-align:start; border-bottom:1px solid var(--br); font-size:.9rem; }
    .tbl th { color:var(--mu); width:40%; }
    .tbl td { font-family:'Space Mono',monospace; font-size:.85rem; }
    .must { color:var(--gold); font-family:Rajdhani,sans-serif; font-size:.75rem; margin-inline-start:6px; }
    .sources { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; margin-top:18px; }
    .src { background:var(--bg3); border:1px solid var(--br); border-radius:6px; padding:14px; }
    .src strong { display:block; margin-bottom:6px; color:var(--cyan); }
    .src p { font-size:.84rem; color:var(--mu); margin:0; }
    .num.numbered, .num { } /* keep selectors valid for IE-style fallbacks */
    .step ol.num { padding-inline-start:20px; line-height:1.9; }
    .status-card { display:flex; align-items:center; gap:14px; padding:18px; background:var(--bg3); border:1px solid var(--br); border-radius:8px; margin:16px 0; }
    .status-card .dot { width:12px; height:12px; border-radius:50%; background:var(--mu); }
    .status-card[data-s='live'] { border-color:var(--green); }
    .status-card[data-s='live']  .dot { background:var(--green); box-shadow:0 0 0 4px rgba(92,215,92,.2); animation:p 1.4s infinite; }
    .status-card[data-s='ready'] { border-color:var(--gold); }
    .status-card[data-s='ready'] .dot { background:var(--gold); }
    .status-card[data-s='complete'], .status-card[data-s='failed'] { border-color:var(--red); }
    .status-card .dot { }
    @keyframes p { 50% { box-shadow:0 0 0 8px rgba(92,215,92,0); } }
    .text { flex:1; display:flex; flex-direction:column; gap:2px; }
    .text strong { font-size:.95rem; }
    .text small { color:var(--mu); font-size:.75rem; }
    details { background:var(--bg3); border:1px solid var(--br); border-radius:6px; padding:12px 16px; margin-bottom:8px; }
    details summary { cursor:pointer; font-weight:600; }
    details p { margin-top:10px; color:var(--mu); font-size:.88rem; line-height:1.55; }
    .nav { display:flex; justify-content:space-between; align-items:center; margin-top:32px; padding-top:20px; border-top:1px solid var(--br); gap:12px; }
    .count { font-family:'Space Mono',monospace; color:var(--mu); font-size:.85rem; }
  `],
})
export class SetupWizardComponent implements OnInit {
  private readonly route       = inject(ActivatedRoute);
  private readonly router      = inject(Router);
  private readonly api         = inject(ObsWizardService);
  private readonly broadcasts  = inject(LiveBroadcastService);
  private readonly destroyRef  = inject(DestroyRef);

  // ── Signals ─────────────────────────────────────────────────────────
  protected readonly scope           = signal<WizardScope>('broadcast');
  protected readonly entityId        = signal<string>('');
  protected readonly loading         = signal<boolean>(true);
  protected readonly errorMessage    = signal<string | null>(null);
  protected readonly config          = signal<WizardConfig | null>(null);
  protected readonly credentials     = signal<BroadcastCredentials | null>(null);
  protected readonly credLoading     = signal<boolean>(false);
  protected readonly currentStep     = signal<number>(1);
  protected readonly keyHidden       = signal<boolean>(true);
  protected readonly copied          = signal<'rtmp' | 'key' | null>(null);
  protected readonly lang            = signal<'en' | 'ar'>('en');
  protected readonly selectedProfile = signal<string>('pc_high');
  protected readonly platform        = signal<ClientPlatform>('unknown');
  protected readonly finishing       = signal<boolean>(false);

  protected readonly steps: readonly WizardStep[] = WIZARD_STEPS;

  // ── Computed ────────────────────────────────────────────────────────
  protected readonly profileKeys = computed<string[]>(
    () => this.config() ? Object.keys(this.config()!.encoder_profiles) : []);

  protected readonly currentProfile = computed<EncoderProfile | null>(() => {
    const c = this.config();
    return c ? c.encoder_profiles[this.selectedProfile()] ?? null : null;
  });

  protected readonly downloadUrl = computed<string>(() => {
    const c = this.config();
    if (!c) { return 'https://obsproject.com/download'; }
    return c.download_links[this.platform()] ?? c.download_links['main'] ?? 'https://obsproject.com/download';
  });

  protected readonly platformLabel = computed<string>(() => {
    const map: Record<ClientPlatform, string> = {
      windows: 'Windows', macos: 'macOS', linux: 'Linux', unknown: 'All platforms',
    };
    return map[this.platform()];
  });

  protected readonly statusLabel = computed<string>(() => {
    const s = this.config()?.broadcast_status ?? 'unknown';
    const map: Record<string, [string, string]> = {
      created:  ['Stream created — waiting for OBS to push data',  'تم الإنشاء — في انتظار البث من OBS'],
      ready:    ['Stream is ready — push from OBS now',             'البث جاهز — ابدأ الإرسال من OBS'],
      live:     ['🔴 You are LIVE on YouTube',                      '🔴 أنت مباشر الآن على يوتيوب'],
      complete: ['Stream ended',                                    'انتهى البث'],
      failed:   ['Stream failed',                                   'فشل البث'],
      unknown:  ['Status unavailable',                              'الحالة غير متوفرة'],
    };
    return (map[s] ?? map['unknown'])[this.lang() === 'ar' ? 1 : 0];
  });

  protected readonly backLink = computed<string[]>(() => {
    const c = this.config();
    if (c?.tournament_id) { return ['/tournaments', c.tournament_id]; }
    return ['/dashboard'];
  });

  /** Can we click "Go Live"? — broadcast must exist and not be terminal/live. */
  protected readonly canFinish = computed<boolean>(() => {
    const c = this.config();
    if (!c?.has_broadcast || !c.broadcast_id) { return false; }
    return c.broadcast_status === 'ready' || c.broadcast_status === 'created';
  });

  private pollSub: Subscription | null = null;

  constructor() {
    // Poll broadcast status on Step 6, every 5 s — only while on that step.
    effect((onCleanup) => {
      if (this.currentStep() !== 6) { return; }
      const id = this.config()?.broadcast_id;
      if (!id) { return; }

      this.pollSub = interval(5000).pipe(
        switchMap(() => this.broadcasts.get(id)),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe({
        next: (b) => {
          const c = this.config();
          if (c) {
            this.config.set({ ...c, broadcast_status: b.status, is_live: b.is_live, is_terminal: b.is_terminal });
          }
        },
        error: () => { /* silent — status polling failures are non-fatal */ },
      });

      onCleanup(() => this.pollSub?.unsubscribe());
    });
  }

  ngOnInit(): void {
    // Auto-detect scope from the URL path: /broadcasts/... vs /tournaments/...
    const url = this.router.url;
    const scope: WizardScope = url.includes('/broadcasts/') ? 'broadcast' : 'tournament';
    const id = this.route.snapshot.paramMap.get('id') ?? '';

    this.scope.set(scope);
    this.entityId.set(id);
    this.platform.set(this.api.detectPlatform());

    if (!id) {
      this.errorMessage.set('Missing ID in route.');
      this.loading.set(false);
      return;
    }

    this.api.getConfig(scope, id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (cfg) => {
        this.config.set(cfg);
        this.selectedProfile.set(cfg.default_profile);
        this.loading.set(false);
        this.logEvent('step_viewed', 1);
      },
      error: (err: Error) => {
        this.errorMessage.set(err.message);
        this.loading.set(false);
      },
    });
  }

  // ── User actions ─────────────────────────────────────────────────────

  protected goToStep(n: number): void {
    if (n < 1 || n > 6) { return; }
    this.currentStep.set(n);
    this.logEvent('step_viewed', n);
  }

  protected advance(): void {
    this.markCompleted(this.currentStep());
    this.goToStep(this.currentStep() + 1);
  }

  protected markCompleted(step: number): void {
    this.logEvent('step_completed', step);
  }

  protected toggleLang(): void {
    this.lang.set(this.lang() === 'en' ? 'ar' : 'en');
  }

  /** Pull RTMP credentials via the rate-limited reveal endpoint. */
  protected revealCredentials(): void {
    const id = this.config()?.broadcast_id;
    if (!id) { return; }
    this.credLoading.set(true);
    this.broadcasts.getCredentials(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (cred) => {
        this.credentials.set(cred);
        this.credLoading.set(false);
        this.markCompleted(2);
      },
      error: (err: Error) => {
        this.errorMessage.set(err.message);
        this.credLoading.set(false);
      },
    });
  }

  /** Final-step action: server-side go-live + analytics in one round-trip. */
  protected finish(): void {
    const id = this.config()?.broadcast_id;
    if (!id || this.finishing()) { return; }
    this.finishing.set(true);
    this.api.finish(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (b) => {
        this.finishing.set(false);
        const c = this.config();
        if (c) { this.config.set({ ...c, broadcast_status: b.status, is_live: b.is_live }); }
      },
      error: (err: Error) => {
        this.finishing.set(false);
        this.errorMessage.set(err.message);
        this.logEvent('error_encountered', 6, { error: err.message });
      },
    });
  }

  /**
   * Copy to clipboard with visual feedback. Falls back to a textarea trick
   * in insecure contexts where navigator.clipboard is unavailable.
   *
   * @param value  String to copy
   * @param tag    Field identifier (for UI flash)
   */
  protected async copy(value: string, tag: 'rtmp' | 'key'): Promise<void> {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const ta = document.createElement('textarea');
        ta.value = value; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
      }
      this.copied.set(tag);
      this.logEvent(tag === 'rtmp' ? 'rtmp_copied' : 'key_copied');
      setTimeout(() => this.copied.set(null), 1500);
    } catch {
      this.errorMessage.set('Could not copy to clipboard. Please copy manually.');
    }
  }

  // ── Internals ────────────────────────────────────────────────────────

  private logEvent(event: Parameters<ObsWizardService['logEvent']>[2], step?: number, extra?: Record<string, unknown>): void {
    if (!this.entityId()) { return; }
    this.api.logEvent(this.scope(), this.entityId(), event, {
      stepNumber: step,
      platform: this.platform(),
      metadata: extra,
    }).subscribe();
  }

  protected trackByStep  = (_: number, s: WizardStep): number => s.number;
  protected trackByTitle = (_: number, t: { title: string }): string => t.title;
}
