import systems from '../../services/systems';
import React from 'react';
const pathname = window.location.pathname.split('/');

export default class EditOverviewSpecific extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            systems: [],
            system: pathname[3],
            title: "",
            description: "",
            img: "",
            exampleData: "",
            errorMessage: "",
            success: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteSystem = this.deleteSystem.bind(this);
        this.sendInfo = this.sendInfo.bind(this)
    }
    componentDidMount(){
        this.getSystemInfo();
    }

    getSystems = async () => {
        const res = await systems.getSystems();
        return res;
    }

    getSystemInfo = async () => {
        const res = await systems.getSystemInfo(this.state.system);            
        this.setState({title: res.data.title,
                    description: res.data.description,
                    img: res.data.img,
                    exampleData: res.data.exampleData,
        });
    }

    deleteSystem = async () => {
        const res = await systems.deleteSystem(this.state.system);
        this.setState({success: res[0], errorMessage: res[1]})
        //window.location.replace('/system/overview')
    }

    handleChange(event) { 
        const target = event.target;
        const name = target.name;
        this.setState({[name]: event.target.value});  
    }

    handleSubmit(event) {
        this.sendInfo();
        event.preventDefault();
    }

    sendInfo = async () => {
        const system = this.state.system;
        const title = this.state.title;
        const description = this.state.description;
        const img = this.state.img;
        const exampleData = this.state.exampleData;
        const res = await systems.sendInfo(system, title, description, img, exampleData);
        console.log(res)
        this.setState({success: res[0], errorMessage: res[1]});
    }

    render() {
        return (
            <div className = "main">
                <div className ="edit-system d-flex justify-content-center"> 
                    <div className = "card w-100">
                        <div className = "card-body mx-3">
                            {this.state.systems ? (
                            <form onSubmit = {this.handleSubmit}>
                                <h2>Redigera systemet</h2>
                                <h5 className = "py-2">Namn på systemet:</h5>
                                <div className = "input-group input-group-lg">
                                    <input name="title" type="text" className="form-control" value={this.state.title || ''} onChange={this.handleChange} aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                </div> 
                                <h5 className = "py-2">Beskrivning av systemet:</h5>
                                <div className = "input-group input-group-lg">
                                    <textarea name="description" className="form-control" value = {this.state.description || ''} onChange={this.handleChange}/>
                                </div>
                                <h5 className = "py-2">Bild på exempeldata:</h5>  
                                <div className = "input-group input-group-lg">
                                    <input name="img" type = "text" className="form-control" value = {this.state.img || ''} onChange={this.handleChange}/>
                                </div> 
                                <h5 className = "py-2">Beskrivande text för datat:</h5>
                                <div className = "input-group input-group-lg">
                                    <textarea name="exampleData" className="form-control" value = {this.state.exampleData || ''} onChange={this.handleChange}/>
                                </div> 
                                <div className = "input-group input-group-lg my-2">
                                    <input type="submit" className="btn-lg btn-primary btn-block my-3 py-3 px-2" value= "Uppdatera system"/>
                                </div>
                                { this.state.errorMessage &&
                                <div className="alert alert-danger" role="alert">
                                    <p className="error"> { this.state.errorMessage } </p> 
                                </div>
                                }
                                {this.state.success  && (
                                    <div className = "alert alert-success" role="alert">
                                        <h5>{this.state.success}</h5>
                                    </div>
                                )} 
                                <button
                                className = 'btn-lg btn-danger btn-block my-3 py-3 px-2'
                                onClick = {()=>this.deleteSystem()}>Radera systemet</button>
                            
                            </form>
                            ):(
                            <h2>Systemet finns inte i databasen</h2>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

