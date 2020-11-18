<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Attendace;
use App\Models\SemesterRule;
use App\Models\Student;
use App\Models\Teacher;
use Defuse\Crypto\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ImageController extends Controller
{
    public function uploadimage(Request $request){
        $validation = Validator::make($request->all(),
        [
            'image'=>'required|mimes:jpeg,jpg,png,gif|max:10000'
        ]);

        if ($validation->fails()){
            $response=array('status'=>'error','errors'=>$validation->errors()->toArray());
            return response()->json($response);
        }

     if($request->hasFile('image')){

        $uniqueid=uniqid();
        $original_name=$request->file('image')->getClientOriginalName();
        $size=$request->file('image')->getSize();
        $extension=$request->file('image')->getClientOriginalExtension();

        $name=$uniqueid.'.'.$extension;
        $path=$request->file('image')->storeAs('public/uploads',$name);
        if($request->user_rule=='Teacher'){
            $updateimage=Teacher::where('email',$request->email)->first();
            $imagedelete=$updateimage->image;
        }
        else{
            $updateimage=Student::where('email',$request->email)->first();
            $imagedelete=$updateimage->image;
        }

        if($imagedelete){
            $file_path =('/public/uploads/') .$imagedelete;
            Storage::delete($file_path);
        }
        $updateimage->image=$name;
        $updateimage->update();

        if($updateimage){



  return response()->json(array('status'=>'success','message'=>'Image successfully uploaded','image'=>'/storage/uploads/'.$name));
        }else{
            return response()->json(array('status'=>'error','message'=>'failed to upload image'));
        }
    }

    }
}
