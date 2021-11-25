import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLocation} from "react-router-dom";
import axiosInstance from "../components/Axios/Axios";

import Button from "react-bootstrap/Button";

function TrainingJitsi() {

    const [trainingInfo, setTrainingInfo] = useState([])

    const location = useLocation()

    const jitsiStart = (jwt) => {
        const roomName = location.state.trainingId;
        const domain = "meet.pgym.xyz";
        const options = {
            width: 1200,
            height: 700,
            parentNode: document.querySelector('#meet'),
            roomName: roomName,
            jwt: jwt
        };
        const api = new window.JitsiMeetExternalAPI(domain, options);
        api.on('readyToClose', () => {
            api.dispose();
        });
    };

    const jitsiGetToken = (e) => {
        axiosInstance
            .post(`/training/join`, {id: location.state.trainingId}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                jitsiStart(res.data.token);
            });
    }

    const script = document.createElement("script");
    script.src = "https://meet.pgym.xyz/external_api.js";
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
        jitsiGetToken();
    };

    return (
        <div className="treningJitsi">
            <div className="container mt-4">
                <div id='meet'></div>
            </div>
        </div>
    );
}

export default TrainingJitsi;