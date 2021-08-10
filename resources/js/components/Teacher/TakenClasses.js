import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteSpecificAttendance, gettotalClasses } from '../Services/AttendanceService';
import Swal from 'sweetalert2';
import AttendanceView from './AttendanceView';
import { PUBLIC_URL } from "../CommonURL";
class TakenClasses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ccode:this.props.match.params.course_code,
             totalclass:[],
          }
    }

   componentDidMount() {
       this.totalClasses();
    //    $(`#exampleModal${ccode}`).modal('hide');
    //    console.log('ccode',this.state.ccode);
   }
   totalClasses=async()=>{
    const getLoginData = localStorage.getItem("LoginData");
    const data1 = JSON.parse(getLoginData);
    const email = data1.user.email;
    const response= await gettotalClasses(this.state.ccode,email);
    if(response.success)
    this.setState({ totalclass:response.data });
    console.log('all class',this.state.totalclass);

   }
   deleteTakenClass=(ccode,successCode)=>{
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

            const getLoginData = localStorage.getItem("LoginData");
          const data1 = JSON.parse(getLoginData);
          const email = data1.user.email;
          const response = await deleteSpecificAttendance(ccode,successCode,email);
          if(response.success){
              toast('Attendance Deleted Successfully');
              this.totalClasses();

          }
            console.log(ccode ,takendate);

            }
        })
   }
   updateT=(ccode,scode)=>{
  const {history}=this.props;
   history.push(`${PUBLIC_URL}attendanceupdate/${ccode}/${scode}`);
   }

    render() {
        {
            var i=1;
        }
        return (
            <>

              <ToastContainer/>
              <div class="containerCustom">
              <div class="topMargin">
            <div >
                <div class="row">
                    <div className=" col-md-12 takenclasss">

        <h2 className="heading">Course code:{ this.props.match.params.course_code} </h2>
     <h3  class="btn btn-success">Total number of classes: {this.state.totalclass.length}</h3>

     <div class="table-responsive" >
     <table class="table table-striped" style={{textAlign:'center'}}>
  <thead>
    <tr>
      <th scope="col">Sl</th>
      <th scope="col">Date</th>
      <th scope="col">View</th>
      <th scope="col">Update</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
      {this.state.totalclass.map((tclass,index)=>(


    <tr>
      <th scope="row">{i++}</th>
      <td>{tclass.TakenDate}</td>
      <td><AttendanceView Course_code={tclass.course_code} Success_code={tclass.successCode}/></td>
      <td><button onClick={()=>this.updateT(tclass.course_code,tclass.successCode)} class="btn btn-success">Update</button></td>
      <td><button onClick={()=>this.deleteTakenClass(tclass.course_code,tclass.successCode)} class="btn btn-danger">Delete</button></td>
    </tr>
    ))}
  </tbody>
</table>
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

export default TakenClasses;
