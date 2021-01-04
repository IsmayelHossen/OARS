import React from 'react';
import { SavePost,PostGet, PostDelete,GetSemesterCourseInfo,deleteSpecificSemesterCourse,getSemesterCodeTitle } from '../Services/Admin/AdminServices';

import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
import Axios from 'axios';
 class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
              image:'',
            text:'',

            errors:'',
            selectedFile:'',
            AllPost:[],
            people:'',
            date1:new Date().toLocaleString(),

      }
    }
    componentDidMount() {
        this.user = window.user;

        this.getPost();
    }
    getPost=async()=>{
      //  alert(this.user.email);
        const response= await PostGet(this.user.email);
        if(response.success){
            this.setState({ AllPost:response.data  });
        }

    }
    changeInput=(e)=>{
        this.setState({ [e.target.name]:e.target.value  });
    }
    handleSubmit=async(event)=>{
        event.preventDefault();
        const getLoginData = localStorage.getItem("LoginData");
        const data1 = JSON.parse(getLoginData);
        const user_rule = data1.user.user_rule;
        const email =this.user.email;
        const fileInput = document.querySelector('#fileupload') ;

        if(fileInput.files[0]){
            const formData = new FormData();
            formData.append('image', fileInput.files[0]);
            formData.append('email', email);
            formData.append('text',this.state.text);
            formData.append('people',this.state.people);
            formData.append('user_rule',user_rule);
            formData.append('date1',this.state.date1);
            const response=await SavePost(formData)
            //    const response=await  Axios(`${PUBLIC_URL}api/SavePost`, {
            //       method: 'POST',
            //       data:formData

            //     });

               if (response.success) {
                $('#exampleModal').modal('hide');
                        this.setState({

                            isLoading: false,
                        });
                        this.getPost();
                        console.log('image',response.data)

                    }
                    else {
                        console.log("response.errors", response.errors);
                        this.setState({
                            errors: response.errors,
                            isLoading: false,
                        });
                    }


        }
     else{
        const formData = new FormData();
        formData.append('email', email);
        formData.append('text',this.state.text);
        formData.append('people',this.state.people);
        formData.append('user_rule',user_rule);
        formData.append('date1',this.state.date1);
        const response=await SavePost(formData);
    //    const response=await  Axios(`${PUBLIC_URL}api/SavePost`, {
    //       method: 'POST',
    //       data:formData

    //     });

       if (response.success) {
        $('#exampleModal').modal('hide');
                this.setState({

                    isLoading: false,
                });
                this.getPost();
                console.log('image',response.data)

            }
            else {
                console.log("response.errors", response.errors);
                this.setState({
                    errors: response.errors,
                    isLoading: false,
                });
            }

     }




    }
    deletePost=async(id)=>{
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
                const response=await PostDelete(id);
                if(response.success){
                    this.getPost();
                    toast.info('Deleted post Successfully')
                }
            }


        })


    }
    EditPost=async(id,email)=>{
         const {history}=this.props;
         history.push(`${PUBLIC_URL}editpost/${id}/${email}`);
    }
    render() {
        let i=1;
        return (
            <div>
              <ToastContainer/>
            <div class="containerCustom">
                 <div class="topMargin">

                <button type="button" class=" btn btn-success float-right clearfix"   style={{marginRight:"5px"}} data-toggle="modal" data-target="#exampleModal">
  Add Post
</button>

{/* modal start */}
<div class="modal fade"   id="exampleModal"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content ">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      <div class="addPost">
                            <h3 style={{textAlign:'center'}}>Create Post</h3>

                            <form method="POST" id="upload-image" class="form-group" style={{marginTop:".5em"}}  onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <div class="form-group">
            <label for="password">Audience</label>
            <select class="form-control" id="exampleFormControlSelect1" name="people"
                onChange={(e) => this.changeInput(e)}>
                     <option value="">Select</option>
                    <option value="All">All</option>
                    <option value="Student">BatchMate/Collegue</option>
                    <option value="Teacher">Teachers</option>

            </select>
            {this.state.errors && this.state.errors.people && (
                <p class="text-danger">{this.state.errors.people[0]}</p>
            )}
        </div>
                            <div class="form-group">
            <textarea class="form-control" id="exampleFormControlTextarea1" name="text" rows="3" value={this.state.text} onChange={(e) => this.changeInput(e)} placeholder="What's on your mind?">

            </textarea>
            {this.state.errors && this.state.errors.text && (
                <p class="text-danger">{this.state.errors.text[0]}</p>
            )}
        </div>
        <div class="form-group">
            <label for="password">Image Upload</label>
            <input type="file"  id="fileupload" class="form-control"   name="image"
          ></input>

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
  {/* modal end */}
  </div>
                 </div>


                 <div class="table-responsive">
                         <table class="table table-striped">
                             <thead>
                               <tr>
                                   <th>No</th>
                                   <th>Text</th>
                                   <th>Image</th>
                                   <th>Status</th>
                                   <th>Created Date</th>
                                   <th>Edit</th>
                                   <th>Delete</th>



                               </tr>
                             </thead>
                             <tbody>
                                 {this.state.AllPost.map((row,index)=>(

                                  <tr>
                                      <td>{i++}</td>


                                <td>{row.text}</td>
                                <td ><img  style={{maxWidth:'60px'}} src={`${PUBLIC_URL}storage/app/public/uploads/post/${row.image}`} class="" alt="Image"/></td>

                                <td>

           {row.status=='1' && (
                 <div class="example btn btn-success">
               <span>On</span>
               </div>
           )}
              {row.status=='0' && (
              <div class="example btn btn-danger">
              <span>Hide</span>
              </div>
           )}
</td>
<td>{row.date1 }</td>
                                <td>
                              <button class="btn btn-success" onClick={()=>this.EditPost(row.id,row.email)}>Edit</button>
                             </td>
                                <td> <button onClick={()=>this.deletePost(row.id)} class="btn btn-danger">Delete</button> </td>
                                  </tr>

                                 ))}
                             </tbody>
                         </table>
                         </div>
            </div>
            </div>
        )
    }
}

export default withRouter(Post);
