import React from 'react';
import { GetTeacherInfo, NoticeSave,GetSemesterCourseInfo,deleteSpecificSemesterCourse, GetSessionActiveData } from '../Services/Admin/AdminServices';
import SideBar from './SideBar';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
import { Editor } from '@tinymce/tinymce-react';

class AdminStudentInfo extends React.Component {
    state={
        CurrentSession:[],
    }
    componentDidMount() {
        this.GetActiveSession();
    }
    GetActiveSession=async()=>{
        const response=await GetSessionActiveData(this.props.match.params.id);
        if(response.success){
            this.setState({ CurrentSession:response.data  });
        }
    }
    sidebarMenu=()=>{

        $('#sidebar').fadeToggle();
    }
    ViewStudent=(session)=>{
        const {history}=this.props;
        history.push(`${PUBLIC_URL}viewstudent/${session}`);

    }
    render() {
        return (
            <div class="containerCustom">
            <div class="topMargin">
           <div class="wrapper">
                 <SideBar/>


               <div id="content">


            <button onClick={()=>this.sidebarMenu()} type="button" id="sidebarCollapse" class="btn btn-info ">
            <i class="fa fa-align-right"></i>  <span class="glyphicon glyphicon-align-right " aria-hidden="true">Toggle</span>
            </button>
             <br></br>
             {this.props.match.params.id==1 && (
 <h3 class="adminStudentH3"> Current Batch Student Information</h3>
             )}
                {this.props.match.params.id==0 && (
 <h3 class="adminStudentH3"> Ex Batch Student Information</h3>
             )}


                 <div class="row">
                     {this.state.CurrentSession.map((row,index)=>(


                     <div class="col-md-4">
                         <div class="currentSession">
                        <h3>{row.session}</h3>
                        <button class="btn btn-success" onClick={()=>this.ViewStudent(row.session)}>View</button>
                        </div>
                     </div>
                        ))}
                 </div>
                </div>

             </div>
            </div>
            </div>
        )
    }
}
export default withRouter(AdminStudentInfo);
