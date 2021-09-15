import React from 'react';
import {
    deleteSpecificRoutine,deleteSpecificSemesterCourse,GetRoutineResult ,RoutineResult,RoutineActive} from '../Services/Admin/AdminServices';
import SideBar from './SideBar';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";

class ViewRoutine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            IndividualRoutine:[],

          }
    }
    componentDidMount() {
        this.GetRoutine();

    }

    GetRoutine=async()=>{
        const response=await GetRoutineResult(this.props.match.params.email);
        if(response.success){
            this.setState({ IndividualRoutine:response.data  });
        }
        console.log('routine',this.state.IndividualRoutine)
         console.log('email',this.props.match.params.email);
    }


    sidebarMenu=()=>{

        $('#sidebar').fadeToggle();

    }







    deleteSemCourse=(email,ccode,session)=>{
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
            const response = await deleteSpecificSemesterCourse(email,ccode,session);
            if(response.success){
                this.getSemesterCourse();
                toast('Semester Course Code-'+' '+ccode+' '+' Deleted Successfully');
                this.totalClasses();

            }

              }
          });
    }
    EditSemCourse=async(email,ccode,session,id)=>{
     const {history}=this.props;
     history.push(`${PUBLIC_URL}editSCourse/${email}/${ccode}/${session}/${id}`);
    }
    DataToggle=()=>{
  $(function() {
    $('#toggle-one').bootstrapToggle();
  })
    }
    ToggleButtonClick=()=>{
        this.setState({ toggleButton:!this.state.toggleButton ,ToggleData:!this.state.ToggleData });
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
       ActiveRoutine=async(email,day,id)=>{
           const activeroutine=await RoutineActive(email,day,id);
           if(activeroutine){
            toast('Active Successfully');
            this.GetRoutine();
           }

       }
    render() {
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
           <SideBar/>


                    <div id="content">



                            <div class="container-fluid">
                                <button onClick={()=>this.sidebarMenu()} type="button" id="sidebarCollapse" class="btn btn-info ">
                                <i class="fa fa-align-right"></i>  <span class="glyphicon glyphicon-align-right " aria-hidden="true">Toggle</span>
                                </button>

                            </div>



                        <br></br>
                         <h3 style={{textAlign:'center'}}>Individual Semester Routine({this.props.match.params.email})</h3>
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
                                       {/* for print day once time that's ehy here i condition is used */}
                                <th>{row.day}</th>
                                <span style={{display:'none'}}>{i++}</span>
                                </>
                                   )}

                                        <td>
                                            <p style={{color:'#208a71'}}>Lecture:{row.lecture}</p>
                                            Semester:{row.semester}<p>Course Code:{row.ccode}</p>
                                    <p>Course Title:{row.ctitle}</p>
                                    <p>Time:{row.time1}<span>{row.ampm}</span></p>
                                    {/* active inactive status start */}
                                    <p>{row.status==0 && (
                                        <>
                                        <span style={{color:'red'}}>Inactive</span>
                                        <button class="btn btn-success"
                                        onClick={()=>this.ActiveRoutine(row.email,row.day,row.id)}
                                        >Active Please</button>
                                        </>
                                    )}</p>
                                      {/* active inactive status end */}
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
                                       {/* active inactive status start */}
                                       <p>{row.status==0 && (
                                        <>
                                        <span style={{color:'red'}}>Inactive</span>
                                        <button class="btn btn-success"
                                        onClick={()=>this.ActiveRoutine(row.email,row.day,row.id)}
                                        >Active Please</button>
                                        </>
                                    )}</p>
                                      {/* active inactive status end */}
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
                                       {/* active inactive status start */}
                                       <p>{row.status==0 && (
                                        <>
                                        <span style={{color:'red'}}>Inactive</span>
                                        <button class="btn btn-success"
                                        onClick={()=>this.ActiveRoutine(row.email,row.day,row.id)}
                                        >Active Please</button>
                                        </>
                                    )}</p>
                                      {/* active inactive status end */}
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
                                       {/* active inactive status start */}
                                       <p>{row.status==0 && (
                                        <>
                                        <span style={{color:'red'}}>Inactive</span>
                                        <button class="btn btn-success"
                                        onClick={()=>this.ActiveRoutine(row.email,row.day,row.id)}
                                        >Active Please</button>
                                        </>
                                    )}</p>
                                      {/* active inactive status end */}
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
                                       {/* active inactive status start */}
                                       <p>{row.status==0 && (
                                        <>
                                        <span style={{color:'red'}}>Inactive</span>
                                        <button class="btn btn-success"
                                        onClick={()=>this.ActiveRoutine(row.email,row.day,row.id)}
                                        >Active Please</button>
                                        </>
                                    )}</p>
                                      {/* active inactive status end */}
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

export default withRouter(ViewRoutine);
