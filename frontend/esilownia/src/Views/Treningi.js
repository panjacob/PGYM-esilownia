import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainingGroupGet from "../components/Treningi/Get/TrainingGroupGet";
import TrainingGroupCreate from "../components/Treningi/Post/TrainingGroupCreate";
import TrainingGroupGetAll from "../components/Treningi/Get/TrainingGroupGetAll";
import TrainingGroupTypeAll from "../components/Treningi/Get/TrainingGroupTypeAll";
import TrainingGroupTypeGet from "../components/Treningi/Get/TrainingGroupTypeGet";
import TrainingGroupAddParticipant from "../components/Treningi/Post/TrainingGroupAddParticipant";
import TrainingGroupRemoveParticipant from "../components/Treningi/Post/TrainingGroupRemoveParticipant";

function Treningi() {


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

export default Treningi;