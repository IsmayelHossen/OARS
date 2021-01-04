import React from 'react'
import { EditDataget, EditPostData,UpdateSemesterCourse,GetSemcCourseUpdateData } from '../Services/Admin/AdminServices';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from '../CommonURL';
 class EditPost extends React.Component {
     state={
         errors:'',
         text:'',
         EditData:{},
         status:'',
     }
     componentDidMount() {
         this.getEditData();
         this.user=window.user;
     }
     changeInput=(e)=>{
         this.setState({ [e.target.name]:e.target.value  });
     }
     getEditData=async()=>{
        // alert(this.props.match.params.id);
      const response=await EditDataget(this.props.match.params.id,this.props.match.params.email);
      if(response.success){
          this.setState({ text:response.data.text,image:response.data.image,status:response.data.status  });
          console.log('EditData:',response.data)
      }
      console.log('EditData:',this.state.EditData)
     }
     handleSubmit=async(event)=>{
        event.preventDefault();
       const  {history}=this.props;
        const email =this.user.email;
        const fileInput = document.querySelector('#fileupload') ;
        const formData = new FormData();
        formData.append('image', fileInput.files[0]);
        formData.append('email', email);
        formData.append('text',this.state.text);
        formData.append('id',this.props.match.params.id);
        formData.append('status',this.state.status);
        const response=await EditPostData(formData)
    //    const response=await  Axios(`${PUBLIC_URL}api/SavePost`, {
    //       method: 'POST',
    //       data:formData

    //     });

       if (response.success) {
                this.setState({

                    isLoading: false,
                });
               history.push(`${PUBLIC_URL}post`);

            }
            else {
                console.log("response.errors", response.errors);
                this.setState({
                    errors: response.errors,
                    isLoading: false,
                });
            }



    }
    render() {
        return (
            <>
            <ToastContainer/>

            <div class="containerCustom">
                 <div class="topMargin">
                  <div class="editPost">
                            <h3 style={{textAlign:'center'}}>Edit Post</h3>

                            <form method="POST" id="upload-image" class="form-group" style={{marginTop:".5em"}}  onSubmit={this.handleSubmit} encType="multipart/form-data">

                                <>

                            <div class="form-group">
            <textarea class="form-control" id="exampleFormControlTextarea1" name="text" rows="3" value={this.state.text} onChange={(e) => this.changeInput(e)} placeholder="What's on your mind?">
            {this.state.text}
            </textarea>
            {this.state.errors && this.state.errors.text && (
                <p class="text-danger">{this.state.errors.text[0]}</p>
            )}
        </div>
        <div class="form-group">
        <img  style={{maxWidth:'60px'}} src={`${PUBLIC_URL}storage/app/public/uploads/post/${this.state.image}`} class="" alt="Image"/>
        </div>
        <div class="form-group">
            <label for="password">Image Upload</label>
            <input type="file"  id="fileupload" class="form-control"   name="image"
          ></input>

        </div>
        <div class="form-group">
            <label for="password" style={{paddingRight:'10px'}}>Status</label>
            <input type="radio" value="1" checked={this.state.status=='1'} name="status" onChange={(e) => {this.setState({ status:e.target.value  })}}/>On<span style={{paddingRight:'10px'}}></span>
            <input type="radio" value="0" checked={this.state.status=='0'}  name="status" onChange={(e) => {this.setState({ status:e.target.value  })}}/>Hide
            {this.state.errors && this.state.errors.status && (
                <p class="text-danger">{this.state.errors.status[0]}</p>
            )}
        </div>
</>

<button type="submit" class="btn btn-success btn-block" >Submit</button>

</form>
</div>
</div>
</div>

            </>
        )
    }
}
export default withRouter(EditPost);
