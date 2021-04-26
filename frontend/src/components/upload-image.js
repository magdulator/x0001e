import React, {Component} from 'react';
import axios from 'axios';

class ImageUpload extends Component {
    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null,
            preview: null
          }
       
      }

      onChangeHandler=event=>{
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
        }) 
    }
    
    render() {
    return ( 
        <div className="row">
	        <div className="col-md-6">
	            <form method="post" action="#" id="#">  
              
                <div className="form-group">
                <label>Upload Your File </label>
                <input type="file" name="file" onChange={this.onChangeHandler} className="form-control-file"/>
                {this.state.preview && (
                    <div>
                        <img className="preview" src={this.state.preview} alt="" width = "400px" />
                    </div>
                )}
                </div>
                <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
            
                </form>
	        </div>
	   </div>
    )}
}
export {ImageUpload}