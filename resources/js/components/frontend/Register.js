import React from 'react';
import { storeRegistration } from '../Services/LoginRegService';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../CommonURL";
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            password:'',
            password_confirmation: '',
            user_rule:'',
            errors:'',

          }
    }
    changeInput=(e)=>{
        this.setState({
            [e.target.name]: e.target.value,
        });

    }
    submitform = async (e) => {
        e.preventDefault();
        const { history } = this.props;
        // this.setState({ isLoading:true  });
        const postBody = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
            user_rule:this.state.user_rule,
            // user_id:1,
        };
        // const response = await storeData(postBody);
        const response = await storeRegistration(postBody);

        if (response.success) {
            this.setState({
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                errors: false,
                // isLoading:false,
            });
           // alert('add successfully');
            history.push(`${PUBLIC_URL}verification`);
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
            <div class="register">
                <h2><i class="fa fa-registered" aria-hidden="true"></i>
Registration </h2>
                    <form onSubmit={this.submitform} >
                    <div class="row">

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="email"> Name:</label>
                                    <input type="text" class="form-control" id="name" placeholder="Enter  Name" name="name"  value={this.state.name}
                                        onChange={(e) => this.changeInput(e)} ></input>
                                    {this.state.errors && this.state.errors.name && (
                                        <p class="text-danger">{this.state.errors.name[0]}</p>
                                    )}
                                </div>
                            </div>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" class="form-control" id="email" placeholder="Enter email" name="email"
                                value={this.state.email}
                                onChange={(e) => this.changeInput(e)}  ></input>
                            {this.state.errors && this.state.errors.email && (
                                <p class="text-danger">{this.state.errors.email[0]}</p>
                            )}
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="pwd">Password:</label>
                                    <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="password"
                                        value={this.state.password}
                                        onChange={(e) => this.changeInput(e)}
                                    ></input>
                                    {this.state.errors && this.state.errors.password && (
                                        <p class="text-danger">{this.state.errors.password[0]}</p>
                                    )}
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="pwd">Confirm Password:</label>
                                    <input type="password" class="form-control" id="pwd" placeholder="Enter Confirm password" name="password_confirmation"
                                        value={this.state.password_confirmation}
                                        onChange={(e) => this.changeInput(e)}
                                    ></input>
                                    {this.state.errors && this.state.errors.password_confirmation && (
                                        <p class="text-danger">{this.state.errors.password_confirmation[0]}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Register as </label>
                            <select class="form-control" id="exampleFormControlSelect1" name="user_rule"
                                onChange={(e) => this.changeInput(e)}
                               >
                                <option value="Teacher">Teacher</option>
                                <option value="Student">Student</option>

                            </select>
                            {this.state.errors && this.state.errors.user_rule && (
                                <p class="text-danger">{this.state.errors.user_rule[0]}</p>
                            )}
                        </div>

                                <button type="submit" class="btn btn-success btn-block" >Submit</button>
                               </form>
                               </div>
            </>
          );
    }
}

export default withRouter(Register);
