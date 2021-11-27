import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainingGroupTrainer from "../components/TrainingGroup/Trainer/TrainingGroup_goToTrainerSpace";
import TrainingGroupUser from "../components/TrainingGroup/User/TrainingGroup_user";

function TrainingGroups() {

    let isTrainer = false;
    if (localStorage.getItem('role') !== null) {
        isTrainer = JSON.parse(localStorage.getItem('role')).includes('trainer')
    }

    return (
        <div className="treningi">
            <div className="container font-weight-light mt-4">

                {/*strefa user*/}
                <TrainingGroupUser></TrainingGroupUser>

                {/*strefa trainer*/}
                {(isTrainer === true) ? (
                    <TrainingGroupTrainer></TrainingGroupTrainer>
                ) : ("")
                }

            </div>
        </div>
    );
}

export default TrainingGroups;