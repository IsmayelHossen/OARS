<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Attendace;
use App\Models\User;
use App\Models\Student;
use App\Models\Teacher;
use App\Repositories\StudentR;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    public function index(){
      $data=Student::get();
        return response()->json([
            'success' => true,
            'message' => 'getdata successully !!',
            'user' => $data,


        ]);
    }
  public function show($email){
      $getdata=Student::where('email',$email)->first();
        return $getdata;

  }
  public function update(Request $request,$email){
        $formData = $request->all();
        $validator = Validator::make($formData, [
            'name' => 'required|min:3|max:30',

            'it' => 'required|min:5|max:5',
            'session' => 'required|min:7|max:7',
            'bloodg' => 'required|min:2|max:4',
            'phone' => 'required|min:11|max:11',
            'faname' => 'required|min:5|max:20',
            'maname' => 'required|min:5|max:20',
            'caddress' => 'required|min:10|max:100',
            'paddress' => 'required|min:10|max:100',


        ], [
            'name.required' => 'Please give your name',

            'it.required' => 'Please write your Specific Id ',
            'it.regex' => 'Please write your IT as like 16064 ',

            'session.required' => 'Please Write your Session',
            'bloodg.required' => 'Please write your nlood group',
            'phone.required' => 'Please write your phone number',
            'phone.regex' => 'Please write your phone number specific format',
            'faname.required' => 'Please write your father name',
            'maname.required' => 'Please write your mather name',
            'caddress.required' => 'Please write your current address',
            'paddress.required' => 'Please write your permanent address',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

         $studentData=Student::where('email',$email)->first();
         $studentData->name=$request->name;
        $studentData->it = $request->it;
        $studentData->bloodg = $request->bloodg;
        $studentData->session = $request->session;
        $studentData->phone = $request->phone;
        $studentData->faname = $request->faname;
        $studentData->maname = $request->maname;
        $studentData->caddress = $request->caddress;
        $studentData->paddress = $request->paddress;
        $studentData->save();
        return response()->json([
            'success' => true,
            'message' => 'Update Data successully !!',
            'data' => $studentData,


        ]);
  }
  public function AttendanceResultInfo1($email){
      $get=Student::where('email',$email)->first();
      $it=$get->it;
      $getAll=Attendace::select('semester','it')->distinct()
      ->where('it',$it)->orderBy('course_code','desc')->get();
      return response()->json([
        'success' => true,
        'message' => 'Update Data successully !!',
        'data' => $getAll,


    ]);

  }
  public function StudentSemResultInfo1($it,$semester){
       $result=Attendace::select('course_code','it')->distinct()
       ->where('semester',$semester)->where('it',$it)->get();
       return response()->json([
        'success' => true,
        'message' => 'Semester waize Course code !!',
        'data' => $result,


    ]);
  }
  public function IndividualAttendResult1($it,$ccode){
    $result=Attendace::where('course_code',$ccode)->where('it',$it)->get();
    return response()->json([
     'success' => true,
     'message' => 'Course code waize result !!',
     'data' => $result,


 ]);
  }

  public function TeacherInformation1($temail){
    $result=Teacher::where('email',$temail)->first();
    return $result;

  }
  public function classmateGet1($session){
   $result=Student::where('session',$session)->orderBy('it','asc')->get();
   return response()->json([
    'success' => true,
    'message' => 'session waize result !!',
    'data' => $result,


]);
  }
}
