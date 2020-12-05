import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PasswordForgetEmail,ResetPasswordSave } from '../Services/CFPasswordService';
class resetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             email:'',
            password:'',
            password_confirmation:'',
            confirmcode:'',
            errors:'',
            errormessage:'',
    }
    }
    componentDidMount() {

    }
    ChangeInput=(e)=>{
        this.setState({ [e.target.name]:e.target.value  });
    }
    ForgetPasswordF=async(e)=>{
        e.preventDefault();
        if(this.state.confirmcode==0){
         toast('confirmed code Field Must Not Be Empty!');
        }
       else if(this.state.password==0){
            toast('Password Field Must Not Be Empty!');
           }
        else if(this.state.password_confirmation==0){
            toast('Confirm Password Field Must Not Be Empty!');
        }
        else if(this.state.password_confirmation!=this.state.password){
            toast('Password does not match!');
        }
        else{
            const postBody={
                password:this.state.password,
                password_confirmation:this.state.password,
                confirmcode:this.state.confirmcode,
             }
            const result =await ResetPasswordSave(postBody);
            if(result.confirmCodeCheck){
                toast('Confirmed code is not valid');
            }
           else if(result.success){
                toast('successfully you obtain new password!Now you can login by your new password!');
              this.setState({
                   password:'',
                   password_confirmation:'',
                   errors:'',
                   confirmcode:'',
                   errormessage:'',


            });

            }

            else{
                // const {history}=this.props;
                // history.push('')
                this.setState({
                    errors: result.errors,
                   // isLoading: false,
                    errormessage: result.message,
                });
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
                  <h2 class="text-center">Reset Your Password</h2>
                  <p>Generate Your new password.</p>
                  <div class="panel-body">

                    <form id="register-form" role="form" autocomplete="off" class="form" onSubmit={this.ForgetPasswordF}>

                    <div class="form-group">
                        <div class="input-group">
                          <span class="input-group-addon"><i class="glyphicon glyphicon-envelope color-blue"></i></span>
                          <input id="confirmcode" name="confirmcode" placeholder="Pin Code" class="form-control"  type="number" onChange={(e)=>this.ChangeInput(e)} value={this.state.confirmcode} />

                         </div>
                         {this.state.errors && this.state.errors.confirmcode && (
                                <p class="text-danger">{this.state.errors.confirmcode[0]}</p>
                            )}
                      </div>
                      <div class="form-group">
                        <div class="input-group">
                          <span class="input-group-addon"><i class="glyphicon glyphicon-envelope color-blue"></i></span>
                          <input id="password" name="password" placeholder="new password" class="form-control"  type="password" onChange={(e)=>this.ChangeInput(e)} value={this.state.password} />

                         </div>
                         {this.state.errors && this.state.errors.password && (
                                <p class="text-danger">{this.state.errors.password[0]}</p>
                            )}
                      </div>
                      <div class="form-group">
                        <div class="input-group">
                          <span class="input-group-addon"><i class="glyphicon glyphicon-envelope color-blue"></i></span>
                          <input id="password" name="password_confirmation" placeholder=" repeat new password" class="form-control"  type="password" onChange={(e)=>this.ChangeInput(e)} value={this.state.password_confirmation} />

                        </div>
                        {this.state.errors && this.state.errors.password_confirmation && (
                                <p class="text-danger">{this.state.errors.password_confirmation[0]}</p>
                            )}
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

export default resetPassword;
