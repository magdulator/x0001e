import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./components/login.component";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import auth from './services/auth';
import {Images} from './components/images.component';
import RegisterForm from './components/register.component';

class App extends Component {
    constructor(props) {
      super(props);
    
    this.state = {
      currentUser: auth.getCurrentUser()
    };
  }
  
    logOut() {
      auth.logout();
    }
    render() {
      const {currentUser} = this.state;
      console.log(currentUser);
      return (
      <div className="container">
          <header className="App-header">
        
          <BrowserRouter>
          <div className="navbar-nav ml-auto">

            {currentUser ? (

              <li className="nav-item"> 
                <a href="/login" className="nav-link" onClick={this.logOut}>
                    Logga ut
                </a>
              </li> ):(
                <div>
                  <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                      regtstrer in
                  </Link>
              </li>
              <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                      Logga in
                  </Link>
              </li>
              
              <li className="nav-item">
                  <Link to={"/images"} className="nav-link">
                      Images
                  </Link>
              </li></div>)}
          
          </div>
          <Switch>
              <Route path = "/login" component={LoginForm}/>
              <Route path = "/register" component={RegisterForm}/>
              <Route path = "/images" component = {Images}/>

            </Switch>
          </BrowserRouter>
          </header>
      </div>)
    }
}

export default App;
