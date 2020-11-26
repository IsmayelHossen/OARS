import Axios from 'axios';
import React, { Component } from 'react';


class ImageUpload extends Component {
  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    const getLoginData = localStorage.getItem("LoginData");
    const data1 = JSON.parse(getLoginData);
    const email = data1.user.email;
    const user_rule = data1.user.user_rule;
    const fileInput = document.querySelector('#fileupload') ;
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    formData.append('email', email);
    formData.append('user_rule',user_rule);

    Axios('/OARS/api/upload', {
      method: 'POST',
      data:formData

    })

    .then(res => {
        console.log("user rule",user_rule);

        if(user_rule=='Teacher'){this.props.onCompleteTeacherUpdateimage();
        }

         else{   this.props.StudentImage();}

    })

}

render() {
  return (
      <>
    <div className="App">
     <form method="POST" id="upload-image" class="form-inline" style={{marginTop:".5em"}}  onSubmit={this.handleSubmit} encType="multipart/form-data">
        <input id="fileupload" type="file" name="image" required/>
        <button type="submit" id="btnUploadFile" class="btn btn-success btn-sm">Upload Image</button>
     </form>


    </div>
    </>
  );
}
}
export default ImageUpload;
