import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLocation} from "react-router-dom";
import axiosInstance from "../components/Axios/Axios";

function DietMeetingJitsi(props) {
    const [groupId, setGroupId] = useState("")
    const [meetingInfo, setMeetingInfo] = useState([])

    const location = useLocation()

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://meet.pgym.xyz/external_api.js";
        script.async = true;
        document.head.appendChild(script);
        script.onload = () => {
            jitsiGetToken();
        };

        const search = location.search;
        const id = new URLSearchParams(search).get('id');

        setGroupId(id)

        axiosInstance
            .post(`diet/meeting/get`, {id: id}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                console.log(res.data)
                setMeetingInfo(res.data)
            });

    }, [props.groupId]);

    const jitsiStart = (jwt) => {
        const roomName = location.state.meetingId;
        const domain = "meet.pgym.xyz";
        const options = {
            width: 1100,
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
            .post(`diet/jitsi/join`, {id: location.state.meetingId}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                jitsiStart(res.data.token);
            });
    }

    return (
        <div className="treningJitsi justify-content-center">
            <div className="container">
                <div className="text-center">
                    <hr></hr>
                    <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">{meetingInfo.title}
                    </h1>
                    <hr></hr>
                </div>
                <div className="container mt-4 border" style={{'width':'1100px', 'height':'700px'}} >
                    <div id='meet'></div>
                </div>
                <div className="card mb-4 mt-4 bg-light" width="100%">
                    <div className="card-body">
                        <hr/>
                        <div className="row">
                            <div className="col-sm-5">
                                <h6 className="mb-0">Start</h6>
                            </div>
                            <div className="col-sm-7 text-secondary">
                                {meetingInfo.date}
                            </div>
                        </div>
                        <hr/>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DietMeetingJitsi;