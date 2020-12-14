import React from 'react';
import {Form,Card,Button } from 'react-bootstrap';
import { getAttendanceView } from '../Services/AttendanceService';
import { PUBLIC_URL } from "../CommonURL";
class AttendanceView extends React.Component{
    state={
        coursecode:'',
        modal:false,
        ViewResult:[],
    };
  componentDidMount() {
      this.ViewAttendance();
  }
  ViewAttendance=async()=>{
    const getLoginData = localStorage.getItem("LoginData");
    const data1 = JSON.parse(getLoginData);
    const email = data1.user.email;
     const response= await getAttendanceView(this.props.Course_code,this.props.Success_code,email);
     if(response.success){
         this.setState({ ViewResult:response.data  });
         console.log('view',this.state.ViewResult);
     }
  }

    render(){
        var i=1;
   return (
      <>

      <div style={{textAlign:'center'}}>
      <button type="button" class=" btn btn-primary  " data-toggle="modal" data-target={`#exampleModal${this.props.Success_code}`}>
  View
</button>
</div>





<div class="modal fade " id={`exampleModal${this.props.Success_code}`}  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog  modal-dialog-centered modal-dialog-scrollable modal-lg">
    <div class="modal-content takenclasss">
      <div class="modal-header">
   <h5 class="modal-title" id="exampleModalLabel">Course Code:{this.props.Course_code}</h5>

        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Sl</th>
      <th scope="col">ID</th>
      <th scope="col">Attendance</th>
      <th scope="col">Date</th>

    </tr>
  </thead>
  <tbody>
      {this.state.ViewResult.map((row,index)=>(


  <tr>
      <th scope="row">{i++}</th>
      <td>{row.it}</td>
      <td>{row.attend=='P' &&(
          <span style={{color:'green'}}>P</span>
      )}
       {row.attend!='P' &&(
          <span style={{color:'red'}}>A</span>
      )}
      </td>
      <td>{row.TakenDate}</td>

    </tr>
      ))}
 </tbody>
 </table>
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
  export default AttendanceView;
