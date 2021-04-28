import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {LoginForm} from "./components/login.component";
import { BrowserRouter, Switch, Route, NavLink} from "react-router-dom";
import auth from './services/auth';
import RegisterForm from './components/register.component';
import {HouseDoor, PersonCircle} from 'react-bootstrap-icons';
import {ImageContainer} from './components/image-container';
import {ImageUpload} from './components/upload-image';
import GuardedRoute from './services/guarded-route';

class App extends Component {
    constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
      this.state = {
      currentUser: auth.getCurrentUser(),
    };  
  }

    logOut() {
        auth.logout();
    }
    
    render() {
      const {currentUser} = this.state;
      
      return (
        
          <BrowserRouter forceRefresh = {true}>
            
              <nav className="navbar navbar-expand-lg fixed-bottom">
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                      {currentUser ? (
                      <>
                      <li className="nav-item ml-3 text-center">
                          <NavLink to={"/home"} className="nav-link px-5" activeClassName="active-link">
                              <HouseDoor size = "50"></HouseDoor><br></br>
                              <h4>HEM</h4>        
                          </NavLink>
                      </li>
                      <li className="nav-item ml-3 text-center">

                          <a href="/login" className="nav-link pl-3" onClick={this.logOut}>
                              <PersonCircle size = "50"></PersonCircle><br></br>
                              <h4>LOGGA UT</h4>
                          </a> 
                      </li>
                      </>
                      ):(
                      <>
                      <li className="nav-item ml-3 text-center ">
                          <NavLink to={"/home"} className="nav-link px-5" activeClassName="active-link">
                              <HouseDoor size = "50"></HouseDoor><br></br>
                              <h4>HEM</h4>        
                          </NavLink>
                      </li>
                      <li className="nav-item ml-3 text-center">
                          <NavLink to={"/login"} className="nav-link px-4" activeClassName="active-link">
                              <PersonCircle size = "50"></PersonCircle><br></br>
                              <h4>LOGGA IN</h4>
                          </NavLink>
                      </li>
                     
                      <li className="nav-item  text-center">
                          <NavLink to={"/register"} className="nav-link" activeClassName="active-link">
                              regtstrer in
                          </NavLink>   
                      </li> 
                      </>
                  )}
              </ul>
          </nav>
          <Switch>
              <Route path = "/login" component={LoginForm}/>
              <Route path = "/register" component={RegisterForm} />
              <Route path = "/home" component = {ImageContainer}/>
              <GuardedRoute path = "/upload" component = {ImageUpload} auth = {auth.isAdmin()}/>
          </Switch>
          </BrowserRouter>

          
      )
    }
}

export default App;
