<?php

use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\AttendanceController;
use App\Http\Controllers\API\ForgetPassword;
use App\Http\Controllers\API\ForgetPasswordController;
use App\Http\Controllers\API\ImageController;
use App\Http\Controllers\API\LoginRegController;
use App\Http\Controllers\API\SocialController;
use App\Http\Controllers\API\StudentController;
use App\Http\Controllers\API\TeacherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//login registration all api
Route::get('token', [LoginRegController::class, 'createToken']);
Route::post('login', [LoginRegController::class, 'login']);
Route::post('register', [LoginRegController::class, 'register']);
Route::post('storeVcode1', [LoginRegController::class, 'storeVcode1']);
Route::get('/user', [LoginRegController::class, 'user'])->middleware('auth:api');

//  Route::get('/user', [LoginRegController::class, 'user'])->middleware('auth:api');

//student all api
Route::apiResource('Student', StudentController::class);
Route::get('AttendanceResultInfo1/{email}',[StudentController::class,'AttendanceResultInfo1']);
Route::get('StudentSemResultInfo1/{it}/{semester}',[StudentController::class,'StudentSemResultInfo1']);
Route::get('IndividualAttendResult1/{it}/{ccode}',[StudentController::class,'IndividualAttendResult1']);
Route::get('TeacherInformation1/{temail}',[StudentController::class,'TeacherInformation1']);
Route::get('classmateGet1/{session}/{email}',[StudentController::class,'classmateGet1']);
// Route::group(['middleware' => 'auth:api'], function () {
//     Route::apiResource('Student', StudentController::class);
// });
// ct mark get GetCTMarks2
Route::get('GetCTMarks2/{it}/{ccode}/{temail}',[StudentController::class,'GetCTMarks2']);
//teacher all api
Route::apiResource('Teacher', TeacherController::class);
// SaveMoreInfo
Route::post('SaveMoreInfo1',[TeacherController::class,'SaveMoreInfo1']);
// GetMoreinf2
Route::get('GetMoreinf2/{email}',[TeacherController::class,'GetMoreinf2']);
Route::get('getColleagueInfo1/{email}',[TeacherController::class,'getColleagueInfo1']);
Route::get('GetteacherData1',[StudentController::class,'GetteacherData1']);


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
Route::post('SaveAddMark1',[AttendanceController::class,'SaveAddMark1']);
Route::get('GetStudentCTMarkByCode1/{session}/{ccode}/{temail}',[AttendanceController::class,'GetStudentCTMarkByCode1']);
Route::get('GetCTMarks1/{session}/{ccode}/{bestct}/{temail}',[AttendanceController::class,'GetCTMarks1']);
Route::delete('DeleteCTMark1/{id}',[AttendanceController::class,'DeleteCTMark1']);
// GetRoutineCcode1
Route::get('GetRoutineCcode1/{temail}',[AttendanceController::class,'GetRoutineCcode1']);
// get  semester course code Individual
Route::get('getSemesterCodeIndivi1/{email}/{semester}',[AttendanceController::class,'getSemesterCodeIndivi1']);
//Save routine and access admin service
Route::post('SaveSemesterRoutinefromTacher1',[AttendanceController::class,'SaveSemesterRoutinefromTacher1']);
//deleteSpecificRoutine1 from teacher
Route::delete('deleteSpecificRoutine1/{email}/{day}',[AttendanceController::class,'deleteSpecificRoutine1']);
//save Ct mark
Route::post('SaveCtMark1/{teacheremail}/{session}/{Coursecode}/{ct}',[AttendanceController::class,'SaveCtMark1']);
//SemesterCtMark1
Route::get('SemesterCtMark1/{session}/{ccode}/{temail}',[AttendanceController::class,'SemesterCtMark1']);
// IndividualCtMark1
Route::get('IndividualCtMark1/{session}/{ccode}/{temail}/{ctnum}',[AttendanceController::class,'IndividualCtMark1']);
//GetCountCTMark1
Route::get('GetCountCTMark1/{session}/{ccode}/{ctcount}/{temail}',[AttendanceController::class,'GetCountCTMark1']);
// GetRoutineResult1
Route::get('GetRoutineResult2/{temail}',[AttendanceController::class,'GetRoutineResult2']);
//image all api
Route::post('upload',[ImageController::class,'uploadimage']);

