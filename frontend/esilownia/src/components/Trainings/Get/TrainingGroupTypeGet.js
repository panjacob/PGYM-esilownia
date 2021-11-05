import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";

function TrainingGroupTypeGet(){
const [trainingGroupType, setTrainingGroupType] = useState([]);

useEffect(() => {

    axiosInstance
        .post(`training/group/type/get`, {id:'1'},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
            }
        })
        .then((res) => {
            setTrainingGroupType(res.data.trainingGroupType)
        });

}, []);

    return(
        <div className="trainingGroupTypeGet">
            <button className="btn btn-lg" onClick={console.log({trainingGroupType})}>Dołącz</button>
        </div>
    );
}
export default TrainingGroupTypeGet;