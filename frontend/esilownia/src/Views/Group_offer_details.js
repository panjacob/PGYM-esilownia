import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLocation} from "react-router-dom";
import axiosInstance from "../components/Axios/Axios";

function GroupOfferDetails() {

    const [trainingGroup, setTrainingGroup] = useState([])
    const [trainerInfo, setTrainerInfo] = useState([])

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

    }, []);

    return (
        <div className="groupOfferDetails">
            <div className="container">

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
                            <p className="m-0">Jedne zajęcia :</p>
                            <p className="m-0 pl-1 pr-1">{trainingGroup.price_day}</p>
                            <p className="m-0">Gym-coinów</p>
                        </div>
                        <div className="row justify-content-center text-center">
                            <a href="#" className="btn btn-primary btn-sm">Kup
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
                            <a href="#" className="btn btn-primary btn-sm">Kup
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
                            <a href="#" className="btn btn-primary btn-sm">Kup
                                dostęp</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default GroupOfferDetails;