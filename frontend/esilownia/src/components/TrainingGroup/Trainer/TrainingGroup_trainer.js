import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainingGroupCreate from "./TrainingGroupCreate";
import TrainingGroupShowTrainerTrainings from "./TraininGroupShowTrainerTrainings";

function TrainingGroupTrainer() {

    return (
        <div className="trainingGroupTrainer">

            <TrainingGroupCreate></TrainingGroupCreate>

            <TrainingGroupShowTrainerTrainings></TrainingGroupShowTrainerTrainings>

            <div className='container text-center'>
                Tutaj miejsce na edycje grupy / usuwanie paticipantów z grup treningowych
            </div>

        </div>
    );
}

export default TrainingGroupTrainer;