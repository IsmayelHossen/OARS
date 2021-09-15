import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { TeacherAllInfo ,GetMoreinf1} from '../Services/TeacherService';
import TeacherUpdate from './TeacherUpdate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUpload from './ImageUpload';
import { PUBLIC_URL } from "../CommonURL";
//Datatable Modules
//import 'jquery/dist/jquery.min.js';
// import "datatables.net-dt/js/dataTables.dataTables.min.js"
// import "datatables.net-dt/css/jquery.dataTables.min.css"
//import $ from 'jquery';
class TeacherHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            individualInfo: '',
            teachertdata:{},
            isLoading:false,
            toggleUpdateTask:true,
            MoreInfo:[],
        }
    }
    componentDidMount() {
        this.TeacherGetAllInfo();
        this.GetMoreinf();



    }


    GetMoreinf= async () => {
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const email = data1.user.email;
        // this.setState({ individualInfo:email  });



        //console.log("studentemail",email );
        const response = await GetMoreinf1(email);
        if (response.success) {  const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const email = data1.user.email;
            this.setState({ MoreInfo:response.data });
            console.log("MoreInfo", this.state.MoreInfo);

        }

    }
    TeacherGetAllInfo = async () => {

        // this.setState({ individualInfo:email  });

        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const email = data1.user.email;

        //console.log("studentemail",email );
        const response = await TeacherAllInfo(email);
        if (response) {
            this.setState({ teachertdata: response });
            console.log("final", this.state.teachertdata);

        }

    }
    toggleUpdateStudent=()=>{
        this.setState({ toggleUpdateTask:!this.state.toggleUpdateTask,  });
    }
    onCompleteTeacherUpdate=()=>{
        this.TeacherGetAllInfo();
        this.toggleUpdateStudent();
        toast("Data Update successfully!");

    }
    onCompleteTeacherUpdateImage=()=>{
        this.TeacherGetAllInfo();

        toast("Image Uploaded successfully!");

    }
  Moreinfo=async()=>{
    const {history}=this.props;
    //window.location.href = `/OARS/takenclasses/${coursecode}`;
  await history.push(`${PUBLIC_URL}moreinfo`);
  }

    render() {
        const image =this.state.teachertdata.image;
        const abc="hi hello";
        let i=1;
        let i2=1;
        let i3=1;
        let i4=1;
        let i5=1;
        let showimage;
        // if(image){
        //   showimage=
        // }
        // else{

        // }
        return (


            <>
            <ToastContainer/>
            <div class="containerCustom">
            <div class="topMargin">
            <div class="jumbotron">
                   <div class="row">


                {this.state.isLoading && (
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                )}
                 <div class="col-md-4">
                 {/* image show when toggleUpdateTask true */}
                 {this.state.toggleUpdateTask &&  (

                <>
                <img src={`${PUBLIC_URL}storage/app/public/uploads/${this.state.teachertdata.image}`} class="student-card-img-top" alt="..."/>
                <ImageUpload  onCompleteTeacherUpdateimage={this.onCompleteTeacherUpdateImage} />

                </>
          )}
          </div>
          <div class="col-md-8">
               {/* here show all data after redirect from login */}
                  { this.state.toggleUpdateTask && (
               <>

                      <div class="table-responsive">
                          <table>
                              <tbody>
                                  <tr>
                                      <th>{this.state.teachertdata.name}</th>
                                  </tr>
                                  <tr>
                                      <th>Designation</th>
                                      <td>{this.state.teachertdata.designation}</td>
                                  </tr>

                                  <tr>
                                      <th>Blood Group</th>
                                      <td>{this.state.teachertdata.bloodg}</td>
                                  </tr>
                                  <tr>
                                      <th>Phone</th>
                                      <td>{this.state.teachertdata.phone}</td>
                                  </tr>
                                  <tr>
                                      <th>Email</th>
                                      <td>{this.state.teachertdata.email}</td>
                                  </tr>

                                  <tr>
                                      <th>Current Address</th>
                                      <td>{this.state.teachertdata.caddress}</td>
                                  </tr>
                                  <tr>
                                      <th>Permanent Address</th>
                                      <td>{this.state.teachertdata.paddress}</td>
                                  </tr>
                               <tr><th>Add More Info</th>
                                <td>   <button class="btn btn-primary" onClick={()=>this.Moreinfo()}>Add More Info</button></td>
                               </tr>
                              </tbody>
                          </table>
                      </div>

                            <div class="card-body">

                                <p style={{display:'block'}}>
                                    {localStorage.setItem('session',this.state.teachertdata.session)}
                                </p>


                            </div>


            </>
                )}
                </div>
                  </div>


            <div class="row">
                <div class="col-md-12">
                      {/* after clicked the update button show update from StudentUpdate.js component */}
                      {! this.state.toggleUpdateTask && (
    <TeacherUpdate teacherDataPass={this.state.teachertdata}
    onCompleteTeacherUpdate={this.onCompleteTeacherUpdate}  />
)}

                <button
                    class="btn btn-success mr-2"
                    onClick={() => this.toggleUpdateStudent()}
                >
                    {this.state.toggleUpdateTask && <span>Update </span>}
                    {!this.state.toggleUpdateTask && <span>Cancel Updating</span>}
                </button>
                </div>
            </div>
              {/* More information area start */}

                   <div style={{marginTop:'5px'}}>

                       {/* for education data show process  start*/}
                       <div style={{border:'2px solid rgb(245, 246, 247)',boxShadow:'0px 1px 2px #959ca4',marginBottom:'4px'}}>
                 {this.state.MoreInfo.map((row,index)=>(
                   <>
                   {row.heading=='Education'  && (
                       <div class="card1">
                           { i=='1' && (
                            <div class="card-header" style={{textAlign:'center',color:'#d03a3a',fontSize:'20px'}}>{row.heading}</div>
                           )}

                       <div class="card-body1">
                           <h4 style={{display:'none'}}>{i++}</h4>
                           <ul>
                               <li> <h5><span style={{color:'red'}}>Degree:</span>{row.degree}</h5></li>
                               <li><h5>Instituation:{row.institution}</h5></li>
                               <li> <h5>Passing Year:{row.passing}</h5></li>
                               <li> <h5>result:{row.result}</h5></li>
                           </ul>
                       </div>

                     </div>
                   )}
                    </>

                 ))}
                 </div>
                  {/* for education data show process  end */}
                  {/* for Experience data show process  start*/}
                  <div style={{border:'2px solid rgb(245, 246, 247)',boxShadow:'0px 1px 2px #959ca4',marginBottom:'4px'}}>
                 {this.state.MoreInfo.map((row,index)=>(
                   <>
                   {row.heading=='Experience'  && (
                       <div class="card1">
                           { i2=='1' && (
                           <div class="card-header" style={{textAlign:'center',color:'rgb(31, 166, 109)',fontSize:'20px'}}>{row.heading}</div>
                           )}

                       <div class="card-body1">
                           <h4 style={{display:'none'}}>{i2++}</h4>
                           <h5>
                               <ul>
                                   <li>
                                {row.details}
                                   </li>
                               </ul>
                             </h5>

                       </div>

                     </div>
                   )}
                    </>

                 ))}
                 </div>
                  {/* for Experience data show process  end */}

                    {/* for Publications data show process  start*/}
                    <div style={{border:'2px solid rgb(245, 246, 247)',boxShadow:'0px 1px 2px #959ca4',marginBottom:'4px'}}>
                 {this.state.MoreInfo.map((row,index)=>(
                   <>
                   {row.heading=='Publication'  && (
                       <div class="card1">
                           { i3=='1' && (
                            <div class="card-header" style={{textAlign:'center',color:'rgb(225, 106, 19)',fontSize:'20px'}}>{row.heading}</div>
                           )}

                       <div class="card-body1">
                           <h4 style={{display:'none'}}>{i3++}</h4>
                           <h5>
                               <ul>
                                   <li>
                                {row.details}
                                   </li>
                               </ul>
                             </h5>

                       </div>

                     </div>
                   )}
                    </>

                 ))}
                 </div>
                  {/* for Publication data show process  end */}

                    {/* for Research Interest data show process  start*/}
                    <div style={{border:'2px solid rgb(245, 246, 247)',boxShadow:'0px 1px 2px #959ca4',marginBottom:'4px'}}>
                 {this.state.MoreInfo.map((row,index)=>(
                   <>
                   {row.heading=='Research Interest'  && (
                       <div class="card1">
                           { i4=='1' && (
                           <div class="card-header" style={{textAlign:'center',color:'rgb(62, 153, 72)',fontSize:'20px'}}>{row.heading}</div>
                           )}

                       <div class="card-body1">
                           <h4 style={{display:'none'}}>{i4++}</h4>
                           <h5>
                               <ul>
                                   <li>
                                {row.details}
                                   </li>
                               </ul>
                             </h5>

                       </div>

                     </div>
                   )}
                    </>

                 ))}
                 </div>
                  {/* for Research data show process  end */}

                   {/* for Academic Award Received data show process  start*/}
                   <div style={{border:'2px solid rgb(245, 246, 247)',boxShadow:'0px 1px 2px #959ca4',marginBottom:'4px'}}>
                 {this.state.MoreInfo.map((row,index)=>(
                   <>
                   {row.heading=='Academic Award Received'  && (
                       <div class="card1">
                           { i5=='1' && (
                          <div class="card-header" style={{textAlign:'center',color:'rgb(26, 20, 20)',fontSize:'20px'}}>{row.heading}</div>
                           )}

                       <div class="card-body1">
                           <h4 style={{display:'none'}}>{i5++}</h4>
                           <h5>
                               <ul>
                                   <li>
                                {row.details}
                                   </li>
                               </ul>
                             </h5>

                       </div>

                     </div>
                   )}
                    </>

                 ))}
                 </div>
                  {/* for Academic Award Receiveddata show process  end */}


              </div>



           </div>
           </div>
           </div>


        </>
        );
    }
}

export default withRouter(TeacherHome);

