import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { TeacherAllInfo ,GetMoreinf1} from '../Services/TeacherService';
import TeacherUpdate from './TeacherUpdate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUpload from './ImageUpload';
import { PUBLIC_URL } from "../CommonURL";
class ColleagueDetails extends React.Component {
    state = {
        email:this.props.match.params.email,
        colleague:{},
        MoreInfo:[],
     }
    componentDidMount() {
        this.TeacherGetAllInfo();
        this.GetMoreinf();
    }
    TeacherGetAllInfo = async () => {

        // this.setState({ individualInfo:email  });



        //console.log("studentemail",email );
        const response = await TeacherAllInfo(this.state.email);
        if (response) {
            this.setState({ colleague: response });
            console.log("colleague", this.state.colleague);

        }

    }
    GetMoreinf= async () => {

        const response = await GetMoreinf1(this.state.email);
        if (response.success) {
            this.setState({ MoreInfo:response.data });
            console.log("MoreInfo", this.state.MoreInfo);

        }

    }
    render() {
        let i=1;
        let i2=1;
        let i3=1;
        let i4=1;
        let i5=1;
        return (


            <>
            <ToastContainer/>
            <div class="containerCustom">
            <div class="topMargin">
            <div class="jumbotron">
                   <div class="row">

                       <div class="col-md-3">
                           <div class="card" style={{width: '18rem',backgroundColor:'#F8F9FA'}}>
  <img class="card-img-top" src={`${PUBLIC_URL}storage/app/public/uploads/${this.state.colleague.image}`}  alt="Card image cap"/>
  <div class="card-body">
    <h5 class="card-title">{this.state.colleague.name}</h5>
    <p class="card-text">{this.state.colleague.designation}</p>
    <p class="card-text">{this.state.colleague.bloodg}</p>
    <p class="card-text">{this.state.colleague.phone}</p>
    <p class="card-text">{this.state.colleague.email}</p>
    <p class="card-text">{this.state.colleague.caddress}</p>
    <p class="card-text">{this.state.colleague.paddress}</p>
  </div>

  <div class="card-body">

  </div>
</div>

                       </div>

                       <div class="col-md-9">

                          {/* More information area start */}
                          {this.state.MoreInfo.length<=0 && (
                              <h3 style={{color:'red'}}>No details Available</h3>
                          )}
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
                       </div>
                       </div>
                       </>
         );
    }
}

export default withRouter(ColleagueDetails);
