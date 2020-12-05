<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\ForgetPasswordMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB ;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ForgetPasswordController extends Controller
{
    public function PasswordForgetEmail1(Request $request){
        $email=$request->email;
        // $email='ismayelhossen123@gmail.com';
        $check=User::where('email',$email)->first();
        if($check==null){
            return response()->json([
                'checkIfExists'=>true,
                'message'=>'Does not exists',
                'data'=>$email
            ]);
        }
        else{

            $tokenCode=rand(10,100000);
            $insert=DB::table('password_resets')->insert([
                'email'=>$email,
                'token'=>$tokenCode
            ]);
            $mail=Mail::to($email)->send(new ForgetPasswordMail($email,$tokenCode));
            if($mail){
                return response()->json([
                    'success'=>true,
                    'message'=>'For reterive password an email has sent to your email',
                    'data'=>$mail
                ]);
            }


        }


    }

    public function ResetPasswordSave1(Request $request){
        $formData = $request->all();
        $validator = Validator::make($formData, [
            'password' => 'required',
            'password_confirmation' => 'required',
            'password' => 'required|confirmed|min:8',

        ], [
            'password.required' => 'Password Field Must Not Be Empty',
            'password_confirmation.required' => 'Confirm Password Field Must Not Be Empty',
        ]);
        if($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
         $confirmcode=$request->confirmcode;
         $collectEmail=DB::table('password_resets')->where('token',$confirmcode)->first();

         if(!$collectEmail){
            return response()->json([
                'confirmCodeCheck'=>true,
                'message'=>'confirm code is  Invalid',
                'data'=>$collectEmail

            ]);
         }
         else{
            $email=$collectEmail->email;
             $password=Hash::make($request->password);
             $newPassword=User::where('email',$email)->update([
                 'password'=>$password
             ]);
             $delete=DB::table('password_resets')
             ->where('token',$confirmcode)->delete();
             return response()->json([
                 'success'=>true,
                 'message'=>'new password generate',
                 'data'=>$newPassword
             ]);

         }




    }
}
