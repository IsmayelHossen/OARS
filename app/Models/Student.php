<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'it',
        'session',
        'image',
        'bloodg',
        'faname',
        'maname',
        'caddress',
        'paddress',
        'phone',
        'email',
        'password',
    ];
}
