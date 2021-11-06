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
            <div className="container font-weight-light mt-4">

                {/*<TrainingGroupTypeAll></TrainingGroupTypeAll>*/}
                <TrainingGroupGetAll></TrainingGroupGetAll>

                {/*<TrainingGroupTypeGet></TrainingGroupTypeGet>*/}

                {/*<TrainingGroupGet></TrainingGroupGet>*/}

                
                {/* Strefa dla trenera */}
                {/*<TrainingGroupAddParticipant></TrainingGroupAddParticipant>*/}
                {/*<TrainingGroupRemoveParticipant></TrainingGroupRemoveParticipant>*/}
                 <TrainingGroupCreate></TrainingGroupCreate>

            </div>
        </div>
    );
}

export default Trainings;