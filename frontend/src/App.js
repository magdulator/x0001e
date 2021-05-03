import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {LoginForm} from "./components/login.component";
import { BrowserRouter, Switch, Route, NavLink} from "react-router-dom";
import auth from './services/auth';
import RegisterForm from './components/register.component';
import {HouseDoor, PersonCircle, CameraReelsFill} from 'react-bootstrap-icons';
import {ImageContainer} from './components/image-container';
import {ImageUpload} from './components/upload-image';
import GuardedRoute from './services/guarded-route';
import {System} from './components/system';

class App extends Component {
    constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.state = {
      currentUser: auth.getCurrentUser(),
      currentRole: auth.isAdmin(),
      open: true,
    };  
  }
  handleClick() {
      if(this.state.open) {
        this.setState({open: false});
      }
        else {
            this.setState({open: true})
        }
  }

    logOut() {
        auth.logout();
    }
    
    render() {
      const {currentUser, currentRole } = this.state;
      
      return (
        
          <BrowserRouter forceRefresh = {true}>
            
              <nav className="navbar navbar-expand-lg fixed-bottom justify-content-between">
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                      {currentUser ? (
                      <>
                      <li className="nav-item ml-3 text-center text-secondary">
                          <NavLink to={"/home"} className="nav-link px-5 text-dark" activeClassName="active-link">
                              <HouseDoor size = "50"></HouseDoor><br></br>
                              <h4 className="pt-1">HEM</h4>        
                          </NavLink>
                      </li>
                      
                      <li className ="nav-item ml-3 text-center">
                            <a href="/system" className="nav-link pl-3 text-dark" onClick={this.logOut}>
                              <PersonCircle size = "50"></PersonCircle><br></br>
                              <h4 className="pt-1">LOGGA UT</h4>
                          </a> 
                      </li>
                      <li className="nav-item ml-3 text-center">

                          <NavLink to={"/system"} className="nav-link px-4 text-dark" activeClassName="active-link" onClick = {this.handleClick}>
                              <CameraReelsFill size = "50"></CameraReelsFill><br></br>
                              <h4 className="pt-1">SYSTEM</h4>
                          </NavLink> 
                      </li>
                      
                      </>
                      
                      ):(
                      <>
                      <li className="nav-item ml-3 text-center ">
                          <NavLink to={"/home"} className="nav-link px-5" activeClassName="active-link">
                              <HouseDoor size = "50"></HouseDoor><br></br>
                              <h4 className="pt-1">HEM</h4>        
                          </NavLink>
                      </li>
                      <li className="nav-item ml-3 text-center">
                          <NavLink to={"/login"} className="nav-link px-4" activeClassName="active-link">
                              <PersonCircle size = "50"></PersonCircle><br></br>
                              <h4 className="pt-1">LOGGA IN</h4>
                          </NavLink>
                      </li>
                     
                       
                      </>
                  )}
                  
              </ul>
              {currentRole && (
                          <>
                          <ul className = "navbar-nav mr-5">
                          <li className="nav-item ml-3 text-center">

                            <NavLink to={"/register"} className="nav-link px-4 text-dark" activeClassName="active-link">
                            <PersonCircle size = "50"></PersonCircle><br></br>
                                <h4 className="pt-1">NY PROFIL</h4>
                            </NavLink> 
                        </li>
                        </ul>

                          </>
                        )}
                        {this.state.open &&(
                            <>
                            <li className="nav-item ml-3 text-center">

                                <NavLink to={"/register"} className="nav-link px-4 text-dark" activeClassName="active-link">
                                <PersonCircle size = "50"></PersonCircle><br></br>
                                <h4 className="pt-1">NY PROFIL</h4>
                                </NavLink> 
                            </li>
                            </>
                        )}
          </nav>
          <Switch>
              <Route path = "/login" component={LoginForm}/>
              <Route path = "/register" component={RegisterForm} />
              <Route path = "/home" component = {ImageContainer}/>
              <GuardedRoute path = "/system" component = {System} auth ={auth.isAuth()}/>
              <GuardedRoute path = "/upload" component = {ImageUpload} auth = {auth.isAdmin()}/>
              <GuardedRoute path = "/register" component = {RegisterForm} auth = {auth.isAdmin()}/>
          </Switch>
          </BrowserRouter>

          
      )
    }
}

export default App;
