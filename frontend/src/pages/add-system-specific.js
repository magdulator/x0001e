import axios from 'axios';
import React from 'react';
const pathname = window.location.pathname.split('/');

export default class AddSystemSpecific extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            systems: [],
            system: pathname[3],
            systemName: "",
            title: "",
            description: "",
            img: "",
            exampleData: "",
            errorMessage: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        const systemName = this.state.systemName
        const title = this.state.title;
        const description = this.state.description;
        const img = this.state.img;
        const exampleData = this.state.exampleData;

        await axios.post(process.env.REACT_APP_API_URL + `/systems/create`, {
            systemName, title, description, img, exampleData
        }).then(response => {
            if(response.data.token !== null) {
                console.log(JSON.stringify(response.data))
            }
        }).catch((e) => {
            if (e.response && e.response.data) {
                // Dispatch an action here
                this.setState({errorMessage: e.response.data.message});
            } 
        });
    }


    render() {
        return (
            <div className = "main">
            <div className ="d-flex justify-content-center w-100"> 
            <div className = "add-system card">
                <div className = "card-body mx-3">
                    <form onSubmit = {this.handleSubmit}>
                    <h2>Lägg till nytt system</h2>
                    <h5 className = "py-2">URL namn på systemet (ett ord):</h5>
                    <div className = "input-group input-group-lg">
                      <input name="systemName" type="text" className="form-control" value={this.state.systemName || ''} onChange={this.handleChange} aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    </div> 
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
                      <textarea name="exampleData" className="form-control" value = {this.state.exampleData || ''}  onChange={this.handleChange}/>
                    </div> 
                    <div className = "input-group input-group-lg my-2">
                      <input type="submit" className="btn-lg btn-primary btn-block my-3 py-3 px-2" value= "Skapa system"/>
                      
                    </div> 

                    { this.state.errorMessage &&
                        <div class="alert alert-danger" role="alert">
                            <p className="error"> { this.state.errorMessage } </p> 
                        </div>
                    }
                    </form>
                
                </div>
            </div>
        </div>
        </div>
        )
    }
}

