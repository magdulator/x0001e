import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import {PencilSquare, ChevronDoubleRight, ChevronDoubleLeft} from 'react-bootstrap-icons';

import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import auth from '../services/auth';


const ImageContainer = ({newImage}) => {

    let history = useHistory();

    const [images, setImages] = useState([]);

    const getImages = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL + '/images/presentation/active');
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
        return  process.env.REACT_APP_API_URL +'/images/' +image;
    }

    const getRole = () => {
        const isAdmin = auth.isAdmin();
        return isAdmin
    }
    return (
        <div className = "slider">
        <Carousel interval={null} prevIcon = {<ChevronDoubleLeft className="carousel-icons" size="130px" color="white" enableBackground="true"/>} nextIcon = {<ChevronDoubleRight className="carousel-icons" size="130px" color="white" enableBackground="true"></ChevronDoubleRight>}>
            {images.length > 0 ? (
                images.map(image => (
                <Carousel.Item key = {image}>
                    <img
                    className="h-100 mx-auto"
                    src = {configureImage(image)}
                    alt="First slide"
                    />           

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