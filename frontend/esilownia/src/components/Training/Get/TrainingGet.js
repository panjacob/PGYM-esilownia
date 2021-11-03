import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/axios";

function TrainingGet(){
const [training, setTraining] = useState("");

useEffect(() => {

    axiosInstance
        .get(`training/get`, {
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

}, []);
    return(
        <div className="trening_dane">

        </div>
    );
}
export default TrainingGet;