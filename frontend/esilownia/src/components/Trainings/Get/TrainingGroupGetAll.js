import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";


function TrainingGroupGetAll(){
const [trainingGroupAll, setTrainingGroupAll] = useState([]);

useEffect(() => {

    axiosInstance
        .post(`training/group/all`, {},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
            }
        })
        .then((res) => {
            setTrainingGroupAll(res.data)
        });

}, []);
    return(
        <div className="trainingGroupGetAll">
            <div>
                Grupy Treningowe
                {trainingGroupAll.map(function(cValue, idx){
                    return (<li key={idx}>id={cValue.id}, typ={cValue.type}, tytuł={cValue.title}, Stopień trudności ={cValue.difficulty}</li>)
                })}
            </div>
        </div>
    );
}
export default TrainingGroupGetAll;