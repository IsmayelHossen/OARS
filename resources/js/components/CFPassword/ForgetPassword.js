import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
import { PasswordForgetEmail } from '../Services/CFPasswordService';
class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email:'' }
    }
    componentDidMount() {

    }
    ChangeInput=(e)=>{
        this.setState({ email:e.target.value  });
    }
    ForgetPasswordF=async(e)=>{
        e.preventDefault();
        if(this.state.email==0){
         toast('Field Must Not Be Empty!');
        }
        else{
            const postBody={
                email:this.state.email,
             }
            const result =await PasswordForgetEmail(postBody);
            if(result.checkIfExists){
                toast('Sorry this email is not exist');
                console.log('forget',result.data);

            }
            else{

                toast('An email has sent to your email');
                this.setState({  email:''  });
                  const {history}=this.props;
                 history.push('/OARS/resetPassword');
            }

        }

    }
    render() {
        return (
             <>
   <ToastContainer/>
        <div class="topMargin">
	<div class="row justify-content-center">
		<div class="col-md-4 col-md-offset-4">
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="text-center">
                  <h3><i class="fa fa-lock fa-4x"></i></h3>
                  <h2 class="text-center">Forgot Password?</h2>
                  <p>You can reset your password here.</p>
                  <div class="panel-body">

                    <form id="register-form" role="form" autocomplete="off" class="form" onSubmit={this.ForgetPasswordF}>

                      <div class="form-group">
                        <div class="input-group">
                          <span class="input-group-addon"><i class="glyphicon glyphicon-envelope color-blue"></i></span>
                          <input id="email" name="email" placeholder="email address" class="form-control"  type="email" onChange={(e)=>this.ChangeInput(e)} value={this.state.email} />
                        </div>
                      </div>
                      <div class="form-group">
                        <input name="recover-submit" class="btn btn-lg btn-primary btn-block" value="Reset Password" type="submit"/>
                      </div>

                    </form>

                  </div>
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

export default withRouter(ForgetPassword);
