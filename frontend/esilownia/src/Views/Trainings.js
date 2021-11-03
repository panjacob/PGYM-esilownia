import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainingGroupGet from "../components/Trainings/Get/TrainingGroupGet";
import TrainingGroupCreate from "../components/Trainings/Post/TrainingGroupCreate";
import TrainingGroupGetAll from "../components/Trainings/Get/TrainingGroupGetAll";
import TrainingGroupTypeAll from "../components/Trainings/Get/TrainingGroupTypeAll";
import TrainingGroupTypeGet from "../components/Trainings/Get/TrainingGroupTypeGet";
import TrainingGroupAddParticipant from "../components/Trainings/Post/TrainingGroupAddParticipant";
import TrainingGroupRemoveParticipant from "../components/Trainings/Post/TrainingGroupRemoveParticipant";

function Trainings() {


    return (
        <div className="treningi">
            <div className="container">
                <TrainingGroupGet></TrainingGroupGet>
                <TrainingGroupGetAll></TrainingGroupGetAll>
                <TrainingGroupTypeAll></TrainingGroupTypeAll>
                <TrainingGroupTypeGet></TrainingGroupTypeGet>
                <TrainingGroupAddParticipant></TrainingGroupAddParticipant>
                <TrainingGroupRemoveParticipant></TrainingGroupRemoveParticipant>
                <TrainingGroupCreate></TrainingGroupCreate>

            </div>
        </div>
    );
}

export default Trainings;