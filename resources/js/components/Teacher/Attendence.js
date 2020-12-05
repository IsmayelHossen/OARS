import React from 'react';
import { getSemesterInfo, SaveAttendance, SemesterAllStudent } from '../Services/AttendanceService';
import { Form, Button, Card, Pagination} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CourseCode from './CourseCode';
import Swal from 'sweetalert2';
import Pagination1 from './Pagination1';
class Attendance extends React.Component {

        state = {
            SemesterStudent:[],
            TotalSemesterStu:[],
            session:this.props.match.params.session,
            attend:[],
            teacheremail:'',
            CCode:'123',
            semester:'',
            TakenDate:new Date().toLocaleDateString(),
            semesterinfo1:[],
            semesterinfo2:{},
            searchProject:[],
            IndexOfFirst:'0',
            IndexOfLast:'3',
            checked1:false,

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
         this.setState({ SemesterStudent:getSemesterStudent.data , searchProject:getSemesterStudent.data ,TotalSemesterStu:getSemesterStudent.data});
          console.log('object');

    }


    submitform = async (event) => {
        event.preventDefault();
        this.setState({ validated:true  });
        const {history}=this.props;
        const course=localStorage.getItem("CCode");
        console.log("ok done 123 ok",course);

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
        console.log('serial',xyz)
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
         const Usemester =localStorage.getItem('setSemester');
         console.log('unique semester',Usemester);
         if(!Coursecode){
            toast("Course Code Missing");
            console.log('serial',xyz.length)
            console.log('serial',this.state.SemesterStudent.length)
         }
         else if(this.state.SemesterStudent.length !=xyz.length){
             var total=this.state.SemesterStudent.length;
             var taken=xyz.length;
            toast(" Attendance Taken "+" "+taken+" "+" From  "+" "+total+" "+"Students ");
         }

         else{
           //here call the SaveAttendance method from Services AttendanceService
            const response = await SaveAttendance(Teacheremail,this.state.session,Coursecode,Usemester,xyz);



      if (response.success) {
          this.setState({

              isLoading: false,
          });
          toast('Attendance Taken Successfully');
          Swal.fire({

            icon: 'success',
            title: 'Attendance Taken Successfully',
            showConfirmButton:true,
            //timer: 1500
          })
          localStorage.removeItem("CCode");
          history.push(`/OARS/takenclasses/${Coursecode}`);
      }
      else if(response.checkdate){

        const Coursecode=localStorage.getItem("CCode");

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Attendance Already Taken!',

          })


        history.push(`/OARS/takenclasses/${Coursecode}`);
        localStorage.removeItem("CCode");

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

         // search functionality
    onSearch=(e)=>{
        const search=e.target.value;
       // console.log('search',search);
        this.setState({


            isLoading:true,
        });
        if(search.length>0){
            const searchData = this.state.searchProject.filter(function (item) {
                const itemData = item.name + " " + item.it+" "+item.phone;
                const textData = search.trim().toLowerCase();
                return itemData.trim().toLowerCase().indexOf(textData) !== -1;
            });
            this.setState({

                searchProject: searchData,
                search:search,
                isLoading: false,
            });
        }
        else{

            //here call this method when search result length is empty

            this.getSemesterAllStudent();

        }
    }
    //end search functionality
//pagination
paginate=(pageNum)=>{
    alert(pageNum);
    const currentPage=pageNum;
    const PostPerPage=3;
    const IndexOfLast=currentPage*PostPerPage;
    const IndexOfFirst=IndexOfLast-PostPerPage;
    this.setState({ IndexOfLast:IndexOfLast,IndexOfFirst:IndexOfFirst  });
}
//check ALl
 CheckAll (){
    this.setState({checked1:!this.state.checked1});
    alert(this.state.checked1);

}
    render() {
        return (
            <>
            <ToastContainer/>
            <div class="containerCustom">
            <div class="topMargin">
                <Card >
                <Card.Body class="takenclasss">
                <h3 className="text-center heading">Attendance Sheet( {this.state.semesterinfo1.slice(0,1).map((student123, index) => (
           <>batch:{student123.batch}</> ))})</h3>
                <div class="row">

                            <div class="col-md-6">
                            {this.state.semesterinfo1.slice(0,1).map((student123, index) => (
                                <>
                 <Card.Subtitle class="mb-1 "><strong style={{color:"#d26161",paddingLeft:"10px"}}>Semester:{student123.semester}</strong></Card.Subtitle>
                 <Card.Subtitle class="mb-1  "><strong style={{color:"#456",paddingLeft:"10px"}}>Session:{this.state.session}</strong></Card.Subtitle>
                 <Card.Subtitle class="mb-1  "><strong style={{color:"#41aa6f",paddingLeft:"10px"}}>Today Date:{new Date().toLocaleDateString()}</strong></Card.Subtitle>
                    {
                        localStorage.setItem('setSemester',student123.semester)
                    }
                 </>
                 ))}
                            </div>



                    <div class="col-md-6">
                        <div class="float-right clearfix">
                       <CourseCode coursecodedata={this.state.semesterinfo1}
                                 onCompleteCourseCode={this.onCompleteCourseCode}
                                />
                         </div>
                    </div>
                  </div>
                        <div class="row">
                          <div class="col-md-12">
                          <h5 style={{paddingLeft:"10px",color:"#497141"}}>
                        Total Student:{" "}
                      <span class="badge badge-secondary">{this.state.searchProject.length}</span>

                     </h5>
                    <form style={{marginBottom: ".7em",paddingLeft:"10px"}}>
                  Search: <input type="text" class="search" onChange={(e)=>this.onSearch(e)}>

                                  </input>
                    </form>
                              {  this.state.SemesterStudent !=0 && this.state.searchProject.length === 0 && (
                     <span class=" alert-warning" style={{padding:".2em .5em",
                        marginLeft:"4.5em"}}>
                        No result found!
                     </span>
                         )}
                         <button class="btn btn-success btn-sm float-right clearfix" onClick={()=>this.CheckAll()}> Check All</button>
                          </div>
                      </div>
                    <div class="row">
                        <div class="col-md-12">

                     <div class="table-responsive max_tableHeight">


                    {this.state.SemesterStudent !=0  &&(
                <Form className="" method="post" onSubmit={this.submitform}  id="attendence">
                <table class="table table-striped ">
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
  {this.state.searchProject.map((student, index) => (

    <tr key={student.id} >
      <td>{student.it}</td>
      <td>{student.name}</td>
      <td> <img style={{width:"60px"}} src={`http://localhost/OARS/storage/app/public/uploads/${student.image}`} alt={student.name} /></td>
      <td>{student.phone}</td>
      <td>
              <>
              <input  type="radio" aria-label="Radio button for following text input"
               name={student.it} id="fileupload"  value="P" />P
              <input   type="radio" aria-label="Radio button for following text input"
                 name={student.it} id="fileupload"  value="A"  />A

           </>
           </td>

    </tr>
))}

  </tbody>

</table>


  <Button className="submitbutton" variant="primary" type="submit">
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
</div>
            </>
        );
    }
}

export default Attendance;
