<?php
namespace App\Repositories;

use App\Interfaces\LoginRegI;

use App\Models\User;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginRegR implements LoginRegI
{
    public function checkIfAuthenticated(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password, 'user_rule' => $request->user_rule])) {
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

        $user = new User();
        $user->name = $request->name;
        $user->user_rule = $request->user_rule;
        $user->email = $request->email;
        $user->password =Hash::make($request->password);
        $user->save();

        return $user;
    }

    public function findUserByEmailAddress($email)
    {
        $user = User::where('email', $email)->first();
        return $user;
    }
}
?>
