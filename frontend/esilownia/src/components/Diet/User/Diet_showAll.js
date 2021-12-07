import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Diet_showAll(){
    return(
        <div className="dietShowAll">
            <div className="container">
                <div className="text-center">
                    <hr></hr>
                    <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">
                        Dostępne Diety
                    </h1>
                    <hr></hr>
                </div>
                <div className="row justify-content-center text-center inline-block">
                </div>
            </div>
        </div>
    )
}export default Diet_showAll