import React, {Component} from 'react';
import axios from 'axios';
import {ImageContainer} from './image-container';
const apiURL = 'http://130.240.114.29:5000/api/';


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
            const res = await axios.get(apiURL + 'images/');
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
        await axios.post('http://130.240.114.29:5000/api/images/upload/', data, {headers: {
            'Content-type' : 'form-data'
        }}).then(res => { 
            console.log(res.statusText)
        }); 
        window.location.reload(false);
    }
    
    render() {
        console.log(this.state.images)
    return ( 
        <div className = "hej">
	        
            <div className = "image-container px-5">
                <h4>Images already uploaded</h4><hr></hr>
            {this.state.images.length > 0 ? (
                this.state.images.map(image => (
                <img
                    key = {image}
                    className = 'img-thumbnail mx-1 my-1'
                    height = '100px'
                    src = {apiURL +'images/' +image}
                    alt="First slide"
                />))):
                 <p>No pictures</p>
            }
            </div>

            <div className="card px-5 py-3">
                <h4>Upload new picture</h4><hr></hr>
	            <form method="post" action="#" id="#">  
              
                <div className="form-group">
                <label>Upload Your File </label>
                <input type="file" name="file" onChange={this.onChangeHandler} className="form-control-file"/>
                {this.state.preview && (
                    <div>
                        <img className="preview" src={this.state.preview} alt="" width = "200px" />
                    </div>
                )}
                
                </div>
                <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
            
                </form>
	        </div><hr></hr>
       </div>
    )}
}
export {ImageUpload}