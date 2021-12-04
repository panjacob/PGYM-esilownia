import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import logo from "../../imgs/coin_img.png";

function AccountNotificationsAll() {

    const [notificationsToShow, setNotificationsToShow] = useState([])

    function msToTime(duration) {
        var seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
            days = Math.floor((duration / (1000 * 60 * 60 * 24)));

        if (hours === 0 && minutes === 0) {
            return seconds + " sec. temu";
        }
        if (hours === 0) {
            return minutes + " min. temu";
        }
        if (days === 0) {
            return hours + " godz. temu";
        }
        if (hours > 24) {
            if (days === 1) {
                return days + " dzień temu"
            } else {
                return days + " dni temu"
            }
        }
    }

    useEffect(() => {

        axiosInstance
            .post(`/message/notification/all`, {show_seen: 'True'}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setNotificationsToShow([])
                res.data.map((notification) => {
                    let time_send = new Date()
                    time_send.setTime(notification.time)
                    let time_now = Date.now()
                    let time = time_now - time_send;

                    let obj = {
                        id: notification.id,
                        kind: notification.kind,
                        image: logo,
                        message: JSON.parse(notification.body).message,
                        detailPage: '#',
                        receivedTime: msToTime(time)
                    }
                    setNotificationsToShow(notificationsToShow => [...notificationsToShow, obj])
                })
            });

    }, []);

    return (
        <div className="accountNotificationsAll">
            <div className="container">

                <div className="text-center">
                    <hr></hr>
                    <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Powiadmienia
                    </h1>
                    <hr></hr>
                </div>

                <div className="col-md-5 mx-auto mt-3 border pl-5 pr-5" style={{overflowY:'scroll', maxHeight:'500px', minHeight:'250px'}}>

                    {notificationsToShow.reverse().map((notification) => {
                        return (

                            <div className="card bg-light">
                                <a href={notification.detailPage} className="card-link">
                                    <div className="content">
                                        <div className="image"><img src={notification.image} alt="Person"/></div>
                                        <div className="message">
                                            <div className="text">{notification.message}</div>
                                            <div className="time">{notification.receivedTime}</div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                        )
                    })}


                </div>

            </div>
        </div>
    );
}

export default AccountNotificationsAll;