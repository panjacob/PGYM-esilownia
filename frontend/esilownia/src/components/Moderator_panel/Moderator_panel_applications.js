import React, {useEffect, useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

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
            .post(`/users/get_moderator/`, {
                id: owenrId
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setUserData(res.data)

                console.log(res.data)

                var div = document.createElement("div");

                var id = document.createElement("p")
                    id.style.margin = "0 0 0 0";
                var username = document.createElement("p")
                    username.style.margin = "0px 0px 0px 0px";
                var fn = document.createElement("p")
                    fn.style.margin = "0 0 0 0";
                var ln = document.createElement("p")
                    ln.style.margin = "0 0 0 0";
                var mail = document.createElement("p")
                mail.style.margin = "0 0 0 0";
                var joinDate = document.createElement("p")
                joinDate.style.margin = "0 0 0 0";
                var roles = document.createElement("p")
                roles.style.margin = "0 0 0 0";

                let id_z = 'Id : ' + res.data.id
                id.innerText = id_z;
                let username_z = 'Username : ' + res.data.username
                username.innerText = username_z;
                let fn_z = 'Imie : ' + res.data.first_name
                fn.innerText = fn_z;
                let ln_z = 'Nazwisko : ' + res.data.last_name
                ln.innerText = ln_z;
                let mail_z = 'Email : ' + res.data.email
                mail.innerText = mail_z;
                let joinDate_z = 'Data dołaczenia : ' + res.data.start_date.slice(0, 19).replace('T', " ")
                joinDate.innerText = joinDate_z;
                let t = " "
                let d = " "
                let n = " "
                if(res.data.is_coach === true){
                    t = 'Trener'
                }
                if(res.data.is_dietician === true){
                    d = 'Dietetyk'
                }
                if(res.data.is_coach === false && res.data.is_dietician === false){
                    n = 'Brak'
                }
                let roles_z = 'Role : '  + t + " " + d + " " + n
                roles.innerText = roles_z;

                div.appendChild(id)
                div.appendChild(username)
                div.appendChild(fn)
                div.appendChild(ln)
                div.appendChild(mail)
                div.appendChild(joinDate)
                div.appendChild(roles)

                document.getElementById(`user-${appId}-${owenrId}`).innerHTML = ""
                document.getElementById(`user-${appId}-${owenrId}`).appendChild(div)
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
                                <a href={'http://localhost:8000' + id.file}
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