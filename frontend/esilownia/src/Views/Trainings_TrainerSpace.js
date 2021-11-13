import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLocation} from 'react-router-dom'
import TrainingRemoveParticipant from "../components/Training/Trainer/TrainingRemoveParticipant";

function TrainingsTrainerSpace() {

    const [groupId, setGroupId] = useState("")

    const location = useLocation()

    useEffect(() => {

        setGroupId(location.state.groupId)

    }, []);

    return (
        <div className="trainingsTrainerSpace">
            <div className="container text-center">

                <TrainingRemoveParticipant groupId={groupId}></TrainingRemoveParticipant>

                Miejsce na operacje trenera na treningach znajdujacych sie w grupach treningowych

            </div>
        </div>
    );
}

export default TrainingsTrainerSpace;