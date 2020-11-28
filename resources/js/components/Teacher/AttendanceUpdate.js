import React from 'react';
import { GetAttendanceForUpdate, getSemesterInfo, SaveAttendance, SemesterAllStudent, UpdateAttendance } from '../Services/AttendanceService';
import { Form, Button, Card} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CourseCode from './CourseCode';
import Swal from 'sweetalert2';
import UpdateCcode from './UpdateCcode';
class AttendanceUpdate extends React.Component {

        state = {
            SemesterStudent:[],
            SemesterStudent1:{},
            session:this.props.match.params.session,
            attend:[],
            teacheremail:'',
            ccode:this.props.match.params.ccode,
            semester:'',
            TakenDate:new Date().toLocaleDateString(),
            semesterinfo1:[],
            semesterinfo2:{},
            checkedU:true,
            checkedU1:false,

         }

    componentDidMount() {
        this.getSemesterAllStudent();
        // this.semesterInfo();
        // const yourDate = new Date().toLocaleDateString();

        //   console.log("my text", yourDate) ;;
    }
    // semesterInfo=async()=>{
    //     const getLoginData = localStorage.getItem("LoginData");
    //     const data1 = JSON.parse(getLoginData);
    //     const Teacheremail = data1.user.email;
    //     const getinfo=await getSemesterInfo(this.state.session,Teacheremail);
    //     this.setState({ semesterinfo1:getinfo.data,semesterinfo2:getinfo.data  });

    //     console.log("semesterInfo1",this.state.semesterinfo1);
    //     console.log("semesterInfo2",this.state.semesterinfo2);
    // }

    getSemesterAllStudent=async()=>{
        const getLoginData = localStorage.getItem("LoginData");
            const data1 = JSON.parse(getLoginData);
            const Teacheremail = data1.user.email;
          const getSemesterStudent= await GetAttendanceForUpdate(this.props.match.params.ccode,this.props.match.params.scode,Teacheremail);
         this.setState({ SemesterStudent:getSemesterStudent.data ,  });



    }

    submitform = async (event) => {
        event.preventDefault();
        this.setState({ validated:true  });
        const {history}=this.props;
      //  const course=localStorage.getItem("CCode");


//check if any roll is missing start
            $(":radio").each(function(){
                name=$(this).attr('name');
                if(!$(':radio[name="' +name + '"]:checked').length){
              // alert(name+"  Roll Missing");
                toast(name+" "+"Roll missing!");
                roll=false;
                }
              });

//check if any roll is missing end



        const xyz = $("#attendence").serializeArray();
        const formData = new FormData();
        formData.append('attend', xyz);
        console.log('attend',xyz)
        // $.each(x, function(i, field){
        //     this.setState({ attend:field.name ,attend:field.value  });
        //  attend.append(field.name + ":" + field.value + " ");

        //   console.log(this.state.attend);
        // });



        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const Teacheremail = data1.user.email;

         this.setState({ teacheremail:Teacheremail  });

           //here call the SaveAttendance method from Services AttendanceService
            const response = await UpdateAttendance(this.props.match.params.ccode,this.props.match.params.scode,Teacheremail,xyz);



      if (response.success) {
          this.setState({

              isLoading: false,
          });
         // localStorage.removeItem("CCode");
          //alert('attendance taken successfully');
        //  localStorage.removeItem("CCode");
        //  const Coursecode=localStorage.getItem("CCode");
        Swal.fire({
            icon: 'success',
            text: 'Attendance Updated Successfully!',

          })
           history.push(`/OARS/takenclasses/${this.props.match.params.ccode}`);




      }

      else{
          console.log("response.errors", response.errors);
          this.setState({
              errors: response.errors,
              isLoading: false,
          });
      }

        // Axios.post('/OARS/api/saveattendence', xyz)

        // .then(res => {
        //     console.log("data",res.data);



        // })
        }
        onCompleteCourseCodeUpdate=()=>{


            this.getSemesterAllStudent();


        };

    render() {

        return (
            <>
            <ToastContainer/>
            <div class="topMargin">
                <Card >
                <Card.Body className="takenclasss">
                <h3 className="heading">Update Attendance</h3>
                <div class="row">

                 <div class="col-md-6">
                 {this.state.SemesterStudent.slice(0,1).map((student123, index) => (
               <>
                 <Card.Subtitle class="mb-1 "><strong style={{color:"#d26161",paddingLeft:"10px"}}>Semester::{student123.semester}</strong></Card.Subtitle>
                 <Card.Subtitle class="mb-1  "><strong style={{color:"#456",paddingLeft:"10px"}}>Session:{student123.session}</strong></Card.Subtitle>
                 <Card.Subtitle class="mb-1  "><strong style={{color:"#41aa6f",paddingLeft:"10px"}}>Taken Date:{student123.TakenDate}</strong></Card.Subtitle>

               {localStorage.setItem('Session',student123.session)}
                 </>
                 ))}
             </div>




                    <div class="col-md-6">
                       <UpdateCcode SuccessCode={this.props.match.params.scode}
                                     Session={localStorage.getItem('Session')}
                                     onCompleteCourseCodeUpdate={this.onCompleteCourseCodeUpdate}
                                />
                                <h3>Course Code:{this.state.ccode}</h3>

                    </div>
                </div>

                 <div class="row">
                  <div class="col-md-12 attendance">
                  <div class="table-responsive">



                 {this.state.SemesterStudent !=0  &&(
                <Form className="" method="post" onSubmit={this.submitform}  id="attendence">
                <table class="table table-striped">
          <thead>
            <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Image</th>
        <th>Mobile</th>
        <th>Attendence</th>

            </tr>
        </thead>
        <tbody>
        {this.state.SemesterStudent.map((student, index) => (

        <tr key={student.id} >
            <td>{student.it}</td>
            <td>{student.name}</td>
            <td> <img style={{width:"60px"}} src={`http://localhost/OARS/storage/app/public/uploads/${student.image}`} alt={student.name} /></td>
            <td>{student.phone}</td>
            <td>
              <>
              <input  type="radio" aria-label="Radio button for following text input"
               name={student.it} id="fileupload"   value="P" defaultChecked={student.attend=='P'}/>P
              <input   type="radio" aria-label="Radio button for following text input"
                 name={student.it} id="fileupload"  value="A" defaultChecked={student.attend=='A'}/>A

           </>
           </td>

            </tr>
        ))}

                </tbody>
        </table>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
        )}


         </div>
        </div>
        </div>
        </Card.Body>
        </Card>
        </div>
    </>
        );
    }
}

export default AttendanceUpdate;
