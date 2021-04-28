import React from "react";
import {ArrowRight, XOctagon} from 'react-bootstrap-icons'
const System = () => {
    return(
        <div className = "d-flex justify-content-center flex-wrap">
            <div className="card mx-2">
                <a className="card-block stretched-link text-decoration-none" href ="google.com"></a>
                <div className = "card-header py-0 pt-2 my-0 text-center"><h4>System överblick</h4><p>Mer information <ArrowRight></ArrowRight></p></div>
                <div className = "card-body px-0">
                    <ul>
                        <li>Widefind</li>
                        <li>Fibaro Zwave</li>
                        <li>Vayyar</li>
                        <li>Philips Hue</li>
                    </ul>
                </div>
            </div>
            <div className="card mx-2" >
                <a className="card-block stretched-link text-decoration-none" href ="google.com"></a>
                <div className = "card-header py-0 pt-2 my-0 text-center"><h4>System status</h4><p>Mer information <ArrowRight></ArrowRight></p></div>
            </div>
            <div className="card mx-2">
                <a className="card-block stretched-link text-decoration-none" href ="google.com"></a>
                <div className = "card-header py-0 pt-2 my-0 text-center"><h4>Scenario</h4><p>Mer information <ArrowRight></ArrowRight></p></div>
            </div>
            <div className="card mx-2">
                <a className="card-block stretched-link text-decoration-none" href ="google.com"></a>
                <div className = "card-header py-0 pt-2 my-0 text-center"><h4>Stäng av allt</h4><p>"</p></div>
                <div className = "card-body px-0 py-3 text-center">
                    <XOctagon size = "110" color="darkred"></XOctagon>
                </div>
            </div>
        </div>
    )
}

export {System};