import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";

function TrainingGroupGet(){
const [trainingGroup, setTrainingGroup] = useState([]);

useEffect(() => {

    axiosInstance
        .post(`training/group/get`, { id:"1"},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
            }
        })
        .then((res) => {
            setTrainingGroup(res.data)
        });

}, []);
    return(
        <div className="trainingGroupGet">
            Grupa Treningowa Dane
            <ul>
                <li>{trainingGroup.id}</li>
                <li>{trainingGroup.title}</li>
                <li>{trainingGroup.owner}</li>
                <li>{trainingGroup.date}</li>
                <li>{trainingGroup.difficulty}</li>
                <li>{trainingGroup.description}</li>
                <li>{trainingGroup.type}</li>
                <li>{trainingGroup.participants}</li>
                <li>{trainingGroup.images}</li>
                <li>{trainingGroup.trainings}</li>
            </ul>
        </div>
    );
}
export default TrainingGroupGet;