<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApprovalLevel extends Model
{
    public function approver()
    {
        return $this->belongsTo(User::class, 'approver_id');
    }
}
