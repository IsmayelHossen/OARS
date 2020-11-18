<?php
namespace App\Repositories;


use App\Interfaces\StudentI;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\User;

class StudentR implements StudentI{
    public function Individualgetdata()
    {
        // $studentdata=Student::where('email',$email)->first();
        $studentdata1 =User::get();
           return $studentdata1;
    }

}
