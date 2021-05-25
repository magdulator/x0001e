import React, {Component} from "react";
import fibaro from '../../services/fibaro-client';
import systems from '../../services/systems';
import {ArrowRight} from 'react-bootstrap-icons';

export default class SystemStatus extends Component {
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
        const syst = await systems.getSystems()
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
        console.log(availableSystems)
            return(
            <div className = "main">
    
                <div className = "system-container d-flex justify-content-center flex-wrap py-5">
                {this.state.availableSystems.length > 0 ? (
                    this.state.availableSystems.map(system => (                    
                    <div className="system-card card" key={system.systemName}>
                        <a className="card-block stretched-link text-decoration-none text-dark" href ="system/overview">
                        <div className = "card-header py-0 pt-2 my-0 text-center" ><h4>{system.title}</h4><p>Mer information <ArrowRight></ArrowRight></p></div>
                        <div className = "card-body px-0 ">
                            <ul className= "status-list pl-3">
                                <li className ="status my-2">
                                    <span className="red-dot float-left mr-3"></span>
                                    <p className="jo">{system.status==='red'? system.statusText : ''}</p>
                                </li>
                                <li className ="status my-2">
                                <span className="yellow-dot float-left mr-3"></span>
                                    <p className ="jo">{system.status==='yellow'? system.statusText : ''}</p>
                                </li>
                                <li className ="status my-2">
                                <span className="green-dot float-left mr-3"></span>
                                    <p className ="jo">{system.status==='green'? system.statusText : ''}</p>
                                </li>
                            </ul>   
                        </div>
                        </a>
                    </div>
                    ))):(
                        <>hej</>
                    )}
                </div>
            </div>
            )
        }
}

export {SystemStatus};