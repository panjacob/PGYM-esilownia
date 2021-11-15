import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainingGroupShowAll from "./TrainingGroupShowAll";
import TrainingGroupShowUserTrainings from "./TrainingGroupShowUserTrainings";

function TrainingGroup_user() {

    return (
        <div className="trainingGroupGetAll">

            <TrainingGroupShowAll></TrainingGroupShowAll>

            <TrainingGroupShowUserTrainings></TrainingGroupShowUserTrainings>

        </div>
    );
}

export default TrainingGroup_user;