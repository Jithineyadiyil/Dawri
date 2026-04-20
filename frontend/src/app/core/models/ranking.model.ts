/**
 * Dawri Platform — Ranking & Player interfaces.
 *
 * Add these to your existing models file or create a new one.
 * Path: src/app/core/models/ranking.model.ts
 */

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  name: string;
  avatar: string | null;
  country: string | null;
  game?: string;
  total_points: number;
  wins: number;
  losses: number;
  tournaments_played: number;
  win_rate: number;
}

export interface PlayerProfile {
  id: string;
  name: string;
  game_username: string | null;
  avatar: string | null;
  bio: string | null;
  country: string | null;
  city: string | null;
  psn_id: string | null;
  pubg_id: string | null;
  cod_id: string | null;
  preferred_games: string[] | null;
  member_since: string;
  stats: PlayerGameStat[];
  rankings: PlayerGameRanking[];
  recent_tournaments: RecentTournament[];
}

export interface PlayerGameStat {
  game: string;
  total_wins: number;
  total_losses: number;
  total_tournaments: number;
  total_points: number;
  matches_played: number;
  win_rate: number;
}

export interface PlayerGameRanking {
  game: string;
  rank_position: number;
  total_points: number;
  season_id: string | null;
}

export interface RecentTournament {
  tournament_id: string;
  tournament_name: string;
  game: string;
  wins: number;
  losses: number;
  points: number;
  is_eliminated: boolean;
  registered_at: string;
}

export interface MatchHistoryEntry {
  match_id: string;
  tournament_id: string;
  tournament_name: string;
  game: string;
  round: number;
  match_number: number;
  bracket_section: string;
  status: string;
  result: 'win' | 'loss' | 'pending';
  score_a: number | null;
  score_b: number | null;
  opponent: {
    participant_id: string;
    user_id: string;
    name: string;
    gamertag: string | null;
  } | null;
  played_at: string;
}

export interface ProfileUpdatePayload {
  game_username?: string;
  psn_id?: string;
  pubg_id?: string;
  cod_id?: string;
  preferred_games?: string[];
  bio?: string;
  country?: string;
  city?: string;
}

export const GAME_LABELS: Record<string, string> = {
  ea_fc25: 'EA FC 25',
  pubg_mobile: 'PUBG Mobile',
  cod_mobile: 'CoD Mobile',
};
