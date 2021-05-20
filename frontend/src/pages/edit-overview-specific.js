import axios from 'axios';
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
            
            this.setState({title: res.data.title,
                        description: res.data.description,
                        img: res.data.img,
                        exampleData: res.data.exampleData,
                        });
        } catch (e) {
            console.log(e);
        }
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

        const title = this.state.title;
        const description = this.state.description;
        const img = this.state.img;
        const exampleData = this.state.exampleData;

        await axios.patch(process.env.REACT_APP_API_URL + `/systems/update/${this.state.system}`, {
            title, description, img, exampleData
        }).then(response => {
            if(response.data !== null) {
                this.setState({success: true})
                console.log(JSON.stringify(response.data))
            }
        }).catch((e) => {
            this.setState({errorMessage: e.response.data.message});
        });
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
                                <div class="alert alert-danger" role="alert">
                                    <p className="error"> { this.state.errorMessage } </p> 
                                </div>
                                }
                                {this.state.success  && (
                                    <div className = "alert alert-success" role="alert">
                                        <h5>System uppdaterat</h5>
                                    </div>
                                )} 
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

