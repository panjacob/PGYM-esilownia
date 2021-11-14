import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLocation} from "react-router-dom";
import axiosInstance from "../components/Axios/Axios";

function TrainingJitsi() {

    const [trainingInfo, setTrainingInfo] = useState([])

    const location = useLocation()

    useEffect(() => {


        axiosInstance
            .post(`/training/get`, {id: location.state.trainingId}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                console.log(res.data)
                setTrainingInfo(res.data)
            });

    }, []);



    return (
        <div className="treningJitsi">
            <div className="container">

                {JSON.stringify(trainingInfo)}

            </div>
        </div>
    );
}

export default TrainingJitsi;