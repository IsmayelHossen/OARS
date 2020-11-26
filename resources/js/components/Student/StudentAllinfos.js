import React from 'react';
import { AttendanceResultInfo } from '../Services/StudentService';
import { withRouter} from "react-router-dom";
class StudentAllinfos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            StudentAttendanceInfo:[],
          }
    }
   componentDidMount() {
       this.StudentResultInfo();
   }
    StudentResultInfo=async()=>{
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const email = data1.user.email;

          const result= await AttendanceResultInfo(email);
          if(result.success){
              this.setState({StudentAttendanceInfo:result.data  });
          }
          console.log('it',this.state.StudentAttendanceInfo);
    }

    SeeDetails=async(it,semester)=>{
        const {history}=this.props;
       // window.location.href = `/OARS/takenclasses/${coursecode}`;
       const abc= await history.push(`/OARS/studentsemesterinfo/${it}/${semester}`);

    }
    render() {
        return (
            <>

             <div class="row">
               <div class="col-md-12">
                   <div class="takenclasss">
                        <h3 class="heading"> All Information</h3>
                          <div class="row">
                              {
                               this.state.email

                              }
                              {this.state.StudentAttendanceInfo.map((row,index)=>(


                              <div class="col-md-4">
                                  <div class="AllInfo_course">
                              <h4>Semester:{row.semester}</h4>
                              <button class="btn btn-success btn-sm mb-3" onClick={()=>this.SeeDetails(row.it,row.semester)}>See Details</button>

                                  </div>
                              </div>
                                   ))}
                          </div>
                   </div>
               </div>
           </div>


            </>

          );
    }
}

export default withRouter(StudentAllinfos) ;
