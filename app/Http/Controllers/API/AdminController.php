<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\SemesterRule;
use App\Models\Teacher;
use Illuminate\Http\Request;
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
}
