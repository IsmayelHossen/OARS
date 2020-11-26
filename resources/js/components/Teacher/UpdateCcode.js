import React from 'react';
import {Form,Card,Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CourseCodeUpdate, getSemesterInfo } from '../Services/AttendanceService';
class UpdateCcode extends React.Component{
    state={
        coursecode:'',
        cmodal:true,
        CodeCourse1:[],
    };
       componentDidMount() {
           this.semesterInfo();
       }
       semesterInfo=async()=>{
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const Teacheremail = data1.user.email;
        const getinfo=await getSemesterInfo(this.props.Session,Teacheremail);
        this.setState({ CodeCourse1:getinfo.data  });


    }

    changeInput=(e)=>{
     this.setState({ coursecode:e.target.value  });
     console.log("value",e.target.value);
    }
    FormSubmit=async(e)=>{
        e.preventDefault();
        if(this.state.coursecode){

      // this.customeModal();
       $('#exampleModal').modal('hide');

        }
        else{
            toast('Please select course code!');
        }
        // this.props.onCompleteCourseCode(this.state.coursecode);
        // this.setState({ modal:true,  });
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const Teacheremail = data1.user.email;
        const response= await CourseCodeUpdate(this.props.SuccessCode,Teacheremail,this.state.coursecode);

          if(response.success){
            const {history}=this.props;
            toast('Course Code Updated Successfully');
            localStorage.removeItem("Session");
            localStorage.removeItem("Session");
             console.log('ccode',response.data);
            //  this.props.onCompleteCourseCodeUpdate();
            history.push(`/OARS/takenclasses/${this.state.ccode}`);
          }
          else if(response.checkcoursecode){
            toast('Duplicat course code');
          }
    }

    render(){

    return (
      <>
        <ToastContainer/>
      <div style={{textAlign:'right'}}>
      <button type="button" class=" btn btn-primary"   style={{marginRight:"5px"}} data-toggle="modal" data-target="#exampleModal">
  Update Course Code
</button>
</div>


<div class="modal fade"   id="exampleModal"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"> Course Code</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          {console.log('kiii',this.props.coursecodedata)}
          <form onSubmit={this.FormSubmit}>
               <div class="form-group">

                            <select class="form-control" id="exampleFormControlSelect1" name="coursecode"
                                onChange={(e) => this.changeInput(e)}
                               >
                                   <option value="">Select</option>
                                   {this.state.CodeCourse1.map((code,index)=>
                                <option value={code.coursecode}>{code.course_code}</option>
                                )}


                            </select>


                        </div>

                                <button type="submit" class="btn btn-success btn-block" >Submit</button>
                               </form>
                    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

      </div>
    </div>
  </div>
</div>


</>
    );
  }
}
  export default UpdateCcode;
