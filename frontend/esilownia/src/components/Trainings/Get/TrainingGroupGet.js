import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";

function TrainingGroupGet(){
const [trainingGroup, setTrainingGroup] = useState([]);

useEffect(() => {

    axiosInstance
        .post(`training/group/get`, { id: '1' },{
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
        <div className="trainingGroupGet">
            <button className="btn btn-lg" onClick={console.log({trainingGroup})}>Dołącz</button>
        </div>
    );
}
export default TrainingGroupGet;