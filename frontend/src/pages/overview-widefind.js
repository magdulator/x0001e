import React from "react";
const OverviewWidefind = () => {
    return(
    <div className ="d-flex justify-content-center"> 
        <div className = "widefind card">
            <div className = "card-body mx-3">
                <h2>Widefind</h2>
                <p className = "my-4">Widefind är ett positioneringssystem som ger ut koordinater i realtid, systemet spårar positionstaggar som kommunicerar med en server som genererar positionsdata.</p>
                <hr></hr>
                <p>Exempel data från systemet:</p>
                <img source = "../.././public/widefind.PNG"></img>
                <p>Taggarna skickar ut positionsdata i form av REPORT var 10e(?) sekund ifall de är aktiva men vid rörelse så kommer det skickas ut mycket oftare. 
</p>
            </div>
        </div>
    </div>
    )
}

export {OverviewWidefind};