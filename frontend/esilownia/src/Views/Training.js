import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useLocation} from "react-router-dom";
import axiosInstance from "../components/Axios/Axios";

function Training() {

    const [groupInfo, setGroupInfo] = useState([])
    const [trainingsInfo, setTrainingsInfo] = useState([])

    const location = useLocation()

    useEffect(() => {

        axiosInstance
            .post(`/training/group/get`, {id: location.state.groupId}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setGroupInfo(res.data)

                setTrainingsInfo(trainingsInfo => [])

                res.data.trainings.map((trainingId) => {
                    axiosInstance
                        .post(`/training/get`, {id: trainingId}, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                            }
                        })
                        .then((res) => {
                            setTrainingsInfo(trainingsInfo => [...trainingsInfo, res.data])
                        })
                });
            });

    }, []);

    return (
        <div className="treningi">
            <div className="container">

                <div className='row'>
                    <div className="col-md-8 mx-auto mt-3">

                        <div className="text-center">
                            <hr></hr>
                            <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Informacje Grupy
                            </h1>
                            <hr></hr>
                        </div>

                        <div className="card mb-3">

                            <div className="card-body">

                                <div className="row">
                                    <div className="col-sm-5">
                                        <h6 className="mb-0">Trener</h6>
                                    </div>
                                    <div className="col-sm-7 text-secondary">
                                        {groupInfo.owner}
                                    </div>
                                </div>
                                <hr></hr>

                                <div className="row">
                                    <div className="col-sm-5">
                                        <h6 className="mb-0">Poziom</h6>
                                    </div>
                                    <div className="col-sm-7 text-secondary">
                                        {groupInfo.difficulty}
                                    </div>
                                </div>
                                <hr></hr>

                                <div className="row">
                                    <div className="col-sm-5">
                                        <h6 className="mb-0">Tytuł</h6>
                                    </div>
                                    <div className="col-sm-7 text-secondary">
                                        {groupInfo.title}
                                    </div>
                                </div>
                                <hr></hr>

                                <div className="row">
                                    <div className="col-sm-5">
                                        <h6 className="mb-0">Description</h6>
                                    </div>
                                    <div className="col-sm-7 text-secondary">
                                        {groupInfo.description}
                                    </div>
                                </div>
                                <hr></hr>

                                <div className="row">
                                    <div className="col-sm-5">
                                        <h6 className="mb-0">Typ</h6>
                                    </div>
                                    <div className="col-sm-7 text-secondary">
                                        {JSON.stringify(groupInfo.type)}
                                    </div>
                                </div>
                                <hr></hr>

                                <div className="row">
                                    <div className="col-sm-5">
                                        <h6 className="mb-0">Treningi</h6>
                                    </div>
                                    <div className="col-sm-7 text-secondary">
                                        {JSON.stringify(groupInfo.trainings)}
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className='row'>
                    <div className="col-md-8 mx-auto mt-3">

                        <div className="text-center">
                            <hr></hr>
                            <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Treningi
                            </h1>
                            <hr></hr>
                        </div>

                        {trainingsInfo.map((training) => {
                            return (
                                <div className="card mb-3">
                                    <div className="card-body">

                                        <div className="row">
                                            <div className="col-sm-5">
                                                <h6 className="mb-0">ID</h6>
                                            </div>
                                            <div className="col-sm-7 text-secondary">
                                                {training.id}
                                            </div>
                                        </div>
                                        <hr/>

                                        <div className="row">
                                            <div className="col-sm-5">
                                                <h6 className="mb-0">Tytuł</h6>
                                            </div>
                                            <div className="col-sm-7 text-secondary">
                                                {training.title}
                                            </div>
                                        </div>
                                        <hr/>

                                        <div className="row">
                                            <div className="col-sm-5">
                                                <h6 className="mb-0">Description</h6>
                                            </div>
                                            <div className="col-sm-7 text-secondary">
                                                {training.description}
                                            </div>
                                        </div>
                                        <hr/>

                                        <div className="row">
                                            <div className="col-sm-5">
                                                <h6 className="mb-0">Data Startu</h6>
                                            </div>
                                            <div className="col-sm-7 text-secondary">
                                                {training.date_start}
                                            </div>
                                        </div>
                                        <hr/>

                                        <div className="row">
                                            <div className="col-sm-5">
                                                <h6 className="mb-0">Data Konca</h6>
                                            </div>
                                            <div className="col-sm-7 text-secondary">
                                                {training.date_end}
                                            </div>
                                        </div>
                                        <hr/>

                                        <Link className='btn' to={{
                                            pathname: '/trening',
                                            state: {
                                                trainingId: training.id
                                            }
                                        }}>Przejdz do Treningu</Link>

                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Training;