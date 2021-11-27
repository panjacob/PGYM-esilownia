import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainingGroupCreate from "./TrainingGroupCreate";
import TrainingGroupShowTrainerTrainings from "./TraininGroupShowTrainerTrainings";
import TrainingGroupEdit from "./TrainingGroupEdit";
import Button from "react-bootstrap/Button";

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

            <div className='container'>
                <div className="row justify-content-center">
                    <div className="text-center">
                        <hr></hr>
                        <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Strefa
                            Użytkownika</h1>
                        <hr></hr>
                    </div>
                </div>

                <div className="row border p-5 justify-content-center">
                    <Button href='/treningi'>Przejdz do strefy Użytkownika</Button>
                </div>
            </div>

        </div>
    );
}

export default TrainingGroupTrainer;