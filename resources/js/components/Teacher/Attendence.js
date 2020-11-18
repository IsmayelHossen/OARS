import React from 'react';
import { getSemesterInfo, SaveAttendance, SemesterAllStudent } from '../Services/AttendanceService';
import { Form, Button, Card} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CourseCode from './CourseCode';
class Attendance extends React.Component {

        state = {
            SemesterStudent:[],
            SemesterStudent1:{},
            session:this.props.match.params.session,
            attend:[],
            teacheremail:'',
            CCode:'123',
            semester:'',
            TakenDate:new Date().toLocaleDateString(),
            semesterinfo1:[],
            semesterinfo2:{},

         }

    componentDidMount() {
        this.getSemesterAllStudent();
        this.semesterInfo();
        const yourDate = new Date().toLocaleDateString();

          console.log("my text", yourDate) ;;
    }
    semesterInfo=async()=>{
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const Teacheremail = data1.user.email;
        const getinfo=await getSemesterInfo(this.state.session,Teacheremail);
        this.setState({ semesterinfo1:getinfo.data,semesterinfo2:getinfo.data  });

        console.log("semesterInfo1",this.state.semesterinfo1);
        console.log("semesterInfo2",this.state.semesterinfo2);
    }

    getSemesterAllStudent=async()=>{

         const getSemesterStudent= await SemesterAllStudent(this.props.match.params.session);
         this.setState({ SemesterStudent:getSemesterStudent.data ,  });
          console.log('object');

    }


    submitform = async (event) => {
        event.preventDefault();
        this.setState({ validated:true  });
        const {history}=this.props;
        const course=localStorage.getItem("CCode");
        console.log("ok done 123 ok",course);

            var roll=true;
            $(":radio").each(function(){
                name=$(this).attr('name');
                if(roll && !$(':radio[name="' +name + '"]:checked').length){
               alert(name+"  Roll Missing");
               // toast(name+" "+"Roll missing!");
                roll=false;
                }
            });
           // return roll;

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
        const Coursecode=localStorage.getItem("CCode");
         this.setState({ teacheremail:Teacheremail  });
         if(!Coursecode){
            toast("Course Code Missing");
         }
         else{
            const response = await SaveAttendance(Teacheremail,this.state.session,Coursecode,xyz);



      if (response.success) {
          this.setState({

              isLoading: false,
          });
          localStorage.removeItem("CCode");
          //alert('attendance taken successfully');
           history.push('/OARS');
          console.log('response',response);


      }
      else if(response.checkdate){
        toast("You have already taken attendence");
      }
      else{
          console.log("response.errors", response.errors);
          this.setState({
              errors: response.errors,
              isLoading: false,
          });
      }
    }
        // Axios.post('/OARS/api/saveattendence', xyz)

        // .then(res => {
        //     console.log("data",res.data);



        // })
        }
        onCompleteCourseCode=async(courseCode)=>{


            const abc=courseCode;
             localStorage.setItem("CCode",abc);


        };

    render() {
        return (
            <>
            <ToastContainer/>

                <Card >
                <Card.Body className="">
                <Card.Title className="text-center">Attendance( {this.state.semesterinfo1.slice(0,1).map((student123, index) => (
           <>batch:{student123.batch}</> ))})</Card.Title>
                <div class="row">

                            <div class="col-md-6">
                            {this.state.semesterinfo1.slice(0,1).map((student123, index) => (
                                <>
                 <Card.Subtitle className="mb-2 text-muted">semester:{student123.semester}</Card.Subtitle>
                 <Card.Subtitle className="mb-2  text-muted">Session:{this.state.session}</Card.Subtitle>
                 <Card.Subtitle className="mb-2  text-muted">Today Date:{new Date().toLocaleDateString()}</Card.Subtitle>

                 </>
                 ))}
                            </div>



                    <div class="col-md-6">
                       <CourseCode coursecodedata={this.state.semesterinfo1}
                                 onCompleteCourseCode={this.onCompleteCourseCode}
                                />

                    </div>
                </div>

                    <div class="row  ">
                        <div class="col-md-12 attendance">


                <Card.Text>

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
              <input required type="radio" aria-label="Radio button for following text input"
               name={student.it} id="fileupload"  value="P"/>P
              <input  required type="radio" aria-label="Radio button for following text input"
                 name={student.it} id="fileupload"  value="A"/>A

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

                </Card.Text>

                </div>
                </div>
                </Card.Body>
                </Card>
            </>
        );
    }
}

export default Attendance;
