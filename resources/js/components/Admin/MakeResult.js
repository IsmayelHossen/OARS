import React from 'react';
import { GetActiveSessioninfo,GetSessionStudent, getSemesterInfoR,GetSemesterCourseInfo,
    deleteSpecificSemesterCourse,getSemesterCodeMR ,getSemesterCTitleMR,getSemesterAttendanceMark,
    getSemesterCTMark,SaveSemesterResult,FinalResultByIt,deleteSpecificSemesterCCResult} from '../Services/Admin/AdminServices';
import SideBar from './SideBar';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
import { getSemesterInfo } from '../Services/AttendanceService';

class MakeResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TeacherData:[],
            email:'',
            batch:'',
            it:'',
            semester:'',
            session:'',
            courseCode:'',
            cname:'',
            errors:'',
            labtheory:'',
            attendmark:'',
            vivamark:'',
            writtenmark:'',
            experimentmark:'',
            ctmark:'',
            labwmark:'',
            labemark:'',
            theorymark:'',
            errormessage:'',
            SemesterInfo:{},
            SemesterCourseToggle:'',
            toggleButton:false,
            ToggleData:true,
            SemesterCode:[],
            SessionStudent:[],
            ActiveSessiondata:[],
            SemesterCodeTitle:[],
            SemesterCodeWaizAttendMark:[],
            CtMarkData:[],
            FinalIT:'',
            FinalSemester:'',
            FinalResult:[],
            heldIn:'',
            finalexamyr:'',
          }
    }
    componentDidMount() {
        this.GetActiveSession();
        this.getSemesterCourse();
        this.GetFinalResult();
    }
    GetActiveSession=async()=>{
        const result= await GetActiveSessioninfo();
        if(result.success){
            this.setState({ ActiveSessiondata:result.data  });
            console.log('teacher data',this.state.ActiveSessiondata);

        }
    }
    getSemesterCourse=async()=>{
          const result= await GetSemesterCourseInfo();
          if(result.success){
              this.setState({ SemesterCourseInfo:result.data  });


          }
          console.log('semesterInfo',this.state.SemesterCourseInfo);
    }
    GetFinalResult=async()=>{
              const result=await FinalResultByIt(this.state.FinalIT);
              if(result.success){
                  this.setState({ FinalResult:result.data  });
                  console.log('FinalResultOk',this.state.FinalResult);
                  console.log('FinalIT',this.state.FinalIT);
              }
              //console.log('FinalResult',result.data);
              console.log('FinalIT',this.state.FinalIT);
    }
    sidebarMenu=()=>{

        $('#sidebar').fadeToggle();

    }

    changeInput=(e)=>{
        this.setState({ [e.target.name]:e.target.value });
    }
    changeInputSession=async(e)=>{
        this.setState({ session:e.target.value  });
        const session=e.target.value;
        if(session==0){
            toast.error('session field must not be empty');
        }
        else{
            const result= await GetSessionStudent(session);
            if(result.success){
                this.setState({ SessionStudent:result.data,  });
              console.log('ki',result.data);
            }

        }


    //   console.log('semsester',this.state.semester);
       // alert(this.state.semester);
    }
    changeInputIT=async(e)=>{
        this.setState({ it:e.target.value,FinalIT:e.target.value  });

        const it=e.target.value;

        if(this.state.session==0){
            toast.error(' Course code field must not be empty');
        }
        else{
            const result= await getSemesterInfoR(this.state.session);
            if(result){
                this.setState({ SemesterInfo:result,  });
              console.log('SemesterInfo',result);
            }


        }

    }
    //changeInputGetCode
    changeInputGetCode=async(e)=>{
        this.setState({ labtheory:e.target.value  });

        const labtheory=e.target.value;

        if(labtheory==0){
            toast.error(' Lab/Theory field must not be empty');
        }
        else{

            const result= await getSemesterCodeMR(this.state.session,this.state.semester,labtheory);
            if(result.success){
                this.setState({ SemesterCode:result.data,  });
              console.log('mrcode',result.data);
            }


        }

    }
      //changeInputGetCTitle
      changeInputGetCTitle=async(e)=>{
        this.setState({ courseCode:e.target.value  });

        const courseCode=e.target.value;

        if(courseCode==0){
            toast.error(' Course code field must not be empty');
        }
        else{

            const result= await getSemesterCTitleMR(this.state.session,courseCode);
            if(result.success){
                this.setState({ SemesterCodeTitle:result.data,  });
              console.log('SemesterCodeName',result.data);
            }


        }

    }
