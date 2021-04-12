import React, { Component } from "react";
import auth from '../services/auth';

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

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" id="login" className="fadeIn second" name="login" placeholder="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}/>
                    <input type="text" id="password" className="fadeIn third" name="login" placeholder="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}/>
                    <input type="submit" className="fadeIn fourth" value="Log In"/>
                </form>

            </div>    
        </div>
    )
    }
}