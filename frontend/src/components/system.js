import React from "react";
import {ArrowRight, XOctagon, RecordFill} from 'react-bootstrap-icons'
const System = () => {
    return(
        <div className = "d-flex justify-content-center flex-wrap">
            <div className="card mx-2">
                <a className="card-block stretched-link text-decoration-none" href ="overview">
                <div className = "card-header py-0 pt-2 my-0 text-center" ><h4>System överblick</h4><p>Mer information <ArrowRight></ArrowRight></p></div>
                <div className = "card-body px-0">
                    <ul>
                        <li>Widefind</li>
                        <li>Fibaro Zwave</li>
                        <li>Vayyar</li>
                        <li>Philips Hue</li>
                    </ul>
                </div></a>
            </div>
            <div className="card mx-2" >
                <a className="card-block stretched-link text-decoration-none" href ="status">
                <div className = "card-header py-0 pt-2 my-0 text-center"><h4>System status</h4><p>Mer information <ArrowRight></ArrowRight></p></div>
                <div className = "card-body px-0 py-1">
                    <ul className = "list-unstyled pl-3">
                        <li><RecordFill  className="mr-2" size="35" viewBox = "0 0 14 14" color="green"></RecordFill>    Widefind</li>
                        <li><RecordFill size="35" viewBox = "0 0 14 14" color="green" className="mr-2"></RecordFill>   Fibaro Zwave</li>
                        <li><RecordFill  className="mr-2" size="35"  viewBox = "0 0 14 14" color="green"></RecordFill>    Vayyar</li>
                        <li><RecordFill  className="mr-2" size="35" viewBox = "0 0 14 14" color="red"></RecordFill>    Philips Hue</li>
                    </ul>
                </div></a>
            </div>
            <div className="card mx-2">
                <a className="card-block stretched-link text-decoration-none" href ="scenario">
                <div className = "card-header py-0 pt-2 my-0 text-center"><h4>Scenario</h4><p>Mer information <ArrowRight></ArrowRight></p></div></a>
            </div>
            <div className="card mx-2">
                <a className="card-block stretched-link text-decoration-none" href ="turnoff">
                <div className = "card-header py-0 pt-2 my-0 text-center"><h4>Stäng av allt</h4><p>"</p></div>
                <div className = "card-body px-0 py-3 text-center">
                    <XOctagon size = "110" color="darkred"></XOctagon>
                </div></a>
            </div>
        </div>
    )
}

export {System};