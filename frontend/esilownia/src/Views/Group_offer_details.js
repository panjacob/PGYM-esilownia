import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLocation} from "react-router-dom";
import axiosInstance from "../components/Axios/Axios";
import axios_variebles from "../components/Axios/Axios_variebles";

function GroupOfferDetails() {

    const [trainingGroup, setTrainingGroup] = useState([])
    const [trainerInfo, setTrainerInfo] = useState([])
    const [paymentValue, setPaymentValue] = useState("")
    const [trainingGroupTypeAll, setTrainingGroupTypeAll] = useState([])

    const location = useLocation()

    useEffect(() => {

        axiosInstance
            .post(`training/group/get`, {id: location.state.groupId}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setTrainingGroup(res.data)
                axiosInstance
                    .post(`/users/get/`, {id: res.data.owner}, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                        }
                    })
                    .then((res2) => {
                        setTrainerInfo(res2.data)

                    });
            });
        // axiosInstance
        //     .post(`training/group/type/all`, {}, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
        //         }
        //     })
        //     .then((res) => {
        //         setTrainingGroupTypeAll(res.data)
        //     });

    }, []);

    const handlePayValue0 = (e) => {
        setPaymentValue("0")
        handlePayment();
    }
    const handlePayValue1 = (e) => {
        setPaymentValue("1")
        handlePayment();
    }
    const handlePayValue2 = (e) => {
        setPaymentValue("2")
        handlePayment();
    }

    const handlePayment = (e) => {
        // e.preventDefault();

        console.log(paymentValue)

        var urlencoded = new URLSearchParams();
        urlencoded.append("training_group", location.state.groupId);
        urlencoded.append("payment_type", paymentValue);

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
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        // window.location.reload()
    };

    return (
        <div className="groupOfferDetails">
            <div className="container">
                <div className="text-center">
                    <hr></hr>
                    <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">{trainingGroup.title}</h1>
                    <hr></hr>
                </div>
                <div className="row border mt-4">
                    <div className="col-md-6">
                        {JSON.stringify(trainingGroup)}
                        <br/>
                        <br/>
                        {JSON.stringify(trainerInfo)}

                        <p>Trener : {trainerInfo.first_name + " " + trainerInfo.last_name}</p>
                        <p>Opis : {trainingGroup.description}</p>

                        <div className="row justify-content-center">
                            <div className="col-2 justify-content-center">
                                <p>Typ treningu :</p>
                            </div>
                            <div className="col-10">
                                <div className="row">
                                    {/*{trainingGroupTypeAll.map(function (type, id) {*/}
                                    {/*    for (let i = 0; i < trainingGroup.type.length; i++) {*/}
                                    {/*        if (trainingGroup.type.includes(type.id)) {*/}
                                    {/*            return (<p className="ml-1 mr-1" key={id}>{type.type.charAt(0).toUpperCase() + type.type.slice(1)}</p>)*/}
                                    {/*        }*/}
                                    {/*    }*/}
                                    {/*})}*/}
                                </div>
                            </div>
                        </div>

                        <p>Data utworzenia : {trainingGroup.date}</p>

                        <div className="row justify-content-center text-center">
                            <div className="col-4">
                                <div className="row justify-content-center text-center">
                                    <p className="m-0">Dzień :</p>
                                    <p className="m-0 pl-1 pr-1">{trainingGroup.price_day}</p>
                                    <p className="m-0">Gym-coinów</p>
                                </div>
                                <div className="row justify-content-center text-center">
                                    <a href="#" className="btn btn-primary btn-sm"
                                       onClick={handlePayValue0}>Kup
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
                                    <a href="#" className="btn btn-primary btn-sm"
                                       onClick={handlePayValue1}>Kup
                                        dostęp</a>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="row justify-content-center text-center" value={trainingGroup.price_week}>
                                    <p className="m-0">Miesiąc :</p>
                                    <p className="m-0 pl-1 pr-1">{trainingGroup.price_month}</p>
                                    <p className="m-0">Gym-coinów</p>
                                </div>
                                <div className="row justify-content-center text-center">
                                    <a href="#" className="btn btn-primary btn-sm"
                                       onClick={handlePayValue2}>Kup
                                        dostęp</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="text-center">
                            <img src="..." alt="Zdjęcia pokazowe" style={{"background-color":"gray"}} className="img-fluid mx-auto"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupOfferDetails;