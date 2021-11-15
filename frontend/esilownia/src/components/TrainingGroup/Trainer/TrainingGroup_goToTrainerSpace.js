import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";

function TrainingGroupGoToTrainerSpace() {
    return (
        <div className="trainingGroupGoToTrainerSpace">
            <div className="container">

                <div className="row justify-content-center">
                    <div className="text-center">
                        <hr></hr>
                        <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Strefa
                            Trenera</h1>
                        <hr></hr>
                    </div>
                </div>

                <div className="row border p-5 justify-content-center">
                    <Button href='/strefa_trenera'>Przejdz do strefy Trenera</Button>
                </div>

            </div>
        </div>
    );
}

export default TrainingGroupGoToTrainerSpace;