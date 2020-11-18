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
        $getSessionStudent=Student::where('session',$session)->get();
        return response()->json([
            'success'=>true,
            'message'=>'ok get sessionwaz all student',
            'data'=>$getSessionStudent,
        ]);
    }
    public function SaveAttendence($temail,$session,$Coursecode,Request $request){

       $attend=$request->all();
       $date=date('d/m/yy');
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


}
