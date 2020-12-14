<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/{path?}', function () {
    return view('welcome');
});
// Route::get('/{path?}/{path?}', function () {
//     return view('welcome');
// });

Route::get('/{path?}/{path2?}', function () {
    return view('welcome');
});

Route::get('/{path?}/{path2?}/{path3?}', function () {
    return view('welcome');
});
Route::get('/{path?}/{path2?}/{path3?}/{path4?}', function () {
    return view('welcome');
});
Route::get('/{path?}/{path2?}/{path3?}/{path4?}/{path5?}', function () {
    return view('welcome');
});

 Auth::routes();
Route::get('/about',function(){
  return view('about');
});
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
