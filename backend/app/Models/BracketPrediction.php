<?php
declare(strict_types=1);
namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BracketPrediction extends Model
{
    use HasUuids;

    protected $fillable = [
        'tournament_id','user_id','match_id',
        'predicted_winner_id','is_correct','points_earned',
    ];

    protected $casts = [
        'is_correct'    => 'boolean',
        'points_earned' => 'integer',
    ];

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function match(): BelongsTo { return $this->belongsTo(TournamentMatch::class,'match_id'); }
}
