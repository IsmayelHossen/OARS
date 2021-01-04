import React from 'react';
import { GetRoutineResult} from '../Services/Admin/AdminServices';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
class TeacherRoutine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {IndividualRoutine:[]  }
        this.user = window.user;
    }
    componentDidMount() {
        this.GetRoutine();

    }

    GetRoutine=async()=>{
        const response=await GetRoutineResult(this.user.email);
        if(response.success){
            this.setState({ IndividualRoutine:response.data  });
        }
        console.log('routine',this.state.IndividualRoutine)
         console.log('email',this.user.email);
    }

    render() {
        let i=1;
        let i1=1;
        let i2=1;
        let i3=1;
        let i4=1;
        return (

           <>
              <div class="containerCustom">
              <div class="topMargin">
           <div class="row">
               <div class="col-md-12">
                   <div class="takenclasss">
                   <div class="table-responsive">
                         <table class="table table-bordered">
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


                                  </tr>
                                  <tr>
                                 {this.state.IndividualRoutine.map((row,index)=>(
                                <>

                                   {row.day=='Sunday' &&(
                                   <>
                                   {i1=='1' &&(
                                       <>
                                <th>{row.day}</th>
                                <span style={{display:'none'}}>{i++}</span>
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

                                  </tr>
                                  <tr>
                                 {this.state.IndividualRoutine.map((row,index)=>(
                                <>

                                   {row.day=='Monday' &&(
                                   <>
                                   {i2=='1' &&(
                                       <>
                                <th>{row.day}</th>
                                <span style={{display:'none'}}>{i++}</span>
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

                                  </tr>
                                  <tr>
                                 {this.state.IndividualRoutine.map((row,index)=>(
                                <>

                                   {row.day=='Tuesday' &&(
                                   <>
                                   {i3=='1' &&(
                                       <>
                                <th>{row.day}</th>
                                <span style={{display:'none'}}>{i++}</span>
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

                                  </tr>
                                  <tr>
                                 {this.state.IndividualRoutine.map((row,index)=>(
                                <>

                                   {row.day=='Wednesday' &&(
                                   <>
                                   {i4=='1' &&(
                                       <>
                                <th>{row.day}</th>
                                <span style={{display:'none'}}>{i++}</span>
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

                                  </tr>




                             </tbody>
                         </table>
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

export default TeacherRoutine;
