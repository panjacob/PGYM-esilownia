import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainingGroupCreate from "./TrainingGroupCreate";
import TrainingGroupShowTrainerTrainings from "./TraininGroupShowTrainerTrainings";
import TrainingGroupEdit from "./TrainingGroupEdit";

function TrainingGroupTrainer() {

    return (
        <div className="trainingGroupTrainer">

            <TrainingGroupShowTrainerTrainings></TrainingGroupShowTrainerTrainings>

            <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
            <TrainingGroupCreate></TrainingGroupCreate>
                </div>
                <div className='col-md-6'>
            <TrainingGroupEdit></TrainingGroupEdit>
                </div>
            </div>
            </div>

        </div>
    );
}

export default TrainingGroupTrainer;