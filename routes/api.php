<?php

use App\Http\Controllers\API\AttendanceController;
use App\Http\Controllers\API\ImageController;
use App\Http\Controllers\API\LoginRegController;
use App\Http\Controllers\API\StudentController;
use App\Http\Controllers\API\TeacherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//login registration all api
Route::get('token', [LoginRegController::class, 'createToken']);
Route::post('login', [LoginRegController::class, 'login']);
Route::post('register', [LoginRegController::class, 'register']);

//student all api
Route::apiResource('Student', StudentController::class);
// Route::group(['middleware' => 'auth:api'], function () {
//     Route::apiResource('Student', StudentController::class);
// });

//twacher all api
Route::apiResource('Teacher', TeacherController::class);
//Attendance api
// Route::get('semesterrule/{email}/{batch}',[AttendanceController::class,'TakenPermitClass']);
Route::get('semesterrule/{email}',[AttendanceController::class,'TakenPermitClass']);
Route::get('semesterStudent/{session}',[AttendanceController::class,'SessionStudent']);
Route::post('saveattendence/{teacheremail}/{session}/{Coursecode}',[AttendanceController::class,'SaveAttendence']);
Route::get('getsemesterinfo/{session}/{temail}',[AttendanceController::class,'SemesterInfo']);
//image all api
Route::post('upload',[ImageController::class,'uploadimage']);


