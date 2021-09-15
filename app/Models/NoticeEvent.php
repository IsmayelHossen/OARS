<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NoticeEvent extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'category',
        'description',
        'status',
        'email',
        'image',

    ];

}
