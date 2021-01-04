<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class SocialController extends Controller
{
    public function AllPostRetrive1(){
        $result=Post::orderBy('id','desc')->where('status',1)->get();
        return response()->json([
         'success' => true,
         'message' => 'session waize result !!',
         'data' => $result,


     ]);
    }
}
