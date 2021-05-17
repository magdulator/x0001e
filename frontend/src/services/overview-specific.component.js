import axios from 'axios';
import React from 'react';
const pathname = window.location.pathname.split('/');

export default class OverviewSpecific extends React.Component {
    state= {
        systems: [],
        system: pathname[3],
    }

    componentDidMount(){
        this.getSystemInfo();
    }

    getSystems = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL+'/systems');
            return res.data;
        }
        catch(e) {
            console.log(e);
        }
    }

    getSystemInfo = async () => {
        try {
            
            const res = await axios.get(process.env.REACT_APP_API_URL + `/systems/${this.state.system}`)
            
            this.setState({systems: res.data});
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className = "main">
            <div className ="d-flex justify-content-center"> 
            <div className = "add-system  card">
                <div className = "card-body mx-3">
                    {this.state.systems ? (
                    <>
                        <h2>{this.state.systems.title}</h2>
                        <p className = "my-4">{this.state.systems.description}</p>
                        <hr></hr>
                            <p>Exempel data från systemet:</p>
                        <p>{this.state.systems.img}</p>
                        <p>{this.state.systems.exampleData}</p>
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
