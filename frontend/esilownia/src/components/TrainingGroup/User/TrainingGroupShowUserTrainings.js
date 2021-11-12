import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Photo from "../../../imgs/gymcoin.png";
import axiosInstance from "../../Axios/Axios";

function TrainingGroupShowUserTrainings() {

    const [trainingGroupAll, setTrainingGroupAll] = useState([]);
    const [trainingGroupTypeAll, setTrainingGroupTypeAll] = useState([]);
    const [trainingDetailsAll, setTrainingDetailsAll] = useState([]);
    const [userId, setUserId] = useState("");

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
                setUserId(res.data.id)
            });

    }, []);

    const getDetails = (e) => {
        e.preventDefault();
        let listTrainingDetails = []

        trainingGroupAll.map((training) => {
            axiosInstance
                .post(`training/group/get`, {id: training.id}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                    }
                })
                .then((res) => {
                    listTrainingDetails.push(res.data)
                });
        });

        setTrainingDetailsAll(listTrainingDetails)

    }

    function test() {
        console.log(trainingDetailsAll)
        console.log(userId)
        console.log(trainingGroupAll)
        setTrainingDetailsAll(trainingDetailsAll)
    }

    return (
        <div className="trainingGroupShowUserTrainings">


            <div className="text-center">
                <hr></hr>
                <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Twoje Grupy</h1>
                <hr></hr>
            </div>
            <div className="row">
                <div className="col-md-3 border text-center">
                    <button onClick={test}>Test</button>
                    <button onClick={getDetails}>Test2</button>
                </div>
                <div className="col-md-9 border text-center inline-block">
                    <div id="offer_container" className="row justify-content-center">
                        {(trainingDetailsAll.length !== 0) ? (
                            <div className="row">
                                {trainingDetailsAll.map((training, idx) => {
                                    if (training.participants.length !== 0) {
                                        for (let i = 0; i < training.participants.length; i++) {
                                            if (training.participants[i].user === userId) {
                                                return (
                                                    <div key={idx} style={{minWidth: '250px'}}
                                                         className="col-md-4 mb-2 flex">
                                                        <div className="h-100 card m-1">
                                                            <img src={Photo} width="100%" height="width"
                                                                 className="card-img-top rounded-circle"
                                                                 alt="..."/>
                                                            <div className="card-body">
                                                                <div>
                                                                    <h5 className="card-title">{training.title}</h5>
                                                                    <div className="card-subtitle"
                                                                         style={{overflow: 'auto', height: '100px'}}>
                                                                        {trainingGroupTypeAll.map(function (type, id) {
                                                                            for (let i = 0; i < training.type.length; i++) {
                                                                                if (training.type.includes(type.id)) {
                                                                                    return (<p className="m-0"
                                                                                               key={id}>{type.type}</p>)
                                                                                }
                                                                            }
                                                                        })}
                                                                    </div>
                                                                    <p className="card-text"> Poziom: {training.difficulty}</p>
                                                                    <button className="btn btn-lg mb-4">
                                                                        Pokaż więcej
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )

                                            } else {
                                                return (<div>Nie twoja grupa</div>)
                                            }
                                        }
                                    } else {
                                        return (<div>Brak uzytkownikow w treningu</div>)
                                    }

                                })}
                            </div>
                        ) : (<div>Brak trainingDetailsa</div>)
                        }

                    </div>
                </div>
            </div>

        </div>
    );
}

export default TrainingGroupShowUserTrainings;