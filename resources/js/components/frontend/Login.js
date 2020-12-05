import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { loginUser } from '../Services/LoginRegService';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:"",
            user_rule:"",
            errors:'',
            errormessage:'',
            isLoading:false,

          }
    }
    changeInput=(e)=>{
        this.setState({ [e.target.name]:e.target.value });
    }
    formSubmit=async(e)=>{
        e.preventDefault();
        const {history}=this.props;
        const postBody={
           email:this.state.email,
           password:this.state.password,
           user_rule:this.state.user_rule,
        }
        const response = await loginUser(postBody);
        if(response.success){
         this.setState({
            //   email:"",
            //   password:"",
            //   user_rule:"",
              errors:"",
              errormessage:"",
              isLoading:true,

          });
             localStorage.setItem("LoginData", JSON.stringify(response));
            if(response.user.user_rule=='Student'){
                this.setState({ isLoading:false  });
                window.location.href = "/OARS/";
               // alert(response.user.user_rule);
            }
            else if(response.user.user_rule=='Admin'){
                window.location.href = "/OARS/";
            }
            else{
                window.location.href = "/OARS/";
            }
            console.log(response);

          //  history.push('/ICT-OARS/');

        }
        else {
            console.log("response.errors", response.errors);
            this.setState({
                errors: response.errors,
               // isLoading: false,
                errormessage: response.message,
            });
        }
    }
    render() {
        return (
            <>

                <div class="login">
                    <h2>Login form</h2>
                    {this.state.isLoading && (
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    )}
                    {this.state.errormessage.length > 0 && (
                        <p className="text-danger" style={{ textAlign: 'center' }}>
                            {this.state.errormessage}
                        </p>
                    )}

                    <form onSubmit={this.formSubmit} >

                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" class="form-control" id="email" placeholder="Enter email" name="email"
                                value={this.state.email} onChange={(e) => this.changeInput(e)} ></input>
                            {this.state.errors && this.state.errors.email && (
                                <p class="text-danger">{this.state.errors.email[0]}</p>
                            )}
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password" class="form-control" id="password" placeholder="Enter password" name="password"
                            value={this.state.password} onChange={(e) => this.changeInput(e)}></input>
                            {this.state.errors && this.state.errors.password && (
                                <p class="text-danger">{this.state.errors.password[0]}</p>
                            )}
                        </div>

                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Login as </label>
                            <select class="form-control" id="exampleFormControlSelect1" name="user_rule"
                                 onChange={(e) => this.changeInput(e)}>
                              <option value="">Select</option>
                                <option value="Teacher">Teacher</option>
                                <option value="Student">Student</option>
                                <option value="Admin">Admin</option>

                            </select>
                            {this.state.errors && this.state.errors.user_rule && (
                                <p class="text-danger">{this.state.errors.user_rule[0]}</p>
                            )}
                        </div>
                        {/* <div class="form-group form-check">
                        <label class="form-check-label">
                            <input class="form-check-input" type="checkbox" value="checked"> Remember me</input>
    </label>
  </div> */}
                        <button type="submit" class="btn btn-success btn-block" >Submit</button>
                        <p><Link to="/OARS/forgetPassword">Forget Password?</Link></p>
                    </form>
                </div>
            </>
        );
    }
}

export default withRouter(Login);
