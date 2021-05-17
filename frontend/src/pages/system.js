import React, {Component} from "react";
import axios from 'axios';

import {ArrowRight, XOctagon, RecordFill} from 'react-bootstrap-icons'
class System extends Component {
    constructor(props) {
        super(props);
        this.state = {  
        availableSystems: [],
        };  
    }

    componentDidMount() {
        this.getSystems();
    }

    getSystems = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL+'/systems/');
            const empty = [];
            res.data.forEach(function (item, index) {
                empty[index] = item.title;
              });
            this.setState({availableSystems: empty})
        }
        catch(e) {
            console.log(e);
        }
    }
    render() {
        const {availableSystems} = this.state;
        return(
            <div className = "main">

            <div className = "system-container">
                <div className="system-card card">
                    <a className="card-block stretched-link text-decoration-none text-dark" href ="system/overview">
                    <div className = "card-header py-0 pt-2 my-0 text-center" ><h4>System överblick</h4><p>Mer information <ArrowRight></ArrowRight></p></div>
                    <div className = "card-body px-0">
                        <ul>
                        {availableSystems.length > 0 && (
                            availableSystems.map(system => (
                            <li key = {system}>{system}</li>
                            )))}
                        </ul>
                    </div></a>
                </div>
                <div className="system-card card" >
                    <a className="card-block stretched-link text-decoration-none text-dark" href ="system/status">
                    <div className = "card-header py-0 pt-2 my-0 text-center"><h4>System status</h4><p>Mer information <ArrowRight></ArrowRight></p></div>
                    <div className = "card-body px-0">
                        <ul className = "list-unstyled pl-3 my-0">
                        {availableSystems.length > 0 && (
                            availableSystems.map(system => (
                            <li key  = {system + "1"}><RecordFill size="30" viewBox = "0 0 14 14" color="green" className="status-icon"></RecordFill>{system}</li>
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
                        <XOctagon className="stop-icon" size = "110" color="darkred"></XOctagon>
                    </div></a>
                </div>
            </div>
            </div>
        )
    }
}

export {System};