<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Attendace;
use App\Models\Ccodetitle;
use App\Models\CTMark;
use App\Models\Lpgrade;
use App\Models\Notice;
use App\Models\Result;
use App\Models\SemesterRule;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function Infoteacher(){
        $result=Teacher::get();
        return response()->json([
            'success'=>true,
            'message'=>'Get teacher Informations',
            'data'=>$result

        ]);
    }
    public function SaveSemesterCourse1(Request $request){
        $formData = $request->all();
        $validator = Validator::make($formData, [
            'email' => 'required',
            'batch' => 'required|min:2|max:2',
            'semester' => 'required|min:3|max:3',
            'session' => 'required|min:7|max:7',
            'courseCode' => 'required|min:4|max:4',
            'cname' => 'required',
            'labtheory' => 'required',



        ], [
            'name.required' => 'Email reqired',
            'batch.required' => 'Please write the batch name',
            'semester.required' => 'Please write the semester name',
            'session.required' => 'please write the session name',
            'courseCode.required' => 'Course Code required',
            'cname.required' => 'Course name required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
         $checkData=SemesterRule::where('email',$request->email)->
         where('batch',$request->batch)->where('course_code',$request->courseCode)->first();
        if($checkData !=null){
            return response()->json([
                'checkedData'=>true,
                'message'=>'insert data',
                'data'=>$checkData
            ]);

        }
        else{
            $obj=new SemesterRule();
            $obj->email=$request->email;
            $obj->batch=$request->batch;
            $obj->semester=$request->semester;
            $obj->session=$request->session;
            $obj->course_code=$request->courseCode;
            $obj->cname=$request->cname;
            $obj->labtheory=$request->labtheory;

            $obj->save();
            return response()->json([
                'success'=>true,
                'message'=>'insert data',
                'data'=>$obj
            ]);

        }


    }
    public function GetSemesterCourseInfo1(){
        $result=SemesterRule::orderBy('email','desc')->orderBy('course_code','desc')->get();
        return response()->json([
            'success'=>true,
            'message'=>'Get Semester Course all info',
            'data'=>$result
        ]);

    }
    public function deleteSpecificSemesterCourse1($email,$ccode,$session){
        $result=SemesterRule::where('email',$email)->where('course_code',$ccode)->where('session',$session)->delete();
        return response()->json([
            'success'=>true,
            'message'=>'Delete Data',
            'data'=>$result
        ]);
    }

public function  GetSemcCourseUpdateData1($email,$ccode,$session){
$result=SemesterRule::where('email',$email)
->where('course_code',$ccode)
->where('session',$session)->first();
return $result;
}

public function UpdateSemesterCourse1(Request $request){
    $formData = $request->all();
    $validator = Validator::make($formData, [
        'email' => 'required',
        'batch' => 'required|min:2|max:2',
        'semester' => 'required|min:3|max:3',
        'session' => 'required|min:7|max:7',
        'courseCode' => 'required|min:4|max:4',


    ], [
        'name.required' => 'Email reqired',
        'batch.required' => 'Please write the batch name',
        'semester.required' => 'Please write the semester name',
        'session.required' => 'please write the session name',
        'courseCode.required' => 'Course Code required',
    ]);
    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => $validator->getMessageBag()->first(),
            'errors' => $validator->getMessageBag(),
        ]);
    }

    $updateId=$request->id;
    $update=SemesterRule::where('id',$updateId)->update([
        'batch'=>$request->batch,
        'semester'=>$request->semester,
        'session'=>$request->session,
        'course_code'=>$request->courseCode,
        'email'=>$request->email,
        'status'=>$request->status,
    ]);
    return response()->json([
        'success'=>true,
        'message'=>'Delete Data',
        'data'=>$update
    ]);

}
public function NoticeSave1(Request $request){
      $notice=new Notice();
      $notice->title=$request->title;
      $notice->category=$request->category;
      $notice->description=$request->description;
      $notice->save();
      return response()->json([
        'success'=>true,
        'message'=>'notice',
        'data'=>$notice
    ]);
}
public function getNoticeData1(){
    $row=DB::table('notices')->get();
    return response()->json([
        'success'=>true,
        'message'=>'notice',
        'data'=>$row
    ]);


}
public function GetSessionActiveData1(){
    $result=SemesterRule::select('session')->distinct()->where('status',1)->get();
    return response()->json([
        'success'=>true,
        'message'=>'notice',
        'data'=>$result
    ]);

}
public function GetSessionStudent1($session){
   $result=Student::where('session',$session)->orderBy('it','asc')->get();
   return response()->json([
    'success'=>true,
    'message'=>'notice',
    'data'=>$result
]);

}
public function SaveSemesterCourseTitle1(Request $request){
    $formData = $request->all();
    $validator = Validator::make($formData, [
        'ccode' => 'required|min:4|max:4',
        'ctitle' => 'required',
        'credit' => 'required|min:1|max:1',
        'semester' => 'required|min:3|max:3',
    ], [
        'ccode.required' => 'Course Code Required',
        'ctitle.required' => 'Course Title Required',
        'semester.required' => 'semester  Required',
        'credit.required' => 'credit  Required',

    ]);
    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => $validator->getMessageBag()->first(),
            'errors' => $validator->getMessageBag(),
        ]);
    }
     $checkData=Ccodetitle::where('ccode',$request->ccode)->where('ctitle',$request->ctitle)->where('semester',$request->semester)->first();
    if($checkData !=null){
        return response()->json([
            'checkedData'=>true,
            'message'=>'insert data',
            'data'=>$checkData
        ]);

    }
    else{
        $obj=new Ccodetitle();
        $obj->ccode=$request->ccode;
        $obj->ctitle=$request->ctitle;
        $obj->semester=$request->semester;
        $obj->credit=$request->credit;
          $obj->save();
        return response()->json([
            'success'=>true,
            'message'=>'insert data',
            'data'=>$obj
        ]);

    }


}
public function GetSemesterCourseTitleInfo1(){
    $obj=Ccodetitle::orderBy('ccode','desc')->get();
    return response()->json([
        'success'=>true,
        'message'=>'insert data',
        'data'=>$obj
    ]);

}
public function deleteSpecificSemesterCoursetitle1($ccode,$ctitle){
    $delete=Ccodetitle::where('ccode',$ccode)->where('ctitle',$ctitle)->delete();
    return response()->json([
        'success'=>true,
        'message'=>'insert data',
        'data'=>$delete
    ]);

}
public function getSemesterCode1($semester){
    $result=Ccodetitle::where('semester',$semester)->get();
    return response()->json([
        'success'=>true,
        'message'=>'insert data',
        'data'=>$result
    ]);


}
public function getSemesterCodeTitle1($ccode){
    $result=Ccodetitle::where('ccode',$ccode)->first();
    return response()->json([
        'success'=>true,
        'message'=>'insert data',
        'data'=>$result
    ]);


}
public function GetActiveSessioninfo1(){
    $result=SemesterRule::select('session')->distinct()->where('status',1)->get();
    return response()->json([
        'success'=>true,
        'message'=>'insert data',
        'data'=>$result
    ]);
}
public function getSemesterInfoR1($session){
    $result=SemesterRule::select('semester')->distinct()->where('session',$session)->first();
    return $result;

}

