import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";

function TrainingGroupTypeAll(){
const [trainingGroupTypeAll, setTrainingGroupTypeAll] = useState([]);

useEffect(() => {

    axiosInstance
        .post(`training/group/type/all`, {},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
            }
        })
        .then((res) => {
            setTrainingGroupTypeAll(res.data.trainingGroupTypeAll)
        });

}, []);
    return(
        <div className="trainingGroupTypeAll">
            <button className="btn btn-lg" onClick={console.log({trainingGroupTypeAll})}>Dołącz</button>
        </div>
    );
}
export default TrainingGroupTypeAll;