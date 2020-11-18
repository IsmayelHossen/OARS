<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Student;
use App\Repositories\LoginRegR;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LoginRegController extends Controller
{
    public $useraccess;
    public function __construct(LoginRegR $useraccess)
    {
        $this->useraccess= $useraccess;
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
         $accessToken = $user->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => 'Logged in successully !!',
                'user' => $user,
                'access_token' => $accessToken,
            ]);
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

        $registration = $this->useraccess->registerUser($request);
        if (!is_null($registration)) {
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

}
