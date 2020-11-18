import React from 'react';
class Verification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vcode:'',
            errors:'',
         }
    }
    render() {
        return (
            < >
            <div class="confarmation_page">
                <h2>Registration Confarmation form</h2>
                <form onSubmit={this.submitform} >

                            <div class="form-group">
                                <label for="email"> Verification Code which  have been already sent to your email</label>
                                <input type="number" class="form-control" id="name" placeholder="Enter Verification code" name="vcode" value={this.state.vcode}
                                    onChange={(e) => this.changeInput(e)} ></input>
                                {this.state.errors && this.state.errors.name && (
                                    <p class="text-danger">{this.state.errors.name[0]}</p>
                                )}
                       </div>
                       <div className="form-group">
                           <button type="submit"  className="btn btn-success">Submit</button>
                       </div>
                       </form>
                </div>
            </>
         );
    }
}

export default Verification;