public function getSemesterCodeMR1($session,$semester,$theorylab){
    $result=SemesterRule::where('session',$session)->where('semester',$semester)
    ->where('labtheory',$theorylab)->get();
    return response()->json([
        'success'=>true,
        'message'=>'insert data',
        'data'=>$result
    ]);
}

public function getSemesterCTitleMR1($session,$courseCode){
    $result=SemesterRule::where('session',$session)->where('course_code',$courseCode)
    ->get();
    return response()->json([
        'success'=>true,
        'message'=>'insert data',
        'data'=>$result
    ]);
}
// getSemesterAttendanceMark
public function getSemesterAttendanceMark1($session,$courseCode,$it){
    $result=Attendace::where('session',$session)
    ->where('course_code',$courseCode)
    ->where('it',$it)
    ->get();
    return response()->json([
        'success'=>true,
        'message'=>'insert data',
        'data'=>$result
    ]);
}
// getSemesterCTMark
public function getSemesterCTMark1($session,$courseCode,$it){
    $result=CTMark::where('session',$session)
    ->where('ccode',$courseCode)
    ->where('it',$it)
    ->get();
    return response()->json([
        'success'=>true,
        'message'=>'insert data',
        'data'=>$result
    ]);
}
// SaveSemesterResult1

public function SaveSemesterResult1(Request $request){
    if($request->labtheory=='Lab'){

        $formData = $request->all();
        $validator = Validator::make($formData, [
            'finalexamyr' => 'required',
            'heldIn' => 'required',
            'session' => 'required',
            'it' => 'required',
            'semester' => 'required',
            'labtheory' => 'required',
            'courseCode' => 'required',
            'cname' => 'required',
            'attendmark' => 'required',
            'vivamark' => 'required',
            'labwmark' => 'required',
            'labemark' => 'required',
        ], [
            'session.required' => 'Session  Required',
            'it.required' => 'IT  Required',
            'labtheory.required' => 'Lab/Theory  Required',
            'courseCode.required' => 'courseCode  Required',
            'cname.required' => 'Course Name  Required',
            'session.required' => 'session  Required',
            'attendmark.required' => 'Attendance mark  Required',
            'vivamark.required' => 'Viva Mark  Required',
            'labwmark.required' => 'Lab Written mark  Required',
            'labemark.required' => 'Lab Experiment mark  Required',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
         $checkData=Result::where('ccode',$request->courseCode)->where('session',$request->session)->where('it',$request->it)->first();
        if($checkData !=null){
            return response()->json([
                'checkedData'=>true,
                'message'=>'insert data',
                'data'=>$checkData
            ]);

        }
        else{
            $creditF=Ccodetitle::where('ccode',$request->courseCode)->first();
            $credit=$creditF->credit;
             $gp=$request->attendmark+$request->vivamark+$request->labwmark+$request->labemark;
             if($gp>=80){
                 $lg='A+';
                 $gp=4.00;
             }
             elseif($gp<80 && $gp>=75){
                $lg='A';
                $gp=3.75;
             }
             elseif($gp<75 && $gp>=70){
                $lg='A-';
                $gp=3.50;
             }
             elseif($gp<70 && $gp>=65){
                $lg='B+';
                $gp=3.25;
             }
             elseif($gp<65 && $gp>=60){
                $lg='B';
                $gp=3.00;
             }
             elseif($gp<60 && $gp>=55){
                $lg='B-';
                $gp=2.75;
             }
             elseif($gp<55 && $gp>=50){
                $lg='C+';
                $gp=2.50;
             }
             elseif($gp<50 && $gp>=45){
                $lg='C';
                $gp=2.25;
             }
             elseif($gp<45 && $gp>=40){
                $lg='D';
                $gp=2.00;
             }
             else{
                $lg='F';
                $gp=0;
             }
            $obj=new Result();
            $obj->session=$request->session;
            $obj->it=$request->it;
            $obj->semester=$request->semester;
            $obj->labtheory=$request->labtheory;
            $obj->ccode=$request->courseCode;
            $obj->ctitle=$request->cname;
            $obj->attendancemark=$request->attendmark;
            $obj->vivamark=$request->vivamark;
            $obj->writtenmark =$request->labwmark;
            $obj->labexpmark =$request->labemark;
            $obj->lg =$lg;
            $obj->gp =$gp;
            $obj->finalexamyr =$request->finalexamyr;
            $obj->heldIn =$request->heldIn;

            $obj->chours =$credit;


              $obj->save();
            return response()->json([
                'success'=>true,
                'message'=>'insert data',
                'data'=>$obj
            ]);

        }

    }
    else{

        $formData = $request->all();
        $validator = Validator::make($formData, [
            'finalexamyr' => 'required',
            'heldIn' => 'required',
            'session' => 'required',
            'it' => 'required',
            'semester' => 'required',
            'labtheory' => 'required',
            'courseCode' => 'required',
            'cname' => 'required',
            'session' => 'required',
            'attendmark' => 'required',
            'ctmark' => 'required',
            'theorymark' => 'required',

        ], [
            'session.required' => 'Session  Required',
            'it.required' => 'IT  Required',
            'labtheory.required' => 'Lab/Theory  Required',
            'courseCode.required' => 'courseCode  Required',
            'cname.required' => 'Course Name  Required',
            'attendmark.required' => 'Attendance mark  Required',
            'ctmark.required' => 'Class Test Mark  Required',
            'theorymark.required' => ' Written mark  Required',


        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
         $checkData=Result::where('ccode',$request->courseCode)->where('session',$request->session)->where('it',$request->it)->first();
        if($checkData !=null){
            return response()->json([
                'checkedData'=>true,
                'message'=>'insert data',
                'data'=>$checkData
            ]);

        }
        else{
            $creditF=Ccodetitle::where('ccode',$request->courseCode)->first();
            $credit=$creditF->credit;
            $gp=$request->attendmark+$request->ctmark+$request->theorymark;
            if($gp>=80){
                $lg='A+';
                $gp=4.00;
            }
            elseif($gp<80 && $gp>=75){
               $lg='A';
               $gp=3.75;
            }
            elseif($gp<75 && $gp>=70){
               $lg='A-';
               $gp=3.50;
            }
            elseif($gp<70 && $gp>=65){
               $lg='B+';
               $gp=3.25;
            }
            elseif($gp<65 && $gp>=60){
               $lg='B';
               $gp=3.00;
            }
            elseif($gp<60 && $gp>=55){
               $lg='B-';
               $gp=2.75;
            }
            elseif($gp<55 && $gp>=50){
               $lg='C+';
               $gp=2.50;
            }
            elseif($gp<50 && $gp>=45){
               $lg='C';
               $gp=2.25;
            }
            elseif($gp<45 && $gp>=40){
               $lg='D';
               $gp=2.00;
            }
            else{
               $lg='F';
               $gp=0;
            }
            $obj=new Result();
            $obj->session=$request->session;
            $obj->it=$request->it;
            $obj->semester=$request->semester;
            $obj->labtheory=$request->labtheory;
            $obj->ccode=$request->courseCode;
            $obj->ctitle=$request->cname;
            $obj->attendancemark=$request->attendmark;
            $obj->ctmark=$request->ctmark;
            $obj->writtenmark =$request->theorymark;
            $obj->lg =$lg;
            $obj->gp =$gp;
            $obj->finalexamyr =$request->finalexamyr;
            $obj->heldIn =$request->heldIn;
            $obj->chours =$credit;
              $obj->save();
            return response()->json([
                'success'=>true,
                'message'=>'insert data',
                'data'=>$obj
            ]);

        }
    }




}
public function FinalResultByIt1($it){
    $result=Result::where('it',$it)->get();
    return response()->json([
        'success'=>true,
        'message'=>'insert data',
        'data'=>$result
    ]);

}
public function deleteSpecificSemesterCCResult1($it,$ccode,$session){
    $result=Result::where('it',$it)->where('ccode',$ccode)->where('session',$session)
    ->delete();
    return response()->json([
        'success'=>true,
        'message'=>'insert data',
        'data'=>$result
    ]);
}
public function AllSession(){
    $result=Result::select('session')->distinct()->get();
    return response()->json([
        'success'=>true,
        'message'=>'insert data',
        'data'=>$result
    ]);
}
public function SearchSemesterWiseResult1($session,$semester){
    $result=Result::select('it','semester','session')->distinct()->where('semester',$semester)->where('session',$session)
    ->get();
    return response()->json([
        'success'=>true,
        'message'=>'insert data',
        'data'=>$result
    ]);
}
public function GPAMark1($it,$semester){
    $result=Result::where('it',$it)->where('semester',$semester)
    ->get();
    return response()->json([
        'success'=>true,
        'message'=>'insert data',
        'data'=>$result
    ]);
}
public function GradeSheetResult1($it,$semester){
    $result=Result::where('it',$it)->where('semester',$semester)
    ->get();
    return response()->json([
        'success'=>true,
        'message'=>'insert data',
        'data'=>$result
    ]);
}
public function getlpgrade1(){
    $result=Lpgrade::get();
    return response()->json([
        'success'=>true,
        'message'=>'insert data',
        'data'=>$result
    ]);

}



}
