import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory, useLocation} from "react-router-dom";
import axiosInstance from "../components/Axios/Axios";
import axios_variebles from "../components/Axios/Axios_variebles";
import {Button, Card} from "react-bootstrap";
import profilePicture from "../imgs/basic_profile_photo.jpg";
import placeholderImg from "../imgs/placeholder.jpg";

function GroupOfferDetails() {

    const [trainingGroup, setTrainingGroup] = useState([])
    const [trainerInfo, setTrainerInfo] = useState([])
    const [groupTypes, setGroupTypes] = useState([])
    const [trainingGroupTypeAll, setTrainingGroupTypeAll] = useState([])
    const [photo, setPhoto] = useState("")
    const [imagesPh, setImagesPh] = useState([])
    const [userInfo, setUserInfo] = useState([])
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

        const search = location.search;
        const id = new URLSearchParams(search).get('id');

        axiosInstance
            .post(`training/group/get`, {id: id}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setTrainingGroup(res.data)
                setGroupTypes(res.data.type)
                if(res.data.images === null){
                    setImagesPh((placeholderImg))
                } else {
                    setImagesPh(res.data.images)
                }
                //console.log(res.data)
                axiosInstance
                    .post(`/users/get/`, {id: res.data.owner}, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                        }
                    })
                    .then((res2) => {
                        setTrainerInfo(res2.data)
                        if(res2.data.profile_photo === null){
                            setPhoto(profilePicture)
                        } else {
                            setPhoto(axios_variebles.baseURL.slice(0, -1) + res2.data.profile_photo)
                        }

                    });
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
            .post(`/users/info/`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setUserInfo(res.data)
            });

    }, []);


    const handlePayment = (e) => {
        e.preventDefault();

        console.log(e.target.name)

        var urlencoded = new URLSearchParams();
        urlencoded.append("training_group", trainingGroup.id);
        urlencoded.append("payment_type", e.target.name);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "training/group/join", requestOptions)
            .then(response => response.text())
            .then(result => {

                let msg = 'Zakupiono trening '+ trainingGroup.title + '. Możesz sie teraz tutaj porozumiec z trenerem ' + trainerInfo.first_name + ' ' + trainerInfo.last_name + ' odpowiedzialnym za tą grupe.'

                axiosInstance
                    .post(`/message/send_admin`, { receiver:userInfo.id , message:msg , sender: trainerInfo.id }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                        }
                    })
                    .then((res) => {
                        window.location.href="/treningi";
                    });

            })
            .catch(error => console.log('error', error));
    };

    return (
        <div className="groupOfferDetails">
            <div className="container font-weight-light text-center">
                <Button className="btn btn-lg mt-4 border-0" style={{'color':'black'}} onClick={() => history.goBack()}>Wstecz</Button>
                <div className="text-center">
                    <hr></hr>
                    <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">{trainingGroup.title}</h1>
                    <hr></hr>
                </div>
                <div className="row border rounded mt-4 shadow">
                    <div className="col-md-6">
                        <h1 style={{"fontSize": "2rem"}} className="display-1 font-weight-light mb-4 mt-4 text-center">Trener </h1>
                        <hr></hr>
                        <div className="row justify-content-center">
                            <Card style={{width: '18rem'}} className="bg-light text-center center">
                                <Card.Img variant="top" src={photo} alt="..." className="img-thumbnail" width='200px'
                                          height='200px'/>
                                <Card.Title className="font-weight-light">{trainerInfo.first_name + " " + trainerInfo.last_name}</Card.Title>
                            </Card>
                        </div>
                        <hr></hr>
                        <h1 style={{"fontSize": "2rem"}} className="display-1 font-weight-light mb-4 text-center">Dane o grupie</h1>
                        <hr></hr>

                        <div className="row justify-content-center">
                            <div className="col-6 justify-content-center">
                                <p>Opis:</p>
                            </div>
                            <div className="col-6 justify-content-center text-secondary">
                                <div className="col-sm-7 text-secondary">
                                    <p>{trainingGroup.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-6 justify-content-center">
                                <p>Poziom trudności:</p>
                            </div>
                            <div className="col-6 justify-content-center">
                                <div className="col-sm-7 text-secondary">
                                    {difficultiesAll.map((difficulty, idx) => {
                                        if (difficulty.id === trainingGroup.difficulty) {
                                            return (<p key={idx}>{difficulty.name}</p>)
                                        }
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-6 justify-content-center">
                                <p>Typ: </p>
                            </div>
                            <div className="col-6 justify-content-center">
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
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-6 justify-content-center">
                                <p>Data utworzenia:</p>
                            </div>
                            <div className="col-6">
                                <div className="col-sm-7 text-secondary">
                                    <p>{trainingGroup.date}</p>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <h1 style={{"fontSize": "2rem"}} className="display-1 font-weight-light mb-4 text-center">Opcje dostępu</h1>
                        <hr></hr>
                        <div className="row justify-content-center text-center mb-4">
                            <div className="col-4">
                                <div className="row justify-content-center text-center">
                                    <p className="m-0">Dzień :</p>
                                    <p className="m-0 pl-1 pr-1">{trainingGroup.price_day}</p>
                                    <p className="m-0">Gym-coinów</p>
                                </div>
                                <div className="row justify-content-center text-center">
                                    <a href="#" className="btn btn-sm mt-1" name="0"
                                       onClick={handlePayment}>Kup
                                        dostęp</a>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="row justify-content-center text-center">
                                    <p className="m-0">Tydzień :</p>
                                    <p className="m-0 pl-1 pr-1">{trainingGroup.price_week}</p>
                                    <p className="m-0">Gym-coinów</p>
                                </div>
                                <div className="row justify-content-center text-center">
                                    <a href="#" className="btn btn-sm mt-1" name="1"
                                       onClick={handlePayment}>Kup
                                        dostęp</a>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="row justify-content-center text-center">
                                    <p className="m-0">Miesiąc :</p>
                                    <p className="m-0 pl-1 pr-1">{trainingGroup.price_month}</p>
                                    <p className="m-0">Gym-coinów</p>
                                </div>
                                <div className="row justify-content-center text-center">
                                    <a href="#" className="btn btn-sm mt-1" name="2"
                                       onClick={handlePayment}>Kup
                                        dostęp</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6" style={{backgroundColor:'#f2f2f2', overflowY:'scroll', maxHeight:'1000px'}}>
                        <div className="text-center">
                            {imagesPh.map(function (photos, idx) {
                                return (
                                    <img src={axios_variebles.baseURL.slice(0, -1) + photos.url}
                                         key={idx}
                                         value={photos.id}
                                         alt="Zdjęcia pokazowe"
                                         className="img-fluid m-1"
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupOfferDetails;