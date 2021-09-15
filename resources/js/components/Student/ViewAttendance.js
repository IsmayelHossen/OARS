import React from 'react';
import {GetCTMarks, SemesterWithCourseCodeRes, TeacherInformation } from '../Services/StudentService';
import { withRouter } from 'react-router-dom';
import { PUBLIC_URL } from "../CommonURL";
// import { GetCTMarks } from '../Services/AttendanceService';
 class ViewAttendance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AttendanceIndivi:[],
            isLoading:true,
            TeacherInfo:{},
            CTMark:[],
         }
    }
    componentDidMount() {
        this.GetCTMarksResult();
        setTimeout(() => {
            this.GetIndividulStudentAttendance();
        }, 3000);
        this.TeacherInformationForStudent();
    }
    GetIndividulStudentAttendance=async()=>{
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const email = data1.user.email;
        const result= await SemesterWithCourseCodeRes(this.props.it,this.props.courseCode);
        if(result.success){

           this.setState({ AttendanceIndivi:result.data ,isLoading:false });
           console.log('AttendanceIndivi',this.state.AttendanceIndivi);
        }
    }
    TeacherInformationForStudent=async()=>{
       const temail=localStorage.getItem('TeacherEmail');
       console.log('oii',temail);
          const result= await TeacherInformation(temail);
          if(result){
              this.setState({ TeacherInfo:result  });
          }
    }
    PrintF=()=>{
     //   const {history}=this.props;
        window.location.href=(`${PUBLIC_URL}print/${this.props.it}/${this.props.courseCode}`);
    }
    GetCTMarksResult=async()=>{
        const temail=localStorage.getItem('TeacherEmail');
        const result= await GetCTMarks(this.props.it,this.props.courseCode,temail);
        if(result.success){

            this.setState({ CTMark:result.data ,isLoading:false });
            console.log('show marks',this.state.CTMark);


         }
    }
    render() {
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const name = data1.user.name;
             let i=1;
             let PresentCount=0;
             let ctmark=0;
             let totalCT=0;
        return (
            <>
              {this.state.isLoading && (
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    )}
            <div >
      <button type="button" class=" btn btn-success btn-sm  " data-toggle="modal" data-target={`#exampleModal${this.props.random}`}>
   View
</button>
</div>


<div class="modal fade " id={`exampleModal${this.props.random}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog  modal-dialog-centered  modal-lg">

    <div class="modal-content takenclasss"  style={{background:'#f9f9f9'}}>
      <div class="modal-header">
   <h5 class="modal-title" id="exampleModalLabel"></h5><br/>

        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="bodyok"   >
          <div style={{textAlign:'left'}}>
          <h5 style={{color:'#c43838',fontWeight:'600',textAlign:'center'}}>Course Code:{this.props.courseCode}</h5>
          <img style={{width:"90px"}} src={`${PUBLIC_URL}storage/app/public/uploads/${this.state.TeacherInfo.image}`}
           alt={this.state.TeacherInfo.image} />
              <h6 style={{color:'#ac3e13',paddingTop:'.2em'}}>Course Teacher Name:{this.state.TeacherInfo.name} </h6>
              <h6> phone:{this.state.TeacherInfo.phone} </h6>
              <h6> email: {this.state.TeacherInfo.email} </h6>


      {this.state.AttendanceIndivi.slice(0,1).map((row,index)=>(
 <>

        <h6>Student Name:{name}</h6>
        <h6 >ID:IT- {row.it} </h6>

        <span style={{display:"none"}}>{localStorage.setItem('TeacherEmail',row.teacheremail)}</span>
        </>

  ))}
   </div>
      <div class="table-responsive " >
                <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Lecture</th>
      <th scope="col">Attendance</th>
      <th scope="col">Date</th>

    </tr>
  </thead>
  <tbody>
      {this.state.AttendanceIndivi.map((row,index)=>(

  <tr>
      <th scope="row">{i++}</th>
      <td>{row.attend=='P' &&(
          <span style={{color:'green'}}>P</span>

      )}
       {row.attend!='P' &&(
          <span style={{color:'red'}}>A</span>
      )}
<p style={{display:'none'}}>{row.attend=='P'?(PresentCount++):''}</p>
      </td>
      <td>{row.TakenDate}</td>

    </tr>
      ))}
 </tbody>
 </table>
 </div>
 <div style={{textAlign:'left'}} >
       <h5 style={{fontWeight:'600'}}>Total Lecture:{this.state.AttendanceIndivi.length}</h5>
       <h6  >Total Present:{PresentCount}</h6>
       <h6 >Total Absent:{this.state.AttendanceIndivi.length-PresentCount}</h6>
       <h6 style={{color:((PresentCount*100)/this.state.AttendanceIndivi.length>60)?'#2c601e':'red'}}>Attendance Percentance:{(PresentCount*100)/this.state.AttendanceIndivi.length}%</h6>
 </div>
 <h5>Class Test Marks</h5>
 {this.state.CTMark!=0 &&(
          <h6 style={{color:'red'}}>Best CT Count:{this.state.CTMark.length}</h6>
      )}
 <div class="table-responsive">
     <table class="table table-striped">
         <thead>
             <tr>
                 <th>CT No.</th>
                 <th>Mark</th>

             </tr>
             </thead>
             <tbody>
                 {this.state.CTMark==0 &&(
                    <tr>
                        <td colspan="2" style={{color:'red'}}>No CT Mark Added Yet!</td>
                    </tr>
                 )}
             {this.state.CTMark.map((row,index)=>(
                 <tr>
                     <td>{row.ctname}</td>
                     <td>{row.marks}</td>
                     <td style={{display:'none'}}>


                        { ctmark=ctmark+row.marks}
                        {  totalCT++}

                     </td>

                 </tr>

                  ))}
                  <tr  >
                    <td colspan="3" style={{textAlign:'right'}}> Average CT Mark:{ctmark/totalCT}</td>

                  </tr>
             </tbody>


     </table>
 </div>
      </div>
      <div class="modal-footer">
          <button onClick={()=>this.PrintF()}> Print</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

      </div>
    </div>
  </div>
</div>

            </>
          );
    }
}

export default  withRouter(ViewAttendance) ;
