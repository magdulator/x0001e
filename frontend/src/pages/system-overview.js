import React from "react";
const SystemOverview = () => {
    console.log("hej")
    return(
        <div className = "d-flex justify-content-center flex-wrap overview text-center py-4">
            <h1 className="w-100">Klicka på ett system för att läsa mer om det</h1>
            <div class="w-100"></div>
            <hr></hr>

                <div class="row">
                    <div class="col">
                        <div className="card my-3 py-3">
                            <a className="card-block stretched-link text-decoration-none" href ="overview">
                            <div className = "card-body text-center">
                                <h2>Fibaro Zwave</h2>
                            </div></a>
                        </div>
                    </div>
                    <div class="col">
                        <div className="card my-3 py-3">
                            <a className="card-block stretched-link text-decoration-none" href ="overview">
                            <div className = "card-body text-center">
                                <h2>Widefind</h2>
                            </div></a>
                        </div>
                    </div>
                    <div class="w-100"></div>
                    <div class="col">
                        <div className="card my-3 py-3">
                            <a className="card-block stretched-link text-decoration-none" href ="overview">
                            <div className = "card-body text-center">
                                <h2>Philips Hue</h2>
                            </div></a>
                        </div>
                    </div>
                    <div class="col">
                        <div className="card my-3 py-3">
                            <a className="card-block stretched-link text-decoration-none" href ="overview">
                            <div className = "card-body text-center">
                                <h2>Vayyar</h2>
                            </div></a>
                        </div>
                    </div>

                </div>  
                      
        </div>
    )
}

export {SystemOverview};