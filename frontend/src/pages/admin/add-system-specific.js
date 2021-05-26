import React from 'react';
import images from '../../services/images';
import systems from '../../services/systems';

export default class AddSystemSpecific extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            systemName: "",
            title: "",
            description: "",
            img: "",
            exampleData: "",
            errorMessage: "",
            success: "",
            selectedFile: null
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
        
        const exampleData = this.state.exampleData;
        const res = await systems.createSystem(systemName, title, description, exampleData);
        if(res[0] && this.state.selectedFile) {
            this.uploadImage(systemName)
        }
        this.setState({success: res[0], errorMessage: res[1]});
    }

    uploadImage = async (systemName) => {
        const res = await images.uploadImage(this.state.selectedFile, systemName, 'systemdata')
        this.setState({errorMessage: res[1]});
    }

    onChangeHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            preview: URL.createObjectURL(event.target.files[0]),
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
                                <div className = "input-group-lg mb-3">
                                    <input type="file" name="file" onChange={this.onChangeHandler} className="file-input"/>
                                </div>
                                <h5 className = "py-2">Beskrivande text för datat:</h5>
                                <div className = "input-group input-group-lg">
                                    <textarea name="exampleData" className="form-control" value = {this.state.exampleData || ''}  onChange={this.handleChange}/>
                                </div> 
                                <div className = "form-group">
                                    <button
                                        className = "btn btn-primary btn-lg btn-block my-3 py-3 px-2" type="submit"> <h4>REGISTRERA SYSTEM</h4>
                                    </button>
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
                            </form>
                
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

