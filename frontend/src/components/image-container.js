import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import {PencilSquare, ChevronDoubleRight, ChevronDoubleLeft} from 'react-bootstrap-icons';

import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import auth from '../services/auth';

const apiURL = 'http://130.240.114.29:5000/api/';


const ImageContainer = ({newImage}) => {

    let history = useHistory();

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

    const getRole = () => {
        const isAdmin = auth.isAdmin();
        return isAdmin
    }
    return (
        <div className = "slider-container">
        <Carousel interval={null} prevIcon = {<ChevronDoubleLeft className="carousel-icons" size="130px" color="white" enableBackground="true"/>} nextIcon = {<ChevronDoubleRight className="carousel-icons" size="130px" color="white" enableBackground="true"></ChevronDoubleRight>}>
            {images.length > 0 ? (
                images.map(image => (
                <Carousel.Item>
                <div className= "pic-cont">
                <img
                    key = {image}
                    className="h-100 mx-auto"
                    src = {configureImage(image)}
                    alt="First slide"
                />
                {getRole() ? (
                    <>
                    <button onClick={() => history.push('/upload')} className = "editPic"><PencilSquare size="50"></PencilSquare></button>
                    </>
                ):
                <></>}
                </div>
           

            </Carousel.Item>
            ))):
            <Carousel.Item>
                <div className= "pic-cont">
                </div>
                {getRole() ? (
                    <>
                    <button onClick={() => history.push('/upload')} className = "editPic"><PencilSquare size="50"></PencilSquare></button>
                    </>
                ):
                <></>}
                <Carousel.Caption className="mb-5">
                    <h1>Inga bilder att visa</h1>
                </Carousel.Caption>
                </Carousel.Item>
            }
        </Carousel>
        </div>
    )
}

export {ImageContainer}