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
            deleteModeText: "Radera bilder"
          }
       this.getImages()
       this.toggleActive = this.toggleActive.bind(this);
       this.deleteMode = this.deleteMode.bind(this);
      }


    getImages = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL + '/images/presentation/all');
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
        console.log(this.state.images)
        this.setState({
          selectedFile: event.target.files[0],
          preview: URL.createObjectURL(event.target.files[0]),
          loaded: 0,
        })
        console.log(this.state)
      }

    onClickHandler = async () => {
        const data = new FormData() 
        
        data.append('image', this.state.selectedFile)
        await axios.post(process.env.REACT_APP_API_URL + '/images/upload/', data, {headers: {
            'Content-type' : 'form-data'
        }}).then(res => { 
            console.log(res.statusText)
        }); 
        window.location.reload(false);
    }

    cololr = (active) => {
        const color = active ? 'green' : 'red';
        return color;
    }

    toggleActive = async(act, path) => {
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

    deletePicture = async(path) => {
        
        await axios.post(process.env.REACT_APP_API_URL + `/images/delete/${path}`, {
        }).then(response => {
            if(response.data !== null) {
                this.getImages();
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    deleteMode = () => {
        if (!this.state.deleteMode) {
            this.setState({deleteMode: true, deleteModeText: "Aktivera / Inaktivera"})
        } else {
            this.setState({deleteMode: false, deleteModeText: "Radera bilder"})
        }
    }
    
    render() {
        return ( 
        <div className = "main">
            <div className = "upload-container d-flex justify-content-center flex-wrap overview text-center py-3">
	        
            <div className = " px-5 col-7">
                <h4>Uppladdade bilder</h4>
                {!this.state.deleteMode ? (
                    <>
                <p>Klicka på en bild för att aktivera eller inaktivera den</p><hr></hr>
                
            {this.state.images.length > 0 ? (
                
                this.state.images.map(image => (
                <div className= "picture-con">
                <img
                    key = {image.path}
                    className = 'img-thumbnail mx-2 my-1'
                    style = {{background: this.cololr(image.active)}}
                    src = {process.env.REACT_APP_API_URL +'/images/' +image.path}
                    onClick = {()=>this.toggleActive(image.active, image.path)}
                    alt="First slide"
                /> </div>))):
                 <p>Inga bilder har blivit Uppladdade</p>
            }</>
            ):(
                <>
                <p>Klicka på en bild för att RADERA den</p><hr></hr>
                
            {this.state.images.length > 0 ? (
                
                this.state.images.map(image => (
                <div className = "text-image-container">
                <div className="picture-text">RADERA</div>

                <img
                    key = {image.path}
                    className = 'delete-mode img-thumbnail mx-2 my-1'
                    style = {{background: this.cololr(image.active)}}
                    src = {process.env.REACT_APP_API_URL +'/images/' +image.path}
                    onClick = {()=>this.deletePicture(image.path)}
                    alt="First slide"
                /></div>))):
                 <p>Inga bilder har blivit Uppladdade</p>
            }</>
            )}
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
                <button type="button" className = "btn-lg btn-danger my-3 py-3 px-2" onClick ={this.deleteMode}>{this.state.deleteModeText}</button>
	        </div><hr></hr>
       </div>
       </div>
    )}
}
export {ImageUpload}