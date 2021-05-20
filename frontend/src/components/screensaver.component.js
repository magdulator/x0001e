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
            const res = await axios.get(process.env.REACT_APP_API_URL + '/images/screensaver/all');
            if(!res.data) {
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
            <Carousel className = "screensaver">
                {images.length > 0 ? (
                    images.map(image => (
                    <Carousel.Item key = {image}>
                    <img
                        className="mx-auto"
                        src = {this.configureImage(image)}
                        alt="First slide"
                    />
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
    )}
}
export default Screensaver;