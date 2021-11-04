import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainingGet from "../components/Training/Get/TrainingGet";
import TrainingJoin from "../components/Training/Get/TrainingJoin";
import TrainingLeave from "../components/Training/Get/TrainingLeave";
import TrainingCreate from "../components/Training/Post/TrainingCreate"
import TrainingRemove from "../components/Training/Post/TrainingRemove";

function Training() {


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

export default Training;