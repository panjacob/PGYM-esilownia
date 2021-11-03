import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";

function TrainingLeave(){
const [training, setTraining] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
        .get(`training/leave`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
            }
        })
        .then((res) => {
            //console.log(res)
            //console.log(res.data)

            setTraining(res.data.training)

        });

};
    return(
        <div className="trening_leave">
            <button className="btn btn-lg" onClick={handleSubmit}>Opuść</button>
        </div>
    );
}
export default TrainingLeave;