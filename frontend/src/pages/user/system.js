import React, {Component} from "react";
import fibaro from '../../services/fibaro-client';
import systems from '../../services/systems';

import {ArrowRight, XOctagon} from 'react-bootstrap-icons'
class System extends Component {
    constructor(props) {
        super(props);
        this.state = {  
        availableSystems: [],
        };  
    }

    componentDidMount() {
        this.getSystems();
        this.timedRequests();
    }

    getSystems = async () => {
        const syst = await systems.getSystemsStatus()
        this.setState({availableSystems: syst})
        
    }

    timedRequests = async () => {
        const fib = await fibaro.fibaroStatus();
        const statusColor = fib[0];
        const statText = fib[1]
        for (var n = 0; n<this.state.availableSystems.length; n++) {
            if(this.state.availableSystems[n].systemName === 'fibaro') {
                let availableSystems = [...this.state.availableSystems];
                let item = {...availableSystems[n]};
                item.status = statusColor;
                item.statusText = statText;
                availableSystems[n] = item;
                this.setState({availableSystems});
                break;
            }
        } 
    }

    render() {
        const {availableSystems} = this.state;
        return(
            <div className = "main">

            <div className = "system-container d-flex justify-content-center flex-wrap py-5">
                <div className="system-card card">
                    <a className="card-block stretched-link text-decoration-none text-dark" href ="system/overview">
                    <div className = "card-header py-0 pt-2 my-0 text-center" ><h4>System överblick</h4><p>Mer information <ArrowRight></ArrowRight></p></div>
                    <div className = "card-body px-0">
                        <ul>
                        {availableSystems.length > 0 && (
                            availableSystems.map(system => (
                            <li className = "system-title" key = {system.title}>{system.title}</li>
                            )))}
                        </ul>
                    </div></a>
                </div>
                <div className="system-card card" >
                    <a className="card-block stretched-link text-decoration-none text-dark" href ="system/status">
                    <div className = "card-header py-0 pt-2 my-0 text-center"><h4>System status</h4><p>Mer information <ArrowRight></ArrowRight></p></div>
                    <div className = "card-body px-0">
                        <ul className = "status-list pl-3 list-unstyled ">
                        {availableSystems.length > 0 && (
                            availableSystems.map(system => (
                            <li key  = {system.title + "1"}>
                                <span className={system.status+"-dot float-left mr-2"}></span>
                                <p className="jo">{system.title + ": "+ system.statusText}</p>

                            </li>
                            )))}
                        </ul>
                        
                    </div></a>
                </div>
                <div className="system-card card">
                    <a className="card-block stretched-link text-decoration-none text-dark" href ="system/scenario">
                    <div className = "card-header py-0 pt-2 my-0 text-center"><h4>Scenario</h4><p>Mer information <ArrowRight></ArrowRight></p></div></a>
                </div>
                <div className="system-card card">
                    <a className="card-block stretched-link text-decoration-none text-dark" href ="system/turnoff">
                    <div className = "card-header py-0 pt-2 my-0 text-center"><h4>Stäng av allt</h4><p>"</p></div>
                    <div className = "card-body px-0 py-3 text-center">
                        <XOctagon className="stop-icon" size = "170" color="darkred"></XOctagon>
                    </div></a>
                </div>
            </div>
            </div>
        )
    }
}

export {System};