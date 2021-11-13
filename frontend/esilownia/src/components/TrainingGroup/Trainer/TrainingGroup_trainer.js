import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainingGroupCreate from "./TrainingGroupCreate";
import TrainingGroupShowTrainerTrainings from "./TraininGroupShowTrainerTrainings";
import TrainingGroupEdit from "./TrainingGroupEdit";

function TrainingGroupTrainer() {

    return (
        <div className="trainingGroupTrainer">

            <TrainingGroupShowTrainerTrainings></TrainingGroupShowTrainerTrainings>

            <TrainingGroupCreate></TrainingGroupCreate>

            <TrainingGroupEdit></TrainingGroupEdit>

            <div className='container text-center'>
                Tutaj miejsce na edycje grupy / usuwanie paticipantów z grup treningowych
            </div>

        </div>
    );
}

export default TrainingGroupTrainer;