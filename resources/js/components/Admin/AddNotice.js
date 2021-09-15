import React from 'react';
import { SavePost,PostGet, PostDelete,SaveNoticeEvent,getNoticeEvent1,getSemesterCodeTitle } from '../Services/Admin/AdminServices';

import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
import Axios from 'axios';
 class AddNotice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
              image:'',
            text:'',
          category:'',
          title:'',
            errors:'',
            selectedFile:'',
            AllPost:[],
            people:'',
            date1:new Date().toLocaleString(),
            AllnoticeEvent:[],

      }
    }
    componentDidMount() {
        this.user = window.user;

        this.getNoticeEvent();
    }
    getNoticeEvent=async()=>{
      //  alert(this.user.email);
        const response= await getNoticeEvent1(this.user.email);
        if(response.success){
            this.setState({ AllnoticeEvent:response.data  });

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
            formData.append('category',this.state.category);
            formData.append('title',this.state.title);
            formData.append('date1',this.state.date1);
            const response=await SaveNoticeEvent(formData)
            //    const response=await  Axios(`${PUBLIC_URL}api/SavePost`, {
            //       method: 'POST',
            //       data:formData

            //     });

               if (response.success) {
                $('#exampleModal').modal('hide');
                        this.setState({

                            isLoading: false,
                        });
                        this.getNoticeEvent();
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
        formData.append('category',this.state.category);
        formData.append('title',this.state.title);
        formData.append('date1',this.state.date1);
        const response=await SaveNoticeEvent(formData);
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
  Add Notice Or Event
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
                            <h3 style={{textAlign:'center'}}>Add Notice Or Event</h3>

                            <form method="POST" id="upload-image" class="form-group" style={{marginTop:".5em"}}  onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <div class="form-group">
            <label for="password">Category Choice</label>
            <select class="form-control" id="exampleFormControlSelect1" name="category"
                onChange={(e) => this.changeInput(e)}>
                     <option value="">Select</option>
                    <option value="Notice">Notice</option>
                    <option value="Event">Event</option>
                  </select>
            {this.state.errors && this.state.errors.category && (
                <p class="text-danger">{this.state.errors.category[0]}</p>
            )}
        </div>
        <div class="form-group">
            <label for="password">Title</label>
            <input type="text"   class="form-control"   name="title" onChange={(e) => this.changeInput(e)} ></input>
           {this.state.errors && this.state.errors.title && (
                <p class="text-danger">{this.state.errors.title[0]}</p>
            )}

        </div>
           <div class="form-group">
            <textarea class="form-control" id="exampleFormControlTextarea1" name="text" rows="3" value={this.state.text} onChange={(e) => this.changeInput(e)} placeholder="Write some text..">

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
                                   <th>Category</th>
                                   <th>Title</th>
                                   <th>Description</th>
                                   <th>Image</th>
                                   <th>Status</th>
                                   <th>Created Date</th>
                                   <th>Edit</th>
                                   <th>Delete</th>



                               </tr>
                             </thead>
                             <tbody>
                                 {this.state.AllnoticeEvent.map((row,index)=>(

                                  <tr>
                                      <td>{i++}</td>


                                <td>{row.category}</td>
                                <td>{row.title}</td>
                                <td>{row.description}</td>
                                <td ><img  style={{maxWidth:'60px'}} src={`${PUBLIC_URL}storage/app/public/uploads/post/${row.image}`} class="" alt="Image"/></td>

                                <td>

           {row.status=='1' && (
                 <div class="example btn btn-success">
               <span>On</span>
               </div>
           )}
              {row.status=='0' && (
              <div class="example btn btn-danger">
              <span>Off</span>
              </div>
           )}
</td>
<td>{row.created_at }</td>
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

export default withRouter(AddNotice);
