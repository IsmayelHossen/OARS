<?php
namespace App\Repositories;

use App\Interfaces\LoginRegI;
use App\Mail\LoginReg;
use App\Models\User;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
class LoginRegR implements LoginRegI
{
    public function checkIfAuthenticated(Request $request)
    {
        // if (Auth::attempt(['email' => $request->email, 'password' => $request->password, 'user_rule' => $request->user_rule])) {
            if(Auth::attempt($request->only("email","password","user_rule"))){
            return true;
        }
        return false;
    }

    public function registerUser(Request $request)
    {
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
        $user->save();
        $mail=Mail::to($request->email)->send(new LoginReg($request->email,$vcode));
        if($mail){
            return $user;
        }



    }

    // public function findUserByEmailAddress($email)
    // {
    //     $user = User::where('email', $email)->first();
    //     return $user;
    // }
    public function findUserByEmailAddress()
    {
        $user =Auth::user();
        return $user;
    }
}
?>
