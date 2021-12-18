import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useHistory, useLocation} from "react-router-dom";
import axiosInstance from "../../Axios/Axios";
import profilePicture from "../../../imgs/basic_profile_photo.jpg";
import axios_variebles from "../../Axios/Axios_variebles";
import {Button} from "react-bootstrap";
import TrainingCreate from "../../Training/Trainer/TrainingCreate";
import TrainingRemoveParticipant from "../../Training/Trainer/TrainingRemoveParticipant";
import TrainingGroupChangeImage from "../../Training/Trainer/TrainingGroupChangeImage";
import TrainingGroupChangeVideo from "../../Training/Trainer/TrainingGroupChangeVideo";
import TrainingGroupRemove from "../../Training/Trainer/TrainingGroupRemove";
import MeetingCreate from "./MeetingCreate";

function DieticianDiet() {

    const [dietId, setDietId] = useState("")
    const [dietInfo, setDietInfo] = useState([])
    const [meetingsInfo, setMeetingsInfo] = useState([])
    const [dietTypeAll, setDietTypeAll] = useState([]);
    const [dietTypes, setDietTypes] = useState([])
    const [dietMeetings, setDietMeetings] = useState([])
    const [dieticianInfo, setDieticianInfo] = useState([])
    const [photo, setPhoto] = useState([])


    const history = useHistory()
    const location = useLocation()

    useEffect(() => {

        const search = location.search;
        const id = new URLSearchParams(search).get('id');

        setDietId(id)

        axiosInstance
            .post(`/diet/get`, {id: id}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setDietInfo(res.data)
                setDietTypes(res.data.type)
                setDietMeetings(res.data.meetings)

                if(res.data.image === null){
                    setPhoto(profilePicture)
                } else {
                    setPhoto(axios_variebles.baseURL.slice(0, -1) + res.data.image)
                }

                setMeetingsInfo(trainingsInfo => [])

                res.data.meetings.map((trainingId) => {
                    axiosInstance
                        .post(`/diet/meeting/get`, {id: trainingId}, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                            }
                        })
                        .then((res) => {
                            setMeetingsInfo(trainingsInfo => [...trainingsInfo, res.data])
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
                        setDieticianInfo(res.data)
                    })
            });

        axiosInstance
            .post(`diet/type/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setDietTypeAll(res.data)
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
                                Diety
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
                                        <h6 className="mb-0">Dietetyk</h6>
                                    </div>
                                    <div className="col-sm-7 text-secondary">
                                        <p>{dieticianInfo.first_name} {dieticianInfo.last_name}</p>
                                    </div>
                                </div>
                                <hr></hr>

                                <div className="row">
                                    <div className="col-sm-5">
                                        <h6 className="mb-0">Tytuł</h6>
                                    </div>
                                    <div className="col-sm-7 text-secondary">
                                        {dietInfo.title}
                                    </div>
                                </div>
                                <hr></hr>

                                <div className="row">
                                    <div className="col-sm-5">
                                        <h6 className="mb-0">Opis</h6>
                                    </div>
                                    <div className="col-sm-7 text-secondary">
                                        {dietInfo.description}
                                    </div>
                                </div>
                                <hr></hr>

                                <div className="row">
                                    <div className="col-sm-5">
                                        <h6 className="mb-0">Typy :</h6>
                                    </div>
                                    <div className="col-sm-7 text-secondary">
                                        {dietTypeAll.map((type,idx) => {
                                            for (let i = 0; i < dietTypes.length; i++) {
                                                if (type.id === dietTypes[i]) {
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
                                        <h6 className="mb-0">Spotkania :</h6>
                                    </div>
                                    <div className="col-sm-7 text-secondary">
                                        {meetingsInfo.map((diet,idx) => {
                                            for (let i = 0; i < dietMeetings.length; i++) {
                                                if (diet.id === dietMeetings[i]) {
                                                    return (<p key={idx}>{diet.title} - {diet.date.replace('T', " ").replace('Z', '')}</p>)
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
                            <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Spotkania
                            </h1>
                            <hr></hr>
                        </div>
                        <div className="container text-center" id='trainingCardCon'>
                            {meetingsInfo.map((meeting) => {
                                return (
                                    <Link className='btn m-4 shadow border' id='trainingCard' to={{
                                        pathname: '/spotkanie',
                                        search: 'id='+meeting.id.toString()

                                    }}>
                                        <div className="container my-auto" id='trainingCardBody'>
                                            <div className="container font-weight-light">
                                                <div className="text-center">
                                                    <h6 className="mb-0">{meeting.title}</h6>
                                                </div>
                                                <hr/>
                                                <div className="row">
                                                    <div className="col-sm-5">
                                                        <h6 className="mb-0">Start</h6>
                                                    </div>
                                                    <div className="col-sm-7 text-secondary">
                                                        {meeting.date.replace('T', " ").replace('Z', '')}
                                                    </div>
                                                </div>
                                                <hr/>
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
                        <MeetingCreate groupId={dietId}></MeetingCreate>
                        {/*<TrainingRemoveParticipant groupId={dietId}></TrainingRemoveParticipant>*/}
                        {/*<TrainingGroupChangeImage groupId={dietId}></TrainingGroupChangeImage>*/}
                        {/*<TrainingGroupChangeVideo groupId={dietId}></TrainingGroupChangeVideo>*/}
                        {/*<TrainingGroupRemove groupId={dietId}></TrainingGroupRemove>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DieticianDiet;