//admin
Route::get('Infoteacher',[AdminController::class,'Infoteacher']);
Route::post('SaveSemesterCourse1',[AdminController::class,'SaveSemesterCourse1']);
Route::get('GetSemesterCourseInfo1',[AdminController::class,'GetSemesterCourseInfo1']);
Route::get('deleteSpecificSemesterCourse1/{email}/{ccode}/{session}',[AdminController::class,'deleteSpecificSemesterCourse1']);
Route::get('GetSemcCourseUpdateData1/{email}/{ccode}/{session}',[AdminController::class,'GetSemcCourseUpdateData1']);
Route::post('UpdateSemesterCourse1',[AdminController::class,'UpdateSemesterCourse1']);
Route::post('NoticeSave1',[AdminController::class,'NoticeSave1']);
Route::get('getNoticeData1',[AdminController::class,'getNoticeData1']);
Route::get('GetSessionActiveData1/{id}',[AdminController::class,'GetSessionActiveData1']);
Route::get('GetSessionStudent1/{session}',[AdminController::class,'GetSessionStudent1']);
Route::post('SaveSemesterCourseTitle1',[AdminController::class,'SaveSemesterCourseTitle1']);
Route::get('GetSemesterCourseTitleInfo1',[AdminController::class,'GetSemesterCourseTitleInfo1']);
Route::delete('deleteSpecificSemesterCoursetitle1/{ccode}/{ctitle}',[AdminController::class,'deleteSpecificSemesterCoursetitle1']);
Route::get('getSemesterCode1/{semester}',[AdminController::class,'getSemesterCode1']);
Route::get('getSemesterCodeTitle1/{ccode}',[AdminController::class,'getSemesterCodeTitle1']);
Route::get('GetActiveSessioninfo1',[AdminController::class,'GetActiveSessioninfo1']);
Route::get('getSemesterInfoR1/{session}',[AdminController::class,'getSemesterInfoR1']);
Route::get('getSemesterCodeMR1/{session}/{semester}/{theorylab}',[AdminController::class,'getSemesterCodeMR1']);
Route::get('getSemesterCTitleMR1/{session}/{courseCode}',[AdminController::class,'getSemesterCTitleMR1']);
Route::get('getSemesterAttendanceMark1/{session}/{courseCode}/{it}',[AdminController::class,'getSemesterAttendanceMark1']);
Route::get('getSemesterCTMark1/{session}/{courseCode}/{it}',[AdminController::class,'getSemesterCTMark1']);
Route::post('SaveSemesterResult1',[AdminController::class,'SaveSemesterResult1']);
Route::get('FinalResultByIt1/{it}',[AdminController::class,'FinalResultByIt1']);
Route::get('deleteSpecificSemesterCCResult1/{it}/{ccode}/{session}',[AdminController::class,'deleteSpecificSemesterCCResult1']);
Route::get('AllSession',[AdminController::class,'AllSession']);
Route::get('SearchSemesterWiseResult1/{session}/{semester}',[AdminController::class,'SearchSemesterWiseResult1']);
Route::get('GPAMark1/{it}/{semester}',[AdminController::class,'GPAMark1']);
Route::get('GradeSheetResult1/{it}/{semester}',[AdminController::class,'GradeSheetResult1']);
Route::get('getlpgrade1',[AdminController::class,'getlpgrade1']);
Route::get('getmemberRequest1',[AdminController::class,'getmemberRequest1']);
Route::get('getmemberRequest2',[AdminController::class,'getmemberRequest2']);
Route::get('RequestInfoData1/{infoData}',[AdminController::class,'RequestInfoData1']);
Route::get('AcceptRequestDone1/{who}/{email}',[AdminController::class,'AcceptRequestDone1']);
Route::get('GetAllMsg1/{friendid}/{myid}',[AdminController::class,'GetAllMsg1']);
Route::post('saveMsg1',[AdminController::class,'saveMsg1']);
Route::get('AllFriendData1/{myid}',[AdminController::class,'AllFriendData1']);
Route::get('AllFriendData3/{myid}',[AdminController::class,'AllFriendData3']);
Route::get('AllFriendData4/{myid}',[AdminController::class,'AllFriendData4']);

// RoutineActive1
Route::get('RoutineActive1/{email}/{day}/{id}',[AdminController::class,'RoutineActive1']);
//getNoticeEvent1
Route::get('getNoticeEvent2/{email}',[AdminController::class,'getNoticeEvent2']);

Route::post('pusher/auth',[AdminController::class,'authenticate']);
Route::post('SavePost1',[AdminController::class,'SavePost1']);
Route::post('SaveNoticeEvent1',[AdminController::class,'SaveNoticeEvent1']);

Route::get('PostGet1/{email}',[AdminController::class,'PostGet1']);
Route::get('PostDelete1/{id}',[AdminController::class,'PostDelete1']);
Route::get('EditDataget1/{id}/{email}',[AdminController::class,'EditDataget1']);
Route::post('EditPostData1',[AdminController::class,'EditPostData1']);
Route::post('SaveSemesterRoutine1',[AdminController::class,'SaveSemesterRoutine1']);
Route::get('RoutineResult1',[AdminController::class,'RoutineResult1']);
Route::get('GetRoutineResult1/{email}',[AdminController::class,'GetRoutineResult1']);
Route::get('getIndviNoticeEvent1/{id}',[AdminController::class,'getIndviNoticeEvent1']);



//social api

Route::get('AllPostRetrive1',[SocialController::class,'AllPostRetrive1']);
























//password forget change password
Route::post('PasswordForgetEmail1',[ForgetPasswordController::class,'PasswordForgetEmail1']);
Route::post('ResetPasswordSave1',[ForgetPasswordController::class,'ResetPasswordSave1']);



