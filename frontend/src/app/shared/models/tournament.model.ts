export interface Tournament {
  id: string;
  name: string;
  name_ar?: string;
  game: 'ea_fc25' | 'pubg_mobile' | 'cod_mobile';
  game_label: string;
  format: 'single_elimination' | 'double_elimination' | 'round_robin' | 'swiss';
  format_label: string;
  max_participants: number;
  swiss_rounds?: number;
  participant_count: number;
  registration_closes_at: string;
  starts_at: string;
  timezone: string;
  is_public: boolean;
  entry_fee_sar: number;
  prize_pool: PrizePool[];
  is_registration_open: boolean;
  organizer?: { id: string; name: string };
  moderator?: { id: string; name: string } | null;
  bracket?: Bracket | null;
  participants?: Participant[];
  created_at: string;
}

export interface Bracket {
  id: string;
  tournament_id: string;
  format: string;
  status: 'pending' | 'active' | 'completed';
  total_rounds: number;
  current_round: number;
  participant_count: number;
  bye_count: number;
  winner?: { id: string; user_name: string } | null;
  matches: Match[];
  generated_at?: string;
  completed_at?: string;
}

export interface Match {
  id: string;
  bracket_id: string;
  round_number: number;
  match_number: number;
  bracket_section: 'winners' | 'losers' | 'grand_final';
  status: 'pending' | 'scheduled' | 'ongoing' | 'submitted' | 'completed' | 'disputed';
  participant_a?: Participant | null;
  participant_b?: Participant | null;
  participant_a_is_bye: boolean;
  participant_b_is_bye: boolean;
  winner?: { id: string; user_name: string } | null;
  score_a?: number | null;
  score_b?: number | null;
  next_match_id?: string | null;
  dispute_reason?: string | null;
  scheduled_at?: string | null;
  completed_at?: string | null;
}

export interface Participant {
  id: string;
  user_name?: string;
  seed: number;
  wins: number;
  losses: number;
  points: number;
  buchholz: number;
  is_eliminated: boolean;
}

export interface PrizePool {
  position: number;
  reward: string;
}

export interface BracketRound {
  num: number;
  label: string;
  matches: Match[];
}
