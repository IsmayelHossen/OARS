<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SemesterRule extends Model
{
    use HasFactory;
    protected $fillable = [
        'email',
        'batch',
        'semester',
        'session',
        'cname',
        'labtheory ',
        'course_code',

    ];
}
