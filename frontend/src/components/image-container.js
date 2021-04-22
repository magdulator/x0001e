import React, {useState, useEffect} from 'react';
import axios from 'axios';
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
        <div id = "hej">
            
            {
                images.map(image => (
                    <img src = {configureImage(image)} key={image} alt={image} width = "200px" className = 'image'/>
                ))
                
            }
             <p>Hej</p>

        </div>
    )
}

export {ImageContainer}