<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CTMark extends Model
{
    use HasFactory;
    protected $fillable = [
        'It',
        'session',
        'ccode',
        'cname',
        'temail',
        'ctname',
        'marks'


    ];
}
