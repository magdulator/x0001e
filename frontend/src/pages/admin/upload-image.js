import React, {Component} from 'react';
import images from '../../services/images';

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

        const res = await images.getImages();
        if(!res) {
            return;
        }
        this.setState({images: res});
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
        const res = await images.uploadImage(this.state.selectedFile, '', this.state.selectedOption);   
        this.setState({successText: res[0], errorMessage: res[1]});
        this.getImages();
    }

    switchColor = (active) => {
        const color = active ? 'green' : 'red';
        return color;
    }

    deleteOrUpdate = async(act, path) => {
        if(this.state.deleteMode) {
            const res = await images.deleteImage(path);
            if(res[0]) {
                this.getImages();   
            }
        }
        else {
            const active = !act
            const res = await images.updateImage(active, path)
            if(res[0]) {
                this.getImages()
            }
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
                        <p className = "px-5">Inga bilder har blivit Uppladdade</p>
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
                                            <input className = 'form-check-input' name ="1" type="radio" value="presentation" checked={this.state.selectedOption === "presentation"}  onChange = {this.onValueChange}/>
                                            <label className ="check-label" htmlFor="1">
                                                Startsida
                                            </label>                      
                                        </div>
                                        <div className = "form-check py-2">
                                            <input className='form-check-input' name="2" type="radio" value="screensaver" checked={this.state.selectedOption === "screensaver"}  onChange = {this.onValueChange}/>
                                            <label className ="check-label" htmlFor="2">
                                                Skärmsläckare
                                            </label> 
                                        </div>
                                    </div>
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