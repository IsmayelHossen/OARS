import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { TeacherAllInfo ,SaveMoreInfo} from '../Services/TeacherService';
import TeacherUpdate from './TeacherUpdate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PUBLIC_URL } from "../CommonURL";
class MoreInfo extends React.Component {
    state = {
        heading:'',
        details:'',
        errors:'',
        pyear:'',
        result:'',
        Institution:'',
        degree:'',
    }
    changeInput=(e)=>{
        this.setState({ [e.target.name]:e.target.value  });
    }
    formSubmit=async(e)=>{
        e.preventDefault();
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const Teacheremail = data1.user.email;
        const {history}=this.props;
        if(this.state.heading=='Education'){
            const postBody={
                 email:Teacheremail,
                heading:this.state.heading,
                degree:this.state.degree,
                institution:this.state.institution,
                pyear:this.state.pyear,
                result:this.state.result,

             }
             const response = await SaveMoreInfo(postBody);
             if (response.success) {
                this.setState({
                     heading:'',
                     degree:'',
                     institution:'',
                     pyear:'',
                     result:'',
                    isLoading: false,
                    errors:''
                });
                toast('Data Added Successfully');

            }
            // else if(response.checkdate){

            //   const Coursecode=localStorage.getItem("CCode");

            //     Swal.fire({
            //       icon: 'error',
            //       title: 'Oops...',
            //       text: 'Attendance Already Taken!',

            //     })


            //   history.push(`${PUBLIC_URL}takenclasses/${this.state.ccode}`);
            //   localStorage.removeItem("CCode");

            // }
            else{
                console.log("response.errors", response.errors);
                this.setState({
                    errors: response.errors,
                    isLoading: false,
                });
            }

        }
        else{
            const postBody={
                heading:this.state.heading,
                email:Teacheremail,
               details:this.state.details,}
               const response = await SaveMoreInfo(postBody);
               if (response.success) {
                this.setState({
                    heading:'',
                    details:'',
                    errors:'',
                    isLoading: false,
                });
                toast('Data Added Successfully');
            }
            // else if(response.checkdate){

            //   const Coursecode=localStorage.getItem("CCode");

            //     Swal.fire({
            //       icon: 'error',
            //       title: 'Oops...',
            //       text: 'Attendance Already Taken!',

            //     })


            //   history.push(`${PUBLIC_URL}takenclasses/${this.state.ccode}`);
            //   localStorage.removeItem("CCode");

            // }
            else{
                console.log("response.errors", response.errors);
                this.setState({
                    errors: response.errors,
                    isLoading: false,
                });
            }
        }




    }
    render() {
        return (
            <>
              <ToastContainer/>
             <div class="containerCustom">
              <div class="topMargin">
             <div class="row ">

               <div class="col-md-12">
               <div class="card" style={{marginBottom:'10px',marginTop:'10px'}}>
               <div class="card-header" style={{textAlign:'center'}}>Add More Information</div>
  <div class="card-body">
  <form onSubmit={this.formSubmit} >
        <div class="form-group">
            <label for="password">Heading</label>
            <select class="form-control" id="exampleFormControlSelect1" name="heading"
                onChange={(e) => this.changeInput(e)}>
                    <option value="">Select</option>
                    <option value="Education">Education</option>
                    <option value="Experience">Experience</option>
                    <option value="Publication">Publication</option>
                    <option value="Research Interest">Research Interest</option>
                    <option value="Academic Award Received">Academic Award Received</option>

            </select>
            {this.state.errors && this.state.errors.heading && (
                <p class="text-danger">{this.state.errors.heading[0]}</p>
            )}
        </div>
        {this.state.heading!='Education' &&(
        <div class="form-group">
        <label for="password">Details</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" name="details" rows="3" value={this.state.details} onChange={(e) => this.changeInput(e)} placeholder={this.state.heading}>

            </textarea>
            {this.state.errors && this.state.errors.details && (
                <p class="text-danger">{this.state.errors.details[0]}</p>
            )}
        </div>
        )}
        {this.state.heading=='Education' &&(
            <>
             <div class="form-group">
             <label for="password">Degree</label>
           <input type="text"  class="form-control" name="degree" value={this.state.degree}
           onChange={(e) => this.changeInput(e)} placeholder="Degree Name"></input>
            {this.state.errors && this.state.errors.degree && (
                <p class="text-danger">{this.state.errors.degree[0]}</p>
            )}
        </div>
        <div class="form-group">
             <label for="password">Institution</label>
           <input type="text"  class="form-control" name="institution" value={this.state.institution}
           onChange={(e) => this.changeInput(e)} placeholder="Institution Name"></input>
            {this.state.errors && this.state.errors.institution && (
                <p class="text-danger">{this.state.errors.institution[0]}</p>
            )}
        </div>
        <div class="form-group">
             <label for="password">Passing Year</label>
           <input type="text"  class="form-control" name="pyear" value={this.state.pyear}
           onChange={(e) => this.changeInput(e)} placeholder="Passing Year Name"></input>
            {this.state.errors && this.state.errors.pyear && (
                <p class="text-danger">{this.state.errors.pyear[0]}</p>
            )}
        </div>
        <div class="form-group">
             <label for="password">Result</label>
           <input type="text"  class="form-control" name="result" value={this.state.result}
           onChange={(e) => this.changeInput(e)} placeholder="Result"></input>
            {this.state.errors && this.state.errors.result && (
                <p class="text-danger">{this.state.errors.result[0]}</p>
            )}
        </div>
            </>
        )}
<button type="submit" class="btn btn-success btn-block" >Submit</button>
</form>
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

export default withRouter(MoreInfo);
