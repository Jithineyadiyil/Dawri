<?php
declare(strict_types=1);
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class DistributorHealth extends Model {
    protected $table = 'distributor_health';
    protected $primaryKey = 'distributor';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = [
        'distributor','is_active','last_success_at','last_failure_at',
        'failure_count','circuit_status',
    ];
    protected $casts = [
        'is_active'=>'boolean','failure_count'=>'integer',
        'last_success_at'=>'datetime','last_failure_at'=>'datetime',
    ];
}
