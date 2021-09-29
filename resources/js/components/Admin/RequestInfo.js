import React from 'react';
import { RequestInfoData, AcceptRequestDone } from '../Services/Admin/AdminServices';
import SideBar from './SideBar';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
import { Editor } from '@tinymce/tinymce-react';

class RequestInfo extends React.Component {
    state={
        RequestInfo:[],
    }
    componentDidMount() {
        this.GetRequestInfo();
    }

    sidebarMenu=()=>{

        $('#sidebar').fadeToggle();
    }
    // ViewStudent=(session)=>{
    //     const {history}=this.props;
    //     history.push(`${PUBLIC_URL}viewstudent/${session}`);

    // }
     GetRequestInfo=async()=>{

       // alert(this.props.match.params.request)
        const response=await RequestInfoData(this.props.match.params.request);
        if(response.success){
            this.setState({ RequestInfo:response.data  });
        }
        console.log('request info',this.state.RequestInfo)
    }
    AcceptRequest=async(who,email)=>{
        Swal.fire({
            title: 'Are you sure?',
        text: 'Want To Aceept This Request',
          icon: 'warning',
            showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
       confirmButtonText: 'Yes!'})
       .then(async(result) => {
            if(result.value){
                const response= await AcceptRequestDone(who,email);
                if(response.success){
                    console.log('back response');
                    this.GetRequestInfo();
                   // window.location.href=(`localhost/OARS/requestinfo/${this.props.match.params.request}`);
                }

              }
          })


    }
    render() {
        return (
            <div class="containerCustom">
            <div class="topMargin">
           <div class="wrapper">
                 <SideBar/>


               <div id="content">


            <button onClick={()=>this.sidebarMenu()} type="button" id="sidebarCollapse" class="btn btn-info ">
            <i class="fa fa-align-right"></i>  <span class="glyphicon glyphicon-align-right " aria-hidden="true">Toggle</span>
            </button>
             <br></br>
             <h3 class="adminStudentH3">Want to be a member of OARS as  {this.props.match.params.request} ({this.props.match.params.request} Request) </h3>
                 <div class="row">

                 {this.props.match.params.request=='Student' && this.state.RequestInfo.map((row,index)=>(


                <div class="col-md-4">
                <div class="allclassmate">
                <img  class="allclassmateImg"  src={`${PUBLIC_URL}storage/app/public/uploads/${row.image}`}
                alt={row.name} />
                    <h6><button class="btn btn-success">{row.name}</button></h6>

                <p style={{color:'#7d760d'}}>ID:IT-{row.it}</p>
                <p style={{color:'#0d881bc4'}}>Session:{row.session}</p>
                <p>Blood Group:{row.bloodg}</p>
                <p style={{color:'#a22e0b'}}>Phone:{row.phone}</p>
                <p><button class="btn btn-primary">Email:{row.email}</button></p>
                <p>Permanent Address:{row.paddress}</p>
                <button class="btn btn-success" onClick={()=>this.AcceptRequest(this.props.match.params.request,row.email)}>Accept Request</button>
                </div>
                </div>
                        ))}
                            {this.props.match.params.request=='Teacher' && this.state.RequestInfo.map((row,index)=>(


                <div class="col-md-4">
                <div class="allclassmate">
                <img  class="allclassmateImg"  src={`${PUBLIC_URL}storage/app/public/uploads/${row.image}`}
                alt={row.name} />
                    <h6><button class="btn btn-danger">{row.name}</button></h6>

                <p style={{color:'#7d760d'}}>Designation-{row.designation}</p>
                <p>Blood Group:{row.bloodg}</p>
                <p style={{color:'#a22e0b'}}>Phone:{row.phone}</p>
                <p><button class="btn btn-primary">Email:{row.email}</button></p>
                <p>Permanent Address:{row.paddress}</p>
                <button class="btn btn-success" onClick={()=>this.AcceptRequest(this.props.match.params.request,row.email)}>Accept Request</button>
                </div>
                </div>
        ))}

                 </div>
                </div>

             </div>
            </div>
            </div>
        )
    }
}
export default withRouter(RequestInfo);
