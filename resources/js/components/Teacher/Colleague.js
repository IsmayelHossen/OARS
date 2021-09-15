import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { getColleagueInfo } from '../Services/TeacherService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUpload from '../Teacher/ImageUpload';
import { PUBLIC_URL } from "../CommonURL";
import { Row } from 'react-bootstrap';
import Pagination1 from '../Teacher/Pagination1';

export default class Colleague extends React.Component {
    state={
        InfoColleague:[],
    }
    componentDidMount() {
        this.ColleagueInfo();
    }
    ColleagueInfo=async()=>{
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const email = data1.user.email;
        const response= await getColleagueInfo(email);
        if(response.success){
            this.setState({ InfoColleague:response.data  });
        }
    }
    Details=async(email)=>{
        const {history}=this.props;
        //window.location.href = `/OARS/takenclasses/${coursecode}`;
      await history.push(`${PUBLIC_URL}colleagueD/${email}`);
      //  alert(email);
    }
    render() {
        return (
            <div>
               <div class="containerCustom">
            <div class="topMargin takenclasss">
        <h3 class="heading animate__bounce"> Colleagues Information</h3>
            <div class="row ">
                {this.state.InfoColleague.length==0 && (
                     <div class="col-md-12">
                    <h3 style={{textAlign:'center',color:'red',marginTop:'8rem',marginBottom:'8rem'}}> No Colleague information available</h3>
                    </div>
                )}
           {this.state.InfoColleague.map((row,index)=>(


            <div class="col-md-3">
                   <div class="allclassmate">
                   <img  class="allclassmateImg"  src={`${PUBLIC_URL}storage/app/public/uploads/${row.image}`}
                    alt={row.name} />
                       <h6><button class="btn btn-success">{row.name}</button></h6>

                    <p style={{color:'#13114d'}}>{row.designation}</p>
                    {/* <p style={{color:'#118655'}}>Blood Group:{row.bloodg}</p> */}
                    <p style={{color:'#a22e0b'}}>Phone:{row.phone}</p>
                    <p><button class="btn ">Email:{row.email}</button></p>
                    <button class="btn btn-danger" onClick={()=>this.Details(row.email)}>Profile</button>
                    {/* <p>Permanent Address:{row.paddress}</p> */}

                   </div>
                </div>
                  ))}

                </div>
                </div>
                </div>
            </div>
        )
    }
}
