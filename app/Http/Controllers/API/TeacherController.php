<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Teacher;
use App\Repositories\StudentR;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\API;
use Illuminate\Support\Facades\DB;

class TeacherController extends Controller
{
    public function index(){
      $data=Teacher::get();
        return response()->json([
            'success' => true,
            'message' => 'getdata successully !!',
            'user' => $data,


        ]);
    }
  public function show($email){
      $getdata=Teacher::where('email',$email)->first();
        return  $getdata;

 }
 public function update(Request $request,$email){
   // dd($request->all());
  $formData = $request->all();
  $validator =Validator::make($formData, [
      'name' => 'required|min:3|max:30',
      'bloodg' => 'required|min:2|max:4',
      'phone' => 'required|min:11|max:11',
      'designation' => 'required|min:8|max:90',
      'caddress' => 'required|min:10|max:100',
      'paddress' => 'required|min:10|max:100',


  ], [
      'name.required' => 'Please give your name',
      'bloodg.required' => 'Please write your blood group',
      'phone.required' => 'Please write your phone number',
      'designation.required' => 'Please write your designation',
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
  $data=array();
  $data['name']=$request->name;
  $data['bloodg']=$request->bloodg;
  $data['designation']=$request->designation;
  $data['phone']=$request->phone;
  $data['caddress']=$request->caddress;
  $data['paddress']=$request->paddress;
 //$data['image']=$request->image;
 $image = $request->image;

  if ($request->hasFile('image'))
  {
    $uniqueid=uniqid();
    $original_name=$request->file('image')->getClientOriginalName();
    $size=$request->file('image')->getSize();
    $extension=$request->file('image')->getClientOriginalExtension();

    $name=$uniqueid.'.'.$extension;
    $path=$request->file('image')->storeAs('public/Images',$name);
    // $namefile = '_'.time().'.png';
    // $destinationPath = public_path('Images') . '/'.$namefile;
    // file_put_contents($destinationPath, file_get_contents($image));
    $data['image']=$name;
 $teacherData=DB::table('teachers')->where('email',$email)->update($data);
 return response()->json([
    'success' => true,
    'message' => 'Update Data successully !!',
    'data' => $teacherData,


]);
  }
  else{

    $teacherData=DB::table('teachers')->where('email',$email)->update($data);
    return response()->json([
       'success' => true,
       'message' => 'Update Data successully from else !!',
       'data' => $teacherData,


   ]);

  }

}

}
