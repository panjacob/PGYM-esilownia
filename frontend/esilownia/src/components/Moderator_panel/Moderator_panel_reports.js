import React, {useEffect, useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import axios_variebles from "../Axios/Axios_variebles";

function ModeratorPanelReport(props) {

    const [reports, setReports] = useState([]);
    const [userData, setUserData] = useState([])

    useEffect(() => {

        axiosInstance
            .post(`/moderator/report/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setReports(res.data)

                res.data.map((report) => {

                    axiosInstance
                        .post(`/users/get_moderator/`, {
                            id: report.owner
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

    function checkStatus(rep) {
        return props.repStatus.includes(rep.is_solved.toString());
    }

    const handleSubmitSolved = (repId) => (e) => {
        e.preventDefault();

        axiosInstance
            .post(`/moderator/report/edit`, {
                id: repId,
                is_solved: true
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

    const listItems = reports.filter(checkStatus).map((id) =>
        <div className="row" key={id.id} id={`report-${id.id}`}>
            <div className="card m-3" style={{width: '100%'}}>
                <div className="card-body">
                    <div className="row">

                        <div className="col-4">
                            <h6 className="mb-0">Status</h6>
                        </div>

                        <div className="col text-secondary">
                            {(id.is_solved.toString() === 'false') ? (
                                <p className='mb-0'>Oczekujace</p>
                            ) : (
                                ""
                            )}
                            {(id.is_solved.toString() === 'true') ? (
                                <p className='mb-0'>Rozwiązane</p>
                            ) : (
                                ""
                            )}
                        </div>

                    </div>
                    <hr></hr>
                    <div className="row">

                        <div className="col-4">
                            <h6 className="mb-0">Numer reportu</h6>
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
                            <h6 className="mb-0">Tytuł</h6>
                        </div>

                        <div className="col text-secondary">
                            {id.title}
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
                            <h6 className="mb-0">Owner</h6>
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
                            <h6 className="mb-0">File</h6>
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
                        {(id.is_solved.toString() === 'false') ? (
                            <Button className="m-1" onClick={handleSubmitSolved(id.id)} variant="primary"
                                    size="sm">Rozwiązane</Button>
                        ) : (
                            ""
                        )}
                    </div>

                </div>
            </div>
        </div>
    );

    return (
        <div className="moderatorPanelReport">
            <div className="container">
                <div className="text-center">
                    <hr></hr>
                    <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Zgłoszenia</h1>
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

export default ModeratorPanelReport;