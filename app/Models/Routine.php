<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Routine extends Model
{
    use HasFactory;
    protected $fillable = [
        'email',
        'day',
        'semester',
        'ccode',
        'ctitle',
        'time1',
        'ampm',
        'lecture'
    ];

}
