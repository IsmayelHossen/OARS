import React from 'react';
import {SemesterCtMark,GetCountCTMark } from '../Services/AttendanceService';
import { Form, Button, Card, Pagination} from 'react-bootstrap';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
import ViewAttendanceResult from './ViewAttendanceResult';
class DetailsCT  extends React.Component{
    state={
        SemesterCTdata:[],
        CTmarkcount:[],
      ccode:this.props.match.params.ccode,
      session:this.props.match.params.session,
      errors:'',
      ct:'',
      it:'',
      ctcount:'0',

    }
    componentDidMount() {
        this.getSemesterCtMark();
    }
    getSemesterCtMark=async()=>{
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const Teacheremail = data1.user.email;
        const getCtmark= await SemesterCtMark(this.props.match.params.session,this.props.match.params.ccode,Teacheremail);
        this.setState({ SemesterCTdata:getCtmark.data});
         console.log('ct',this.state.SemesterCTdata);

   }
   CTRedirectToDetails=async($ctnum)=>{

    window.location.href =`${PUBLIC_URL}individualDetailsCt/${this.state.session}/${this.state.ccode}/${$ctnum}`;


   }
   onclickInput=(e)=>{
    this.setState({ [e.target.name]:e.target.value  });
   // alert(this.state.ctcount);
    console.log(this.state.it+this.state.marks);
}
   formSubmit=async(e)=>{
    e.preventDefault();
   //alert(this.state.ctcount);
    const {history}=this.props;
    const getLoginData = localStorage.getItem("LoginData");
    const data1 = JSON.parse(getLoginData);
    const email = data1.user.email;
    if(this.state.ctcount==0){
        toast.error('Select Number Of CT Number');

    }
    else{
        const response = await GetCountCTMark(this.state.session,this.state.ccode,this.state.ctcount,email);

        if(response.success){

            this.setState({CTmarkcount:response.data  });
         //   toast.info('Data Found')
            const {history}=this.props;
            }
        else {
            console.log("response.errors", response.errors);
            this.setState({
                errors: response.errors,
               // isLoading: false,
                errormessage: response.message,
            });
        }

    }

}
    render(){
        let i=0;
        let randNum=1;
        return(
            <>
              <ToastContainer/>
            <div class="containerCustom">
            <div class="topMargin">
            <div class="row">
               <div class="col-md-12">
                   <div class="takenclasss">
                        <h3 class="heading">Session:{this.props.match.params.session}<br></br>
                        Course Code:{this.props.match.params.ccode}
                        </h3>

                          <div class="row">
                              {this.state.SemesterCTdata.map((row,index)=>(


                              <div class="col-md-4">
                                  {/* <!-- Button to Open the Modal --> */}

                                  <div class="AllInfo_course">
                                  <h3>CT:{row.ctname}</h3>

                                 <button class="btn btn-success" onClick={()=>this.CTRedirectToDetails(row.ctname)} >See Details</button>
                              </div>
                              </div>
                              ))};

                              </div>
{this.state.SemesterCTdata.length==0 &&(
<h4 style={{color:'red'}}>No ct marks available</h4>
)}
                              <form action="" method="post" onSubmit={this.formSubmit}>
                              <div class="form-group">
 <label for="email">Count number Of best CT marks and get attendance result also:</label>
  <select class="form-control" id="sel1"  name="ctcount" onChange={(e)=>this.onclickInput(e)}>
    <option value="">Select</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
  </select>
   {/* {this.state.errors && this.state.errors.it && (
                                <p class="text-danger">{this.state.errors.it[0]}</p>
                            )} */}
</div>



  <button type="submit" class="btn btn-success">Search</button>
</form>

<table class="table table-striped">
{this.state.CTmarkcount !=0 &&(
    <thead>
        <tr>
            <th>IT</th>

            <th>Details</th>
        </tr>
    </thead>
)}
    <tbody>
      {this.state.CTmarkcount.map((row1,index)=>(
            <>
            {/* best ct count number function */}
            <h3 style={{display:''}}>

            </h3>
            <tr>
            <td>{row1.It}</td>

            <td><ViewAttendanceResult random={randNum++} it={row1.It} bestCt={this.state.ctcount} courseCode={this.state.ccode}/></td>
           </tr>
            </>
             ))}


    </tbody>
</table>
                              </div>
                              </div>
                              </div>


</div>
  </div>




            </>


        );
    }
}
export default withRouter(DetailsCT);
