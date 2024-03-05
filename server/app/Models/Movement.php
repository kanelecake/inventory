<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movement extends Model
{
    protected $fillable = [
        'inventory_number',
        'item_name',
        'from',
        'to',
        'moved_at',
        'user_id',
        'status',
    ];
}
