import React, { Component } from "react";
import auth from '../services/auth';


const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword= this.onChangePassword.bind(this);
    }

    handleSubmit(e) { 

        console.log(this.state.email)
        console.log(this.state.password)
        auth.login(this.state.email, this.state.password);
        console.log(this.state);

    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    render(){
    return(
        <div className="wrapper fadeInDown">
            <div id="formContent">

                <form >
                    <input type="text" id="login" className="fadeIn second" name="login" placeholder="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required]}/>
                    <input type="text" id="password" className="fadeIn third" name="login" placeholder="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required]}/>
                    <button type="button" onClick={this.handleSubmit.bind(this)} className ="btn btn-primary" > Log In</button>
                </form>

            </div>    
        </div>
    )
    }
}