import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';

class SystemOverview extends Component {
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
            const res = await axios.get(process.env.REACT_APP_API_URL+'/systems');
            const empty = [];
            res.data.forEach(function (item, index) {
                empty[index] = item;
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
            <div className = "d-flex justify-content-center flex-wrap overview text-center py-5">
                <h1 className="w-100">Klicka på ett system för att läsa mer om det</h1>
                <div className="w-100"></div>
                <hr></hr>
                <div  className="row w-50">
                {availableSystems.length > 0 && (
                    availableSystems.map(system => (
                        <div key = {system.title} className="col-5">
                        
                                <div className="w-100 card my-3 py-3">
                                    <a className="w-100 card-block stretched-link text-decoration-none" href ={`overview/${system.systemName}`}>
                                    <div className = "w-100 card-body text-center">
                                        <h2 >{system.title}</h2>
                                    </div></a>
                                </div>
                                </div>
                    ))
                )}
                </div>
                                       
            </div>
            
        )
    }
}

export {SystemOverview};