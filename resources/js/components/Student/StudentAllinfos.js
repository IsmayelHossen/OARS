import React from 'react';
import { AttendanceResultInfo } from '../Services/StudentService';
import { withRouter} from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
class StudentAllinfos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            StudentAttendanceInfo:[],
            isLoading:true,
          }
    }
   componentDidMount() {
      setTimeout(() => {


       }, 3000);
       this.StudentResultInfo();
   }
    StudentResultInfo=async()=>{
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const email = data1.user.email;

          const result= await AttendanceResultInfo(email);
          if(result.success){
              this.setState({StudentAttendanceInfo:result.data ,
              isLoading:false
            });
          }
          console.log('it',this.state.StudentAttendanceInfo);
    }

    SeeDetails=async(it,semester)=>{
        const {history}=this.props;
       // window.location.href = `/OARS/takenclasses/${coursecode}`;
       const abc= await history.push(`${PUBLIC_URL}studentsemesterinfo/${it}/${semester}`);

    }
    render() {
        return (
            <>
             <div class="containerCustom">
                <div class="topMargin">
             <div class="row">
               <div class="col-md-12">
                   <div class="takenclasss">
                        <h3 class="heading animate__bounce"> All Information</h3>
                        {this.state.isLoading && (
                        <div class="spinner-border1" role="status" style={{margin:'0 auto'}}>
                            <span >Loading...</span>


                        </div>
                    )}
                          <div class="row">

                              {this.state.StudentAttendanceInfo.map((row,index)=>(


                              <div class="col-md-4">
                                  <div class="AllInfo_course">
                              <h4>Semester:{row.semester}</h4>
                              <button class="btn btn-success btn-sm mb-3" onClick={()=>this.SeeDetails(row.it,row.semester)}>See Details</button>

                                  </div>
                              </div>
                                   ))}
                                    {this.state.StudentAttendanceInfo.length==0 && (
                              <>

                              <h3 style={{color:" red", padding:" 10px 20px;", margin:"0 auto",marginTop:'6em',marginBottom:'6em'}}>No Data Available</h3>
                              </>
                          )}
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

export default withRouter(StudentAllinfos) ;
