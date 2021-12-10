import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Diet_showUserDiet from "./Diet_showUserDiet";
import Diet_showAll from "./Diet_showAll";

function DietUser(){
    return(
        <div className="dietUser">
            <div className="container">
                <Diet_showUserDiet></Diet_showUserDiet>
                <Diet_showAll></Diet_showAll>
            </div>
        </div>
    )
}export default DietUser