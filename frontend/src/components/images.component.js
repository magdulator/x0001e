import React, {useState} from 'react';
import {ImageContainer} from './image-container';

const Images = () => {
    const [newImage, setNewImage] = useState([]);

    return ( 
        <div>
            <ImageContainer newImage = {newImage}></ImageContainer>
        </div>
    )
}

export {Images}