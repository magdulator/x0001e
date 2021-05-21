import React, {Component} from 'react';
import axios from 'axios';

class ImageUpload extends Component {
    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null,
            preview: null,
            images: [],
            deleteMode: false,
            pictureText: "",
            errorMessage: "",
            successText: ""
          }
       this.getImages();
       this.deleteOrUpdate = this.deleteOrUpdate.bind(this);
       this.deleteMode = this.deleteMode.bind(this);
    }

    getImages = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL + '/images/all');
            if(!res.data) {
                return;
            } else {
                this.setState({images: res.data.images});
            } 
        } catch(err) {
            console.log(err.message);
        }
    }

    onChangeHandler=event=>{
        this.setState({
            selectedFile: event.target.files[0],
            preview: URL.createObjectURL(event.target.files[0]),
            loaded: 0,
        });
    }

    onClickHandler = async () => {
        const date = new FormData() 
        date.append('image', this.state.selectedFile)
        await axios.post(process.env.REACT_APP_API_URL + '/images/upload/', date, {headers: {
            'Content-type' : 'form-data'
        }}).then(res => { 
            this.setState({successText: res.data.message, errorMessage: ""});
        }).catch((err) => {
            if (err.response && err.response.data) {
                this.setState({errorMessage: err.response.data.message, successText: ""});
            }
        });
    }

    cololr = (active) => {
        const color = active ? 'green' : 'red';
        return color;
    }

    deleteOrUpdate = async(act, path) => {
        if(this.state.deleteMode) {
            await axios.post(process.env.REACT_APP_API_URL + `/images/delete/${path}`, {
            }).then(response => {
                if(response.data !== null) {
                    this.getImages();
                }
            }).catch((err) => {
                if (err.response && err.response.data) {
                    this.setState({errorMessage: err.response.data.message, successText: ""});
                }        
            });
        }
        else {
            const active = !act
            await axios.patch(process.env.REACT_APP_API_URL + `/images/update/${path}`, {
                active
            }).then(response => {
                if(response.data !== null) {
                    this.getImages();
                }
            }).catch((err) => {
                console.log(err)
            });
        }
    }

    deleteMode = () => {
        if (!this.state.deleteMode) {
            this.setState({deleteMode: true,  pictureText: "radera"})
        } else {
            this.setState({deleteMode: false,  pictureText: ""})
        }
    }
    
    render() {
        return ( 
        <div className = "main">
            <div className = "upload-container d-flex justify-content-center flex-wrap overview text-center py-3">
            <div className = " px-5 col-7">
                <h4>Uppladdade bilder</h4>
               
                <p>Klicka på en bild för att {this.state.deleteMode? "radera den" : "aktivera eller inaktivera den"}</p><hr></hr>
                
                {this.state.images.length > 0 ? (
                    this.state.images.map(image => (
                    <div>
                        {image.type === 'presentation' && (
                        <div>
                            <div className= "text-image-container" key = {image.path}>
                                <img
                                    className = 'img-thumbnail mx-2 my-1'
                                    style = {{background: this.cololr(image.active)}}
                                    src = {process.env.REACT_APP_API_URL +'/images/' +image.path}
                                    onClick = {()=>this.deleteOrUpdate(image.active, image.path)}
                                    alt="First slide"
                                />
                                <p className = "picture-text">{this.state.pictureText.toUpperCase()}</p>
                            </div>
                        </div>
                        )}
                    </div>
                    ))):
                    <p>Inga bilder har blivit Uppladdade</p>
                    }
                    {this.state.images.length > 0 && (
                    this.state.images.map(image => (
                    <div>
                        {image.type === 'screensaver' && (
                        <div>
                            <h4>Screensaver</h4>
                            <div className= "text-image-container" key = {image.path}>
                                <img
                                    className = 'img-thumbnail mx-2 my-1'
                                    style = {{background: this.cololr(image.active)}}
                                    src = {process.env.REACT_APP_API_URL +'/images/' +image.path}
                                    onClick = {()=>this.deleteOrUpdate(image.active, image.path)}
                                    alt="First slide"
                                />
                                <p className = "picture-text">{this.state.pictureText.toUpperCase()}</p>
                            </div>
                        </div>
                        )}
                    </div>
                )))}
            </div>
            <div className="card px-3 py-3 col-4">
                <h4>Ladda upp en ny bild</h4><hr></hr>
	            <form method="post" action="#" id="#">  
              
                    <div className="form-group">
                        <label>Filformat: png / jpg / jpeg  </label>
                        <div className = "input-group-lg mb-3">
                            <input type="file" name="file" onChange={this.onChangeHandler} className="file-input"/>
                        </div>
                        {this.state.preview && (
                        <div>
                            <img className="preview" src={this.state.preview} alt="" height = "50px" />
                        </div>
                        )}
                
                    </div>
                    <button type="button" className="btn-lg btn-success btn-block my-3 py-3 px-2" onClick={this.onClickHandler}>Ladda upp</button>
                </form>
                <button type="button" className = "btn-lg btn-danger my-3 py-3 px-2" onClick ={this.deleteMode}>{!this.state.deleteMode ? 'Radera' : 'Aktivera / Inaktivera'}</button>
                { this.state.errorMessage &&
                <div className="alert alert-danger" role="alert">
                    <p className="error"> { this.state.errorMessage } </p> 
                </div>
                }
                {this.state.successText  && (
                    <div className = "alert alert-success" role="alert">
                        <h5>{this.state.successText}</h5>
                    </div>
                )} 
	        </div>
        <hr></hr>
       </div>
    </div>
    )}
}
export {ImageUpload}