<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\LoginReg;
use App\Models\User;
use App\Models\Student;
use App\Models\Teacher;
use App\Repositories\LoginRegR;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class LoginRegController extends Controller
{
    public $useraccess;
    public function __construct(LoginRegR $useraccess)
    {
        $this->useraccess= $useraccess;
    }
    public function user(){
        $user=Auth::user();
        return response()->json([
           'success' =>true,
           'message' =>"get user",
           'data' =>$user,
       ]);
    }
    public function createToken()
    {
        $user = User::first();
        $accessToken = $user->createToken('Token Name')->accessToken;
        return $accessToken;
    }

    public function login(Request $request)
    {
        $formData = $request->all();
        $validator =Validator::make($formData, [
            'email' => 'required',
            'password' => 'required',
            'user_rule' => 'required',
        ], [
            'email.required' => 'Please give your email address',
            'password.required' => 'Please give your password',
            'user_rule.required' => 'Please select who are you?',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
  else{
       $user=$this->useraccess->checkIfAuthenticated($request);
        if ($user) {
             $user = $this->useraccess->findUserByEmailAddress($request->email);
             if($request->user_rule=='Student' ||$request->user_rule=='Teacher' ){
                 $checkemailValid=User::where('evaild',0)->where('email',$request->email)->first();
                 $status=User::where('status',0)->where('email',$request->email)->first();

                 if($checkemailValid!=null){
                    return response()->json([
                        'evalid' => true,
                        'message' => 'verfiy email  !!',


                    ]);
                 }
            //    else if($status!=null){
            //         return response()->json([
            //             'status' => true,
            //             'message' => 'Pendding  !!',


            //         ]);

            //      }
                 $accessToken = $user->createToken('authToken')->accessToken;
                 return response()->json([
                     'success' => true,
                     'message' => 'Logged in successully !!',
                     'user' => $user,
                     'access_token' => $accessToken,
                 ]);
             }

             else{
                $accessToken = $user->createToken('authToken')->accessToken;
                return response()->json([
                    'success' => true,
                    'message' => 'Logged in successully !!',
                    'user' => $user,
                    'access_token' => $accessToken,
                ]);

             }

        }
        // elseif(!$user){
        //     return response()->json([
        //         'success' => false,
        //         'message' => ' This user is not valid.Please Registration first !!',


        //     ]);
        // }
         else {
            return response()->json([
                'success' => false,
                'message' => 'Sorry Invalid Email Or Password ',
                'errors' => null,
            ]);
        }
        }
    }

    public function register(Request $request)
    {
        $formData = $request->all();
        $validator = Validator::make($formData, [
            'name' => 'required|min:3|max:30',
            'user_rule' => 'required',
            'email' => 'required|email|max:100|unique:users',
            'password' => 'required|confirmed|min:8',

        ], [
            'name.required' => 'Please give your name',
            'user_rule.required' => 'Please Select Your Rule Teacher Or Student',
            'email.required' => 'Please give your email address',
            'email.unique' => 'Your email address is already used, Please Login or use another',
            'password.required' => 'Please give your password',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        if($request->user_rule=='Student'){
            $userS = new Student();
            $userS->name = $request->name;
          // $userS->user_rule = $request->user_rule;
            $userS->email = $request->email;
            $userS->password = Hash::make($request->password);
            $userS->save();
        }
        else{
            $user = new Teacher();
            $user->name = $request->name;
           // $user->user_rule = $request->user_rule;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->save();


        }
        $vcode=rand(100,100000);
        $user = new User();
        $user->name = $request->name;
        $user->user_rule = $request->user_rule;
        $user->email = $request->email;
        $user->vcode=$vcode;
        $user->password =Hash::make($request->password);
        $registration=$user->save();
        $mail=Mail::to($request->email)->send(new LoginReg($request->email,$vcode));


        if ($registration) {
       $registration = $this->useraccess->findUserByEmailAddress($request->email);
            $accessToken = $registration->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => 'Registered successully !!',
                'user' => $registration,
                'accesstoken'=>$accessToken

            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Registration Cannot successfull !',
                'errors' => null,
            ]);
        }
    }
    public function storeVcode1(Request $request){
        $formData = $request->all();
        $validator = Validator::make($formData, [
            'vcode' => 'required|min:5|max:5',


        ], [
            'vcode.required' => 'Please give verification code',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
          $WrongCode=User::where('vcode',$request->vcode)->first();
          if($WrongCode==null){
              return response()->json([
                'WrongCode' => true,
                'message' => 'Succefully valided email !',

            ]);
          }
          else{
            $vcodeUpdate=User::where('vcode',$request->vcode)->update([
                'evaild'=>'1'
            ]);
            if($vcodeUpdate){

                return response()->json([
                    'success' => true,
                    'message' => 'Succefully valided email !',

                ]);

            }



          }



    }

}
