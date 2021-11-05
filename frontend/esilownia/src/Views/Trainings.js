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
                <TrainingGroupGetAll></TrainingGroupGetAll>

                <TrainingGroupTypeAll></TrainingGroupTypeAll>
                {/*Typy treningow :                */}
                {/*[{id: 1, type: "siłowy", description: "opis"}, */}
                {/*{id: 2, type: "cardio", description: "opis"},…]*/}
                {/*{id: 1, type: "siłowy", description: "opis"}*/}
                {/*{id: 2, type: "cardio", description: "opis"}*/}
                {/*{id: 3, type: "funkcjonalny", description: "opis"}*/}
                {/*{id: 4, type: "fitness", description: "opis"}*/}
                {/*{id: 5, type: "aerobowy", description: "opis"}*/}
                {/*{id: 6, type: "ABS", description: "opis"}*/}
                {/*{id: 7, type: "wibracyjny", description: "opis"}*/}
                {/*{id: 8, type: "interwałowy", description: "opis"}*/}
                {/*{id: 9, type: "streching", description: "opis"}*/}
                {/*{id: 10, type: "yoga", description: "opis"}*/}
                {/*{id: 20, type: "inne", description: "opis"}*/}

                <TrainingGroupTypeGet></TrainingGroupTypeGet>

                <TrainingGroupGet></TrainingGroupGet>


                {/*<TrainingGroupAddParticipant></TrainingGroupAddParticipant>*/}
                {/*<TrainingGroupRemoveParticipant></TrainingGroupRemoveParticipant>*/}
                {/*<TrainingGroupCreate></TrainingGroupCreate>*/}

            </div>
        </div>
    );
}

export default Trainings;