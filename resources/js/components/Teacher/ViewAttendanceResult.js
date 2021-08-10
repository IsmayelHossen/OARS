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
        const result= await GetCTMarks(this.props.it,this.props.courseCode,this.props.bestCt,email);
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



 <div class="table-responsive">
     <table class="table">
         <thead>
             <tr>
                 <th>CT No.</th>
                 <th>Mark</th>

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

                 </tr>

                  ))}
                  <tr  >
                    <td colspan="3" style={{textAlign:'center'}}> Average CT Mark:{Math.ceil(ctmark/totalCT)}</td>

                  </tr>
             </tbody>


     </table>
 </div>

 <div class="table-responsive " >
<h4>Attendance Result</h4>
{this.state.AttendanceIndivi.map((row,index)=>(
<p style={{display:'none'}}>{row.attend=='P'?(PresentCount++):''}</p>
))}

</div>
<h5>Total Lecture:{this.state.AttendanceIndivi.length}</h5>
 <h6>Total Present:{PresentCount}</h6>
 <h6>Total Absent:{this.state.AttendanceIndivi.length-PresentCount}</h6>
 <h6>Attendance Percentance:{(PresentCount*100)/this.state.AttendanceIndivi.length}%</h6>


            </>
          );
    }
}

export default ViewAttendanceResult;




