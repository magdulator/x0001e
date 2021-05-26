import React from 'react';
import images from '../../services/images';
import systemss from '../../services/systems';
import fibaro from '../../services/fibaro-client';

const pathname = window.location.pathname.split('/');

export default class FibaroStatus extends React.Component {
    state= {
        systems: [],
        system: pathname[3],
        sensorsProblem: [],

    }

    componentDidMount(){
        this.getSystemInfo();
        this.timedRequests();
        this.timerID = setInterval(
            () => this.timedRequests(),      
            5000      //Screen saver time 
        );
   }
    componentWillUnmount() {
        clearInterval(this.timerID)
    }
    

    getImage = async () => {
        const res = await images.getSystemImage(this.state.system);
        if(res) {
            this.setState({image: res})
        }
    }

    getSystemInfo = async () => { 
        const res = await systemss.getSystemInfo(this.state.system);
        this.setState({systems: res.data}); 
    }

    timedRequests = async () => {
        const fib = await fibaro.fibaroStatus();
        const fiba = await fibaro.fibaroDead();
        this.setState({sensorsProblem: fiba});
        this.setState({statusText: fib[1], statusColor:fib[0]});
        
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
                        <p className="fibaro-text float-left">{"Problem med " + this.state.sensorsProblem.length + ' sensorer'}</p>
                        <hr></hr>
                        </div>
                        <div className = "pt-4">
                        {this.state.sensorsProblem.length>0? (
                            this.state.sensorsProblem.map(sensor => (
                                <>
                                <div className = "sensor-info pt-2">
                                <div class="row mx-3">
                                    <p class="col-sm-5 ">Namn på sensorn:</p>
                                    <p className ='col-sm-4'>{sensor.name}</p>
                                </div>
                                <div class="row mx-3">
                                    <p class="col-sm-5 ">Typ av sensor:</p>
                                    <p className ='col-sm-4'>{sensor.type}</p>
                                </div>
                                <div class="row mx-3">
                                    <p class="col-sm-5 ">Orsak till problem:</p>
                                    <p className ='col-sm-4'>{sensor.reason}</p>
                                </div>
                                </div>
                                <div className = "w-100 py-2"></div>
                                </>
           
                            ))
                      
                        ):(
                        <>
                        </>
                        )}
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

