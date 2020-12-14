import React from 'react';
import { GetTeacherInfo, SaveSemesterCourse,UpdateSemesterCourse,GetSemcCourseUpdateData } from '../Services/Admin/AdminServices';
import SideBar from './SideBar';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
class EditSemCourse  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            batch:"",
            semester:"",
            session:"",
            courseCode:"",
            status:'',
            EditSemCourseId:this.props.match.params.editSemCourseId,
            errors:"",
            errormessage:"",
            isLoading:true,
            editData:[],
        }
        console.log('userdatain edit',this.props.userData1);

    }
    componentDidMount() {
        this.GetSemcCourseUpdate();
    }
    GetSemcCourseUpdate=async()=>{
            const result= await GetSemcCourseUpdateData(this.props.match.params.email,this.props.match.params.ccode,this.props.match.params.session);
            if(result){
                this.setState({
                    editData:result,
                     email:result.email,
                   batch:result.batch,
                  semester:result.semester,
                  session:result.session,
                  courseCode:result.course_code,
                  status:result.status,

                    });

                console.log('getupdateData',this.state.editData);

            }
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
           courseCode:this.state.courseCode,
              id:this.state.EditSemCourseId,
              status:this.state.status,
        }
        const response = await UpdateSemesterCourse(postBody);

        if(response.success){


            toast('Data Updated Successfully')
            const {history}=this.props;
            history.push(`${PUBLIC_URL}addSemesterCourse`);



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

    render() {
        return (
            <>
            <ToastContainer/>
            <div class="containerCustom">
            <div class="topMargin">
           <div class="wrapper">
                 <SideBar/>


               <div id="content">

                       <div class="container-fluid">
                           <button onClick={()=>this.sidebarMenu()} type="button" id="sidebarCollapse" class="btn btn-info ">
                           <i class="fa fa-align-right"></i>  <span class="glyphicon glyphicon-align-right " aria-hidden="true">Toggle</span>
                           </button>

                       </div>


                   <br></br>
                   <div class="addSemesterCourseForm">
                            <h3>Update Semester Course</h3>

                            <form onSubmit={this.formSubmit} >



                            <div class="form-group">
            <label for="exampleFormControlSelect1">Email </label>
            <input type="email" class="form-control" id="email" placeholder="Enter email" name="email"
                value={this.state.email} onChange={(e) => {this.setState({ email:e.target.value  })}} ></input>
            {this.state.errors && this.state.errors.email && (
                <p class="text-danger">{this.state.errors.email[0]}</p>
            )}
        </div>

        <div class="form-group">
            <label for="email">Batch</label>
            <input type="number" class="form-control" id="email" placeholder="Enter batch" name="batch"
                value={this.state.batch} onChange={(e) => {this.setState({ batch:e.target.value  })}} ></input>
            {this.state.errors && this.state.errors.batch && (
                <p class="text-danger">{this.state.errors.batch[0]}</p>
            )}
                </div>
        <div class="form-group">
            <label for="password">Semester</label>
            <input type="text" class="form-control" id="password" placeholder="Enter Semester" name="semester"
            value={this.state.semester} onChange={(e) => {this.setState({ semester:e.target.value  })}}></input>
            {this.state.errors && this.state.errors.semester && (
                <p class="text-danger">{this.state.errors.semester[0]}</p>
            )}
        </div>
        <div class="form-group">
            <label for="password">Session</label>
            <input type="text" class="form-control" id="password" placeholder="Enter Session" name="session"
            value={this.state.session} onChange={(e) => {this.setState({ session:e.target.value  })}}></input>
            {this.state.errors && this.state.errors.session && (
                <p class="text-danger">{this.state.errors.session[0]}</p>
            )}
        </div>
        <div class="form-group">
            <label for="password">Course Code</label>
            <input type="text" class="form-control" id="password" placeholder="Enter Course code" name="courseCode"
            value={this.state.courseCode} onChange={(e) => {this.setState({ courseCode:e.target.value  })}}></input>
            {this.state.errors && this.state.errors.courseCode && (
                <p class="text-danger">{this.state.errors.courseCode[0]}</p>
            )}
        </div>
        <div class="form-group">
            <label for="password" style={{paddingRight:'10px'}}>Status</label>
            <input type="radio" value="1" checked={this.state.status=='1'} name="status" onChange={(e) => {this.setState({ status:e.target.value  })}}/>On<span style={{paddingRight:'10px'}}></span>
            <input type="radio" value="0" checked={this.state.status=='0'}  name="status" onChange={(e) => {this.setState({ status:e.target.value  })}}/>Off
            {this.state.errors && this.state.errors.status && (
                <p class="text-danger">{this.state.errors.status[0]}</p>
            )}
        </div>


<button type="submit" class="btn btn-success btn-block" >Update</button>

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

export default withRouter(EditSemCourse) ;
