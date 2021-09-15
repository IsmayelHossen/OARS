import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { GetteacherData } from '../Services/StudentService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentUpdate from './StudentUpdate';
import ImageUpload from '../Teacher/ImageUpload';
import { PUBLIC_URL } from "../CommonURL";
import { Row } from 'react-bootstrap';
import Pagination1 from '../Teacher/Pagination1';

 class Teacherinfo extends React.Component {
     state={
         AllclassMate:[],
        IndexOfLast:'3',
        IndexOfFirst:'0' ,

     }
     componentDidMount() {
         this.getClassmate();
     }
     getClassmate=async()=>{
         const session=localStorage.getItem('session');
         const response=await GetteacherData();
         if(response.success){
             this.setState({ AllclassMate:response.data  });

         }
         console.log('allclassmate',this.state.AllclassMate);
     }
     paginate=(pageNum)=>{

        const currentPage=pageNum;
        const PostPerPage=3;
        const IndexOfLast=currentPage*PostPerPage;
        const IndexOfFirst=IndexOfLast-PostPerPage;
        this.setState({ IndexOfLast:IndexOfLast,IndexOfFirst:IndexOfFirst  });
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
        <h3 class="heading animate__bounce"> Teachers Information </h3>
            <div class="row ">

            {this.state.AllclassMate.slice(this.state.IndexOfFirst,this.state.IndexOfLast).map((row,index)=>(

                <div class="col-md-3">
                   <div class="allclassmate">
                   <img  class="allclassmateImg"  src={`${PUBLIC_URL}storage/app/public/uploads/${row.image}`}
                    alt={row.name} />
                       <h6><button class="btn btn-success">{row.name}</button></h6>

                    <p style={{color:'#7d760d'}}>{row.designation}</p>
                    <p>Blood Group:{row.bloodg}</p>
                    <p style={{color:'#a22e0b'}}>Phone:{row.phone}</p>
                    <p><button class="btn btn-primary">Email:{row.email}</button></p>
                    <p>Permanent Address:{row.paddress}</p>
                    <button class="btn btn-danger" onClick={()=>this.Details(row.email)}>Profile</button>
                   </div>
                </div>


                               ))}


                   </div>
                   <Pagination1 totalpage={this.state.AllclassMate.length} perpage='3' paginate={this.paginate}/>
                   </div>
                   </div>
                   </div>

        )
    }
}
export default withRouter(Teacherinfo);
