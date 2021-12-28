import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import logo from "../../imgs/coin_img.png";
import accepted from "../../imgs/notifications/accepted.jpg";
import denied from "../../imgs/notifications/denied.png";
import training from "../../imgs/notifications/training.png";
import bought from "../../imgs/notifications/bought.jpg";
import diet from "../../imgs/notifications/diet.jpg";

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
                res.data.sort(function(a, b){return b.time-a.time}).map((notification) => {
                    let time_send = new Date()
                    time_send.setTime(notification.time)
                    let time_now = Date.now()
                    let time = time_now - time_send;

                    let obj = {}

                    if(notification.kind === '0') {
                        obj = {
                            id: notification.id,
                            kind: notification.kind,
                            image: logo,
                            message: 'Witamy na platformie P-Gym.',
                            detailPage: '#',
                            receivedTime: msToTime(time)
                        }
                    }

                    if(notification.kind === '1') {
                        obj = {
                            id: notification.id,
                            kind: notification.kind,
                            image: accepted,
                            message: 'Twoja Aplikacja została zaakceptowna.',
                            detailPage: '#',
                            receivedTime: msToTime(time)
                        }
                    }

                    if(notification.kind === '2') {
                        obj = {
                            id: notification.id,
                            kind: notification.kind,
                            image: denied,
                            message: 'Twoja Aplikacja została odrzucona.',
                            detailPage: '#',
                            receivedTime: msToTime(time)
                        }
                    }

                    if(notification.kind === '4') {
                        obj = {
                            id: notification.id,
                            kind: notification.kind,
                            image: training,
                            message: 'Dziekujemy za zakup treningu.',
                            detailPage: '#',
                            receivedTime: msToTime(time)
                        }
                    }

                    if(notification.kind === '5') {
                        obj = {
                            id: notification.id,
                            kind: notification.kind,
                            image: bought,
                            message: 'Uzytkownik wykupił dostep do twojego treningu.',
                            detailPage: '#',
                            receivedTime: msToTime(time)
                        }
                    }

                    if(notification.kind === '6') {
                        obj = {
                            id: notification.id,
                            kind: notification.kind,
                            image: diet,
                            message: 'Dziekujemy za zakup diety.',
                            detailPage: '#',
                            receivedTime: msToTime(time)
                        }
                    }

                    if(notification.kind === '7') {
                        obj = {
                            id: notification.id,
                            kind: notification.kind,
                            image: bought,
                            message: 'Uzytkownik wykupił twoja oferte diety.',
                            detailPage: '#',
                            receivedTime: msToTime(time)
                        }
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