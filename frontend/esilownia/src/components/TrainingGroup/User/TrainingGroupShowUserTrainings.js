import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Photo from "../../../imgs/gymcoin.png";
import axiosInstance from "../../Axios/Axios";
import {Link} from "react-router-dom";
import axios_variebles from "../../Axios/Axios_variebles";

function TrainingGroupShowUserTrainings() {

    const [trainingGroupAll, setTrainingGroupAll] = useState([]);
    const [trainingGroupTypeAll, setTrainingGroupTypeAll] = useState([]);
    const [userTrainings, setUserTrainings] = useState([]);

    useEffect(() => {

        axiosInstance
            .post(`training/group/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setTrainingGroupAll(res.data)
            });

        axiosInstance
            .post(`training/group/type/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setTrainingGroupTypeAll(res.data)
            });

        axiosInstance
            .post(`users/info/`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setUserTrainings(res.data.trainings)
            });

    }, []);


    return (
        <div className="trainingGroupShowUserTrainings">
            <div className="container">

                <div className="text-center">
                    <hr></hr>
                    <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Twoje Treningi
                        </h1>
                    <hr></hr>
                </div>
                <div className="row border justify-content-center text-center inline-block">
                    {trainingGroupAll.map((training, idx) => {


                        if (training.difficulty === "0") {
                            training.difficulty = "Łatwy"
                        }
                        if (training.difficulty === "1") {
                            training.difficulty = "Średni"
                        }
                        if (training.difficulty === "2") {
                            training.difficulty = "Trudny"
                        }
                        if (training.difficulty === "3") {
                            training.difficulty = "Armagedon"
                        }

                        for(let i = 0 ; i < userTrainings.length; i++) {
                            if (userTrainings[i].training_group === training.id) {
                                return (
                                    <div key={idx} style={{minWidth: '250px'}} className="col-md-3 mb-3 mt-2 flex ">
                                        <div className="h-100 card m-1 shadow bg-light">
                                            {(training.image === null) ? (
                                                <img src={Photo} width="100%" height="width"
                                                     className="card-img-top rounded-circle"
                                                     alt="..."/>
                                            ):(
                                                <img src={axios_variebles.baseURL.slice(0, -1) + training.image} width="233px" height="233px"
                                                     className="card-img-top rounded-circle"
                                                     alt="..."/>
                                            )}
                                            <div className="card-body">
                                                <div>
                                                    <h5 className="card-title">{training.title}</h5>
                                                    <div className="card-subtitle"
                                                         style={{overflow: 'auto', height: '100px'}}>
                                                        {trainingGroupTypeAll.map(function (type, id) {
                                                            for (let i = 0; i < training.type.length; i++) {
                                                                if (training.type.includes(type.id)) {
                                                                    return (<p className="m-0"
                                                                               style={{fontSize:'15px'}}
                                                                               key={id}>{type.type}</p>)
                                                                }
                                                            }
                                                        })}
                                                    </div>
                                                    <p className="card-text"> Poziom: {training.difficulty}</p>
                                                    <p className="card-text text-center"> Trener: {training.owner}</p>
                                                    <Link className='btn' to={{
                                                        pathname: '/grupa_treningi',
                                                        search: 'id='+training.id.toString()
                                                    }}>Szczegóły Grupy {training.id}</Link>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            }
                        }
                    })}
                    <div style={{minWidth: '250px'}} className="col-md-3"></div>
                    <div style={{minWidth: '250px'}} className="col-md-3"></div>
                    <div style={{minWidth: '250px'}} className="col-md-3"></div>
                </div>
            </div>

        </div>
    );
}

export default TrainingGroupShowUserTrainings;