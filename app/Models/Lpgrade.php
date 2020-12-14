<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lpgrade extends Model
{
    use HasFactory;
    protected $fillable = [
        'ngrade',
        'gpoint',
        'lgrade',


    ];
}
