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

class ResultPreStep extends React.Component {
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
                toast.error('Semester Field must not be empty')
            }




           else{

            const {history}=this.props;
            history.push(`${PUBLIC_URL}makeresult/${this.state.finalexamyr}/${this.state.heldIn}/${this.state.session}/${this.state.it}/${this.state.semester}`);

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

                    <div class="addSemesterCourseForm" style={{maxWidth:'700px'}}>
                            <h3>Make Grade Sheet-1</h3>

                            <form onSubmit={this.formSubmit} >

                <div class="form-group">
            <label for="email">Final Examination Year</label>
            <input type="text" class="form-control" id="email" placeholder="Final Examination Year Like 2020" name="finalexamyr"
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
                    <input type="submit" class="btn btn-success" value="Next"></input>
                    </div>
  </form>
  </div>




                          </div>
                          </div>
                          </div>
                          </div>



            </>
          );
    }
}

export default withRouter(ResultPreStep);
