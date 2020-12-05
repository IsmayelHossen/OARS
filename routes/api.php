<?php

use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\AttendanceController;
use App\Http\Controllers\API\ForgetPassword;
use App\Http\Controllers\API\ForgetPasswordController;
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
Route::get('AttendanceResultInfo1/{email}',[StudentController::class,'AttendanceResultInfo1']);
Route::get('StudentSemResultInfo1/{it}/{semester}',[StudentController::class,'StudentSemResultInfo1']);
Route::get('IndividualAttendResult1/{it}/{ccode}',[StudentController::class,'IndividualAttendResult1']);
Route::get('TeacherInformation1/{temail}',[StudentController::class,'TeacherInformation1']);

// Route::group(['middleware' => 'auth:api'], function () {
//     Route::apiResource('Student', StudentController::class);
// });

//twacher all api
Route::apiResource('Teacher', TeacherController::class);
//Attendance api
// Route::get('semesterrule/{email}/{batch}',[AttendanceController::class,'TakenPermitClass']);
Route::get('semesterrule/{email}',[AttendanceController::class,'TakenPermitClass']);
Route::get('semesterStudent/{session}',[AttendanceController::class,'SessionStudent']);
Route::post('saveattendence/{teacheremail}/{session}/{Coursecode}/{Usemester}',[AttendanceController::class,'SaveAttendence']);
Route::get('getsemesterinfo/{session}/{temail}',[AttendanceController::class,'SemesterInfo']);
Route::get('gettotalclass/{ccode}/{temail}',[AttendanceController::class,'GetAllClass']);
Route::get('gettotalclass/{ccode}/{temail}',[AttendanceController::class,'GetAllClass']);
Route::delete('deleteSpecificAttendance/{ccode}/{successCode}/{temail}',[AttendanceController::class,'SpecificAttendanceDel']);
Route::get('ViewSpecificAttendance/{ccode}/{successCode}/{temail}',[AttendanceController::class,'ViewSpecificAttendance']);
Route::get('GetAttendanceForUpdate/{ccode}/{successCode}/{temail}',[AttendanceController::class,'GetAttendanceForUpdate']);
Route::put('AttendanceUpdate/{ccode}/{successCode}/{temail}',[AttendanceController::class,'AttendanceUpdate']);
Route::get('CourseCodeUpdate/{successCode}/{temail}/{ccode}',[AttendanceController::class,'CourseCodeUpdate']);
Route::get('AllinformationGet/{temail}',[AttendanceController::class,'AllinformationGet']);
Route::get('getAttendaceResult/{temail}',[AttendanceController::class,'getAttendaceResult']);
Route::get('IndividualAttendResult/{it}/{ccode}/{temail}',[AttendanceController::class,'IndividualAttendResult']);
Route::get('SearchByCourseCode/{sbyccode}/{temail}',[AttendanceController::class,'SearchByCourseCode']);



//image all api
Route::post('upload',[ImageController::class,'uploadimage']);

//admin
Route::get('Infoteacher',[AdminController::class,'Infoteacher'])->middleware('auth:api');
Route::post('SaveSemesterCourse1',[AdminController::class,'SaveSemesterCourse1']);
Route::get('GetSemesterCourseInfo1',[AdminController::class,'GetSemesterCourseInfo1']);
Route::get('deleteSpecificSemesterCourse1/{email}/{ccode}/{session}',[AdminController::class,'deleteSpecificSemesterCourse1']);

//password forget change password
Route::post('PasswordForgetEmail1',[ForgetPasswordController::class,'PasswordForgetEmail1']);
Route::post('ResetPasswordSave1',[ForgetPasswordController::class,'ResetPasswordSave1']);



