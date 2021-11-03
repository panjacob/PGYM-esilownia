import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/axios";

function TrainingGroupTypeGet(){
const [trainingGroupType, setTrainingGroupType] = useState("");

useEffect(() => {

    axiosInstance
        .get(`training/group/type/get`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
            }
        })
        .then((res) => {
            //console.log(res)
            //console.log(res.data)

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