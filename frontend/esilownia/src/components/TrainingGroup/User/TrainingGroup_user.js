import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainingGroupShowAllGroup from "./TrainingGroupShowAllGroup";
import TrainingGroupShowUserTrainings from "./TrainingGroupShowUserTrainings";
import TrainingGroupShowAllPrivate from "./TrainingGroupShowAllPrivate";

function TrainingGroup_user() {

    return (
        <div className="trainingGroupGetAll">

            <TrainingGroupShowAllGroup></TrainingGroupShowAllGroup>
            {/*<TrainingGroupShowAllPrivate></TrainingGroupShowAllPrivate>*/}

            <TrainingGroupShowUserTrainings></TrainingGroupShowUserTrainings>

        </div>
    );
}

export default TrainingGroup_user;