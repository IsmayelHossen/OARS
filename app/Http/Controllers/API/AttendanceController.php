<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Attendace;
use App\Models\CTMark;
use App\Models\Routine;
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
          $getpermit=SemesterRule::select('session','batch','semester','email')->distinct()->where('email',$email)->where('status',1)->get();
       //  $getpermit =DB::table('semester_rules')->distinct('tyrbatch2')->get();
           return response()->json([
               'success'=> true,
               'message'=> 'Get permit class',
               'data'=> $getpermit,
           ]);

    }
    public function SessionStudent($session){
        $getSessionStudent=Student::where('session',$session)->where('status',2)->orderBy('it','asc')->get();
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
    //save CT mark  SaveCtMark1
    public function SaveCtMark1($temail,$session,$Coursecode,$ct,Request $request){

        $attend=$request->all();
        $checkCt=CTMark::where('session',$session)
       ->where('temail',$temail)
       ->where('ctname',$ct)
       ->where('ccode',$Coursecode)->first();
         if($checkCt){
            return response()->json([
                'checkct'=>true,
                'message'=>'You have already taken attendence',

            ]);
         }
         else{
            if($request){
                foreach ($request->all() as $attend2) {
             //        # code...


                      $attend1=new CTMark();
                      $attend1->temail=$temail;
                      $attend1->session=$session;
             //         // $attend1->TakenDate=$date;
             //        //  $attend1->successCode=$successCode;
                     $attend1->ccode=$Coursecode;
                     if($attend2['name']=='ct'){
                         continue;
                     }
                      $attend1->it=$attend2['name'];
                      $attend1->marks=$attend2['value'];
                       $attend1->ctname=$ct;
                      $attend1->save();
                 }
                  return response()->json([
                      'success'=>true,
                      'message'=>'ok student attendance have been taken successfully',
                      'data'=>$attend,

                  ]);

                  }
                  else{
                     return response()->json([
                         'unableAdd'=>true,
                         'message'=>'ok student attendance have been taken successfully',

                     ]);

                  }


         }
     }
     //number of best ct count
     public function GetCountCTMark1($session,$ccode,$count,$temail){
        $get=CTMark::select('It')->distinct()->where('session',$session)->where('ccode',$ccode)->where('temail',$temail)->orderBy('It','ASC')->get();
    //    $get=DB::statement('select It, marks from ( select * , row_number() over(partition by It order by marks desc ) v1 from c_t_marks where ccode='."$ccode".' and temail='."$temail".' and session='."$session".')  v2 where v1 <= 2');

        return response()->json([
          'success'=> true,
          'message'=> 'Get Semester Info',
         // 'data'=> $getinfo,
          'data'=> $get,
      ]);
     }
     public function SemesterCtMark1($session,$ccode,$temail){
      $get=CTMark::select('ctname')->distinct()->where('session',$session)->where('ccode',$ccode)->where('temail',$temail)->orderBy('ctname','desc')->get();
      return response()->json([
        'success'=> true,
        'message'=> 'Get Semester Info',
       // 'data'=> $getinfo,
        'data'=> $get,
    ]);
     }
     public function IndividualCtMark1($session,$ccode,$temail,$ctnum){
         $ct='ct';
        $get=CTMark::where('session',$session)->where('ccode',$ccode)->where('temail',$temail)->where('ctname',$ctnum)->whereNotIn('It', [$ct])->get();
        return response()->json([
          'success'=> true,
          'message'=> 'Get Semester Info',
         // 'data'=> $getinfo,
          'data'=> $get,
      ]);
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
  $get=SemesterRule::select('session','course_code','semester')->distinct()->where('email',$email)->orderBy('course_code','desc')->where('status',1)->get();
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
    ->select('students.name','students.phone','students.image','students.email','students.session','students.it','attendaces.course_code','attendaces.attend','attendaces.TakenDate')

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
public function SaveAddMark1(Request $request){
    $formData = $request->all();
    $validator = Validator::make($formData, [
        'it' => 'required',
        'ctmarks' => 'required',


    ], [
        'it.required' => 'For Update it Required',
        'ctmarks.required' => 'For Update Marks Required',

    ]);
    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => $validator->getMessageBag()->first(),
            'errors' => $validator->getMessageBag(),
        ]);
    }
    $add=DB::table('c_t_marks')
            ->where('It', $request->it)
            ->where('session', $request->session)
            ->where('ccode', $request->ccode)
            ->where('temail', $request->email)
            ->where('ctname', $request->ctname)
            ->update(['marks' =>$request->ctmarks]);

        return response()->json([
            'success'=>true,
            'message'=>'data save',
            'data'=>$add

        ]);



}
public function GetStudentCTMarkByCode1($session,$ccode,$temail){
    $result=Attendace::select('it','session','course_code')->distinct()->where('teacheremail',$temail)
    ->where('session',$session)->where('course_code',$ccode)->get();
  return response()->json([
    'success'=>true,
    'message'=>'data save',
    'data'=>$result
  ]);
}
public function GetCTMarks1($it,$ccode,$bestct,$temail)
{
    $get1=DB::table('c_t_marks')
 ->where('it',$it)->where('ccode',$ccode)->where('temail',$temail)->orderBy('marks','DESC')->take($bestct)->get();
    return response()->json([
        'success'=>true,
        'message'=>'Get Individual CT mark Result',
        'data'=>$get1
    ]);


}
public function GetRoutineCcode1($email){
 $get1=DB::table('semester_rules')->where('email',$email)->get();
 return response()->json([
    'success'=>true,
    'message'=>'Get Individual Course code',
    'data'=>$get1
]);
}
public function getSemesterCodeIndivi1($email,$semester){
    $get1=DB::table('semester_rules')->where('email',$email)->where('semester',$semester)->get();
    return response()->json([
       'success'=>true,
       'message'=>'Get Individual Course code',
       'data'=>$get1
   ]);
}
// save routine from teacher page and access admin service

