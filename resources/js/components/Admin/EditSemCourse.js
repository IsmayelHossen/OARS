import React from 'react';
import { GetTeacherInfo, SaveSemesterCourse,GetSemesterCourseInfo,deleteSpecificSemesterCourse } from '../Services/Admin/AdminServices';
import SideBar from './SideBar';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
class EditSemCourse  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return (
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

  {this.props.match.params.email}

                   <br></br>
                   <div class="addSemesterCourseForm">
                            <h3>Update Semester Course</h3>

                            <form onSubmit={this.formSubmit} >
                            <div class="form-group">
            <label for="exampleFormControlSelect1">Email </label>
            <select class="form-control" id="exampleFormControlSelect1" name="email"
                onChange={(e) => this.changeInput(e)}>
                    <option value="">Select</option>

               <option value>a</option>
               <option value>b</option>



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
           </div>


            </div>
            </div>





          );
    }
}

export default withRouter(EditSemCourse) ;
