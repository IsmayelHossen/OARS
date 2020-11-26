<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Attendace;
use App\Models\SemesterRule;
use App\Models\Student;
use App\Models\Teacher;
use Defuse\Crypto\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AttendanceController extends Controller
{
    public function  TakenPermitClass($email){
          $getpermit=SemesterRule::select('session','batch','semester','email')->distinct()->where('email',$email)->get();
       //  $getpermit =DB::table('semester_rules')->distinct('tyrbatch2')->get();
           return response()->json([
               'success'=> true,
               'message'=> 'Get permit class',
               'data'=> $getpermit,
           ]);

    }
    public function SessionStudent($session){
        $getSessionStudent=Student::where('session',$session)->orderBy('it','asc')->get();
        return response()->json([
            'success'=>true,
            'message'=>'ok get sessionwaz all student',
            'data'=>$getSessionStudent,
        ]);
    }
    public function SaveAttendence($temail,$session,$Coursecode,$Usemester,Request $request){

       $attend=$request->all();
       $date=date('d/m/yy');
       $successCode=mt_rand();
       $checkDate=Attendace::where('TakenDate',$date)
       ->where('teacheremail',$temail)
       ->where('course_code',$Coursecode)->first();
       if($checkDate){
            return response()->json([
            'checkdate'=>true,
            'message'=>'You have already taken attendence',
            'data'=>$date,
        ]);

       }
       else{



        // return response()->json([
        //     'status'=>true,
        //      'data'=>$attend,
        // ]);
        //  $attend=new Attendace();
         //$attend->$name->save();
        if($attend){
      foreach ($attend as $attend2) {
          # code...


            $attend1=new Attendace();
            $attend1->teacheremail=$temail;
            $attend1->session=$session;
            $attend1->TakenDate=$date;
            $attend1->semester=$Usemester;
            $attend1->successCode=$successCode;
            $attend1->course_code=$Coursecode;
            $attend1->it=$attend2['name'];
            $attend1->attend=$attend2['value'];
            $attend1->save();
        }
        return response()->json([
            'success'=>true,
            'message'=>'ok student attendance have been taken successfully',
            'data'=>$date,
        ]);

        }

        }

    }
    public function SemesterInfo($session,$email){
       // $getinfo=SemesterRule::where('session',$session)->where('email',$email)->get();
        $getinfo1=SemesterRule::where('session',$session)->where('email',$email)->get();
        return response()->json([
            'success'=> true,
            'message'=> 'Get Semester Info',
           // 'data'=> $getinfo,
            'data'=> $getinfo1,
        ]);

    }
    public function GetAllClass($ccode,$temail){
        $get=Attendace::select('TakenDate','course_code','successCode')->distinct()->where('teacheremail',$temail)->where('course_code',$ccode)->get();

        return response()->json([
            'success'=> true,
            'message'=> 'Get all classes taken specific course code',
           // 'data'=> $getinfo,
            'data'=>$get,
        ]);
    }
    public function SpecificAttendanceDel($ccode,$successCode,$temail){
        $del=Attendace::where('course_code',$ccode)->where('successCode',$successCode)->where('teacheremail',$temail)->delete();
        return response()->json([
            'success'=>true,
            'message'=>'Successfully Deleted',
            'data'=>$del
        ]);

    }
    public function ViewSpecificAttendance($ccode,$successCode,$temail){

        $get=Attendace::where('course_code',$ccode)->where('successCode',$successCode)->where('teacheremail',$temail)->orderBy('it','asc')->get();
        return response()->json([
            'success'=>true,
            'message'=>'Get Specific Attendance',
            'data'=>$get
        ]);
    }
    public function GetAttendanceForUpdate($ccode,$successCode,$temail){

        // $get=Attendace::where('course_code',$ccode)->where('successCode',$successCode)->where('teacheremail',$temail)->orderBy('it','asc')->get();
         $get1=DB::table('students')
         ->join('attendaces','students.it','=','attendaces.it')
         ->select('students.name','students.phone','students.image','attendaces.*')
         ->where('attendaces.successCode',$successCode)->where('attendaces.teacheremail',$temail)->orderBy('attendaces.it','asc')
         ->get();
        return response()->json([
            'success'=>true,
            'message'=>'Get Specific Attendance for update',
            'data'=>$get1
        ]);

    }
    public function AttendanceUpdate($ccode,$scode,$temail,Request $request){


    $attend=$request->all();
    if($attend){


    //    DB::table('post')
    //         ->where('id', 3)
    //         ->update(['title' => "Updated Title"]);
        foreach ($attend as $attend2) {
            # code...
            $find=Attendace::where('course_code',$ccode)->where('successCode',$scode)
            ->where('teacheremail',$temail)->where('it',$attend2['name'])->update(array('attend'=>$attend2['value']));


          }


    }
    return response()->json([
        'success'=>true,
        'message'=>'Update Attendance',
        'data'=>$find
    ]);
}

public function CourseCodeUpdate($scode,$temail,$ccode){
   $check=Attendace::where('successCode',$scode)->where('teacheremail',$temail)->first();
   $date=$check->TakenDate;
    $check1=Attendace::where('TakenDate',$date)
    ->where('teacheremail',$temail)->where('course_code',$ccode)->first();

  if($check1){
    return response()->json([
        'checkcoursecode'=>true,
        'message'=>'Update Course Code',
        'data'=>$check1
    ]);
  }
  else{

       $find=Attendace::where('successCode',$scode)
       ->where('teacheremail',$temail)->update(array('course_code'=>$ccode));

    return response()->json([
        'success'=>true,
        'message'=>'Update Course Code',
        'data'=>$find
    ]);
    }
}

public function AllinformationGet($email){
  $get=Attendace::select('session','course_code','semester')->distinct()->where('teacheremail',$email)->orderBy('course_code','desc')->get();
  return response()->json([
    'success'=>true,
    'message'=>'get all course ',
    'data'=>$get
]);
}
public function getAttendaceResult($email){
    $get1=DB::table('students')
    ->join('attendaces','students.it','=','attendaces.it')
    ->select('students.name','students.phone','students.image','students.session','students.it','attendaces.course_code')
    ->distinct()
    ->where('attendaces.teacheremail',$email)
    ->orderBy('attendaces.course_code','desc')
    ->orderBy('attendaces.it','asc')
    ->get();
   return response()->json([
       'success'=>true,
       'message'=>'Get all attendace result',
       'data'=>$get1
   ]);


}
public function IndividualAttendResult($it,$ccode,$temail)
{
    $get1=DB::table('students')
    ->join('attendaces','students.it','=','attendaces.it')
    ->select('students.name','students.phone','students.image','students.session','students.it','attendaces.course_code','attendaces.attend','attendaces.TakenDate')

    ->where('attendaces.it',$it)->where('attendaces.course_code',$ccode)->where('attendaces.teacheremail',$temail)->get();
    return response()->json([
        'success'=>true,
        'message'=>'Get Individual Attendance Result',
        'data'=>$get1
    ]);


}
public function SearchByCourseCode($code,$temail){
    $get1=DB::table('students')
    ->join('attendaces','students.it','=','attendaces.it')
    ->select('students.name','students.phone','students.image','students.session','students.it','attendaces.course_code')
    ->distinct()
    ->where('attendaces.teacheremail',$temail)
    ->where('attendaces.course_code',$code)
    ->orderBy('attendaces.it','asc')
    ->get();
   return response()->json([
       'success'=>true,
       'message'=>'Get all attendace result',
       'data'=>$get1
   ]);

}


}
