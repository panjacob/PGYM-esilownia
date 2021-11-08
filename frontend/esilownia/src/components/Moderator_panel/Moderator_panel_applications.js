import React, {useEffect, useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {OverlayTrigger, Popover, PopoverTitle, PopoverContent} from "react-bootstrap";
import {SiJss} from "react-icons/all";

function ModeratorPanelApplications() {

    const [applications, setApplications] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {

        axiosInstance
            .post(`/moderator/application/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                console.log(res.data)
                setApplications(res.data)
            });

    }, []);

    const handleSubmitTrainer = (ownerId, appId) => (e) => {
        e.preventDefault();

        axiosInstance
            .post(`/users/set_coach/`, {
                id: ownerId,
                value: 'true'
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
            });
        axiosInstance
            .post(`/moderator/application/accept`, {
                id: appId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                window.location.reload();
            });
    }

    const handleSubmitNutricionist = (ownerId, appId) => (e) => {
        e.preventDefault();

        axiosInstance
            .post(`/users/set_dietician/`, {
                id: ownerId,
                value: 'true'
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
            });
        axiosInstance
            .post(`/moderator/application/accept`, {
                id: appId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                window.location.reload();
            });
    }

    const handleSubmitTandD = (ownerId, appId) => (e) => {
        e.preventDefault();

        axiosInstance
            .post(`/users/set_dietician/`, {
                id: ownerId,
                value: 'true'
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
            });
        axiosInstance
            .post(`/users/set_coach/`, {
                id: ownerId,
                value: 'true'
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
            });
        axiosInstance
            .post(`/moderator/application/accept`, {
                id: appId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                window.location.reload();
            });
    }

    const handleSubmitReject = (appId) => (e) => {
        e.preventDefault();

        axiosInstance
            .post(`/moderator/application/reject`, {
                id: appId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                window.location.reload();
            });

    }

    const userDetails = (owenrId, appId) => (e) => {
        e.preventDefault();

        axiosInstance
            .post(`/users/get/`, {
                id: owenrId
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setUserData(res.data)

                var div = document.createElement("div");

                var id = document.createElement("p");
                var username = document.createElement("p");
                var imie = document.createElement("p");
                var nazwisko = document.createElement("p");

                let id_z = 'Id : ' + res.data.id
                id.innerText = id_z;
                let username_z = 'Username : ' + res.data.username
                username.innerText = username_z;
                let imie_z = 'Imie : ' + res.data.first_name
                imie.innerText = imie_z;
                let nazwisko_z = 'Nazwisko : ' + res.data.last_name
                nazwisko.innerText = nazwisko_z;

                div.appendChild(id)
                div.appendChild(username)
                div.appendChild(imie)
                div.appendChild(nazwisko)

                document.getElementById(`user-${appId}-${owenrId}`).innerHTML = ""
                document.getElementById(`user-${appId}-${owenrId}`).appendChild(div)
            });


    }

    function checkStatus(app) {
        return app.status === '0';
    }

    const listItems = applications.filter(checkStatus).map((id) =>
        <div className="row" key={id.id} id={`application-${id.id}`}>
            <div className="card m-3" style={{width: '100%'}}>
                <div className="card-body">
                    <div className="row">

                        <div className="col-4">
                            <h6 className="mb-0">Numer podania</h6>
                        </div>

                        <div className="col text-secondary">
                            {id.id}
                        </div>

                    </div>
                    <hr></hr>
                    <div className="row">

                        <div className="col-4">
                            <h6 className="mb-0">Data</h6>
                        </div>

                        <div className="col text-secondary">
                            {id.date.slice(0, 19).replace('T', " ")}
                        </div>

                    </div>
                    <hr></hr>
                    <div className="row">

                        <div className="col-4">
                            <h6 className="mb-0">Opis</h6>
                        </div>

                        <div className="col text-secondary">
                            {id.description}
                        </div>

                    </div>
                    <hr></hr>
                    <div className="row">

                        <div className="col-4">
                            <h6 className="mb-0">Aplikacja na role</h6>
                        </div>

                        <div className="col text-secondary">
                            {(id.trainer === true) ? (
                                <p className='mb-0'>Trener</p>
                            ) : (
                                ""
                            )}
                            {(id.dietician === true) ? (
                                <p className='mb-0'>Dietetyk</p>
                            ) : (
                                ""
                            )}
                        </div>

                    </div>
                    <hr></hr>
                    <div className="row">

                        <div className="col-4">
                            <h6 className="mb-0">Owner</h6>
                        </div>

                        <div className="col text-secondary" id={`user-${id.id}-${id.owner}`}>
                            <div>{id.owner}</div>
                            <Link onClick={userDetails(id.owner, id.id)}>Wiecej</Link>
                        </div>

                    </div>
                    <hr></hr>
                    <div className="row">

                        <div className="col-4">
                            <h6 className="mb-0">File</h6>
                        </div>

                        <div className="col text-secondary">
                            {(id.file !== null) ? (
                                <Link download to={'http://localhost:8000' + id.file}>{id.file}</Link>
                            ) : (
                                'Brak Pliku'
                            )}
                        </div>

                    </div>
                    <hr></hr>


                    <div className="row ml-1">
                        {(id.trainer === true && id.dietician === false) ? (
                            <Button className="m-1" onClick={handleSubmitTrainer(id.owner, id.id)} variant="primary"
                                    size="sm">Akceptuj Trener</Button>
                        ) : (
                            ""
                        )}
                        {(id.trainer === false && id.dietician === true) ? (
                            <Button className="m-1" onClick={handleSubmitNutricionist(id.owner, id.id)}
                                    variant="primary"
                                    size="sm">Akceptuj Dietetyk</Button>
                        ) : (
                            ""
                        )}
                        {(id.trainer === true && id.dietician === true) ? (
                            <>
                                <Button className="m-1" onClick={handleSubmitTandD(id.owner, id.id)} variant="primary"
                                        size="sm">Akceptuj Oba</Button>
                                <Button className="m-1" onClick={handleSubmitTrainer(id.owner, id.id)} variant="primary"
                                        size="sm">Akceptuj tylko Trener</Button>
                                <Button className="m-1" onClick={handleSubmitNutricionist(id.owner, id.id)}
                                        variant="primary"
                                        size="sm">Akceptuj tylko Dietetyk</Button>
                            </>
                        ) : (
                            ""
                        )}
                        <Button className="m-1" onClick={handleSubmitReject(id.id)} variant="primary"
                                size="sm">Odrzuć</Button>
                    </div>

                </div>
            </div>
        </div>
    );

    return (
        <div className="moderatorPanelApplications">
            <div className="container">
                <div className="text-center">
                    <hr></hr>
                    <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Aplikacje na
                        pozycje</h1>
                    <hr></hr>
                </div>
                <div className="my-2 border">
                    <div className="container" style={{overflowY: 'scroll', flex: '1', height: '575px'}}>
                        {listItems}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModeratorPanelApplications;