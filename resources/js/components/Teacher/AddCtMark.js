import React from 'react';
import { GetStudentCTMarkByCode,AllinformationGet1,SaveAddMark } from '../Services/AttendanceService';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
import ViewAttendanceResult from './ViewAttendanceResult';
class AddCtMark  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            it:this.props.match.params.it,
            session:this.props.match.params.session,
            ccode:this.props.match.params.ccode,
            ctname:"",
            ctmark:"",
            status:'',
            EditSemCourseId:this.props.match.params.editSemCourseId,
            errors:"",
            errormessage:"",
            isLoading:true,
            editData:[],
            searchWcode:'',
            SearchByCourseCode:[],
            getallInfo:[],
            searchProject:[],
         CTMarkResult:[],

        }


    }
    componentDidMount() {

        this.AddCtMarkByCcode();
     //   this.ResultOfAttendance();

    }

    changeInput=(e)=>{
        this.setState({ [e.target.name]:e.target.value });
    }
    formSubmit=async(e)=>{
        e.preventDefault();
        const {history}=this.props;
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const email = data1.user.email;
        const postBody={
           it:this.state.it,
           session:this.state.session,
           ccode:this.state.ccode,
           ctname:this.state.ctname,
           ctmark:this.state.ctmark,
           email:email,

        }
        const response = await SaveAddMark(postBody);
         if(response.checkedCT){

        toast.error('CT'+'- '+this.state.ctname+' '+'mark already Added');
        this.setState({ errors:''  });
         }
       else if(response.success){

            this.setState({ ctmark:'',ctname:'',errors:''  });
            toast.info('Data Added Successfully')
            const {history}=this.props;
           // history.push(`${PUBLIC_URL}allinformation`);

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
    AddCtMarkByCcode=async()=>{
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const email = data1.user.email;
           const reponse= await GetStudentCTMarkByCode(this.state.session,this.state.ccode,email)
           if(reponse.success){
            this.setState({ SearchByCourseCode:reponse.data,searchProject:reponse.data
            ,
            errors:''
            });


        }

        }

    AddMarkFun=async(it,session,ccode)=>{
        const {history}=this.props;
      //  history.push(`${PUBLIC_URL}Addctmark/${it}/${session}/${ccode}`);
        window.location.href=(`${PUBLIC_URL}Addctmark/${it}/${session}/${ccode}`);
        this.AddCtMarkByCcode();
    }
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

            this.AddCtMarkByCcode();

        }
    }
    OncompleteAddCtMark=()=>{
        this.AddCtMarkByCcode();
    }
    cTmarkResult=(ctresult)=>{
        this.setState({ CTMarkResult:ctresult  });
        console.log('in AddCTmark',)
    }
    //end search functionality
    render() {
        let randNum=1;
        return (
            <>
            <ToastContainer  />
            <div class="containerCustom takenclasss">
            <div class="topMargin">

                   <br></br>
                   <div class="addSemesterCourseForm ">
        <h3>Add Class Test Mark</h3>

                            <form onSubmit={this.formSubmit} >

                        <div class="row">
                            <div class="col-md-6">
                            <div class="form-group">
            <label for="exampleFormControlSelect1">ID </label>
            <input type="text" class="form-control" id="it" placeholder="Enter it" name="it"
                value={this.state.it} readOnly ></input>
                  </div>
                            </div>
                            <div class="col-md-6">
                            <div class="form-group">
            <label for="exampleFormControlSelect1">Session </label>
            <input type="text" class="form-control" id="it" placeholder="Enter session" name="session"
                value={this.state.session} readOnly ></input>
        </div>
         </div>
      </div>

   <div class="row">
       <div class="col-md-6">
       <div class="form-group">
            <label for="exampleFormControlSelect1">Course Code </label>
            <input type="text" class="form-control" id="ccode" placeholder="Enter ccode" name="ccode"
                value={this.state.ccode} readOnly ></input>
        </div>
       </div>
       <div class="col-md-6">
       <div class="form-group">
            <label for="password">Mark</label>
            <input type="number" class="form-control" id="password" placeholder="Enter Mark" name="ctmark"
            value={this.state.ctmark} onChange={(e) => {this.setState({ ctmark:e.target.value  })}}></input>
            {this.state.errors && this.state.errors.ctmark && (
                <p class="text-danger">{this.state.errors.ctmark[0]}</p>
            )}
        </div>
       </div>
   </div>


                            <div class="form-group">
            <label for="exampleFormControlSelect1">Select CT No. </label>
            <select class="form-control" id="exampleFormControlSelect1" name="ctname"
                onChange={(e) => this.changeInput(e)}>
                    <option value="">Select</option>
                    <option value="1">CT-1</option>
                    <option value="2">CT-2</option>
                    <option value="3">CT-3</option>
                    <option value="4">CT-4</option>
                    <option value="5">CT-5</option>




            </select>
            {this.state.errors && this.state.errors.ctname && (
                <p class="text-danger">{this.state.errors.ctname[0]}</p>
            )}
        </div>







<button type="submit" class="btn btn-success btn-block" >Add</button>

</form>
</div>

            <div class="row">
               <div class="col-md-12">
                   <div class="takenclasss" style={{marginTop:'.5em'}}>




{/* form search end */}

{/* //specific searcg start */}

<form style={{marginBottom: ".7em",paddingLeft:"10px"}}>
                  Search: <input type="text" class="search" onChange={(e)=>this.onSearch(e)}>

                                  </input>
                    </form>
                              {  this.state.SearchByCourseCode !=0 && this.state.searchProject.length === 0 && (
                     <span class=" alert-warning" style={{padding:".2em .5em",
                        marginLeft:"4.5em"}}>
                        No result found!
                     </span>
                         )}

     {/* //specific searc */}
                      {/* <p style={{marginBottom: ".1em",paddingLeft:"10px"}}>Total Result:{this.state.AttendanceResult.length}</p> */}


               <div class="table-responsive max_tableHeight">

                       <table class="table table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>ID</th>
        <th>Session</th>
        <th>Course Code</th>
        <th>Add CT Mark</th>
        <th>View</th>
      </tr>
    </thead>
    <tbody>
    {this.state.searchProject.map((row,index)=>(
      <tr>
        <td>{row.name}</td>
    <td>{row.it}</td>
    <td>{row.session}</td>
    <td>{row.course_code}</td>
    <td><button class="btn btn-primary" onClick={()=>this.AddMarkFun(row.it,row.session,row.course_code)}>Add</button></td>
    <td><ViewAttendanceResult ctmarkResult={this.cTmarkResult} random={randNum++} it={row.it} courseCode={row.course_code} OncompleteAddCtMark={this.OncompleteAddCtMark}/></td>
      </tr>
    ))}

    </tbody>
  </table>
  {/* <Pagination1 totalpage={this.state.SearchByCourseCode.length} perpage="5"  paginate={this.paginate}/> */}
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

export default withRouter(AddCtMark) ;
