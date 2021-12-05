import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useHistory, useLocation} from "react-router-dom";
import axiosInstance from "../components/Axios/Axios";
import profilePicture from "../imgs/basic_profile_photo.jpg";
import axios_variebles from "../components/Axios/Axios_variebles";
import TrainingCreate from "../components/Training/Trainer/TrainingCreate";
import TrainingRemoveParticipant from "../components/Training/Trainer/TrainingRemoveParticipant";
import TrainingGroupChangeImage from "../components/Training/Trainer/TrainingGroupChangeImage";
import TrainingGroupChangeVideo from "../components/Training/Trainer/TrainingGroupChangeVideo";
import {Button} from "react-bootstrap";
import TrainingGroupRemove from "../components/Training/Trainer/TrainingGroupRemove";

function Training() {

    const [groupId, setGroupId] = useState("")
    const [groupInfo, setGroupInfo] = useState([])
    const [trainingsInfo, setTrainingsInfo] = useState([])
    const [trainingGroupTypeAll, setTrainingGroupTypeAll] = useState([]);
    const [groupTypes, setGroupTypes] = useState([])
    const [groupTrainings, setGroupTrainings] = useState([])
    const [trainerInfo, setTraninerInfo] = useState([])
    const [photo, setPhoto] = useState([])

    const difficultiesAll = [
        {
            id: '0',
            name: 'Łatwy'
        }, {
            id: '1',
            name: 'Średni'
        }, {
            id: '2',
            name: 'Trudny'
        }, {
            id: '3',
            name: 'Armagedon'
        }
    ]

    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        setGroupId(location.state.groupId)

        axiosInstance
            .post(`/training/group/get`, {id: location.state.groupId}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setGroupInfo(res.data)
                setGroupTypes(res.data.type)
                setGroupTrainings(res.data.trainings)

                if(res.data.image === null){
                    setPhoto(profilePicture)
                } else {
                    setPhoto(axios_variebles.baseURL.slice(0, -1) + res.data.image)
                }

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

                axiosInstance
                    .post(`/users/get/`, {id: res.data.owner}, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                        }
                    })
                    .then((res) => {
                        setTraninerInfo(res.data)
                    })
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


    }, []);

    return (
        <div className="treningi">
            <div className="container">
                <Button className="btn btn-lg mt-4 border-0" style={{'color':'black'}} onClick={() => history.goBack()}>Wstecz</Button>
                <div className='row'>
                    <div className="col-md-10 mx-auto mt-3">

                        <div className="text-center">
                            <hr></hr>
                            <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Informacje
                                Grupy
                            </h1>
                            <hr></hr>
                        </div>

                        <div className="card mb-3 bg-light">

                            <div className="card-body">
                                <div className="row">
                                    <div className="mx-auto">
                                        <img src={photo} alt="..." className="img-thumbnail" width='200px'
                                             height='200px'/>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="card mb-3 bg-light">

                            <div className="card-body">

                                <div className="row">
                                    <div className="col-sm-5">
                                        <h6 className="mb-0">Trener</h6>
                                    </div>
                                    <div className="col-sm-7 text-secondary">
                                        <p>{trainerInfo.first_name} {trainerInfo.last_name}</p>
                                    </div>
                                </div>
                                <hr></hr>

                                <div className="row">
                                    <div className="col-sm-5">
                                        <h6 className="mb-0">Poziom</h6>
                                    </div>
                                    <div className="col-sm-7 text-secondary">
                                        {difficultiesAll.map((difficulty, idx) => {
                                            if (difficulty.id === groupInfo.difficulty) {
                                                return (<p key={idx}>{difficulty.name}</p>)
                                            }
                                        })}
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
                                        <h6 className="mb-0">Opis</h6>
                                    </div>
                                    <div className="col-sm-7 text-secondary">
                                        {groupInfo.description}
                                    </div>
                                </div>
                                <hr></hr>

                                <div className="row">
                                    <div className="col-sm-5">
                                        <h6 className="mb-0">Typy :</h6>
                                    </div>
                                    <div className="col-sm-7 text-secondary">
                                        {trainingGroupTypeAll.map((type,idx) => {
                                            for (let i = 0; i < groupTypes.length; i++) {
                                                if (type.id === groupTypes[i]) {
                                                    return (
                                                        <p key={idx}>{type.type.charAt(0).toUpperCase() + type.type.slice(1)}</p>)
                                                }
                                            }
                                        })}
                                    </div>
                                </div>
                                <hr></hr>

                                <div className="row">
                                    <div className="col-sm-5">
                                        <h6 className="mb-0">Treningi :</h6>
                                    </div>
                                    <div className="col-sm-7 text-secondary">
                                        {trainingsInfo.map((training,idx) => {
                                            for (let i = 0; i < groupTrainings.length; i++) {
                                                if (training.id === groupTrainings[i]) {
                                                    return (<p key={idx}>{training.title} - {training.date_start.replace('T', " ").replace('Z', '')}</p>)
                                                }
                                            }
                                        })}
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className='row'>
                    <div className="col-md-10 mx-auto mt-3">

                        <div className="text-center">
                            <hr></hr>
                            <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Treningi
                            </h1>
                            <hr></hr>
                        </div>
                        <div className="container text-center" id='trainingCardCon'>
                        {trainingsInfo.map((training) => {
                            return (
                                <Link className='btn m-1 shadow' id='trainingCard' to={{
                                    pathname: '/trening',
                                    state: {
                                        trainingId: training.id
                                    }

                                }}>
                                    <div className="container my-auto" id='trainingCardBody'>
                                        <div className="container">
                                            <div className="text-center mt-1">
                                                <h6 className="mb-0">{training.title}</h6>
                                            </div>
                                            <hr/>
                                            <div className="text-center" style={{height:'2.5rem'}}>
                                                <p className="mb-0">{training.description}</p>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-sm-5">
                                                    <h6 className="mb-0">Start</h6>
                                                </div>
                                                <div className="col-sm-7 text-secondary">
                                                    {training.date_start.replace('T', " ").replace('Z', '')}
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-sm-5">
                                                    <h6 className="mb-0">Koniec</h6>
                                                </div>
                                                <div className="col-sm-7 text-secondary mb-4">
                                                    {training.date_end.replace('T', " ").replace('Z', '')}
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-sm-5">
                                                    <h6 className="mb-0">Kalorie</h6>
                                                </div>
                                                <div className="col-sm-7 text-secondary mb-4">
                                                    {training.calories}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-10 mx-auto mt-3 text-center">
                        <TrainingCreate groupId={groupId}></TrainingCreate>
                        <TrainingRemoveParticipant groupId={groupId}></TrainingRemoveParticipant>
                        <TrainingGroupChangeImage groupId={groupId}></TrainingGroupChangeImage>
                        <TrainingGroupChangeVideo groupId={groupId}></TrainingGroupChangeVideo>
                        <TrainingGroupRemove groupId={groupId}></TrainingGroupRemove>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Training;