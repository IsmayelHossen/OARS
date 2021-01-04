import React from 'react';
import { GetTeacherInfo,getSemesterCode, SaveSemesterRoutine,GetSemesterCourseInfo,
    deleteSpecificSemesterCourse,getSemesterCodeTitle ,RoutineResult} from '../Services/Admin/AdminServices';
import SideBar from './SideBar';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";

class AddRoutine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TeacherData:[],
            email:'',
            batch:'',
            semester:'',
            session:'',
            courseCode:'',
            cname:'',
            errors:'',
            labtheory:'',
            errormessage:'',
            SemesterCourseInfo:[],
            SemesterCourseToggle:'',
            toggleButton:false,
            ToggleData:true,
            SemesterCode:[],
            SemesterCodeTitle:{},
            day:'',
            time:'',
            ampm:'',
            lecture:'',
            IndividualRoutine:[],

          }
    }
    componentDidMount() {
        this.TeachersInfo();
        this.getSemesterCourse();
        this.RoutineIndividual();
    }
    RoutineIndividual=async()=>{
        const response=await RoutineResult();
        if(response.success){
            this.setState({ IndividualRoutine:response.data  });
        }
    }
    TeachersInfo=async()=>{
        const result= await GetTeacherInfo();
        if(result.success){
            this.setState({ TeacherData:result.data  });
            console.log('teacher data',this.state.TeacherData);

        }
    }
    getSemesterCourse=async()=>{
          const result= await GetSemesterCourseInfo();
          if(result.success){
              this.setState({ SemesterCourseInfo:result.data  });


          }
          console.log('semesterInfo',this.state.SemesterCourseInfo);
    }
    sidebarMenu=()=>{

        $('#sidebar').fadeToggle();

    }

    changeInput=(e)=>{
        this.setState({ [e.target.name]:e.target.value });
    }
    changeInputGetCcode=async(e)=>{
        this.setState({ semester:e.target.value  });
        const abc=e.target.value;
        if(abc==0){
            toast.error('field must not be empty');
        }
        else{
            const result= await getSemesterCode(abc);
            if(result.success){
                this.setState({ SemesterCode:result.data,  });
              console.log('ki',result.data);
            }

        }


    //   console.log('semsester',this.state.semester);
       // alert(this.state.semester);
    }
    changeInputGetCtitle=async(e)=>{
        this.setState({ courseCode:e.target.value  });

        const ccode=e.target.value;
        if(ccode==0){
            toast.error(' Course code field must not be empty');
        }
        else{
            const result= await getSemesterCodeTitle(ccode);
            if(result.success){
                this.setState({ SemesterCodeTitle:result.data,  });
              console.log('course title',result.data);
            }

        }

    }
    formSubmit=async(e)=>{
        e.preventDefault();
        const {history}=this.props;
        const postBody={
           email:this.state.email,
           day:this.state.day,
           semester:this.state.semester,
           session:this.state.session,
           courseCode:this.state.courseCode,
           cname:this.state.SemesterCodeTitle.ctitle,
           time:this.state.time,
           ampm:this.state.ampm,
           lecture:this.state.lecture,


        }
        const response = await SaveSemesterRoutine(postBody);

        if(response.success){
            $('#exampleModal').modal('hide');
            this.getSemesterCourse();
            toast('Data Inserted Successfully')
         this.setState({
              email:"",
              batch:"",
              semester:"",
              session:"",
              courseCode:"",
              errors:"",
              errormessage:"",
              isLoading:true,
              labtheory:'',
              cname:'',
              day:'',
              lecture:'',
              ampm:'',
              time:'',
          });


            }
            else if(response.checkedData){
                this.setState({
                      errors:"",
                errormessage:"", });
                toast('Already Data Exists!')

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
    deleteSemCourse=(email,ccode,session)=>{
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
            const response = await deleteSpecificSemesterCourse(email,ccode,session);
            if(response.success){
                this.getSemesterCourse();
                toast('Semester Course Code-'+' '+ccode+' '+' Deleted Successfully');
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
    ViewRoutine=(email)=>{
        const {history}=this.props;
        history.push(`${PUBLIC_URL}viewroutine/${email}`);
       // alert(email);
    }
    render() {
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
  Add Semester Course
</button>

{/* modal start */}
<div class="modal fade"   id="exampleModal"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Routine</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      <div class="addSemesterCourseForm">
                            <h3>Add Routine</h3>

                            <form onSubmit={this.formSubmit} >
                            <div class="form-group">
            <label for="exampleFormControlSelect1">Email </label>
            <select class="form-control" id="exampleFormControlSelect1" name="email"
                onChange={(e) => this.changeInput(e)}>
                    <option value="">Select</option>
                    {this.state.TeacherData !=null && this.state.TeacherData.map((row,index)=>(
               <option value={row.email}>{row.email}</option>
                ))}


            </select>
            {this.state.errors && this.state.errors.email && (
                <p class="text-danger">{this.state.errors.email[0]}</p>
            )}
        </div>
        <div class="form-group">
            <label for="password">Day</label>
            <select class="form-control" id="exampleFormControlSelect1" name="day"
                onChange={(e) => this.changeInput(e)}>
                    <option value="">Select</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>

            </select>
            {this.state.errors && this.state.errors.day && (
                <p class="text-danger">{this.state.errors.day[0]}</p>
            )}
        </div>
        <div class="form-group">
            <label for="password">Semester</label>
            <select class="form-control" id="exampleFormControlSelect1" name="semester"
                onChange={(e) => this.changeInputGetCcode(e)}>
                    <option value="">Select</option>
                    <option value="1-1">1-1</option>
                    <option value="1-2">1-2</option>
                    <option value="2-1">2-1</option>
                    <option value="2-2">2-2</option>
                    <option value="3-1">3-1</option>
                    <option value="3-2">3-2</option>
                    <option value="4-1">4-1</option>
                    <option value="4-2">4-2</option>
            </select>
            {this.state.errors && this.state.errors.semester && (
                <p class="text-danger">{this.state.errors.semester[0]}</p>
            )}
        </div>

        <div class="form-group">
            <label for="password">Course Code </label>
            <select class="form-control" id="exampleFormControlSelect1" name="courseCode"
                onChange={(e) => this.changeInputGetCtitle(e)}>
                    <option value="">Select</option>

                  {this.state.SemesterCode !=null && this.state.SemesterCode.map((row,index)=>(
                    <option value={row.ccode}>{row.ccode}</option>
                    ))}

            </select>
            {this.state.errors && this.state.errors.courseCode && (
                <p class="text-danger">{this.state.errors.courseCode[0]}</p>
            )}
        </div>
        <div class="form-group">
            <label for="password">Course Name</label>
            <select class="form-control" id="exampleFormControlSelect1" name="cname"
                onChange={(e) => this.changeInput(e)}>
                    <option value="">Select</option>

                  {this.state.SemesterCodeTitle !=null && (
                    <option value={this.state.SemesterCodeTitle.ctitle}>{this.state.SemesterCodeTitle.ctitle}</option>
                    )}

            </select>
            {this.state.errors && this.state.errors.cname && (
                <p class="text-danger">{this.state.errors.cname[0]}</p>
            )}
        </div>

        <div class="form-group">
            <label for="email">Time</label>
            <input type="text" class="form-control" id="email" placeholder="Enter time" name="time"
                value={this.state.time} onChange={(e) => this.changeInput(e)} ></input>
            {this.state.errors && this.state.errors.time && (
                <p class="text-danger">{this.state.errors.time[0]}</p>
            )}
                </div>
                <div class="form-group">
            <label for="email">Am/Pm</label>
            <input type="text" class="form-control" id="email" placeholder="Enter batch" name="ampm"
                value={this.state.ampm} onChange={(e) => this.changeInput(e)} ></input>
            {this.state.errors && this.state.errors.ampm && (
                <p class="text-danger">{this.state.errors.ampm[0]}</p>
            )}
                </div>
                <div class="form-group">
            <label for="email">Lecture</label>
            <input type="number" class="form-control" id="email" placeholder="Enter lecture" name="lecture"
                value={this.state.lecture} onChange={(e) => this.changeInput(e)} ></input>
            {this.state.errors && this.state.errors.lecture && (
                <p class="text-danger">{this.state.errors.lecture[0]}</p>
            )}
                </div>

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
                         <h3>Semester Routine</h3>
                         <div class="table-responsive">
                         <table class="table table-bordered">
                             <thead>
                               <tr>
                                   <th>No</th>
                                   <th>Email</th>
                                   <th>Edit</th>
                                   <th>Delete</th>



                               </tr>
                             </thead>
                             <tbody>
                                 {this.state.IndividualRoutine.map((row,index)=>(

                                  <tr>
                                      <td>{i++}</td>

                                <td>{row.email}</td>

                                <td>
                              <button class="btn btn-success" onClick={()=>this.ViewRoutine(row.email)}>View</button>
                             </td>
                                <td> <button onClick={()=>this.deleteSemCourse(row.email,row.course_code,row.session)} class="btn btn-danger">Delete</button> </td>
                                  </tr>

                                 ))}
                             </tbody>
                         </table>
                         </div>


                    </div>


                </div>


                 </div>
                 </div>





            </>
          );
    }
}

export default withRouter(AddRoutine);
