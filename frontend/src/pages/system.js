import React from "react";
import {ArrowRight, XOctagon, RecordFill} from 'react-bootstrap-icons'
const System = () => {
    return(
        <div className = "system-container d-flex justify-content-center flex-wrap">
            <div className="system-card card">
                <a className="card-block stretched-link text-decoration-none text-dark" href ="overview">
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
            <div className="system-card card" >
                <a className="card-block stretched-link text-decoration-none text-dark" href ="status">
                <div className = "card-header py-0 pt-2 my-0 text-center"><h4>System status</h4><p>Mer information <ArrowRight></ArrowRight></p></div>
                <div className = "card-body px-0">
                    <ul className = "list-unstyled pl-3 my-0">
                        <li><RecordFill  className="status-icon" size="30" viewBox = "0 0 14 14" color="green"></RecordFill>    Widefind</li>
                        <li><RecordFill size="30" viewBox = "0 0 14 14" color="green" className="status-icon"></RecordFill>   Fibaro Zwave</li>
                        <li><RecordFill  className="status-icon" size="30"  viewBox = "0 0 14 14" color="green"></RecordFill>    Vayyar</li>
                        <li><RecordFill  className="status-icon" size="30" viewBox = "0 0 14 14" color="red"></RecordFill>    Philips Hue</li>
                    </ul>
                </div></a>
            </div>
            <div className="system-card card">
                <a className="card-block stretched-link text-decoration-none text-dark" href ="scenario">
                <div className = "card-header py-0 pt-2 my-0 text-center"><h4>Scenario</h4><p>Mer information <ArrowRight></ArrowRight></p></div></a>
            </div>
            <div className="system-card card">
                <a className="card-block stretched-link text-decoration-none text-dark" href ="turnoff">
                <div className = "card-header py-0 pt-2 my-0 text-center"><h4>Stäng av allt</h4><p>"</p></div>
                <div className = "card-body px-0 py-3 text-center">
                    <XOctagon className="stop-icon" size = "110" color="darkred"></XOctagon>
                </div></a>
            </div>
        </div>
    )
}

export {System};