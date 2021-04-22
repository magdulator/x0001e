import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LoginForm from "./components/login.component";
import { BrowserRouter, Switch, Route, Link, NavLink} from "react-router-dom";
import auth from './services/auth';
import {Images} from './components/images.component';
import RegisterForm from './components/register.component';
import {HouseDoor, PersonCircle} from 'react-bootstrap-icons';

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
          <header className="App-header">
        
          <BrowserRouter>
            
              <nav className="navbar navbar-expand-lg fixed-bottom">
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                      {currentUser ? (
                      <li className="nav-item">

                          <a href="/login" className="nav-link pl-3" onClick={this.logOut}>
                              <PersonCircle size = "50" className ="ml-4"></PersonCircle><br></br>
                                  <h4>LOGGA UT</h4>
                          </a> 
                      </li>):(
                      <>
                      <li className="nav-item ml-3">
                          <NavLink to={"/images"} className="nav-link px-5" activeClassName="active-link">
                              <HouseDoor size = "50"></HouseDoor><br></br>
                              <h4>HEM</h4>        
                          </NavLink>
                      </li>
                      <li className="nav-item ml-3">
                          <NavLink to={"/login"} className="nav-link px-4" activeClassName="active-link">
                              <PersonCircle size = "50" className ="ml-4"></PersonCircle><br></br>
                              <h4>LOGGA IN</h4>
                          </NavLink>
                      </li>
                     
                      <li className="nav-item">
                          <NavLink to={"/register"} className="nav-link px-5" activeClassName="active-link">
                              regtstrer in
                          </NavLink>   
                      </li>
                      
                      </>
                  )}
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
      )
    }
}

export default App;
