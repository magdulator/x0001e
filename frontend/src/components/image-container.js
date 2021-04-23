import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel'
const apiURL = 'http://130.240.114.29:5000/api/';

const ImageContainer = ({newImage}) => {
    const [images, setImages] = useState([]);
    const [fallbackImage, setFallback] = useState('');
    const getImages = async () => {
        try{
            const res = await axios.get(apiURL + 'images/');
            console.log("hej")
            if(!res.data.files) {
                console.log("nja")
                setFallback(res.data.message);
                return;
            } else {
                console.log(res.data.files)
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

        console.log (apiURL+ 'images/'+image)
        return  apiURL +'images/' +image;
    }
    
    console.log( images);

    return (
        <div className = "slider-container">
        <Carousel >
            <Carousel.Item>
                <img
                    className="h-100 d-inline-block"
                    src = {apiURL + 'images/' + images[0]}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="h-100 d-inline-block"
                    src = {apiURL + 'images/' + images[1]}
                    alt="second slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
                <img
                    className=" d-inline-block"
                    src = {apiURL + 'images/' + images[2]}
                    alt="second slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </div>
    )
}

export {ImageContainer}