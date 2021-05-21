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
        this.setState({screensaverActive: false,})
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
                  <ul className=" navbar-nav ml-3">
                      
                      {currentUser ? (
                    // Logged in user
                      <>
                      <li className="nav-item text-center">
                          <NavLink to={"/home"} className="nav-link" activeClassName="active-link">
                              <HouseDoorFill className = "menu-icon" size = "50"></HouseDoorFill><br></br>
                              <h4 className = "menu-text">HEM</h4>        
                          </NavLink>
                      </li>
                      
                      <li className ="nav-item text-center">
                            <a href="/system" className="nav-link" onClick={this.logOut}>
                              <PersonCircle className = "menu-icon" size = "50"></PersonCircle><br></br>
                              <h4 className = "menu-text">LOGGA UT</h4>
                          </a> 
                      </li>
                      <li className="nav-item text-center">

                        <NavLink to = {"/system"} className="nav-link" isActive ={() => pathname[1] === 'system'} activeClassName="active-link">
                              <CameraReelsFill className = "menu-icon" size = "50"></CameraReelsFill><br></br>
                              <h4 className = "menu-text">SYSTEM</h4>
                          </NavLink> 
                      </li>
                      
                      {(pathname[2] === 'overview' ) && (
                          // if pathname = /overview
                          <>
                            <ChevronCompactRight className = "menu-icon my-auto mx-0" size = "40" color="gray"></ChevronCompactRight>
                            <li className="submenu nav-item text-center">
                                <NavLink to={"/system/overview"} className="nav-link" activeClassName="active-link">
                                    <h4 className="overview-text">SYSTEM <br></br> ÖVERBLICK</h4>
                                </NavLink> 
                            </li>
                            {availableSystems.includes(pathname[3]) && (
                            <>
                                <ChevronCompactRight className = "menu-icon my-auto mx-0" size = "40" color="gray"></ChevronCompactRight>
                                <li className="submenu nav-item text-center">
                                    <NavLink to={`/system/overview/${pathname[3]}`} className="nav-link" activeClassName="active-link">
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
                      <li className="nav-item text-center ">
                          <NavLink to={"/home"} className="nav-link" activeClassName="active-link">
                              <HouseDoorFill className = "menu-icon" size = "50"></HouseDoorFill><br></br>
                              <h4 className = "menu-text">HEM</h4>        
                          </NavLink>
                      </li>
                      <li className="nav-item text-center">
                          <NavLink to={"/login"} className="nav-link " activeClassName="active-link">
                              <PersonCircle className = "menu-icon" size = "50"></PersonCircle><br></br>
                              <h4 className = "menu-text">LOGGA IN</h4>
                          </NavLink>
                      </li>   
                      </>
                  )}
                </ul>
              {currentRole && (
                  // If it is admin you can also register new
                <>
                <ul className = "navbar-nav mr-3">

                    {(pathname[1]==='home' || pathname[1] === 'upload') && (<>
                        <li className="nav-item text-center">
                        
                        <NavLink to={"/upload"} className="nav-link" activeClassName="active-link">
                            <PencilSquare className = "menu-icon" size = "50"></PencilSquare><br></br>
                            <h4 className = "menu-text">REDIGERA</h4>
                        </NavLink> 
                    </li>
                    </>)}

                    {((pathname[2] === 'overview')) && (<>
                        <li className="nav-item text-center">
                            <NavLink to="/system/overview/create/new" className="nav-link" activeClassName="active-link">
                                <PlusSquare className = "menu-icon" size = "50"></PlusSquare><br></br>
                                <h4 className = "menu-text">LÄGG TILL</h4>
                            </NavLink> 
                        </li> 
                    </>)}
                    
                    {((pathname[2] === 'overview') && availableSystems.includes(pathname[3])) && (<>
                        
                        <li className="nav-item text-center">
                            <NavLink to={`/system/overview/${pathname[3]}/edit`} className="nav-link" activeClassName="active-link">
                                <PencilSquare className = "menu-icon" size = "50"></PencilSquare><br></br>
                                <h4 className = "menu-text">REDIGERA</h4>
                            </NavLink> 
                        </li>            
                    </>)}
                    <li className="nav-item text-center">
                        
                        <NavLink to={"/register"} className="nav-link" activeClassName="active-link">
                            <PersonPlus className = "menu-icon" size = "50"></PersonPlus><br></br>
                            <h4 className = "menu-text">NY PROFIL</h4>
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
