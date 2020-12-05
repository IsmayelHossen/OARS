import React from 'react';
import { GetTeacherInfo, SaveSemesterCourse,GetSemesterCourseInfo,deleteSpecificSemesterCourse } from '../Services/Admin/AdminServices';
import SideBar from './SideBar';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
class AddSemesterCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TeacherData:[],
            email:'',
            batch:'',
            semester:'',
            session:'',
            courseCode:'',
            errors:'',
            errormessage:'',
            SemesterCourseInfo:[],
          }
    }
    componentDidMount() {
        this.TeachersInfo();
        this.getSemesterCourse();
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
    formSubmit=async(e)=>{
        e.preventDefault();
        const {history}=this.props;
        const postBody={
           email:this.state.email,
           batch:this.state.batch,
           semester:this.state.semester,
           session:this.state.session,
           courseCode:this.state.courseCode
        }
        const response = await SaveSemesterCourse(postBody);

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
    EditSemCourse=async(email,ccode,session)=>{
     const {history}=this.props;
     history.push(`/OARS/editSCourse/${email}/${ccode}/${session}`);
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
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Course Code</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      <div class="addSemesterCourseForm">
                            <h3>Add Semester Course</h3>

                            <form onSubmit={this.formSubmit} >
                            <div class="form-group">
            <label for="exampleFormControlSelect1">Email </label>
            <select class="form-control" id="exampleFormControlSelect1" name="email"
                onChange={(e) => this.changeInput(e)}>
                    <option value="">Select</option>
                    {this.state.TeacherData.map((row,index)=>(
               <option value={row.email}>{row.email}</option>
                ))}


            </select>
            {this.state.errors && this.state.errors.email && (
                <p class="text-danger">{this.state.errors.email[0]}</p>
            )}
        </div>

        <div class="form-group">
            <label for="email">Batch</label>
            <input type="number" class="form-control" id="email" placeholder="Enter batch" name="batch"
                value={this.state.batch} onChange={(e) => this.changeInput(e)} ></input>
            {this.state.errors && this.state.errors.batch && (
                <p class="text-danger">{this.state.errors.batch[0]}</p>
            )}
                </div>
        <div class="form-group">
            <label for="password">Semester</label>
            <input type="text" class="form-control" id="password" placeholder="Enter Semester" name="semester"
            value={this.state.semester} onChange={(e) => this.changeInput(e)}></input>
            {this.state.errors && this.state.errors.semester && (
                <p class="text-danger">{this.state.errors.semester[0]}</p>
            )}
        </div>
        <div class="form-group">
            <label for="password">Session</label>
            <input type="text" class="form-control" id="password" placeholder="Enter Session" name="session"
            value={this.state.session} onChange={(e) => this.changeInput(e)}></input>
            {this.state.errors && this.state.errors.session && (
                <p class="text-danger">{this.state.errors.session[0]}</p>
            )}
        </div>
        <div class="form-group">
            <label for="password">Course Code</label>
            <input type="text" class="form-control" id="password" placeholder="Enter Course code" name="courseCode"
            value={this.state.courseCode} onChange={(e) => this.changeInput(e)}></input>
            {this.state.errors && this.state.errors.courseCode && (
                <p class="text-danger">{this.state.errors.courseCode[0]}</p>
            )}
        </div>



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
                         <h3>Here result of semester course</h3>
                         <div class="table-responsive">
                         <table class="table table-striped">
                             <thead>
                               <tr>
                                   <th>No</th>
                                   <th>Course Teacher</th>
                                   <th>Email</th>
                                   <th>Course Code</th>
                                   <th>Batch</th>
                                   <th>Session</th>
                                   <th>Status</th>
                                   <th>Edit</th>
                                   <th>Delete</th>



                               </tr>
                             </thead>
                             <tbody>
                                 {this.state.SemesterCourseInfo.map((row,index)=>(

                                  <tr>
                                      <td>{i++}</td>
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td>{row.course_code}</td>
                                <td>{row.batch}</td>
                                <td>{row.session}</td>
                                <td>active inactive</td>
                                <td>
                              <button class="btn btn-success" onClick={()=>this.EditSemCourse(row.email,row.course_code,row.session)}>Edit</button>
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

export default withRouter(AddSemesterCourse);
