import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login.component";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import auth from './services/auth';

class App extends Component {
    constructor(props) {
      super(props);
    
    this.state = {
      currentUser: auth.getCurrentUser()
    };
  }
    render() {
      const {currentUser} = this.state;
      console.log(currentUser);
      return (
      <div className="App">
          <header className="App-header">
        
          <BrowserRouter>
          <div className="navbar-nav ml-auto">
              <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                      Login
                  </Link>
              </li>
          
          </div>
          <Switch>
              <Route path = "/login" component={Login}/>

            </Switch>
          </BrowserRouter>
          </header>
      </div>)
    }
}

export default App;
