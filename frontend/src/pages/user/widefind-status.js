import React from 'react';
import systemss from '../../services/systems';
import socketClient from 'socket.io-client';


const pathname = window.location.pathname.split('/');

export default class WidefindStatus extends React.Component {

    state= {
        systems: [],
        system: pathname[3],
        tagID: "",
        fromStart: "",
        coordinates: [],
        statusColor: 'yellow',
        statusText: 'Väntar på koordinater',
        socket : socketClient ('http://130.240.114.29:5000/')

    }

    componentDidMount(){
        this.getSystemInfo();
        this.state.socket.on('connect', () => {
            this.state.socket.emit('widefind')
            this.state.socket.on('new-message', data => {
                const coord = data.split(',');
                const tag = coord[0].split(':');

                this.setState({statusText: 'Aktiv', statusColor:'green',tagID:tag[1], coordinates: [coord[2], coord[3], coord[4]]});
            });
        });
        this.state.socket.on('disconnect', () => {
            this.setState({statusText: 'Inte uppkopplad', statusColor: 'red'});
        });
   }
    componentWillUnmount() {
    }

    getSystemInfo = async () => { 
        const res = await systemss.getSystemInfo(this.state.system);
        if (res) {
            this.setState({systems: res.data});
        } 
    }

    render() {
        return (
            <div className = "main">
                <div className ="specific-status d-flex justify-content-center"> 
                    <div className = "specific-system-status card">
                        <div className = "card-body mx-3">
                        {this.state.systems ? (
                        <>
                        <div className = "mb-5 w-100">
                        <h2 className = "float-left">{this.state.systems.title}</h2>
                        <span className={this.state.statusColor+"-dot float-left ml-4 my-1 py-3 px-3 "}></span>
                        <p className="fibaro-text float-left">{this.state.statusText}</p>

                        </div>
                        <div className = "pt-4">
                            <h4>{'Tagg med ID: ' + this.state.tagID}</h4>
                            <p>Koordinater:</p>
                            <ul>
                                <li>
                                    {'x: ' + this.state.coordinates[0] }
                                </li>
                                <li>{'y: ' + this.state.coordinates[1]}</li> 
                                <li>{'z: ' + this.state.coordinates[2]}</li></ul>
                       
                        </div>
                        </>
                        ):(
                        <h2>System is not found</h2>
                        )}
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

