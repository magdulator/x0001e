import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {LoginForm} from "./pages/login.component";
import { BrowserRouter, Switch, Route, NavLink} from "react-router-dom";
import auth from './services/auth';
import RegisterForm from './pages/register.component';
import {HouseDoorFill, PersonCircle, CameraReelsFill, ChevronCompactRight, PersonPlus, PencilSquare, PlusSquare} from 'react-bootstrap-icons';
import {ImageContainer} from './pages/image-container';
import {ImageUpload} from './pages/upload-image';
import GuardedRoute from './services/guarded-route';
import {System} from './pages/system';
import {SystemOverview} from './pages/system-overview';
import Screensaver from './components/screensaver.component';
import OverviewSpecific from "./services/overview-specific.component";
import axios from 'axios';
import EditOverviewSpecific from './pages/edit-overview-specific';
import AddSystemSpecific from './pages/add-system-specific';

const screensaver_time = 30000; //milliseconds until screensaver is active

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.inactivateScreenSaver = this.inactivateScreenSaver.bind(this)
        this.state = {  
        currentUser: auth.getCurrentUser(),
        currentRole: auth.isAdmin(),
        screensaverActive: false,
        availableSystems: [],
        };  
    }
    componentDidMount() {
        this.getSystems();

        this.timerID = setInterval(
            () => this.activateScreenSaver(),      
            screensaver_time      //Screen saver time 
        );
   }
    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    getSystems = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL+'/systems');
            const empty = [];
            res.data.forEach(function (item, index) {
                empty[index] = item.systemName;
              });
            this.setState({availableSystems: empty})
        }
        catch(e) {
            console.log(e);
        }
    }

    activateScreenSaver() {
        this.setState({screensaverActive: true,})
        clearInterval(this.timerID)
    }

    inactivateScreenSaver() {
        clearInterval(this.timerID)     
        if(this.state.screensaverActive === true) {
            this.setState({screensaverActive: false})
            this.timerID = setInterval(
                () => this.activateScreenSaver(),      
            screensaver_time      //Screen saver time 
            );
        }
    }


    logOut() {
        auth.logout()
    }
    
    render() {
        const {currentUser, currentRole, screensaverActive, availableSystems} = this.state;
        const pathname = window.location.pathname.split('/');
        
        return (
            <div className = "App "  onClick = {this.inactivateScreenSaver}>
            {screensaverActive ? (<><Screensaver></Screensaver></>):(<>
           
            <BrowserRouter forceRefresh = {true}>
            
              <nav className="navbar navbar-expand-lg fixed-bottom justify-content-between">
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0 py-2">
                      
                      {currentUser ? (
                    // Logged in user
                      <>
                      <li className="nav-item ml-3 text-center text-secondary ">
                          <NavLink to={"/home"} className="nav-link px-5 text-dark py-auto" activeClassName="active-link">
                              <HouseDoorFill size = "50"></HouseDoorFill><br></br>
                              <h4 className="pt-1">HEM</h4>        
                          </NavLink>
                      </li>
                      
                      <li className ="nav-item ml-3 text-center">
                            <a href="/system" className="nav-link pl-3 text-dark" onClick={this.logOut}>
                              <PersonCircle size = "50"></PersonCircle><br></br>
                              <h4 className="pt-1">LOGGA UT</h4>
                          </a> 
                      </li>
                      <li className="nav-item ml-3 text-center  pl-3">

                        <NavLink to = {"/system"} className="nav-link px-4 text-dark" isActive ={() => pathname[1] === 'system'} activeClassName="active-link">
                              <CameraReelsFill size = "50"></CameraReelsFill><br></br>
                              <h4 className="pt-1">SYSTEM</h4>
                          </NavLink> 
                      </li>
                      
                      {((pathname[2] === 'overview' )) && (
                          // if pathname = /overview
                          <>
                            <ChevronCompactRight size = "40" color="gray" className = "my-auto"></ChevronCompactRight>
                            <li className="nav-item my-auto text-center">
                                <NavLink to={"/system/overview"} className="nav-link text-dark" activeClassName="active-link">
                                    <h4 className="overview-text py-auto">SYSTEM <br></br> ÖVERBLICK</h4>
                                </NavLink> 
                            </li>
                            {availableSystems.includes(pathname[3]) && (
                            <>
                                <ChevronCompactRight size = "40" color="gray" className = "my-auto"></ChevronCompactRight>
                                <li className="nav-item my-auto text-center">
                                    <NavLink to={`/system/overview/${pathname[3]}`} className="nav-link text-dark" activeClassName="active-link">
                                        <h4 className="overview-system-text ">{pathname[3].toUpperCase()}</h4>
                                    </NavLink>
                                </li>
                            </>
                            )}
                        </>
                      )} 
                      </>
                      ):(
                        // Not logged in
                      <>
                      <li className="nav-item ml-3 text-center ">
                          <NavLink to={"/home"} className="nav-link px-5 text-dark" activeClassName="active-link">
                              <HouseDoorFill size = "50"></HouseDoorFill><br></br>
                              <h4 className="pt-1">HEM</h4>        
                          </NavLink>
                      </li>
                      <li className="nav-item ml-3 text-center">
                          <NavLink to={"/login"} className="nav-link px-4 text-dark " activeClassName="active-link">
                              <PersonCircle size = "50"></PersonCircle><br></br>
                              <h4 className="pt-1">LOGGA IN</h4>
                          </NavLink>
                      </li>   
                      </>
                  )}
                </ul>
              {currentRole && (
                  // If it is admin you can also register new
                <>
                <ul className = "navbar-nav mr-5">

                    {(pathname[1]==='home' || pathname[1] === 'upload') && (<>
                        <li className="nav-item ml-3 text-center">
                        
                        <NavLink to={"/upload"} className="nav-link px-4 text-dark" activeClassName="active-link">
                            <PencilSquare size = "50"></PencilSquare><br></br>
                            <h4 className="pt-1">REDIGERA</h4>
                        </NavLink> 
                    </li>
                    </>)}

                    {((pathname[2] === 'overview')) && (<>
                        <li className="nav-item ml-3 text-center">
                            <NavLink to="/system/overview/create/new" className="nav-link px-2 text-dark" activeClassName="active-link">
                                <PlusSquare size = "50"></PlusSquare><br></br>
                                <h4 className="pt-1">NYTT SYSTEM</h4>
                            </NavLink> 
                        </li> 
                    </>)}
                    
                    {((pathname[2] === 'overview') && availableSystems.includes(pathname[3])) && (<>
                        
                        <li className="nav-item ml-3 text-center">
                            <NavLink to={`/system/overview/${pathname[3]}/edit`} className="nav-link px-4 text-dark" activeClassName="active-link">
                                <PencilSquare size = "50"></PencilSquare><br></br>
                                <h4 className="pt-1">REDIGERA</h4>
                            </NavLink> 
                        </li>            
                    </>)}
                    <li className="nav-item ml-3 text-center">
                        
                        <NavLink to={"/register"} className="nav-link px-4 text-dark" activeClassName="active-link">
                            <PersonPlus size = "50"></PersonPlus><br></br>
                            <h4 className="pt-1">NY PROFIL</h4>
                        </NavLink> 
                    </li>
                </ul>
                </>
                )}
                        
          </nav>
          <Switch>
                <Route path = "/login" component={LoginForm}/>
                <Route path = "/register" component={RegisterForm} />
                <Route path = "/home" component = {ImageContainer} />
                <GuardedRoute exact path = "/system" component = {System} auth ={auth.isAuth()}/>
                <GuardedRoute path = "/upload" component = {ImageUpload} auth = {auth.isAdmin()}/>
                <GuardedRoute path = "/register" component = {RegisterForm} auth = {auth.isAdmin()}/>
                <GuardedRoute exact path = "/system/overview" component = {SystemOverview} auth = {auth.isAuth()}/>
                <GuardedRoute exact path = "/system/overview/:systemName" component = {OverviewSpecific} auth = {auth.isAuth()}/>
                <GuardedRoute exact path = "/system/overview/:systemName/edit" component = {EditOverviewSpecific} auth = {auth.isAdmin()}/>
                <GuardedRoute exact path = "/system/overview/create/new" component = {AddSystemSpecific} auth = {auth.isAdmin()}/>

          </Switch>
          </BrowserRouter>
          </>)}
        </div>

      )
    }
}

export default App;
