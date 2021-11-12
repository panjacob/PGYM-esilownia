import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainingGroupGet from "../components/TrainingGroup/Get_DoUsuniecia/TrainingGroupGet";
import TrainingGroupCreate from "../components/TrainingGroup/Trainer/TrainingGroupCreate";
import TrainingGroupTypeAll from "../components/TrainingGroup/Get_DoUsuniecia/TrainingGroupTypeAll";
import TrainingGroupTypeGet from "../components/TrainingGroup/Get_DoUsuniecia/TrainingGroupTypeGet";
import TrainingGroupAddParticipant from "../components/TrainingGroup/Post_DoUsuniecia/TrainingGroupAddParticipant";
import TrainingGroupRemoveParticipant from "../components/TrainingGroup/Post_DoUsuniecia/TrainingGroupRemoveParticipant";
import Button from "react-bootstrap/Button";
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