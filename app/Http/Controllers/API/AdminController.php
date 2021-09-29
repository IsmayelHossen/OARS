<?php

namespace App\Http\Controllers\API;

use App\Events\NewMessage;
use App\Http\Controllers\Controller;
use App\Mail\AcceptRequest;
use App\Models\Attendace;
use App\Models\Ccodetitle;
use App\Models\CTMark;
use App\Models\Lpgrade;
use App\Models\Message;
use App\Models\Notice;
use App\Models\NoticeEvent;
use App\Models\Post;
use App\Models\Result;
use App\Models\Routine;
use App\Models\SemesterRule;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Pusher\Pusher;

class AdminController extends Controller
{
    public function Infoteacher()
    {
        $result = Teacher::where('status',2)->get();
        return response()->json([
            'success' => true,
            'message' => 'Get teacher Informations',
            'data' => $result

        ]);
    }
    public function getNoticeEvent2($email){
        $result =NoticeEvent::get();
        return response()->json([
            'success' => true,
            'message' => 'Get teacher Informations',
            'data' => $result

        ]);

    }
    public function getIndviNoticeEvent1($id){
        $result =NoticeEvent::where('id',$id)->first();
        return response()->json([
            'success' => true,
            'message' => 'Get teacher Informations',
            'data' => $result

        ]);

    }
    public function SaveSemesterCourse1(Request $request)
    {
        $formData = $request->all();
        $validator = Validator::make($formData, [
            'email' => 'required',
            'batch' => 'required|min:2|max:2',
            'semester' => 'required|min:3|max:3',
            'session' => 'required|min:7|max:7',
            'courseCode' => 'required|min:4|max:4',
            'cname' => 'required',
            'labtheory' => 'required',



        ], [
            'name.required' => 'Email reqired',
            'batch.required' => 'Please write the batch name',
            'semester.required' => 'Please write the semester name',
            'session.required' => 'please write the session name',
            'courseCode.required' => 'Course Code required',
            'cname.required' => 'Course name required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
        $checkData = SemesterRule::where('email', $request->email)->where('batch', $request->batch)->where('course_code', $request->courseCode)->first();
        if ($checkData != null) {
            return response()->json([
                'checkedData' => true,
                'message' => 'insert data',
                'data' => $checkData
            ]);
        } else {
            $obj = new SemesterRule();
            $obj->email = $request->email;
            $obj->batch = $request->batch;
            $obj->semester = $request->semester;
            $obj->session = $request->session;
            $obj->course_code = $request->courseCode;
            $obj->cname = $request->cname;
            $obj->labtheory = $request->labtheory;

            $obj->save();
            return response()->json([
                'success' => true,
                'message' => 'insert data',
                'data' => $obj
            ]);
        }
    }
    public function GetSemesterCourseInfo1()
    {
        $result = SemesterRule::orderBy('email', 'desc')->orderBy('course_code', 'desc')->get();
        return response()->json([
            'success' => true,
            'message' => 'Get Semester Course all info',
            'data' => $result
        ]);
    }
    public function deleteSpecificSemesterCourse1($email, $ccode, $session)
    {
        $result = SemesterRule::where('email', $email)->where('course_code', $ccode)->where('session', $session)->delete();
        return response()->json([
            'success' => true,
            'message' => 'Delete Data',
            'data' => $result
        ]);
    }

    public function  GetSemcCourseUpdateData1($email, $ccode, $session)
    {
        $result = SemesterRule::where('email', $email)
            ->where('course_code', $ccode)
            ->where('session', $session)->first();
        return $result;
    }

    public function UpdateSemesterCourse1(Request $request)
    {
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

        $updateId = $request->id;
        $update = SemesterRule::where('id', $updateId)->update([
            'batch' => $request->batch,
            'semester' => $request->semester,
            'session' => $request->session,
            'course_code' => $request->courseCode,
            'email' => $request->email,
            'status' => $request->status,
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Delete Data',
            'data' => $update
        ]);
    }
    public function NoticeSave1(Request $request)
    {
        $notice = new Notice();
        $notice->title = $request->title;
        $notice->category = $request->category;
        $notice->description = $request->description;
        $notice->save();
        return response()->json([
            'success' => true,
            'message' => 'notice',
            'data' => $notice
        ]);
    }
    public function getNoticeData1()
    {
        $row = DB::table('notices')->get();
        return response()->json([
            'success' => true,
            'message' => 'notice',
            'data' => $row
        ]);
    }
    public function GetSessionActiveData1($id)
    {
        $result = SemesterRule::select('session')->distinct()->where('status', $id)->get();
        return response()->json([
            'success' => true,
            'message' => 'notice',
            'data' => $result
        ]);
    }
    public function GetSessionStudent1($session)
    {
        $result = Student::where('session', $session)->where('status',2)->orderBy('it', 'asc')->get();
        return response()->json([
            'success' => true,
            'message' => 'notice',
            'data' => $result
        ]);
    }
    public function SaveSemesterCourseTitle1(Request $request)
    {
        $formData = $request->all();
        $validator = Validator::make($formData, [
            'ccode' => 'required|min:4|max:4',
            'ctitle' => 'required',
            'credit' => 'required|min:1|max:1',
            'semester' => 'required|min:3|max:3',
        ], [
            'ccode.required' => 'Course Code Required',
            'ctitle.required' => 'Course Title Required',
            'semester.required' => 'semester  Required',
            'credit.required' => 'credit  Required',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
        $checkData = Ccodetitle::where('ccode', $request->ccode)->where('ctitle', $request->ctitle)->where('semester', $request->semester)->first();
        if ($checkData != null) {
            return response()->json([
                'checkedData' => true,
                'message' => 'insert data',
                'data' => $checkData
            ]);
        } else {
            $obj = new Ccodetitle();
            $obj->ccode = $request->ccode;
            $obj->ctitle = $request->ctitle;
            $obj->semester = $request->semester;
            $obj->credit = $request->credit;
            $obj->save();
            return response()->json([
                'success' => true,
                'message' => 'insert data',
                'data' => $obj
            ]);
        }
    }
    public function GetSemesterCourseTitleInfo1()
    {
        $obj = Ccodetitle::orderBy('ccode', 'desc')->get();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $obj
        ]);
    }
    public function deleteSpecificSemesterCoursetitle1($ccode, $ctitle)
    {
        $delete = Ccodetitle::where('ccode', $ccode)->where('ctitle', $ctitle)->delete();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $delete
        ]);
    }
    public function getSemesterCode1($semester)
    {
        $result = Ccodetitle::where('semester', $semester)->get();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $result
        ]);
    }
    public function getSemesterCodeTitle1($ccode)
    {
        $result = Ccodetitle::where('ccode', $ccode)->first();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $result
        ]);
    }
    public function GetActiveSessioninfo1()
    {
        $result = SemesterRule::select('session')->distinct()->where('status', 1)->get();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $result
        ]);
    }
    public function getSemesterInfoR1($session)
    {
        $result = SemesterRule::select('semester')->distinct()->where('session', $session)->first();
        return $result;
    }

    public function getSemesterCodeMR1($session, $semester, $theorylab)
    {
        $result = SemesterRule::where('session', $session)->where('semester', $semester)
            ->where('labtheory', $theorylab)->get();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $result
        ]);
    }

    public function getSemesterCTitleMR1($session, $courseCode)
    {
        $result = SemesterRule::where('session', $session)->where('course_code', $courseCode)
            ->get();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $result
        ]);
    }
    // getSemesterAttendanceMark
    public function getSemesterAttendanceMark1($session, $courseCode, $it)
    {
        $result = Attendace::where('session', $session)
            ->where('course_code', $courseCode)
            ->where('it', $it)
            ->get();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $result
        ]);
    }
    // getSemesterCTMark
    public function getSemesterCTMark1($session, $courseCode, $it)
    {
        $result = CTMark::where('session', $session)
            ->where('ccode', $courseCode)
            ->where('it', $it)
            ->where('status',1)
            ->get();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $result
        ]);
    }
    // SaveSemesterResult1

    public function SaveSemesterResult1(Request $request)
    {
        if ($request->labtheory == 'Lab') {

            $formData = $request->all();
            $validator = Validator::make($formData, [
                'finalexamyr' => 'required',
                'heldIn' => 'required',
                'session' => 'required',
                'it' => 'required',
                'semester' => 'required',
                'labtheory' => 'required',
                'courseCode' => 'required',
                'cname' => 'required',
                'attendmark' => 'required',
                'vivamark' => 'required',
                'labwmark' => 'required',
                'labemark' => 'required',
            ], [
                'session.required' => 'Session  Required',
                'it.required' => 'IT  Required',
                'labtheory.required' => 'Lab/Theory  Required',
                'courseCode.required' => 'courseCode  Required',
                'cname.required' => 'Course Name  Required',
                'session.required' => 'session  Required',
                'attendmark.required' => 'Attendance mark  Required',
                'vivamark.required' => 'Viva Mark  Required',
                'labwmark.required' => 'Lab Written mark  Required',
                'labemark.required' => 'Lab Experiment mark  Required',

            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->getMessageBag()->first(),
                    'errors' => $validator->getMessageBag(),
                ]);
            }
            $checkData = Result::where('ccode', $request->courseCode)->where('session', $request->session)->where('it', $request->it)->first();
            if ($checkData != null) {
                return response()->json([
                    'checkedData' => true,
                    'message' => 'insert data',
                    'data' => $checkData
                ]);
            } else {
                $creditF = Ccodetitle::where('ccode', $request->courseCode)->first();
                $credit = $creditF->credit;
                $gp = $request->attendmark + $request->vivamark + $request->labwmark + $request->labemark;
                if ($gp >= 80) {
                    $lg = 'A+';
                    $gp = 4.00;
                } elseif ($gp < 80 && $gp >= 75) {
                    $lg = 'A';
                    $gp = 3.75;
                } elseif ($gp < 75 && $gp >= 70) {
                    $lg = 'A-';
                    $gp = 3.50;
                } elseif ($gp < 70 && $gp >= 65) {
                    $lg = 'B+';
                    $gp = 3.25;
                } elseif ($gp < 65 && $gp >= 60) {
                    $lg = 'B';
                    $gp = 3.00;
                } elseif ($gp < 60 && $gp >= 55) {
                    $lg = 'B-';
                    $gp = 2.75;
                } elseif ($gp < 55 && $gp >= 50) {
                    $lg = 'C+';
                    $gp = 2.50;
                } elseif ($gp < 50 && $gp >= 45) {
                    $lg = 'C';
                    $gp = 2.25;
                } elseif ($gp < 45 && $gp >= 40) {
                    $lg = 'D';
                    $gp = 2.00;
                } else {
                    $lg = 'F';
                    $gp = 0;
                }
                $obj = new Result();
                $obj->session = $request->session;
                $obj->it = $request->it;
                $obj->semester = $request->semester;
                $obj->labtheory = $request->labtheory;
                $obj->ccode = $request->courseCode;
                $obj->ctitle = $request->cname;
                $obj->attendancemark = $request->attendmark;
                $obj->vivamark = $request->vivamark;
                $obj->writtenmark = $request->labwmark;
                $obj->labexpmark = $request->labemark;
                $obj->lg = $lg;
                $obj->gp = $gp;
                $obj->finalexamyr = $request->finalexamyr;
                $obj->heldIn = $request->heldIn;

                $obj->chours = $credit;


                $obj->save();
                return response()->json([
                    'success' => true,
                    'message' => 'insert data',
                    'data' => $obj
                ]);
            }
        } else {

            $formData = $request->all();
            $validator = Validator::make($formData, [
                'finalexamyr' => 'required',
                'heldIn' => 'required',
                'session' => 'required',
                'it' => 'required',
                'semester' => 'required',
                'labtheory' => 'required',
                'courseCode' => 'required',
                'cname' => 'required',
                'session' => 'required',
                'attendmark' => 'required',
                'ctmark' => 'required',
                'theorymark' => 'required',

            ], [
                'session.required' => 'Session  Required',
                'it.required' => 'IT  Required',
                'labtheory.required' => 'Lab/Theory  Required',
                'courseCode.required' => 'courseCode  Required',
                'cname.required' => 'Course Name  Required',
                'attendmark.required' => 'Attendance mark  Required',
                'ctmark.required' => 'Class Test Mark  Required',
                'theorymark.required' => ' Written mark  Required',


            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => $validator->getMessageBag()->first(),
                    'errors' => $validator->getMessageBag(),
                ]);
            }
            $checkData = Result::where('ccode', $request->courseCode)->where('session', $request->session)->where('it', $request->it)->first();
            if ($checkData != null) {
                return response()->json([
                    'checkedData' => true,
                    'message' => 'insert data',
                    'data' => $checkData
                ]);
            } else {
                $creditF = Ccodetitle::where('ccode', $request->courseCode)->first();
                $credit = $creditF->credit;
                $gp = $request->attendmark + $request->ctmark + $request->theorymark;
                if ($gp >= 80) {
                    $lg = 'A+';
                    $gp = 4.00;
                } elseif ($gp < 80 && $gp >= 75) {
                    $lg = 'A';
                    $gp = 3.75;
                } elseif ($gp < 75 && $gp >= 70) {
                    $lg = 'A-';
                    $gp = 3.50;
                } elseif ($gp < 70 && $gp >= 65) {
                    $lg = 'B+';
                    $gp = 3.25;
                } elseif ($gp < 65 && $gp >= 60) {
                    $lg = 'B';
                    $gp = 3.00;
                } elseif ($gp < 60 && $gp >= 55) {
                    $lg = 'B-';
                    $gp = 2.75;
                } elseif ($gp < 55 && $gp >= 50) {
                    $lg = 'C+';
                    $gp = 2.50;
                } elseif ($gp < 50 && $gp >= 45) {
                    $lg = 'C';
                    $gp = 2.25;
                } elseif ($gp < 45 && $gp >= 40) {
                    $lg = 'D';
                    $gp = 2.00;
                } else {
                    $lg = 'F';
                    $gp = 0;
                }
                $obj = new Result();
                $obj->session = $request->session;
                $obj->it = $request->it;
                $obj->semester = $request->semester;
                $obj->labtheory = $request->labtheory;
                $obj->ccode = $request->courseCode;
                $obj->ctitle = $request->cname;
                $obj->attendancemark = $request->attendmark;
                $obj->ctmark = $request->ctmark;
                $obj->writtenmark = $request->theorymark;
                $obj->lg = $lg;
                $obj->gp = $gp;
                $obj->finalexamyr = $request->finalexamyr;
                $obj->heldIn = $request->heldIn;
                $obj->chours = $credit;
                $obj->save();
                return response()->json([
                    'success' => true,
                    'message' => 'insert data',
                    'data' => $obj
                ]);
            }
        }
    }
    public function FinalResultByIt1($it,$semester)
    {
        $result = Result::where('it', $it)->where('semester', $semester)->get();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $result
        ]);
    }
    public function deleteSpecificSemesterCCResult1($it, $ccode, $session)
    {
        $result = Result::where('it', $it)->where('ccode', $ccode)->where('session', $session)
            ->delete();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $result
        ]);
    }
    public function AllSession()
    {
        $result = Result::select('session')->distinct()->get();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $result
        ]);
    }
    public function SearchSemesterWiseResult1($session, $semester)
    {
        $result = Result::select('it', 'semester', 'session')->distinct()->where('semester', $semester)->where('session', $session)
            ->get();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $result
        ]);
    }
    public function GPAMark1($it, $semester)
    {
        $result = Result::where('it', $it)->where('semester', $semester)
            ->get();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $result
        ]);
    }
    public function GradeSheetResult1($it, $semester)
    {
        $result = DB::table('results')->join('students', 'results.it', '=', 'students.it')->select('results.*', 'students.name')
            // $result=Result::where('it',$it)->where('semester',$semester)
            ->where('results.it', $it)->where('results.semester', $semester)
            ->get();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $result
        ]);
    }
    public function getlpgrade1()
    {
        $result = Lpgrade::get();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $result
        ]);
    }

    public function getmemberRequest1()
    {
        $result = Student::where('status', 1)->get();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $result
        ]);
    }
    public function getmemberRequest2()
    {
        $result = Teacher::where('status', 1)->get();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $result
        ]);
    }
    public function RequestInfoData1($infoData)
    {
        if ($infoData == 'Student') {
            $result = Student::where('status', 1)->get();
            return response()->json([
                'success' => true,
                'message' => 'insert data',
                'data' => $result
            ]);
        } else {
            $result = Teacher::where('status', 1)->get();
            return response()->json([
                'success' => true,
                'message' => 'insert data',
                'data' => $result
            ]);
        }
    }
    public function AcceptRequestDone1($who, $email)
    {
        if ($who == 'Student') {
            $result = User::where('email', $email)->update(['status' => 1]);
            $result1 = Student::where('email', $email)->update(['status' => 2]);

            if ($result) {
                $mail = Mail::to($email)->send(new AcceptRequest());
                return response()->json([
                    'success' => true,
                    'message' => 'insert data',
                    'data' => $result
                ]);
            }
        } else {
            $result = User::where('email', $email)->update(['status' => 1]);
            $result1 = Teacher::where('email', $email)->update(['status' => 2]);

            if ($result) {
                $mail = Mail::to($email)->send(new AcceptRequest());
                return response()->json([
                    'success' => true,
                    'message' => 'insert data',
                    'data' => $result
                ]);
            }
        }
    }
    public function GetAllMsg1($user_id, $my_id)
    {
        // $result=Message::where('from',$myid)->where('to',$friendid)->get();
        $result = Message::where(function ($query) use ($user_id, $my_id) {
            $query->where('from', $user_id)->where('to', $my_id);
        })->oRwhere(function ($query) use ($user_id, $my_id) {
            $query->where('from', $my_id)->where('to', $user_id);
        })->get();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $result
        ]);
    }
    public function saveMsg1(Request $request)
    {
        $formData = $request->all();
        $validator = Validator::make($formData, [
            'msg' => 'required',
        ], [
            'msg.required' => 'Please Write something',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
        $message = Message::create([
            'from' => $request->myid,
            'to' => $request->friendid,
            'msg' => $request->msg,
        ]);
        $auth = User::find(Auth::id());
        broadcast(new NewMessage($message ))->toOthers();
        return response()->json([
            'success' => true,
            'message' => 'insert data',
            'data' => $message,
            'data1'=> $auth
        ]);
    }
    public function AllFriendData1($myid)
    {

$data = DB::table('users')
 ->join('teachers', 'users.email', '=', 'teachers.email')
->select( 'users.*','teachers.image')
->where('users.status',1)
->Where('users.id', '!=', $myid)
->get();
     //  $data = User::where('status', 1)->Where('id', '!=', $myid)->get();
        return response()->json([
            'success' => true,
            'message' => 'get  data',
            'data' => $data
        ]);
    }

    public function AllFriendData3($myid)
    {

        $data = DB::table('users')
        ->join('students', 'users.email', '=', 'students.email')
       ->select( 'users.*','students.image','students.it','students.session')
       ->where('users.status',1)
       ->Where('users.id', '!=', $myid)
       ->get();
     //  $data = User::where('status', 1)->Where('id', '!=', $myid)->get();
        return response()->json([
            'success' => true,
            'message' => 'get  data',
            'data' => $data
        ]);
    }
    public function AllFriendData4($myid)
    {


       $data = User::where('user_rule', 'Admin')->where('status', 1)->Where('id', '!=', $myid)->get();
        return response()->json([
            'success' => true,
            'message' => 'get  data',
            'data' => $data
        ]);
    }

    public function authenticate(Request $request)
    {

        //  dd($request);
        // $data=User::where('id',$id)->first();
        // if($data){
        //     $name=$data->name;
        // }

        $socketId = $request->socket_id;
        $channelName = $request->channel_name;
        $pusher = new Pusher('c16ed6e7ee46ab7b014f', '4ed985cc53a7ef2acdc5', '749394', [
            'cluster' => 'mt1',
            'encrypted' => true
        ]);
        $user = Auth::user();
        $presence_data = ['name' => auth()->user()->name];
        $key = $pusher->presence_auth('presence-video-channel', $socketId, $user->id);

        return response($key);
    }
    //     $msg=new Message();
    //     $msg->from=$request->myid;
    //     $msg->to=$request->friendid;
    //     $msg->msg=$request->msg;
    //    $abc=$msg->save();
    //   SavePost1
    public function SavePost1(Request $request)
    {
        $formData = $request->all();
        $validator = Validator::make($formData, [
            'text' => 'required|min:3',
            'people' => 'required',
        ], [
            'text.required' => 'Write something',
            'people.required' => 'Please Select Audience',


        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
        $data = array();
        $data['text'] = $request->text;
        $data['email'] = $request->email;
        $data['people'] = $request->people;
        if ($request->user_rule == 'Student') {
            $creator = Student::where('email', $request->email)->first();
            $data['creatorimg'] = $creator->image;
            $data['creatorname'] = $creator->name;
            $data['user_rule'] = $request->user_rule;
        } elseif ($request->user_rule == 'Teacher') {
            $creator = Teacher::where('email', $request->email)->first();
            $data['creatorimg'] = $creator->image;
            $data['creatorname'] = $creator->name;
            $data['user_rule'] = $request->user_rule;
        } else {
            $creator = User::where('email', $request->email)->first();
            $data['creatorname'] = $creator->name;
            $data['user_rule'] = 'Admin';
        }


        $data['date1'] = $request->date1;
        if ($request->hasFile('image')) {
            $uniqueid = uniqid();
            $original_name = $request->file('image')->getClientOriginalName();
            $size = $request->file('image')->getSize();
            $extension = $request->file('image')->getClientOriginalExtension();
            $name = $uniqueid . '.' . $extension;
            $path = $request->file('image')->storeAs('public/uploads/post', $name);
            $data['image'] = $name;
            $post = DB::table('posts')->insert($data);

            return response()->json([
                'success' => true,
                'message' => 'Update Data successully !!',
                'data' => $post,


            ]);
        } else {
            $post = DB::table('posts')->insert($data);
            return response()->json([
                'success' => true,
                'message' => 'Update Data successully from else !!',
                'data' => $post,


            ]);
        }
    }
    public function SaveNoticeEvent1(Request $request){

        $formData = $request->all();
        $validator = Validator::make($formData, [
            'text' => 'required|min:3',
            'title' => 'required',
            'category' => 'required',
        ], [
            'text.required' => 'Write something',
            'category.required' => 'Select Category',


        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
        $data = array();
        $data['description'] = $request->text;
        $data['category'] = $request->category;
        $data['title'] = $request->title;
        $data['email'] = $request->email;
       $data['created_at'] = $request->date1;
        if ($request->hasFile('image')) {
            $uniqueid = uniqid();
            $original_name = $request->file('image')->getClientOriginalName();
            $size = $request->file('image')->getSize();
            $extension = $request->file('image')->getClientOriginalExtension();
            $name = $uniqueid . '.' . $extension;
            $path = $request->file('image')->storeAs('public/uploads/post', $name);
            $data['image'] = $name;
            $post = DB::table('notice_events')->insert($data);

            return response()->json([
                'success' => true,
                'message' => 'Update Data successully !!',
                'data' => $post,


            ]);
        } else {
            $post = DB::table('notice_events')->insert($data);
            return response()->json([
                'success' => true,
                'message' => 'Update Data successully from else !!',
                'data' => $post,


            ]);
        }

    }
    public function PostGet1($email)
    {
        $result = Post::where('email', $email)->get();
        return response()->json([
            'success' => true,
            'message' => 'Update Data successully from else !!',
            'data' => $result,


        ]);
    }
    public function PostDelete1($id)
    {
        $delete = Post::where('id', $id)->delete();
        return response()->json([
            'success' => true,
            'message' => ' Data successully',
            'data' => $delete,


        ]);
    }
    public function EditDataget1($id, $email)
    {
        $editdata = Post::where('id', $id)->first();
        return response()->json([
            'success' => true,
            'message' => ' Data successully',
            'data' => $editdata,


        ]);
    }
    public function EditPostData1(Request $request)
    {
        $formData = $request->all();
        $validator = Validator::make($formData, [
            'text' => 'required|min:3',
        ], [
            'text.required' => 'Write something',


        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
        $data = array();
        $data['text'] = $request->text;
        $data['email'] = $request->email;
        $data['status'] = $request->status;
        if ($request->hasFile('image')) {
            $uniqueid = uniqid();
            $original_name = $request->file('image')->getClientOriginalName();
            $size = $request->file('image')->getSize();
            $extension = $request->file('image')->getClientOriginalExtension();
            $name = $uniqueid . '.' . $extension;
            $path = $request->file('image')->storeAs('public/uploads/post', $name);
            $data['image'] = $name;
            $deleteImage = Post::where('id', $request->id)->first();

            if ($deleteImage) {
                $file_path = ('/public/uploads/post/') . $deleteImage->image;
                Storage::delete($file_path);
                $post = DB::table('posts')->where('id', $request->id)->update($data);
            }



            return response()->json([
                'success' => true,
                'message' => 'Update Data successully !!',
                'data' => $post,


            ]);
        } else {

            $post = DB::table('posts')->where('id', $request->id)->update($data);
            return response()->json([
                'success' => true,
                'message' => 'Update Data successully from else !!',
                'data' => $post,


            ]);
        }
    }
    //SaveSemesterRoutine
    public function SaveSemesterRoutine1(Request $request)
    {
        $formData = $request->all();
        $validator = Validator::make($formData, [
            'email' => 'required',
            'day' => 'required',
            'semester' => 'required|min:3|max:3',
            'courseCode' => 'required',
            'cname' => 'required',
            'time' => 'required|min:5|max:5',
            'ampm' => 'required',
            'lecture' => 'required'



        ], [

            'session.required' => 'Session  required',
            'time.required' => 'Time required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
        $checkData = Routine::where('email', $request->email)->where('day', $request->day)->where('lecture', $request->lecture)->first();
        if ($checkData != null) {
            return response()->json([
                'checkedData' => true,
                'message' => 'insert data',
                'data' => $checkData
            ]);
        } else {
            $obj = new Routine();
            $obj->email = $request->email;
            $obj->day = $request->day;
            $obj->semester = $request->semester;
            $obj->ccode = $request->courseCode;
            $obj->ctitle = $request->cname;
            $obj->time1 = $request->time;
            $obj->ampm = $request->ampm;
            $obj->lecture = $request->lecture;

            $obj->save();
            return response()->json([
                'success' => true,
                'message' => 'insert data',
                'data' => $obj
            ]);
        }
    }
    //active routine add from tacher panel
    public function RoutineActive1($email,$day,$id){
        $result = Routine::where('email',$email)->where('day',$day)->where('id',$id)->update(array('status' =>1));
        return response()->json([
            'success' => true,
            'message' => 'get data',
            'data' => $result
        ]);
    }
    public function RoutineResult1()
    {
        $result = Routine::select('email')->distinct()->get();
        return response()->json([
            'success' => true,
            'message' => 'get data',
            'data' => $result
        ]);
    }
    public function GetRoutineResult1($email)
    {
        $result = Routine::where('email', $email)->get();
        return response()->json([
            'success' => true,
            'message' => 'get data',
            'data' => $result
        ]);
    }
}
