import React from "react";
//since routine is same that's why use Admin panel service
import { GetRoutineResult,GetRoutineCcode ,getSemesterCodeIndivi,getSemesterCodeTitle,SaveSemesterRoutinefromTacher,deleteSpecificRoutine} from "../Services/Admin/AdminServices";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
class TeacherRoutine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            IndividualRoutine: [] ,
            getccode:[],
            SemesterCode:[],
            SemesterCodeTitle:[],
            email:"",
            batch:"",
            semester:"",
            session:"",
            courseCode:"",
            errors:"",
            errormessage:"",
            isLoading:true,
            labtheory:'',
            cname:'',
            day:'',
            lecture:'',
            ampm:'',
            time:'',
        };
        this.user = window.user;
    }
    componentDidMount() {
        this.GetRoutine();
        this.GetCode();
    }
    GetCode=async()=>{
        const response = await GetRoutineCcode(this.user.email);
        if (response.success) {
            this.setState({getccode: response.data });
            console.log('getcode',response.data);
        }
    }

    GetRoutine = async() => {
        const response = await GetRoutineResult(this.user.email);
        if (response.success) {
            this.setState({ IndividualRoutine: response.data });
            console.log('rutine',response.data);
        }
        console.log("routine", this.state.IndividualRoutine);
        console.log("email", this.user.email);
    };
    changeInput=(e)=>{
        this.setState({ [e.target.name]:e.target.value });
    }
    changeInputGetCcode=async(e)=>{
        this.setState({ semester:e.target.value  });
        const abc=e.target.value;
        if(abc==0){
            toast.error('field must not be empty');
        }
        else{
            const result= await getSemesterCodeIndivi(this.user.email,abc);
            if(result.success){
                this.setState({ SemesterCode:result.data,  });
              console.log('ki',result.data);
            }

        }


    //   console.log('semsester',this.state.semester);
       // alert(this.state.semester);
    }
    changeInputGetCtitle=async(e)=>{
        this.setState({ courseCode:e.target.value  });

        const ccode=e.target.value;
        if(ccode==0){
            toast.error(' Course code field must not be empty');
        }
        else{
            const result= await getSemesterCodeTitle(ccode);
            if(result.success){
                this.setState({ SemesterCodeTitle:result.data,  });
              console.log('course title',result.data);
            }

        }

    }
    formSubmit=async(e)=>{
        e.preventDefault();
        const {history}=this.props;
        const postBody={
           email:this.user.email,
           day:this.state.day,
           semester:this.state.semester,
           session:this.state.session,
           courseCode:this.state.courseCode,
           cname:this.state.SemesterCodeTitle.ctitle,
           time:this.state.time,
           ampm:this.state.ampm,
           lecture:this.state.lecture,


        }
        const response = await SaveSemesterRoutinefromTacher(postBody);

        if(response.success){
            this.setState({
                email:"",
                batch:"",
                semester:"",
                session:"",
                courseCode:"",
                errors:"",
                errormessage:"",
                isLoading:true,
                labtheory:'',
                cname:'',
                day:'',
                lecture:'',
                ampm:'',
                time:'',
            });

            this.GetRoutine();
            toast('Data Inserted Successfully')
            $('#exampleModal').modal('hide');


            }
            else if(response.checkedData){
                this.setState({
                      errors:"",
                errormessage:"", });
                toast('Already Data Exists!')

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

    DeleteRoutine=(email,day)=>{
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
                //   this.props.submitUser(this.state)

            //     const getLoginData = localStorage.getItem("LoginData");
            //   const data1 = JSON.parse(getLoginData);
            //   const email = data1.user.email;
              const response = await deleteSpecificRoutine(email,day);
              if(response.success){
                  toast('Routine Deleted Successfully');
                  this.GetRoutine();

              }
                //console.log(ccode ,takendate);

                }
            })
       }
    render() {
        // for print Tabel th once
        let i=1;
        let i1=1;
        let i2=1;
        let i3=1;
        let i4=1;
        let i5=1;
        let i6=1;
        let i7=1;
        let i8=1;
        let i9=1;
        return (
            <>
            <ToastContainer/>
            <div class="containerCustom">
                 <div class="topMargin">
             <div class="wrapper">
     <div id="content">
         <div class="row">
             <div class="col">
             <h3 class="btn btn-primary">Semester Routine</h3>
             </div>
             <div class="col">
             <button type="button" class=" btn btn-success  clearfix"   style={{marginRight:"5px"}} data-toggle="modal" data-target="#exampleModal">
  Add
</button>

{/* modal start */}
<div class="modal fade"   id="exampleModal"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Routine</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      <div class="addSemesterCourseForm">
                            <h3>Add Routine</h3>

                            <form onSubmit={this.formSubmit} >
        <div class="form-group">
            <label for="password">Day</label>
            <select class="form-control" id="exampleFormControlSelect1" name="day"
                onChange={(e) => this.changeInput(e)}>
                    <option value="">Select</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>

            </select>
            {this.state.errors && this.state.errors.day && (
                <p class="text-danger">{this.state.errors.day[0]}</p>
            )}
        </div>
        <div class="form-group">
            <label for="password">Semester</label>
            <select class="form-control" id="exampleFormControlSelect1" name="semester"
                onChange={(e) => this.changeInputGetCcode(e)}>
                    <option value="">Select</option>
                    {this.state.getccode !=null && this.state.getccode.map((row,index)=>(
                    <option value={row.semester}>{row.semester}</option>
                    ))}
            </select>
            {this.state.errors && this.state.errors.semester && (
                <p class="text-danger">{this.state.errors.semester[0]}</p>
            )}
        </div>

        <div class="form-group">
            <label for="password">Course Code </label>
            <select class="form-control" id="exampleFormControlSelect1" name="courseCode"
                onChange={(e) => this.changeInputGetCtitle(e)}>
                    <option value="">Select</option>

                  {this.state.SemesterCode !=null && this.state.SemesterCode.map((row,index)=>(
                    <option value={row.course_code}>{row.course_code}</option>
                    ))}

            </select>
            {this.state.errors && this.state.errors.courseCode && (
                <p class="text-danger">{this.state.errors.courseCode[0]}</p>
            )}
        </div>
        <div class="form-group">
            <label for="password">Course Name</label>
            <select class="form-control" id="exampleFormControlSelect1" name="cname"
                onChange={(e) => this.changeInput(e)}>
                    <option value="">Select</option>

                  {this.state.SemesterCodeTitle !=null && (
                    <option value={this.state.SemesterCodeTitle.ctitle}>{this.state.SemesterCodeTitle.ctitle}</option>
                    )}

            </select>
            {this.state.errors && this.state.errors.cname && (
                <p class="text-danger">{this.state.errors.cname[0]}</p>
            )}
        </div>

        <div class="form-group">
            <label for="email">Time</label>
            <input type="text" class="form-control" id="email" placeholder="Enter time" name="time"
                value={this.state.time} onChange={(e) => this.changeInput(e)} ></input>
            {this.state.errors && this.state.errors.time && (
                <p class="text-danger">{this.state.errors.time[0]}</p>
            )}
                </div>
                <div class="form-group">
            <label for="email">Am/Pm</label>
            <input type="text" class="form-control" id="email" placeholder="Write Am/Pm" name="ampm"
                value={this.state.ampm} onChange={(e) => this.changeInput(e)} ></input>
            {this.state.errors && this.state.errors.ampm && (
                <p class="text-danger">{this.state.errors.ampm[0]}</p>
            )}
                </div>
                <div class="form-group">
            <label for="email">Lecture</label>
            <input type="number" class="form-control" id="email" placeholder="Enter lecture Number" name="lecture"
                value={this.state.lecture} onChange={(e) => this.changeInput(e)} ></input>
            {this.state.errors && this.state.errors.lecture && (
                <p class="text-danger">{this.state.errors.lecture[0]}</p>
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
                 </div>
         </div>
                         <div class="table-responsive">
                         <table class="table table-hover">
                             <thead>
                               {/* <tr>
                                   <th>Day</th>

                                   <th>Edit</th>
                                   <th>Delete</th>



                               </tr> */}
                             </thead>
                             <tbody>
                             <tr>
                                 {this.state.IndividualRoutine.map((row,index)=>(
                                <>
                                  {row.day=='Saturday' &&(
                                   <>
                                   {i=='1' &&(
                                       <>
                                <th>{row.day}</th>
                                <span style={{display:'none'}}>{i++}</span>
                                </>
                                   )}

                                        <td>
                                            <p style={{color:'#208a71'}}>Lecture:{row.lecture}</p>
                                            Semester:{row.semester}<p>Course Code:{row.ccode}</p>
                                    <p>Course Title:{row.ctitle}</p>
                                    <p>Time:{row.time1}<span>{row.ampm}</span></p>
                                    </td>


                                  </>
                                   )}

                                </>
                                 ))}
                                 {/* for delete option need this specific code start */}
                                 {this.state.IndividualRoutine.map((row,index)=>(
                                     <>
                                       {row.day=='Saturday' &&(
                                           <>
                                          {(i5=='1' &&
                                        <td>
                                          <span style={{display:'none'}}>{i5++}</span>
                                       <button class="btn btn-danger" onClick={()=>this.DeleteRoutine(row.email,row.day)}>
                                           Delete
                                           </button>
                                             </td>
                                             )}

                                             </>
                                       )}
                                       </>
                                 ))}
                                  {/* for delete option need this specific code end */}
                                  </tr>
                                  <tr>
                                 {this.state.IndividualRoutine.map((row,index)=>(
                                <>

                                   {row.day=='Sunday' &&(
                                   <>
                                   {i1=='1' &&(
                                       <>
                                <th>{row.day}</th>
                                <span style={{display:'none'}}>{i1++}</span>
                                </>
                                   )}

                                        <td>
                                            <p>Lecture:{row.lecture}</p>
                                            Semester:{row.semester}<p>Course Code:{row.ccode}</p>
                                    <p>Course Title:{row.ctitle}</p>
                                    <p>Time:{row.time1}<span>{row.ampm}</span></p>
                                    </td>


                                  </>
                                   )}

                                </>
                                 ))}
                                     {/* for delete option need this specific code start */}
                                     {this.state.IndividualRoutine.map((row,index)=>(
                                     <>
                                       {row.day=='Sunday' &&(
                                           <>
                                          {(i6=='1' &&
                                        <td>
                                          <span style={{display:'none'}}>{i6++}</span>
                                          <button class="btn btn-danger" onClick={()=>this.DeleteRoutine(row.email,row.day)}>
                                           Delete
                                           </button>
                                             </td>
                                             )}

                                             </>
                                       )}
                                       </>
                                 ))}
                                  {/* for delete option need this specific code end */}
                                  </tr>
                                  <tr>
                                 {this.state.IndividualRoutine.map((row,index)=>(
                                <>

                                   {row.day=='Monday' &&(
                                   <>
                                   {i2=='1' &&(
                                       <>
                                <th>{row.day}</th>
                                <span style={{display:'none'}}>{i2++}</span>
                                </>
                                   )}

                                        <td>
                                            <p>Lecture:{row.lecture}</p>
                                            Semester:{row.semester}<p>Course Code:{row.ccode}</p>
                                    <p>Course Title:{row.ctitle}</p>
                                    <p>Time:{row.time1}<span>{row.ampm}</span></p>
                                    </td>


                                  </>
                                   )}
                                </>
                                 ))}
                                     {/* for delete option need this specific code start */}
                                     {this.state.IndividualRoutine.map((row,index)=>(
                                     <>
                                       {row.day=='Monday' &&(
                                           <>
                                          {(i7=='1' &&
                                        <td>
                                          <span style={{display:'none'}}>{i7++}</span>
                                          <button class="btn btn-danger" onClick={()=>this.DeleteRoutine(row.email,row.day)}>
                                           Delete
                                           </button>
                                             </td>
                                             )}

                                             </>
                                       )}
                                       </>
                                 ))}
                                  {/* for delete option need this specific code end */}
                                  </tr>
                                  <tr>
                                 {this.state.IndividualRoutine.map((row,index)=>(
                                <>

                                   {row.day=='Tuesday' &&(
                                   <>
                                   {i3=='1' &&(
                                       <>
                                <th>{row.day}</th>
                                <span style={{display:'none'}}>{i3++}</span>
                                </>
                                   )}

                                        <td>
                                            <p>Lecture:{row.lecture}</p>
                                            Semester:{row.semester}<p>Course Code:{row.ccode}</p>
                                    <p>Course Title:{row.ctitle}</p>
                                    <p>Time:{row.time1}<span>{row.ampm}</span></p>
                                    </td>


                                  </>
                                   )}
                                </>
                                 ))}
                                  {/* for delete option need this specific code start */}
                                  {this.state.IndividualRoutine.map((row,index)=>(
                                     <>
                                       {row.day=='Tuesday' &&(
                                           <>
                                          {(i9=='1' &&
                                        <td>
                                          <span style={{display:'none'}}>{i9++}</span>
                                          <button class="btn btn-danger" onClick={()=>this.DeleteRoutine(row.email,row.day)}>
                                           Delete
                                           </button>
                                             </td>
                                             )}

                                             </>
                                       )}
                                       </>
                                 ))}
                                  {/* for delete option need this specific code end */}
                                  </tr>
                                  <tr>
                                 {this.state.IndividualRoutine.map((row,index)=>(
                                <>

                                   {row.day=='Wednesday' &&(
                                   <>
                                   {i4=='1' &&(
                                       <>
                                <th>{row.day}</th>
                                <span style={{display:'none'}}>{i4++}</span>
                                </>
                                   )}

                                        <td>
                                            <p>Lecture:{row.lecture}</p>
                                            Semester:{row.semester}<p>Course Code:{row.ccode}</p>
                                    <p>Course Title:{row.ctitle}</p>
                                    <p>Time:{row.time1}<span>{row.ampm}</span></p>
                                    </td>


                                  </>
                                   )}
                                </>
                                 ))}
                                {/* for delete option need this specific code start */}
                                {this.state.IndividualRoutine.map((row,index)=>(
                                     <>
                                       {row.day=='Wednesday' &&(
                                           <>
                                          {(i8=='1' &&
                                        <td>
                                          <span style={{display:'none'}}>{i8++}</span>
                                          <button class="btn btn-danger" onClick={()=>this.DeleteRoutine(row.email,row.day)}>
                                           Delete
                                           </button>
                                             </td>
                                             )}

                                             </>
                                       )}
                                       </>
                                 ))}
                                  {/* for delete option need this specific code end */}
                                  </tr>




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

export default TeacherRoutine;
