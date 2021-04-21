import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
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
      return (
      <div className="container">
        
          <div className="navbar-nav ml-auto">
          <header className="App-header">
        
          <BrowserRouter>
          <nav className="navbar navbar-expand-lg fixed-bottom">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              {currentUser ? (
              <li className="nav-item active">

              <a href="/login" className="nav-link" onClick={this.logOut}>
                    Logga ut {currentUser.role}
              </a> </li>):(
                <div>
              <li className="nav-item active">
              <Link to={"/images"} className="nav-link">
                      Hem
                  </Link>
              </li>
              
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
              <li className = "nav-item">
                  <Link to={"/images"} className="nav-link">
                      Images
                  </Link>
              </li></div>)}
            </ul>
          </nav>
          <Switch>
              <Route path = "/login" component={LoginForm}/>
              <Route path = "/register" component={RegisterForm}/>
              <Route path = "/images" component = {Images}/>

            </Switch>
          </BrowserRouter>
          </header>
        </div>    
      </div>
      )
    }
}

export default App;
