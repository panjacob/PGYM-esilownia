import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainingGet from "../components/Trening/Get/TrainingGet";
import TrainingJoin from "../components/Trening/Get/TrainingJoin";
import TrainingLeave from "../components/Trening/Get/TrainingLeave";
import TrainingCreate from "../components/Trening/Post/TrainingCreate"
import TrainingRemove from "../components/Trening/Post/TrainingRemove";

function Trening() {


    return (
        <div className="treningi">
            <div className="container">
                <TrainingGet></TrainingGet>
                <TrainingJoin></TrainingJoin>
                <TrainingLeave></TrainingLeave>
                <TrainingCreate></TrainingCreate>
                <TrainingRemove></TrainingRemove>

            </div>
        </div>
    );
}

export default Trening;