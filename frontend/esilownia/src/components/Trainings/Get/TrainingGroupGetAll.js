import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";


function TrainingGroupGetAll(){
const [trainingGroup, setTrainingGroup] = useState([]);

useEffect(() => {

    axiosInstance
        .post(`training/group/get`, {},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
            }
        })
        .then((res) => {
            setTrainingGroup(res.data.trainingGroup)
        });

}, []);
    return(
        <div className="trainingGroupGetAll">
            <button className="btn btn-lg" onClick={console.log({trainingGroup})}>Dołącz</button>
        </div>
    );
}
export default TrainingGroupGetAll;