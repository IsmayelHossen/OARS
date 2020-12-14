import React from 'react';
import { IndividualAttendResult1,GetCTMarks, DeleteCTMark } from '../Services/AttendanceService';
import { PUBLIC_URL } from "../CommonURL";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
class ViewAttendanceResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AttendanceIndivi:[],
            isLoading:true,
            CTMark:[],

         }
    }
    componentDidMount() {
    this.GetCTMarksResult();

        setTimeout(() => {
            this.GetIndividulStudentAttendance();
        }, 3000);
        // alert(this.props.random);
    }
    GetIndividulStudentAttendance=async()=>{
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const email = data1.user.email;
        const result= await IndividualAttendResult1(this.props.it,this.props.courseCode,email);
        if(result.success){

           this.setState({ AttendanceIndivi:result.data ,isLoading:false });
           console.log('AttendanceIndivi',this.state.AttendanceIndivi);
        }
    }
    GetCTMarksResult=async()=>{
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const email = data1.user.email;
        const result= await GetCTMarks(this.props.it,this.props.courseCode,email);
        if(result.success){

            this.setState({ CTMark:result.data ,isLoading:false });
            console.log('show marks',this.state.CTMark);
            this.props.ctmarkResult(this.state.CTMark);

         }
    }
    CTMarkDelete=async(id)=>{
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
                const response=await DeleteCTMark(id);
                if(response.success){
                    this.GetCTMarksResult();
                    toast.info('Deleted CT Mark Successfully')
                }
            }


        })


    }

    render() {
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
    <div class="modal-content takenclasss">
      <div class="modal-header">
      <div class="row">
          {this.state.AttendanceIndivi.slice(0,1).map((row,index)=>(
             <>

                 <div class="col-md-12">
                 <img style={{maxWidth:"100px"}}
            src={`${PUBLIC_URL}storage/app/public/uploads/${row.image}`} alt={row.name} />
                 </div>
                 <div class="col-md-12">
                 <h6>Name:{row.name}</h6>
              <h6>ID:IT-{row.it}</h6>
              <h6>Phone-{row.phone}</h6>
              <h6>Email-{row.email}</h6>
              <h6>Course Code:{this.props.courseCode}</h6>
            </div>



              </>
          ))}
          </div>


        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="table-responsive " >
                <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Class Lecture</th>
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
 <div>
       <h5>Total Lecture:{this.state.AttendanceIndivi.length}</h5>
       <h6>Total Present:{PresentCount}</h6>
       <h6>Total Absent:{this.state.AttendanceIndivi.length-PresentCount}</h6>
       <h6>Attendance Percentance:{(PresentCount*100)/this.state.AttendanceIndivi.length}%</h6>
 </div>
 <h5>Class Test Marks</h5>
 <div class="table-responsive">
     <table class="table table-striped">
         <thead>
             <tr>
                 <th>CT No.</th>
                 <th>Mark</th>
                 <th>Delete</th>
             </tr>
             </thead>
             <tbody>
             {this.state.CTMark.map((row,index)=>(
                 <tr>
                     <td>{row.ctname}</td>
                     <td>{row.marks}</td>
                     <td style={{display:'none'}}>


                        { ctmark=ctmark+row.marks}
                        {  totalCT++}

                     </td>
                     <td><button class="btn btn-danger btn-sm" onClick={()=>this.CTMarkDelete(row.id)}>Delete</button></td>
                 </tr>

                  ))}
                  <tr  >
                    <td colspan="3" style={{textAlign:'center'}}> Average CT Mark:{ctmark/totalCT}</td>

                  </tr>
             </tbody>


     </table>
 </div>


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

export default ViewAttendanceResult;
