import React from 'react';
import images from '../services/images';
import systems from '../services/systems';

const pathname = window.location.pathname.split('/');

export default class OverviewSpecific extends React.Component {
    state= {
        systems: [],
        system: pathname[3],
        image: "",
    }

    componentDidMount(){
        this.getSystemInfo();
        this.getImage();
    }

    getImage = async () => {
        const res = await images.getSystemImage(this.state.system);
        if(res) {
            this.setState({image: res})
        }
    }

    getSystemInfo = async () => { 
        const res = await systems.getSystemInfo(this.state.system);
        this.setState({systems: res.data}); 
    }

    render() {
        return (
            <div className = "main">
                <div className ="specific d-flex justify-content-center"> 
                    <div className = "specific-system card">
                        <div className = "card-body mx-3">
                        {this.state.systems ? (
                        <>
                        <h2>{this.state.systems.title}</h2>
                        <p className = "my-4">{this.state.systems.description}</p>
                        <hr></hr>
                            {this.state.image && 
                            (<>
                            <p>Exempel data från systemet:</p>

                            <img
                                className = 'img-thumbnail my-1 mx-2'
                                src = {process.env.REACT_APP_API_URL +'/images/' +this.state.image.path}
                                alt="First slide"
                            /> </>)}
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

