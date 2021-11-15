import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLocation} from 'react-router-dom'
import TrainingRemoveParticipant from "../components/Training/Trainer/TrainingRemoveParticipant";
import TrainingGroupChangeImage from "../components/Training/Trainer/TrainingGroupChangeImage";
import TrainingCreate from "../components/Training/Trainer/TrainingCreate";
import TrainingTrainerGet from "../components/Training/Trainer/TrainingTrainerGet";

function TrainingsTrainerSpace() {

    const [groupId, setGroupId] = useState("")

    const location = useLocation()

    useEffect(() => {

        setGroupId(location.state.groupId)

    }, []);

    return (
        <div className="trainingsTrainerSpace">
            <div className="container text-center">
                <TrainingTrainerGet groupId={groupId}></TrainingTrainerGet>
                <TrainingCreate groupId={groupId}></TrainingCreate>
                <TrainingRemoveParticipant groupId={groupId}></TrainingRemoveParticipant>
                {/*<TrainingGroupChangeImage groupId={groupId}></TrainingGroupChangeImage>*/}
                Miejsce na operacje trenera na treningach znajdujacych sie w grupach treningowych

            </div>
        </div>
    );
}

export default TrainingsTrainerSpace;