//changeInputForAttendanceMark
changeInputForAttendanceMark=async(e)=>{
    this.setState({ cname:e.target.value  });


    if(this.state.cname==null){
        toast.error(' this field must not be empty');
    }
    else{

        const result= await getSemesterAttendanceMark(this.state.session,this.state.courseCode,this.state.it);
        if(result.success){
            this.setState({ SemesterCodeWaizAttendMark:result.data,  });
          console.log('SemesterCodeWaizAttendMark',result.data);
        }


    }

}
//changeInputForCtmark
changeInputForCtmark=async(e)=>{
    this.setState({ attendmark:e.target.value  });
    const attend=e.target.value;
    if(this.state.attendmark==null){
        toast.error(' attendance field must not be empty');
    }
    else{

        const result= await getSemesterCTMark(this.state.session,this.state.courseCode,this.state.it);
        if(result.success){
            this.setState({ CtMarkData:result.data,  });
          console.log('CtMarkData',result.data);
        }


    }

}

    formSubmit=async(e)=>{
        e.preventDefault();
        const {history}=this.props;
        if(this.state.labtheory=='Lab'){
            const postBody={
                finalexamyr:this.state.finalexamyr,
                heldIn:this.state.heldIn,
               session:this.state.session,
               it:this.state.it,
               semester:this.state.semester,
               labtheory:this.state.labtheory,
               courseCode:this.state.courseCode,
               cname:this.state.cname,
               attendmark:this.state.attendmark,
               vivamark:this.state.vivamark,
               labwmark:this.state.labwmark,
               labemark:this.state.labemark,
            }
            if(this.state.finalexamyr==0){
                toast.error('Final Examination Field must not be empty')
            }
            else if(this.state.heldIn==0){
                toast.error('Held In Field must not be empty')
            }
           else if(this.state.session==0){
                toast.error('Session Field must not be empty')
            }
            else if(this.state.it==0){
                toast.error('IT Field must not be empty')
            }
            else if(this.state.semester==0){
                toast.error('semester Field must not be empty')
            }
            else if(this.state.labtheory==0){
                toast.error('Lab/Theory Field must not be empty')
            }
            else if(this.state.courseCode==0){
                toast.error('Course code Field must not be empty')
            }
            else if(this.state.cname==0){
                toast.error('Course name Field must not be empty')
            }
            else if(this.state.attendmark==0){
                toast.error('Attendance Field must not be empty')
            }
            else if(this.state.vivamark==0){
                toast.error('Viva Field must not be empty')
            }
            else if(this.state.labwmark==0){
                toast.error('Lab Written Field must not be empty')
            }
            else if(this.state.labemark==0){
                toast.error('Lab Experiment number Field must not be empty')
            }


            else{
                const response = await SaveSemesterResult(postBody);
                if(response.success){
                    toast('Data Inserted Successfully')
                    this.setState({
                        finalexamyr:'',
                        heldIn:'',
                         semester:"",
                         session:"",
                         it:"",
                         labtheory:"",
                         courseCode:"",
                         cname:"",
                         attendmark:"",
                         vivamark:"",
                         labwmark:"",
                         labemark:"",
                         errors:"",
                         errormessage:"",
                         isLoading:true,

                     });
                      $('#exampleModal').modal('hide');
                      this.getSemesterCourse();
                      this.GetFinalResult();

          }
                      else if(response.checkedData){
                          this.setState({
                                errors:"",
                          errormessage:"", });
                          toast.error('Already Data Exists!')

                      }
                  else {
                      console.log("response.errors", response.errors);
                      this.setState({
                          errors: response.errors,
                         // isLoading: false,
                          errormessage: response.message,
                      });
                  }

               }



        }
        else{
            const postBody={
        finalexamyr:this.state.finalexamyr,
         heldIn:this.state.heldIn,
         session:this.state.session,
        it:this.state.it,
        semester:this.state.semester,
        labtheory:this.state.labtheory,
        courseCode:this.state.courseCode,
        cname:this.state.cname,
        attendmark:this.state.attendmark,
        ctmark:this.state.ctmark,
        theorymark:this.state.theorymark,
            }
            if(this.state.finalexamyr==0){
                toast.error('Final Examination Field must not be empty')
            }
            else if(this.state.heldIn==0){
                toast.error('Held In Field must not be empty')
            }
           else if(this.state.session==0){
                toast.error('Session Field must not be empty')
            }
            else if(this.state.it==0){
                toast.error('IT Field must not be empty')
            }
            else if(this.state.semester==0){
                toast.error('semester Field must not be empty')
            }
            else if(this.state.labtheory==0){
                toast.error('Lab/Theory Field must not be empty')
            }
            else if(this.state.courseCode==0){
                toast.error('Course code Field must not be empty')
            }
            else if(this.state.cname==0){
                toast.error('Course name Field must not be empty')
            }
            else if(this.state.attendmark==0){
                toast.error('Attendance Field must not be empty')
            }
            else if(this.state.ctmark==0){
                toast.error('CT Mark Field must not be empty')
            }
            else if(this.state.theorymark==0){
                toast.error(' Written Field must not be empty')
            }

           else{

                const response = await SaveSemesterResult(postBody);
                if(response.success){
                    this.setState({
                        finalexamyr:'',
                        heldIn:'',
                        semester:"",
                        session:"",
                        it:"",
                        labtheory:"",
                        courseCode:"",
                        cname:"",
                        attendmark:"",
                        ctmark:"",
                        theorymark:"",
                       errors:"",
                      errormessage:"",
                     isLoading:true,

                        });
                      $('#exampleModal').modal('hide');
                      this.getSemesterCourse();
                      this.GetFinalResult();
                      toast('Data Inserted Successfully')

          }
                      else if(response.checkedData){
                          this.setState({
                                errors:"",
                          errormessage:"", });
                          this.GetFinalResult();
                          toast.error('Already Data Exists!')

                      }
                  else {
                      console.log("response.errors", response.errors);
                      this.setState({
                          errors: response.errors,
                         // isLoading: false,
                          errormessage: response.message,
                      });
                  }

                }


        }


    }

    deleteSemCourse=(it,ccode,session)=>{
        Swal.fire({
            title: 'Are you sure?',
        text: 'Want To delete',
          icon: 'warning',
            showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
       confirmButtonText: 'Yes!'})
       .then(async(result) => {
            if(result.value){
              //   this.props.submitUser(this.state)
            const response = await deleteSpecificSemesterCCResult(it,ccode,session);
            if(response.success){
                this.getSemesterCourse();
                this.GetFinalResult();
                toast.success('Semester Course Code-'+' '+ccode+' '+' Deleted Successfully');
                this.totalClasses();

            }

              }
          });
    }
    EditSemCourse=async(email,ccode,session,id)=>{
     const {history}=this.props;
     history.push(`${PUBLIC_URL}editSCourse/${email}/${ccode}/${session}/${id}`);
    }
    DataToggle=()=>{
  $(function() {
    $('#toggle-one').bootstrapToggle();
  })
    }
    ToggleButtonClick=()=>{
        this.setState({ toggleButton:!this.state.toggleButton ,ToggleData:!this.state.ToggleData });
    }
    render() {
        let PresentCount=0;
        let TotalPercentace=0;
        let mark=0;
        let ctmark1=0;
        let ctmarkavg=0;
        let i=1;

        return (
            <>
            <ToastContainer/>
            <div class="containerCustom">
                 <div class="topMargin">

                <div class="wrapper">
           <SideBar/>


                    <div id="content">

                <button type="button" class=" btn btn-success float-right clearfix"   style={{marginRight:"5px"}} data-toggle="modal" data-target="#exampleModal">
  Make Result
</button>

{/* modal start */}
<div class="modal fade"   id="exampleModal"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content ">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Make Result</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      <div class="addSemesterCourseForm" style={{maxWidth:'700px'}}>
                            <h3>Make Grade Sheet</h3>

                            <form onSubmit={this.formSubmit} >

                <div class="form-group">
            <label for="email">Final Examination Year</label>
            <input type="text" class="form-control" id="email" placeholder="Final Examination Year" name="finalexamyr"
                value={this.state.finalexamyr} onChange={(e) => this.changeInput(e)} ></input>
            {this.state.errors && this.state.errors.finalexamyr && (
                <p class="text-danger">{this.state.errors.finalexamyr[0]}</p>
            )}
                </div>

                <div class="form-group">
            <label for="email">Held In</label>
            <input type="text" class="form-control" id="email" placeholder="Held In like April-June 2019" name="heldIn"
                value={this.state.heldIn} onChange={(e) => this.changeInput(e)} ></input>
            {this.state.errors && this.state.errors.heldIn && (
                <p class="text-danger">{this.state.errors.heldIn[0]}</p>
            )}
                </div>
                            <div class="form-group">
            <label for="exampleFormControlSelect1">Session </label>
            <select class="form-control" id="exampleFormControlSelect1" name="session"
                onChange={(e) => this.changeInputSession(e)}>
                    <option value="">Select</option>
                    {this.state.ActiveSessiondata !=null && this.state.ActiveSessiondata.map((row,index)=>(
               <option value={row.session}>{row.session}</option>
                ))}


            </select>
            {this.state.errors && this.state.errors.session && (
                <p class="text-danger">{this.state.errors.session[0]}</p>
            )}
        </div>

        <div class="form-group">
            <label for="email">IT</label>
            <select class="form-control" id="exampleFormControlSelect1" name="it"
                onChange={(e) => this.changeInputIT(e)}>
                    <option value="">Select</option>
                    {this.state.SessionStudent !=null && this.state.SessionStudent.map((row,index)=>(
               <option value={row.it}>{row.it}</option>
                ))}


            </select>
            {this.state.errors && this.state.errors.batch && (
                <p class="text-danger">{this.state.errors.batch[0]}</p>
            )}
                </div>
        <div class="form-group">
            <label for="password">Semester</label>
            <select class="form-control" id="exampleFormControlSelect1" name="semester"
                onChange={(e) => this.changeInput(e)}>
                    <option value="">Select</option>
            <option value={this.state.SemesterInfo.semester}>{this.state.SemesterInfo.semester}</option>

            </select>
            {this.state.errors && this.state.errors.semester && (
                <p class="text-danger">{this.state.errors.semester[0]}</p>
            )}
        </div>
        <div class="form-group">
            <label for="password">Theory/Lab</label>
            <select class="form-control" id="exampleFormControlSelect1" name="labtheory"
                onChange={(e) => this.changeInputGetCode(e)}>
                    <option value="">Select</option>
                    <option value="Lab">Lab</option>
                    <option value="Theory">Theory</option>

            </select>
            {this.state.errors && this.state.errors.labtheory && (
                <p class="text-danger">{this.state.errors.labtheory[0]}</p>
            )}
        </div>
        {this.state.labtheory=='Theory' &&(

      <>
        <div class="form-group">
            <label for="password">Course Code </label>
            <select class="form-control" id="exampleFormControlSelect1" name="courseCode"
                onChange={(e) => this.changeInputGetCTitle(e)}>
                    <option value="">Select</option>

                  {this.state.SemesterCode !=null && this.state.SemesterCode.map((row,index)=>(
                    <option value={row.course_code}>{row.course_code}</option>
                    ))}

            </select>
            {this.state.errors && this.state.errors.courseCode && (
                <p class="text-danger">{this.state.errors.courseCode[0]}</p>
            )}
        </div>

        <div class="form-group">
            <label for="password">Course Name</label>
            <select class="form-control" id="exampleFormControlSelect1" name="cname"
                onChange={(e) => this.changeInputForAttendanceMark(e)}>
                    <option value="">Select</option>
                    {this.state.SemesterCodeTitle !=null && this.state.SemesterCodeTitle.map((row,index)=>(
                    <option value={row.cname}>{row.cname}</option>
                    ))}


            </select>
            {this.state.errors && this.state.errors.cname && (
                <p class="text-danger">{this.state.errors.cname[0]}</p>
            )}
        </div>

        <div class="form-group">
            <label for="email">Attendance Mark </label>
            {this.state.SemesterCodeWaizAttendMark==0 && this.state.cname && this.state.courseCode &&(
          <p style={{color:'red'}}>Not Found(Course Teacher may be not added yet)</p>
            )}
            {this.state.SemesterCodeWaizAttendMark.map((row,index)=>(
                <>
        <p style={{display:'none'}}>{row.attend=='P'?(PresentCount++):''}</p>

        </>
       ))}
        <p style={{display:'none'}}>
        {
          TotalPercentace=(PresentCount*100)/this.state.SemesterCodeWaizAttendMark.length  }
          {
               TotalPercentace>=100?mark=10:TotalPercentace>=90?mark=9:TotalPercentace>=80?mark=8:TotalPercentace>=70?mark=7:TotalPercentace>=60?mark=6:TotalPercentace>=50?mark=5:mark=0
          }


          </p>
          (<span> {TotalPercentace}%</span>)
          <select class="form-control" id="exampleFormControlSelect1" name="attendmark"
                onChange={(e) => this.changeInputForCtmark(e)}>
                    <option value="">Select</option>
                    {TotalPercentace !=null &&
                    <option value={mark}>{mark}</option> }
                   </select>

            {this.state.errors && this.state.errors.attendmark && (
                <p class="text-danger">{this.state.errors.attendmark[0]}</p>
            )}
                </div>


                <div class="form-group">
            <label for="email">Class Test Mark</label>
            {this.state.CtMarkData==0 && this.state.courseCode && this.state.cname &&(
          <p style={{color:'red'}}>Not Found(Course Teacher may be not added yet)</p>
            )}
            {this.state.CtMarkData !=null && this.state.CtMarkData.map((row,index)=>(
                <p style={{display:'none'}}>
                    {
                        ctmark1=row.marks+ctmark1
                    }

                </p>
            ))}
            <p style={{display:'none'}} >
            {
                ctmarkavg=ctmark1/this.state.CtMarkData.length
            }
            </p>
            <select class="form-control" id="exampleFormControlSelect1" name="ctmark"
                onChange={(e) => this.changeInput(e)}>
                    <option value="">Select</option>
                    {ctmarkavg ==0 &&
                    <option value={ctmarkavg}>{ctmarkavg}</option> }
                     {ctmarkavg &&
                    <option value={ctmarkavg}>{ctmarkavg}</option> }
                   </select>

            {this.state.errors && this.state.errors.ctmark && (
                <p class="text-danger">{this.state.errors.ctmark[0]}</p>
            )}
                </div>
                <div class="form-group">
            <label for="email">Theory Mark(Written)</label>
         <input type="number" class="form-control" id="email" placeholder="Theory Mark" name="theorymark"
                value={this.state.theorymark} onChange={(e) => this.changeInput(e)} ></input>

            {this.state.errors && this.state.errors.theorymark && (
                <p class="text-danger">{this.state.errors.theorymark[0]}</p>
            )}
                </div>
        </>
  )}

{this.state.labtheory=='Lab' &&(

<>
  <div class="form-group">
      <label for="password">Course Code </label>
      <select class="form-control" id="exampleFormControlSelect1" name="courseCode"
                onChange={(e) => this.changeInputGetCTitle(e)}>
                    <option value="">Select</option>

                  {this.state.SemesterCode !=null && this.state.SemesterCode.map((row,index)=>(
                    <option value={row.course_code}>{row.course_code}</option>
                    ))}

            </select>
      {this.state.errors && this.state.errors.courseCode && (
          <p class="text-danger">{this.state.errors.courseCode[0]}</p>
      )}
  </div>

  <div class="form-group">
      <label for="password">Course Name</label>
      <select class="form-control" id="exampleFormControlSelect1" name="cname"
                onChange={(e) => this.changeInputForAttendanceMark(e)}>
                    <option value="">Select</option>
                    {this.state.SemesterCodeTitle !=null && this.state.SemesterCodeTitle.map((row,index)=>(
                    <option value={row.cname}>{row.cname}</option>
                    ))}


            </select>
            {this.state.errors && this.state.errors.cname && (
                <p class="text-danger">{this.state.errors.cname[0]}</p>
            )}
  </div>



      <div class="form-group">
            <label for="email">Attendance Mark </label>
            {this.state.SemesterCodeWaizAttendMark==0 && this.state.cname && this.state.courseCode &&(
          <p style={{color:'red'}}>Not Found(Course Teacher may be not added yet)</p>
            )}
            {this.state.SemesterCodeWaizAttendMark.map((row,index)=>(
                <>
        <p style={{display:'none'}}>{row.attend=='P'?(PresentCount++):''}</p>

        </>
       ))}
        <p style={{display:'none'}}>
        {
          TotalPercentace=(PresentCount*100)/this.state.SemesterCodeWaizAttendMark.length  }
          {
               TotalPercentace>=100?mark=10:TotalPercentace>=90?mark=9:TotalPercentace>=80?mark=8:TotalPercentace>=70?mark=7:TotalPercentace>=60?mark=6:TotalPercentace>=50?mark=5:mark=0
          }


          </p>
          (<span> {TotalPercentace}%</span>)
          <select class="form-control" id="exampleFormControlSelect1" name="attendmark"
                onChange={(e) => this.changeInputForCtmark(e)}>
                    <option value="">Select</option>
                    {TotalPercentace !=null &&
                    <option value={mark}>{mark}</option> }
                   </select>

            {this.state.errors && this.state.errors.attendmark && (
                <p class="text-danger">{this.state.errors.attendmark[0]}</p>
            )}
                </div>



                <div class="form-group">
            <label for="email">Viva Mark</label>
            <input type="number" class="form-control" id="email" placeholder="Class test Mark" name="vivamark"
                value={this.state.vivamark} onChange={(e) => this.changeInput(e)} ></input>
            {this.state.errors && this.state.errors.vivamark && (
                <p class="text-danger">{this.state.errors.vivamark[0]}</p>
            )}
                </div>
                <div class="form-group">
            <label for="email">Lab Written</label>
            <input type="number" class="form-control" id="email" placeholder="Lab written Mark" name="labwmark"
                value={this.state.labwmark} onChange={(e) => this.changeInput(e)} ></input>
            {this.state.errors && this.state.errors.labwmark && (
                <p class="text-danger">{this.state.errors.labwmark[0]}</p>
            )}
            </div>
            <div class="form-group">
            <label for="email">Lab Experiment Mark</label>
            <input type="number" class="form-control" id="email" placeholder="Lab Experiment Mark" name="labemark"
                value={this.state.labemark} onChange={(e) => this.changeInput(e)} ></input>
            {this.state.errors && this.state.errors.labemark && (
                <p class="text-danger">{this.state.errors.labemark[0]}</p>
            )}
            </div>
  </>
)}


{/* <div class="form-group form-check">
<label class="form-check-label">
    <input class="form-check-input" type="checkbox" value="checked"> Remember me</input>
</label>
</div> */}
<button type="submit" class="btn btn-success btn-block" >Submit</button>
</form>
</div>

        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

      </div>
    </div>
  </div>
  {/* modal end */}
  </div>



                            <div class="container-fluid">
                                <button onClick={()=>this.sidebarMenu()} type="button" id="sidebarCollapse" class="btn btn-info ">
                                <i class="fa fa-align-right"></i>  <span class="glyphicon glyphicon-align-right " aria-hidden="true">Toggle</span>
                                </button>

                            </div>



                        <br></br>
                         <h3>Here result of It-16054</h3>

                         <div class="table-responsive">
                         <div style={{maxWidth:"1080px",overflowX:"scroll"}}>
                         <table class="table table-striped">
                             <thead>
                               <tr>
                                   <th>No</th>
                                   <th>IT</th>
                                   <th>Session</th>
                                   <th>Semester</th>
                                   <th>Course Code</th>
                                   <th>Course Title</th>
                                   <th>Credit</th>
                                   <th>LG</th>
                                   <th>GP</th>
                                   <th>Attendance Mark</th>
                                   <th>CT Mark</th>
                                   <th>Viva Mark</th>
                                   <th>Lab Experiment Mark</th>
                                   <th>Written Mark</th>
                                   <th>Lab/Theory </th>
                                   <th>Final Exam </th>
                                   <th>Held In </th>
                                   <th>Delete</th>



                               </tr>
                             </thead>
                             <tbody>
                                 {this.state.FinalResult.map((row,index)=>(

                                  <tr>
                                      <td>{i++}</td>

                                <td>{row.it}</td>
                                <td>{row.session}</td>
                                <td>{row.semester}</td>
                                <td>{row.ccode}</td>
                                <td>{row.ctitle}</td>
                                <td>{row.chours}</td>
                                <td>{row.lg}</td>
                                <td>{row.gp}</td>
                                <td>{row.attendancemark }</td>
                                <td>{row.ctmark }</td>
                                <td>{row.vivamark }</td>
                                <td>{row.labexpmark }</td>
                                <td>{row.writtenmark  }</td>
                                <td>{row.labtheory  }</td>
                                <td>{row.finalexamyr  }</td>
                                <td>{row.heldIn  }</td>


                                <td> <button onClick={()=>this.deleteSemCourse(row.it,row.ccode,row.session)} class="btn btn-danger">Delete</button> </td>
                                  </tr>

                                 ))}
                             </tbody>
                         </table>
                         </div>
                         </div>


                    </div>


                </div>


                 </div>
                 </div>





            </>
          );
    }
}

export default withRouter(MakeResult);
