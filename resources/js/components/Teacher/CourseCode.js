import React from 'react';
import {Form,Card,Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PUBLIC_URL } from "../CommonURL";
class CourseCode extends React.Component{
    state={
        coursecode:'',
        cmodal:true,
    };

    changeInput=(e)=>{
     this.setState({ coursecode:e.target.value  });
     console.log("value",e.target.value);
    }
    FormSubmit=(e)=>{
        e.preventDefault();
        if(this.state.coursecode){
        toast('Course Code Taken Successfully');
      // this.customeModal();
       $('#exampleModal').modal('hide');
        }
        else{
            toast('Please select course code!');
        }
        this.props.onCompleteCourseCode(this.state.coursecode);
        this.setState({ modal:true,  });

    }

    render(){

    return (
      <>
        <ToastContainer/>
      <div style={{textAlign:'right'}}>
      <button type="button" class=" btn btn-success"   style={{marginRight:"5px"}} data-toggle="modal" data-target="#exampleModal">
  Course Code
</button>
</div>


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
          {console.log('kiii',this.props.coursecodedata)}
          <form onSubmit={this.FormSubmit}>
               <div class="form-group">

                            <select class="form-control" id="exampleFormControlSelect1" name="coursecode"
                                onChange={(e) => this.changeInput(e)}
                               >
                                   <option value="">Select</option>
                                   {this.props.coursecodedata.map((code,index)=>
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
  export default CourseCode;
