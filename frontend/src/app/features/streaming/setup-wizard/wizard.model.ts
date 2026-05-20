/**
 * Wizard models — mirror Laravel resources.
 *
 * @file    wizard.model.ts
 * @since   Sprint 5 wizard
 */

import type { BroadcastSource, BroadcastStatus } from '../live-broadcast.model';

/** Allowed wizard event codes — mirrors BroadcastSetupLog::EVENTS in PHP. */
export type WizardEvent =
  | 'wizard_opened'
  | 'step_viewed'
  | 'step_completed'
  | 'rtmp_copied'
  | 'key_copied'
  | 'stream_verified'
  | 'wizard_completed'
  | 'wizard_abandoned'
  | 'error_encountered';

/** Detected client OS — mirrors LogWizardEventRequest validation. */
export type ClientPlatform = 'windows' | 'macos' | 'linux' | 'unknown';

/** Which kind of URL did the wizard route resolve from? */
export type WizardScope = 'broadcast' | 'tournament';

/** One recommended OBS encoder profile. */
export interface EncoderProfile {
  readonly label: string;
  readonly resolution: string;
  readonly fps: number;
  readonly bitrate_kbps: number;
  readonly encoder: string;
  readonly rate_control: string;
  readonly keyframe_interval: number;
  readonly audio_bitrate: number;
}

/** One troubleshooting tip. */
export interface TroubleshootingTip {
  readonly title: string;
  readonly body: string;
}

/** Wizard configuration payload returned by GET /setup-wizard/config. */
export interface WizardConfig {
  readonly scope: WizardScope;
  readonly broadcast_id: string | null;
  readonly broadcast_status: BroadcastStatus | null;
  readonly broadcast_source: BroadcastSource | null;
  readonly has_broadcast: boolean;
  readonly is_live: boolean;
  readonly is_terminal: boolean;
  readonly tournament_id: string | null;
  readonly tournament_name: string;
  readonly watch_url: string | null;
  readonly embed_url: string | null;
  /** Fully-qualified API path; the wizard service uses this directly. */
  readonly credentials_url: string | null;
  readonly go_live_url: string | null;
  readonly create_broadcast_url: string | null;
  readonly download_links: Readonly<Record<string, string>>;
  readonly encoder_profiles: Readonly<Record<string, EncoderProfile>>;
  readonly default_profile: string;
  readonly troubleshooting: readonly TroubleshootingTip[];
  readonly already_completed: boolean;
}

/** Payload for POST /setup-wizard/event. */
export interface LogEventPayload {
  readonly event: WizardEvent;
  readonly step_number?: number | null;
  readonly platform?: ClientPlatform | null;
  readonly metadata?: Readonly<Record<string, unknown>> | null;
}

/** Wizard step metadata for the stepper sidebar. */
export interface WizardStep {
  readonly number: 1 | 2 | 3 | 4 | 5 | 6;
  readonly key: string;
  readonly title: string;
  readonly title_ar: string;
  readonly subtitle: string;
  readonly subtitle_ar: string;
}

/** The six canonical wizard steps — order matters. */
export const WIZARD_STEPS: readonly WizardStep[] = [
  {
    number: 1, key: 'download',
    title: 'Download OBS Studio', title_ar: 'تنزيل OBS Studio',
    subtitle: 'Free, open-source streaming software',
    subtitle_ar: 'برنامج بث مجاني ومفتوح المصدر',
  },
  {
    number: 2, key: 'credentials',
    title: 'Get Stream Credentials', title_ar: 'احصل على بيانات البث',
    subtitle: 'Reveal RTMP URL + key',
    subtitle_ar: 'اعرض رابط RTMP والمفتاح',
  },
  {
    number: 3, key: 'encoder',
    title: 'Encoder Settings', title_ar: 'إعدادات الترميز',
    subtitle: 'Resolution, bitrate, framerate',
    subtitle_ar: 'الدقة ومعدل البت ومعدل الإطارات',
  },
  {
    number: 4, key: 'source',
    title: 'Add a Source', title_ar: 'أضف مصدراً',
    subtitle: 'Game capture, display, or webcam',
    subtitle_ar: 'التقاط اللعبة أو الشاشة أو الكاميرا',
  },
  {
    number: 5, key: 'start',
    title: 'Start Streaming in OBS', title_ar: 'ابدأ البث في OBS',
    subtitle: 'Click Start Streaming, wait 15-30s',
    subtitle_ar: 'اضغط Start Streaming وانتظر 15-30 ثانية',
  },
  {
    number: 6, key: 'golive',
    title: 'Go Live on Dawri', title_ar: 'بث مباشر على Dawri',
    subtitle: 'One-click YouTube transition',
    subtitle_ar: 'انتقال يوتيوب بنقرة واحدة',
  },
] as const;
