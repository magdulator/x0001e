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
            successText: "",
            selectedOption: "presentation"
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

    onChangeHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            preview: URL.createObjectURL(event.target.files[0]),
        });
    }

    onValueChange = (event) => {
        this.setState({
          selectedOption: event.target.value
        });
      }

    onClickHandler = async () => {
        const type = this.state.selectedOption;
        const date = new FormData() 
        date.append('image', this.state.selectedFile)
        date.append('pictype', type)
        await axios.post(process.env.REACT_APP_API_URL + '/images/upload/', date, {headers: {
            'Content-type' : 'form-data'
        }}).then(res => { 
            this.setState({successText: res.data.message, errorMessage: ""});
        }).catch((err) => {
            if (err.response && err.response.data) {
                this.setState({successText: "", errorMessage: err.response.data.message});
            }
        });
    }

    switchColor = (active) => {
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
        console.log(this.state.selectedOption)
        return ( 
        <div className = "main">
            <div className = "upload-container d-flex justify-content-center flex-wrap overview text-center py-3">
                <div className = " px-2 col-lg-7">
                <h4>Uppladdade bilder</h4>
               
                <p>Klicka på en bild för att {this.state.deleteMode? "radera den" : "aktivera eller inaktivera den"}</p><hr></hr>
                <div className = "row">
                <h4 className = "mx-auto pb-2">Bilder till startsidan</h4>
                    <div className = "px-auto w-100"></div>
                {this.state.images.length > 0 ? (
                    this.state.images.map(image => (
                        <>
                        {image.type === 'presentation' && (
                        <div className = "col-lg-3">

                            <div className= "text-image-container" key = {image.path}>
                                <img
                                    className = 'img-thumbnail my-1 mx-2'
                                    style = {{background: this.switchColor(image.active)}}
                                    src = {process.env.REACT_APP_API_URL +'/images/' +image.path}
                                    onClick = {()=>this.deleteOrUpdate(image.active, image.path)}
                                    alt="First slide"
                                />
                                <p className = "picture-text">{this.state.pictureText.toUpperCase()}</p>
                            </div>
                        </div>
                        )}
                        </>
                    ))):
                    <p>Inga bilder har blivit Uppladdade</p>
                    }
                    </div>
                    <hr></hr>
                    <div className = "row text-center">

                    <h4 className = "mx-auto pb-2">Bilder till skärmsläckare</h4>
                    <div className = "px-auto w-100"></div>

                    {this.state.images.length > 0 && (
                    this.state.images.map(image => (
                        <>
                        
                        {image.type === 'screensaver' && (
                            <div className = "col-lg-3 ">

                            <div className= "text-image-container" key = {image.path}>
                                <img
                                    className = 'img-thumbnail  my-1 mx-2'
                                    style = {{background: this.switchColor(image.active)}}
                                    src = {process.env.REACT_APP_API_URL +'/images/' +image.path}
                                    onClick = {()=>this.deleteOrUpdate(image.active, image.path)}
                                    alt="First slide"
                                />
                                <p className = "picture-text">{this.state.pictureText.toUpperCase()}</p>
                            </div>
                        </div>
                        )}
                    </>
                    
                )))}
                </div>
            </div>
            <div className="upload card px-3 py-3 col-lg-4">
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
                         <div className = "radio-container">  
                            <div className = "form-check py-2">
                                <input className = 'form-check-input' type="radio" value="presentation" checked={this.state.selectedOption === "presentatin"}  onChange = {this.onValueChange}/>
                                <label className ="check-label" htmlFor="1">
                                    Startsida
                                </label>                      
                            </div>
                            <div className = "form-check py-2">
                                <input className='form-check-input' type="radio" value="screensaver" checked={this.state.selectedOption === "screensaver"}  onChange = {this.onValueChange}/>
                                <label className ="check-label" htmlFor="2">
                                    Skärmsläckare
                                </label> 
                            </div>
                        </div>
                            {this.state.selectedOption}
                    </div>
                    <button type="button" className="btn-lg btn-success btn-block my-3 py-3 px-2" onClick={this.onClickHandler}>Ladda upp</button>
                </form>
                <button type="button" className = "btn-lg btn-danger my-3 py-3 px-2" onClick ={this.deleteMode}>{!this.state.deleteMode ? 'Radera' : 'Aktivera / Inaktivera'}</button>
                { this.state.errorMessage &&
                <div className="alert alert-danger" role="alert">
                    <p className="error"> {this.state.errorMessage } </p> 
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