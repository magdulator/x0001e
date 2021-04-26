import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel'
const apiURL = 'http://130.240.114.29:5000/api/';

const ImageContainer = ({newImage}) => {
    const [images, setImages] = useState([]);
    const getImages = async () => {
        try{
            const res = await axios.get(apiURL + 'images/');
            if(!res.data.files) {
                return;
            } else {
                setImages(res.data.files);
            } 
        } catch(err) {
            console.log(err.message);
        }
    }
    useEffect(()=> {
        getImages();
    }, [newImage]);


    const configureImage = image => {
        return  apiURL +'images/' +image;
    }
    
    return (
        <div className = "slider-container">
        <Carousel interval={null}>
            {images.length > 0 ? (
                images.map(image => (
                <Carousel.Item>
                <div className = "pic-cont">
                <img
                    key = {image}
                    className="h-100 d-inline-block mx-auto"
                    src = {configureImage(image)}
                    alt="First slide"
                /></div>
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>

            </Carousel.Item>
            ))):
            <p>No pictures</p>
            }
        </Carousel>
        </div>
    )
}

export {ImageContainer}