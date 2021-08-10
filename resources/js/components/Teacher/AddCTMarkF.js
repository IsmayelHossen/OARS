import React from 'react';
import {SemesterAllStudent,SaveCtMark } from '../Services/AttendanceService';
import { Form, Button, Card, Pagination} from 'react-bootstrap';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
class AddCTMarkF  extends React.Component{
    state={
        SemesterStudent:[],
      ccode:this.props.match.params.ccode,
      session:this.props.match.params.session,
      errors:'',
      ct:'',
    }
    componentDidMount() {
        this.getSemesterAllStudent();
    }
    getSemesterAllStudent=async()=>{

        const getSemesterStudent= await SemesterAllStudent(this.props.match.params.session);
        this.setState({ SemesterStudent:getSemesterStudent.data});
         console.log('student',this.state.SemesterStudent);

   }
   changeInput=(e)=>{
    this.setState({
        [e.target.name]: e.target.value

    });
    console.log('value',e.target.value);
}

submitform = async (event) => {
    event.preventDefault();
    this.setState({ validated:true  });
    const {history}=this.props;
    const xyz = $("#attendence").serializeArray();
    console.log('serial3333333333',xyz)

   const getLoginData = localStorage.getItem("LoginData");
    const data1 = JSON.parse(getLoginData);
    const Teacheremail = data1.user.email;
     this.setState({ teacheremail:Teacheremail  });

   //  check if any roll is missing start
            // $(":text").each(function(){
            //     name=$(this).attr('name');
            //     if(!$(':text[name="' +name + '"]:checked').length){
            //   // alert(name+"  Roll Missing");
            //     toast("Please Add "+name+" "+"CT Mark");
            //     roll=false;
            //     }
            //   });

//check if any roll is missing end
     if(!this.state.ct){
       // this.state.SemesterStudent.length !=xyz.length
        var total=this.state.SemesterStudent.length;
        var taken=xyz.length;
     // toast(" CT Mark Added "+" "+taken+" "+" From  "+" "+total+" "+"Students ");
     toast('Please select CT No. which you want to add  mark');
        console.log('serial',xyz.length);
        console.log('serial',this.state.SemesterStudent.length);
        console.log('form data',xyz);


     }
    //  else if(this.state.SemesterStudent.length !=xyz.length){
    //      var total=this.state.SemesterStudent.length;
    //      var taken=xyz.length;
    //     toast(" Attendance Taken "+" "+taken+" "+" From  "+" "+total+" "+"Students ");
    //  }

      else{
       //here call the SaveAttendance method from Services AttendanceService
        const response = await SaveCtMark(Teacheremail,this.state.session,this.state.ccode,this.state.ct,xyz);



  if (response.success) {
      this.setState({

          isLoading: false,
      });
      console.log('back data',response.data);
      toast('CT Mark Added Successfully');
      Swal.fire({

        icon: 'success',
        title: 'CT Mark Added Successfully',
        showConfirmButton:true,
        //timer: 1500
      })
      localStorage.removeItem("CCode");
    //  history.push(`${PUBLIC_URL}addCtMarkF/${session}/${ccode}`);
  }
  else if(response.checkct){

    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ct Mark Already Added!',

      })


  //  history.push(`${PUBLIC_URL}addCtMarkF/${session}/${ccode}`);
   // localStorage.removeItem("CCode");
console.log('data back',success.data);
  }
  else{
      toast('unable to save');
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
    render(){
        return(
            <>
              <ToastContainer/>
            <div class="containerCustom">
            <div class="topMargin">
            <h3>Add CT Mark</h3>
            <h4><strong style={{color:"#d26161",paddingLeft:"10px"}}>Session:{this.state.session}</strong></h4>
            <h4><strong style={{color:"#41aa6f",paddingLeft:"10px"}}>Course Code:{this.state.ccode}</strong></h4>
            <div class="row">
                        <div class="col-md-12">

                     <div class="table-responsive max_tableHeight">


                    {this.state.SemesterStudent !=0  &&(
                <Form className="" method="post" onSubmit={this.submitform}  id="attendence">
                     <div class="form-group">
  <label for="sel1">Select CT No.:</label>
  <select class="form-control" id="sel1" name="ct" value={this.state.ct} onChange={(e)=>this.changeInput(e)} >
  <option value="">Select</option>
    <option value="1">Ct-1</option>
    <option value="2">Ct-2</option>
    <option value="3">Ct-3</option>
    <option value="4">Ct-4</option>
  </select>
</div>
                <table class="table table-striped ">
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Mark</th>


                </tr>
            </thead>
            <tbody>
  {this.state.SemesterStudent.map((student, index) => (

    <tr key={student.id} >
      <td>{student.it}</td>
      <td>{student.name}</td>
      <td> <img style={{width:"60px"}} src={`${PUBLIC_URL}storage/app/public/uploads/${student.image}`} alt={student.name} /></td>
     {/* <input type="hidden" name={student.it} value={student.it}></input> */}
      <td><input type="text" name={student.it} ></input></td>
      {/* <td><input type="text" name={student.it} onChange={(e)=>this.changeInput(e)}  ></input></td>
      <td><input type="text" name={student.it} onChange={(e)=>this.changeInput(e)} ></input></td>
      <td><input type="text"name={student.it} onChange={(e)=>this.changeInput(e)}  ></input></td> */}


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

                </div>
            </div>


            </>


        );
    }
}
export default withRouter(AddCTMarkF);
