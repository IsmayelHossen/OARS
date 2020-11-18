<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Student;
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

            'it' => 'required|min:8|max:8',
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
            'it.regex' => 'Please write your IT as like IT-16064 ',

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
}
