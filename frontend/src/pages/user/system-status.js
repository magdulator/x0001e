import React, {Component} from "react";
import fibaro from '../../services/fibaro-client';
import systems from '../../services/systems';
import {ArrowRight} from 'react-bootstrap-icons';
import socketClient from 'socket.io-client';


export default class SystemStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {  
        availableSystems: [],
        socket : socketClient ('http://130.240.114.29:5000/')
        };
    }

    componentDidMount() {
        this.getSystems();
        this.timedRequests();
        this.timerID = setInterval(
            () => this.timedRequests(),      
            2000
        );
        this.state.socket.on('connect', () => {
            this.state.socket.emit('widefind')
        });
        this.state.socket.on('disconnect', () => {
            this.setState({StatusText: 'Inte uppkopplad', statusColor: 'red'});
        });

        
    }

    getSystems = async () => {
        const syst = await systems.getSystemsStatus()
        this.setState({availableSystems: syst})
    }

    timedRequests = async () => {
        const fib = await fibaro.fibaroStatus();

        //tanke: om det inte kommer ett new message från widefind på 10 sekunder sätts den oaktiv
        var timer;
        let wideStatus = 'Aktiv';
        let wideColor = 'green'; 

        this.state.socket.on('new-message', data => {
            clearTimeout(timer);
            timer = setTimeout(function() {
                wideStatus = 'Inga koordinater skickas';    //DESSA SÄTTS INTE
                wideColor = 'yellow';
            }, 10000);
        });

        for (var n = 0; n<this.state.availableSystems.length; n++) {
            if(this.state.availableSystems[n].systemName === 'widefind') {
                let availableSystems = [...this.state.availableSystems];
                let item = {...availableSystems[n]};
                item.status = wideColor;
                item.statusText = wideStatus;
                availableSystems[n] = item;
                this.setState({availableSystems});
            }
            if(this.state.availableSystems[n].systemName === 'fibaro') {
                let availableSystems = [...this.state.availableSystems];
                let item = {...availableSystems[n]};
                item.status = fib[0];
                item.statusText = fib[1];
                availableSystems[n] = item;
                this.setState({availableSystems});
                break;
            }
        } 
    }

    render() {
            return(
            <div className = "main">
    
                <div className = "system-container d-flex justify-content-center flex-wrap py-5">
                {this.state.availableSystems.length > 0 ? (
                    this.state.availableSystems.map(system => (                    
                    <div className="system-card card" key={system.systemName}>
                        <a className="card-block stretched-link text-decoration-none text-dark"  href ={`status/${system.systemName}`}>
                        <div className = "card-header py-0 pt-2 my-0 text-center" ><h4>{system.title}</h4><p>Mer information <ArrowRight></ArrowRight></p></div>
                        <div className = "card-body px-0 ">
                            <ul className= "status-list pl-3">
                                <li className ="status my-0">

                                    <span className="red-dot float-left mr-3"></span>
                                    <p className="jo">{system.status==='red'? system.statusText : ''}</p>
                                </li>
                                <li className ="status my-3">
                                <span className="yellow-dot float-left mr-3"></span>
                                    <p className ="jo">{system.status==='yellow'? system.statusText : ''}</p>
                                </li>
                                <li className ="status my-3">
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