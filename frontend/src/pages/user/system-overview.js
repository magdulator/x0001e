import React, {Component} from "react";
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
            <div className = "main">
            <div className = "system-overview d-flex justify-content-center flex-wrap overview text-center py-5">
                <h1 className="system-overview-h1 w-100">Klicka på ett system för att läsa mer om det</h1>
                <hr></hr>
                <div  className="system-row row">
                {availableSystems.length > 0 && (
                    availableSystems.map(system => (
                        <div key = {system.title} className="specific-system col-4">
                        
                                <div className="card my-3 py-3">
                                    <a className="card-block stretched-link text-decoration-none" href ={`overview/${system.systemName}`}>
                                    <div className = "system-text w-100 card-body text-center">
                                        <h2 >{system.title}</h2>
                                    </div></a>
                                </div>
                                </div>
                    ))
                )}
                </div>
                </div>                    
            </div>
            
        )
    }
}

export {SystemOverview};