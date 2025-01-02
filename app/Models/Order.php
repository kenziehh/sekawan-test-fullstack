<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model

{
    // use SoftDeletes;

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
    
    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }

    public function approvalLevels()
    {
        return $this->hasMany(ApprovalLevel::class);
    }

    public function scopePendingApprovalByUser(Builder $query, int $approverId): Builder
    {
        return $query->whereHas('approvalLevels', function ($q) use ($approverId) {
            $q->where('approver_id', $approverId)
                ->where('status', 'pending');
        });
    }
}
