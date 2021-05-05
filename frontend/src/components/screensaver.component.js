import React, {Component} from "react";
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

class Screensaver extends Component {

    constructor(props) {
        super(props);
        this.configureImage = this.configureImage.bind(this)
          this.state = {
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

    configureImage = image => {
        return  process.env.REACT_APP_API_URL +'/images/' +image;
    }
    
    render() {
        const {images} = this.state
        return ( 
            <div className = "screensaver-container">
            <Carousel>
                {images.length > 0 ? (
                    images.map(image => (
                    <Carousel.Item key = {image}>
                    <div className= "screen-pic-cont">
                    <img
                        className="h-100 mx-auto"
                        src = {this.configureImage(image)}
                        alt="First slide"
                    />
                    </div>
                </Carousel.Item>
                ))):
                <Carousel.Item>
                    <div className= "pic-cont">
                    </div>
                    
                    <Carousel.Caption className="mb-5">
                        <h1>Inga bilder att visa</h1>
                    </Carousel.Caption>
                    </Carousel.Item>
                }
            </Carousel>
            </div>
    )}
}
export default Screensaver;