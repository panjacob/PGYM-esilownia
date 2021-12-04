import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainingGroupShowAllGroup from "./TrainingGroupShowAllGroup";
import TrainingGroupShowUserTrainings from "./TrainingGroupShowUserTrainings";

function TrainingGroup_user() {

    return (
        <div className="trainingGroupGetAll">

            <TrainingGroupShowUserTrainings></TrainingGroupShowUserTrainings>

            <TrainingGroupShowAllGroup></TrainingGroupShowAllGroup>



        </div>
    );
}

export default TrainingGroup_user;