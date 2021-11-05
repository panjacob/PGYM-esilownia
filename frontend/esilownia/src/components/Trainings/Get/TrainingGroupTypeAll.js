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
            setTrainingGroupTypeAll(res.data)
        });

}, []);
    return(
        <div className="trainingGroupTypeAll">
            Typ Treningu: 
            <select>
                {trainingGroupTypeAll.map(function(cValue, idx){
                    return (<option key={idx}>{cValue.type}</option>)
                })}
            </select>
        </div>
    );
}
export default TrainingGroupTypeAll;