public function SaveSemesterRoutinefromTacher1(Request $request)
{
    $formData = $request->all();
    $validator = Validator::make($formData, [
        'day' => 'required',
        'semester' => 'required|min:3|max:3',
        'courseCode' => 'required',
        'cname' => 'required',
        'time' => 'required|min:5|max:5',
        'ampm' => 'required',
        'lecture' => 'required'



    ], [

        'session.required' => 'Session  required',
        'time.required' => 'Time required',
    ]);
    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => $validator->getMessageBag()->first(),
            'errors' => $validator->getMessageBag(),
        ]);
    }
    $checkData = Routine::where('email', $request->email)->where('day', $request->day)->where('lecture', $request->lecture)->first();
    if ($checkData != null) {
        return response()->json([
            'checkedData' => true,
            'message' => 'insert data',
            'data' => $checkData
        ]);
    } else {
        $obj = new Routine();
        $obj->email = $request->email;
        $obj->day = $request->day;
        $obj->semester = $request->semester;
        $obj->ccode = $request->courseCode;
        $obj->ctitle = $request->cname;
        $obj->time1 = $request->time;
        $obj->ampm = $request->ampm;
        $obj->lecture = $request->lecture;
        $obj->status='0';

        $obj->save();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $obj
        ]);
    }
}
public function deleteSpecificRoutine1($email,$day){
    $del=DB::table('routines')->where('email',$email)->where('day',$day)->delete();
//$del=Routine::where('email',$email)->where('day',$day)->delete();
    return response()->json([
     'success'=>true,
     'message'=>'Get Individual CT mark Result',
     'data'=>$del
    ]);

}
public function DeleteCTMark1($id){
   $del=CTMark::where('id',$id)->delete();
   return response()->json([
    'success'=>true,
    'message'=>'Get Individual CT mark Result',
    'data'=>$del
   ]);
}
}


