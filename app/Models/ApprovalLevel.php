<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApprovalLevel extends Model
{
    protected $fillable = ['order_id', 'approver_id', 'status'];

    public function approver()
    {
        return $this->belongsTo(User::class, 'approver_id');
    }
}
