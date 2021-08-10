import React from 'react';
import {SaveAddMark,IndividualCtMark } from '../Services/AttendanceService';
import { Form, Button, Card, Pagination} from 'react-bootstrap';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
class IndividualDetailsCT  extends React.Component{
    state={
        SemesterCTdata:[],
        CTmark:[],
      ccode:this.props.match.params.ccode,
      session:this.props.match.params.session,
      ctnum:this.props.match.params.ctnum,
      errors:'',
      it:'',
      ctmarks:'',

    }
    componentDidMount() {

        this.CtDetails();
    }

   CtDetails=async()=>{
    const getLoginData = localStorage.getItem("LoginData");
    const data1 = JSON.parse(getLoginData);
    const Teacheremail = data1.user.email;

      const result= await IndividualCtMark(this.props.match.params.session,this.props.match.params.ccode,Teacheremail,this.state.ctnum);
      this.setState({ CTmark:result.data});
      console.log('ct mark',this.state.CTmark);
   }
   onclickInput=(e)=>{
       this.setState({ [e.target.name]:e.target.value  });
       console.log(this.state.it+this.state.marks);
   }
   formSubmit=async(e)=>{
    e.preventDefault();
  //  alert(this.state.it+this.state.marks);
    const {history}=this.props;
    const getLoginData = localStorage.getItem("LoginData");
    const data1 = JSON.parse(getLoginData);
    const email = data1.user.email;
    const postBody={
       it:this.state.it,
       session:this.state.session,
       ccode:this.state.ccode,
       ctname:this.state.ctnum,
       ctmarks:this.state.ctmarks,
       email:email,

    }
    const response = await SaveAddMark(postBody);

    if(response.success){

        this.setState({ ctmark:'',ctname:'',errors:''  });
        toast.info('Data Added Successfully')
        const {history}=this.props;
       // history.push(`${PUBLIC_URL}allinformation`);
       $(".modal").modal('hide');
       this.CtDetails();
    // this.AddCtMarkByCcode();


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
   EditCtMark=async($it)=>{
alert($it);
   }
    render(){
        return(
            <>
              <ToastContainer/>
            <div class="containerCustom">
            <div class="topMargin">
            <div class="row">
               <div class="col-md-12">
                   <div class="takenclasss">
                     <h3 class="heading">Session::{this.state.session}<br></br>
                     <span>Course Code::{this.state.ccode}</span><br></br>
                        <span>Marks Of CT:{this.state.ctnum}</span>
                        </h3>
                          <div class="row">
                              <div class="col-md-12">
                          {this.state.CTmark!=0 &&(
    <table class="table table-striped">
        <thead>
            <tr>
                <th>IT</th>
                <th>Marks</th>
                <th>Edit</th>

            </tr>
        </thead>
        <tbody>
            {this.state.CTmark.map((row,index)=>(
            <>
           <tr>
                <td>{row.It}</td>
                <td>{row.marks}</td>
                <td>
  {/* details ct start */}
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#myModal${row.It}`}>
  Edit
</button>

{/* <!-- The Modal --> */}
<div class="modal" id={`myModal${row.It}`}>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">

      {/* <!-- Modal Header --> */}
      <div class="modal-header">
        <h4 class="modal-title">CT No.:{row.ctname}</h4><br></br>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      {/* <!-- Modal body --> */}
      <div class="modal-body">
      <form action="" method="post" onSubmit={this.formSubmit}>
      <div class="form-group">
      <label for="email">New CT Mark:</label><br></br>
  <label for="email">IT:{row.It}</label>
    <input type="text" class="form-control" id="email" name="it" onChange={(e)=>this.onclickInput(e)} value={this.state.it} placeholder={row.It}/>
    {this.state.errors && this.state.errors.it && (
                                <p class="text-danger">{this.state.errors.it[0]}</p>
                            )}
  </div>
  <div class="form-group">
  <label for="email">Add New Mark</label><br></br>
    <input type="text" class="form-control" name="ctmarks" onChange={(e)=>this.onclickInput(e)} value={this.state.marks}/>
    {this.state.errors && this.state.errors.ctmarks && (
                                <p class="text-danger">{this.state.errors.ctmarks[0]}</p>
                            )}
  </div>


  <button type="submit" class="btn btn-success">Add</button>
</form>

      </div>

      {/* <!-- Modal footer --> */}
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>

                                 {/* details ct end */}

                </td>
            </tr>
            </>
             ))}

        </tbody>
    </table>
)}
                          </div>
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
export default withRouter(IndividualDetailsCT);
