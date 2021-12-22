import React, {useEffect, useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import axios_variebles from "../Axios/Axios_variebles";

function ModeratorPanelApplications(props) {

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
                setApplications(res.data)

                res.data.map((application) => {

                    axiosInstance
                        .post(`/users/get_moderator/`, {
                            id: application.owner
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                            }
                        })
                        .then((res2) => {

                            setUserData( userData => [...userData, res2.data])
                        })
                })
            });

    }, []);

    function uniqBy(a, key) {
        var seen = {};
        return a.filter(function (item) {
            var k = key(item);
            return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        })
    }

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

    function checkStatus(app) {
        return props.appStatus.includes(app.status);
    }

    const listItems = applications.filter(checkStatus).map((id) =>
        <div className="row" key={id.id} id={`application-${id.id}`}>
            <div className="card m-3" style={{width: '100%'}}>
                <div className="card-body">
                    <div className="row">

                        <div className="col-4">
                            <h6 className="mb-0">Status</h6>
                        </div>

                        <div className="col text-secondary">
                            {(id.status === '0') ? (
                                <p className='mb-0'>Oczekujace</p>
                            ) : (
                                ""
                            )}
                            {(id.status === '1') ? (
                                <p className='mb-0'>Zaakceptowane</p>
                            ) : (
                                ""
                            )}
                            {(id.status === '2') ? (
                                <p className='mb-0'>Odrzucnone</p>
                            ) : (
                                ""
                            )}
                        </div>

                    </div>
                    <hr></hr>
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
                            <h6 className="mb-0">Właściciel</h6>
                        </div>

                        <div className="col text-secondary" id={`user-${id.id}-${id.owner}`}>
                            {uniqBy(userData, JSON.stringify).map((user)=>{
                                if(user.id === id.owner){
                                    return (
                                        <div>
                                            <p className='m-0'>Id : {user.id}</p>
                                            <p className='m-0'>Email : {user.email}</p>
                                            <p className='m-0'>Username : {user.username}</p>
                                            <p className='m-0'>Imie : {user.first_name}</p>
                                            <p className='m-0'>Nazwisko : {user.last_name}</p>
                                            <p className='m-0'>Data Dołaczenia : {user.start_date.slice(0, 19).replace('T', " ")}</p>
                                        </div>
                                    )
                                }
                            })}
                        </div>

                    </div>
                    <hr></hr>
                    <div className="row">

                        <div className="col-4">
                            <h6 className="mb-0">Plik</h6>
                        </div>

                        <div className="col text-secondary">
                            {(id.file !== null) ? (
                                <a href={axios_variebles.baseURL.slice(0, -1) + id.file}
                                   download>{decodeURIComponent(id.file.substring(id.file.lastIndexOf('/') + 1))}</a>
                            ) : (
                                'Brak Pliku'
                            )}
                        </div>

                    </div>
                    <hr></hr>


                    <div className="row ml-1">
                        {(id.status === '0') ? (
                            <>
                                {(id.trainer === true && id.dietician === false) ? (
                                    <Button className="m-1" onClick={handleSubmitTrainer(id.owner, id.id)}
                                            variant="primary"
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
                                        <Button className="m-1" onClick={handleSubmitTandD(id.owner, id.id)}
                                                variant="primary"
                                                size="sm">Akceptuj Oba</Button>
                                        <Button className="m-1" onClick={handleSubmitTrainer(id.owner, id.id)}
                                                variant="primary"
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
                            </>
                        ) : (
                            ""
                        )}
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