import React from 'react';
import { AllSession, GetSemesterCourseTitleInfo,SearchSemesterWiseResult,deleteSpecificSemesterCoursetitle, GetSessionActiveData } from '../Services/Admin/AdminServices';
import SideBar from './SideBar';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
import { Editor } from '@tinymce/tinymce-react';
import GPA from './GPA';
class GetResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors:'',
            semester:'',
            session:'',
            courseTitle:[],
            SessionGet:[],
            SemesterResult:[],
            errormessage:'',
            notfound:'',
          }
    }
    componentDidMount() {
         this.SemesterCourseTitleInfo();
         this.ResultSession();
    }
    sidebarMenu=()=>{

        $('#sidebar').fadeToggle();
    }
    ResultSession=async()=>{
        const result= await AllSession();
        if(result.success){
            this.setState({ SessionGet:result.data  });
            console.log('Session Get',this.state.SessionGet);
        }
    }
    changeInput=(e)=>{
        this.setState({ [e.target.name]:e.target.value });
    }
    formSubmit=async(e)=>{
        e.preventDefault();
        const {history}=this.props;
        // alert(this.state.session);
        // alert(this.state.semester);
        const response = await SearchSemesterWiseResult(this.state.session,this.state.semester);

        if(response.success){
            $('#exampleModal').modal('hide');

         this.setState({
              ccode:"",
              ctitle:"",

              credit:'',
              errors:"",
              errormessage:"",
              isLoading:true,
              SemesterResult:response.data,
              notfound:response.success

          });
          console.log('SemesterResult',this.state.SemesterResult);


            }
            else if(response.checkedData){
                this.setState({ errors:''  });

                toast.error('Already Data Exists!')


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
    SemesterCourseTitleInfo=async()=>{
          const response= await GetSemesterCourseTitleInfo();
          if(response.success){
            this.setState({ courseTitle:response.data  });
          }

    }
    PrintGradeSheet=(it,semester)=>{
        const {history}=this.props;
        history.push(`${PUBLIC_URL}printmarksheet/${it}/${semester}`);

    }
    render() {
        let i=1;
        return (
            <>
            <ToastContainer/>
              <div class="containerCustom">
                 <div class="topMargin ">
                <div class="wrapper">
                      <SideBar/>


                    <div id="content">

                            <div class="container-fluid">
                                <button onClick={()=>this.sidebarMenu()} type="button" id="sidebarCollapse" class="btn btn-info ">
                                <i class="fa fa-align-right"></i>  <span class="glyphicon glyphicon-align-right " aria-hidden="true">Toggle</span>
                                </button>

                            </div>



                        <br></br>
                        {/* modal start */}

                <button type="button" class=" btn btn-success float-right clearfix"   style={{marginRight:"5px"}} data-toggle="modal" data-target="#exampleModal">
  Get Semester Wise Result
</button>
<div class="modal fade"   id="exampleModal"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Grade Sheet Generate</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

                        <div class="addSemesterCourseForm">


                            <form onSubmit={this.formSubmit} >


                            <div class="form-group">
            <label for="exampleFormControlSelect1">Session </label>
            <select class="form-control" id="exampleFormControlSelect1" name="session"
                onChange={(e) => this.changeInput(e)}>
                    <option value="">Select</option>
                    {this.state.SessionGet !=null && this.state.SessionGet.map((row,index)=>(
               <option value={row.session}>{row.session}</option>
                ))}


            </select>
            {this.state.errors && this.state.errors.email && (
                <p class="text-danger">{this.state.errors.email[0]}</p>
            )}
        </div>


        <div class="form-group">
            <label for="password">Semester</label>
            <select class="form-control" id="exampleFormControlSelect1" name="semester"
                onChange={(e) => this.changeInput(e)}>
                    <option value="">Select</option>
                    <option value="1-1">1-1</option>
                    <option value="1-2">1-2</option>
                    <option value="2-1">2-1</option>
                    <option value="2-2">2-2</option>
                    <option value="3-1">3-1</option>
                    <option value="3-2">3-2</option>
                    <option value="4-1">4-1</option>
                    <option value="4-2">4-2</option>
            </select>
            {this.state.errors && this.state.errors.semester && (
                <p class="text-danger">{this.state.errors.semester[0]}</p>
            )}
        </div>



<button type="submit" class="btn btn-success btn-block" >Submit</button>
</form>
</div>

</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

      </div>
    </div>
</div>
</div>
  {/* modal end */}

<h3 style={{

textAlign:'center',
paddingBottom:'10px',
fontWeight:'700',
fontSize:'24px'
}}>Semester Wise Grade Sheet Result</h3>
{ this.state.notfound==true && this.state.SemesterResult.length==0 &&(
                               <h3 style={{color:'red'}}>No result found </h3>
                             )}
                         <div class="table-responsive">
                         <table class="table table-striped">
                             <thead>
                               <tr>
                                   <th>No</th>
                                   <th>IT</th>
                                   <th>Semester</th>
                                   <th>Session</th>
                                   <th>GPA</th>
                                   <th>Grade Sheet</th>




                               </tr>
                             </thead>
                             <tbody>

                                 {this.state.SemesterResult!=null && this.state.SemesterResult.map((row,index)=>(

                                  <tr>
                                      <td>{i++}</td>
                                <td>{row.it}</td>
                                <td>{row.semester}</td>
                                <td>{row.session}</td>
                                <td><GPA it={row.it} semester={row.semester}/></td>
                                <td><button class="btn btn-success" onClick={()=>this.PrintGradeSheet(row.it,row.semester)} >Grade Sheet</button></td>
                                  </tr>

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

export default withRouter(GetResult);
