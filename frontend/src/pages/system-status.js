import React, {Component} from "react";
import axios from 'axios';
import {ArrowRight, RecordFill} from 'react-bootstrap-icons';

export default class SystemStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {  
        availableSystems: [],
        };
    }

    componentDidMount() {
        this.getSystems();
        this.fibaroStatus();
    }

    getSystems = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL+'/systems');
            const empty = [];
            res.data.forEach(function (item, index) {
                const title = item.title;
                const systemName = item.systemName
                var hej = {systemName, title, status:"", statusText: "Ingen interaktion med riktig data än"}
                empty[index] = hej;
              });
            this.setState({availableSystems: empty})
                    }
        catch(e) {
            console.log(e);
        }
    }

    fibaroStatus = async () => {
        var statusColor = 'red';
        var statText = 'Server Error';
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL+'/fibaro/getAll');
            if(res.status === 200) {
                statusColor = 'green';
                statText = 'Aktiv'

                for (var i = 0; i < res.data.length; i++) {
                    if(res.data[i].properties.dead) {
                        statusColor = 'yellow';
                        statText = 'Problem med en eller flera sensorer'
                        break; 
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
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
    
                <div className = "system-container">
                {this.state.availableSystems.length > 0 ? (
                    this.state.availableSystems.map(system => (                    
                    <div className="system-card card" key={system.systemName}>
                        <a className="card-block stretched-link text-decoration-none text-dark" href ="system/overview">
                        <div className = "card-header py-0 pt-2 my-0 text-center" ><h4>{system.title}</h4><p>Mer information <ArrowRight></ArrowRight></p></div>
                        <div className = "card-body px-0">
                            <ul className= "list-unstyled pl-3 my-0">
                                <li className ="status"><RecordFill size="40" viewBox = "1 1 14 14" color="red" className="status-icon mr-3 float-left"></RecordFill><p className = "d-inline ">{system.statusText}</p></li>
                                <li className ="status"><RecordFill size="40" viewBox = "1 1 14 14" color="yellow" className="status-icon mr-3 float-left"></RecordFill><p className ="d-inline"></p></li>
                                <li className ="status"><RecordFill size="40" viewBox = "1 1 14 14" color="green" className="status-icon mr-3 float-left"></RecordFill><p className ="d-inline"></p></li>
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