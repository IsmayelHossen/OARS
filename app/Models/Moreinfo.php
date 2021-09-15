<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Moreinfo extends Model
{
    use HasFactory;
    protected $fillable = [
        'heading',
        'degree',
        'institution',
        'passing',
        'result',
        'details',
      'email',

    ];

}
