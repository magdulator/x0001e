import React, {Component} from "react";
import fibaro from '../../services/fibaro-client';
import systems from '../../services/systems';
import socketClient from 'socket.io-client';


import {ArrowRight, XOctagon} from 'react-bootstrap-icons'
class System extends Component {
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
       
        this.state.socket.on('connect', () => {
            this.state.socket.emit('widefind')
        });
        this.state.socket.on('disconnect', () => {
            this.setState({StatusText: 'Inte uppkopplad', statusColor: 'red'});
        });

        var timer;
        let wideStatus = 'Aktiv';
        let wideColor = 'green'; 

        this.state.socket.on('new-message', data => {
            wideStatus = 'Aktiv';
            wideColor = 'green';
            clearTimeout(timer);
            timer = setTimeout(function() {
                wideStatus = 'Inga koordinater skickas'; 
                wideColor = 'yellow';
            }, 10000);
        });

        this.state.socket.on('disconnect', data => {
            wideStatus = 'Inte uppkopplad';
            wideColor = 'red';
        })

        this.timerID = setInterval(
            () => this.timedRequests(wideStatus, wideColor),      
            2000
        ); 
    }

    getSystems = async () => {
        const syst = await systems.getSystemsStatus()
        this.setState({availableSystems: syst})
    }

    timedRequests = async (wideStatus, wideColor) => {
        const fib = await fibaro.fibaroStatus();        

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
                            <li className='row my-3' key  = {system.title + "1"}>
                                <span className={system.status+"-dot d-block mx-3 my-1"}></span>
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
                        <XOctagon className="stop-icon" size = "160" color="darkred"></XOctagon>
                    </div></a>
                </div>
            </div>
            </div>
        )
    }
}

export {System};