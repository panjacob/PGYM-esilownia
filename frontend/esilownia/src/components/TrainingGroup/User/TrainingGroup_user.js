import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainingGroupShowAllGroup from "./TrainingGroupShowAllGroup";
import TrainingGroupShowUserTrainings from "./TrainingGroupShowUserTrainings";

function TrainingGroup_user() {

    return (
        <div className="trainingGroupGetAll">

            <TrainingGroupShowAllGroup></TrainingGroupShowAllGroup>

            <TrainingGroupShowUserTrainings></TrainingGroupShowUserTrainings>

        </div>
    );
}

export default TrainingGroup_user;