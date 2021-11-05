import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";

function TrainingGroupTypeGet(){
const [trainingGroupType, setTrainingGroupType] = useState([]);

useEffect(() => {

    axiosInstance
        .post(`training/group/type/get`, {id:"5"},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
            }
        })
        .then((res) => {
            setTrainingGroupType(res.data)
        });

}, []);

    return(
        <div className="trainingGroupTypeGet">
            Typ grupy
            <ul>
                <li>{trainingGroupType.id}</li>
                <li>{trainingGroupType.description}</li>
                <li>{trainingGroupType.type}</li>
           </ul>
        </div>
    );
}
export default TrainingGroupTypeGet;