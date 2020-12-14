import React from 'react';
import { AttendanceResultInfo, StudentSemResultInfo } from '../Services/StudentService';
import { Redirect, withRouter} from "react-router-dom";
import ViewAttendance from './ViewAttendance';
import { PUBLIC_URL } from "../CommonURL";
class StudentSemesterInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            StudentSemInfo:[],
          }
    }
   componentDidMount() {
       this.StudentSemestertInfo();
   }
   StudentSemestertInfo=async()=>{


          const result= await StudentSemResultInfo(this.props.match.params.it,this.props.match.params.semester);
          if(result.success){
              this.setState({StudentSemInfo:result.data  });
          }
          console.log('it',this.state.StudentSemInfo);
    }
    render() {
        if(!localStorage.getItem('LoginData')){
            return <Redirect to={`${PUBLIC_URL}loginuser`} />;
        }
        let randNum=1;
        return (
            <>
             <div class="containerCustom">
              <div class="topMargin">
             <div class="row ">
               <div class="col-md-12">
                   <div class="takenclasss">
                        <h3 class="heading example-screen"> All Information</h3>
                          <div class="row">

                               {this.state.StudentSemInfo.map((row,index)=>(


                              <div class="col-md-4 ">
                                  <div class="AllInfo_course">
                              <h4>Semester:{row.course_code}</h4>

                              <ViewAttendance random={randNum++} it={row.it} courseCode={row.course_code} />

                                  </div>
                              </div>
                                   ))}
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

export default withRouter(StudentSemesterInfo);
