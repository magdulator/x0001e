import React, {Component} from 'react';
import axios from 'axios';



class ImageUpload extends Component {
    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null,
            preview: null,
            images: []
          }
       this.getImages()
      }

      getImages = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL + '/images/');
            if(!res.data.files) {
                return;
            } else {
                this.setState({images: res.data.files});
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
    
    render() {
        return ( 
        <div className = "main">
        <div className = "upload-container pb-5 pt-5 mb-5">
	        
            <div className = " px-5 col-7">
                <h4>Uppladdade bilder</h4><hr></hr>
            {this.state.images.length > 0 ? (
                this.state.images.map(image => (
                <img
                    key = {image}
                    className = 'img-thumbnail mx-1 my-1'
                    src = {process.env.REACT_APP_API_URL +'/images/' +image}
                    alt="First slide"
                />))):
                 <p>Inga bilder har blivit Uppladdade</p>
            }
            </div>

            <div className="card px-5 py-3 mb-5 col-3">
                <h4>Ladda upp en ny bild</h4><hr></hr>
	            <form method="post" action="#" id="#">  
              
                <div className="form-group">
                <label>Filformat: png / jpg / jpeg  </label>
                <div className = "input-group mb-3">
                    <input type="file" name="file" onChange={this.onChangeHandler} className="form-control py-3"/>
                </div>
                {this.state.preview && (
                    <div>
                        <img className="preview" src={this.state.preview} alt="" height = "50px" />
                    </div>
                )}
                
                </div>
                <button type="button" className="btn btn-success btn-block py-3 px-3" onClick={this.onClickHandler}>Ladda upp</button>
            
                </form>
	        </div><hr></hr>
       </div>
       </div>
    )}
}
export {ImageUpload}