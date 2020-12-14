import React from 'react';
import { GetTeacherInfo, GetSemesterCourseTitleInfo,SaveSemesterCourseTitle,deleteSpecificSemesterCoursetitle, GetSessionActiveData } from '../Services/Admin/AdminServices';
import SideBar from './SideBar';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
import { Editor } from '@tinymce/tinymce-react';
class CCodeTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors:'',
            ccode:'',
            ctitle:'',
            semester:'',
            credit:'',
            courseTitle:[],
          }
    }
    componentDidMount() {
         this.SemesterCourseTitleInfo();
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
           ccode:this.state.ccode,
           ctitle:this.state.ctitle,
           semester:this.state.semester,
           credit:this.state.credit,

        }
        const response = await SaveSemesterCourseTitle(postBody);

        if(response.success){
            $('#exampleModal').modal('hide');
           this.SemesterCourseTitleInfo();
            toast.info('Data Inserted Successfully')
         this.setState({
              ccode:"",
              ctitle:"",
              semester:'',
              credit:'',
              errors:"",
              errormessage:"",
              isLoading:true,

          });


            }
            else if(response.checkedData){
                this.setState({ errors:''  });

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
    SemesterCourseTitleInfo=async()=>{
          const response= await GetSemesterCourseTitleInfo();
          if(response.success){
            this.setState({ courseTitle:response.data  });
          }

    }
    deleteSemCourseTitle=(ccode,ctitle)=>{
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
            const response = await deleteSpecificSemesterCoursetitle(ccode,ctitle);
            if(response.success){
                this.SemesterCourseTitleInfo();
                toast('Semester Course Code-'+' '+ccode+' '+' Deleted Successfully');


            }

              }
          });
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

                            <div class="container-fluid">
                                <button onClick={()=>this.sidebarMenu()} type="button" id="sidebarCollapse" class="btn btn-info ">
                                <i class="fa fa-align-right"></i>  <span class="glyphicon glyphicon-align-right " aria-hidden="true">Toggle</span>
                                </button>

                            </div>



                        <br></br>
                        {/* modal start */}

                <button type="button" class=" btn btn-success float-right clearfix"   style={{marginRight:"5px"}} data-toggle="modal" data-target="#exampleModal">
  Add Semester Course & Title
</button>
<div class="modal fade"   id="exampleModal"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

                        <div class="addSemesterCourseForm">


                            <form onSubmit={this.formSubmit} >


        <div class="form-group">
            <label for="email">Course Code</label>
            <input type="number" class="form-control" id="email" placeholder="Enter course code like as 4210" name="ccode"
                value={this.state.ccode} onChange={(e) => this.changeInput(e)} ></input>
            {this.state.errors && this.state.errors.ccode && (
                <p class="text-danger">{this.state.errors.ccode[0]}</p>
            )}
                </div>


        <div class="form-group">
            <label for="password">Course Title</label>
            <input type="text" class="form-control" id="password" placeholder="Enter Course title" name="ctitle"
            value={this.state.ctitle} onChange={(e) => this.changeInput(e)}></input>
            {this.state.errors && this.state.errors.ctitle && (
                <p class="text-danger">{this.state.errors.ctitle[0]}</p>
            )}
        </div>
        <div class="form-group">
            <label for="password">Credit Hour(s)</label>
            <input type="text" class="form-control" id="password" placeholder="Enter Course title" name="credit"
            value={this.state.credit} onChange={(e) => this.changeInput(e)}></input>
            {this.state.errors && this.state.errors.credit && (
                <p class="text-danger">{this.state.errors.credit[0]}</p>
            )}
        </div>
        <div class="form-group">
            <label for="password">Semester</label>
            <input type="text" class="form-control" id="password" placeholder="Enter Course title" name="semester"
            value={this.state.semester} onChange={(e) => this.changeInput(e)}></input>
            {this.state.errors && this.state.errors.semester && (
                <p class="text-danger">{this.state.errors.semester[0]}</p>
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
</div>
  {/* modal end */}

<h3>Course Code & Title</h3>
                         <div class="table-responsive">
                         <table class="table table-striped">
                             <thead>
                               <tr>
                                   <th>No</th>
                                   <th>Course Code</th>
                                   <th>Course Title</th>
                                   <th>Credit Hour(s)</th>
                                   <th>Delete</th>



                               </tr>
                             </thead>
                             <tbody>
                                 {this.state.courseTitle.map((row,index)=>(

                                  <tr>
                                      <td>{i++}</td>
                                <td>{row.ccode}</td>
                                <td>{row.ctitle}</td>
                                <td>{row.credit}</td>


                                <td> <button onClick={()=>this.deleteSemCourseTitle(row.ccode,row.ctitle)} class="btn btn-danger">Delete</button> </td>
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

export default CCodeTitle;
