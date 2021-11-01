import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainingGroupGet from "../components/Treningi/Get/TrainingGroupGet";
import TrainingGroupCreate from "../components/Treningi/Post/TrainingGroupCreate";

function Treningi() {


    return (
        <div className="treningi">
            <div className="container">
                <TrainingGroupGet></TrainingGroupGet>
                <TrainingGroupCreate></TrainingGroupCreate>

            </div>
        </div>
    );
}

export default Treningi;