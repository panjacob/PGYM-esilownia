import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";

function TrainingGet(){
const [training, setTraining] = useState([]);

useEffect(() => {

    axiosInstance
        .post(`training/get`, {},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
            }
        })
        .then((res) => {
            setTraining(res.data.training)
        });

}, []);

    return(
        <div className="trening_dane">

        </div>
    );
}
export default TrainingGet;