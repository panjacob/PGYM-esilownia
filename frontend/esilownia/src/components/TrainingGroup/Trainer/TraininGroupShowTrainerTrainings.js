import React, {useEffect, useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import Photo from "../../../imgs/gymcoin.png";
import {Link} from "react-router-dom";
import useCollapse from "react-collapsed";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios_variebles from "../../Axios/Axios_variebles";


function TrainingGroupShowTrainerTrainings() {

    const [trainingGroupAll, setTrainingGroupAll] = useState([]);
    const [trainingGroupTypeAll, setTrainingGroupTypeAll] = useState([]);
    const [userInfo, setUserInfo] = useState("");
    const [groupToEdit, setGroupToEdit] = useState([])
    const [difficulity, setDifficulity] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [pricePractice, setPricePractice] = useState(0);
    const [priceWeek, setPriceWeek] = useState(0);
    const [priceMonth, setPriceMonth] = useState(0);
    const [type, setType] = useState([]);
    const [typeSelected, setTypeSelected] = useState([]);

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
                setUserInfo(res.data)
            });

        axiosInstance
            .post(`training/group/type/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setType(res.data)
            })
            .catch(
                function (error) {
                    alert(error)
                    return Promise.reject(error)
                });

    }, []);

    const {getCollapseProps, getToggleProps, isExpanded} = useCollapse()
    const titleRef = useRef()


    const groupChosen = (e) => {
        if (e.target.value !== "none") {
            axiosInstance
                .post(`/training/group/get`, {id: e.target.value}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                    }
                })
                .then((res) => {
                    setGroupToEdit(res.data)
                });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        var urlencoded = new URLSearchParams();
        urlencoded.append("id", groupToEdit.id);
        urlencoded.append("difficulty", difficulity);
        urlencoded.append("title", title);
        urlencoded.append("description", description);
        for (let i = 0; i < typeSelected.length; i++) {
            urlencoded.append("type", typeSelected[i]);
        }
        urlencoded.append("price_day", pricePractice);
        urlencoded.append("price_week", priceWeek);
        urlencoded.append("price_month", priceMonth);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "training/group/edit", requestOptions)
            .then(response => response.text())
            .catch(error => console.log('error', error));

        window.location.reload()
    };

    const selectedDifficulty = (e) => {
        setDifficulity(e.target.value)
    }

    const typesChecked = (e) => {

        if (typeSelected.indexOf(e.target.name) !== -1) {
            let name = e.target.name;
            setTypeSelected(typeSelected.filter((e) => (e !== name)))
        } else {
            let name = e.target.name;
            setTypeSelected([...typeSelected, name]);
        }

    }


    return (
        <div className="trainingGroupShowTrainerTrainings">
            <div className="container">

                <div className="text-center">
                    <hr></hr>
                    <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Twoje Grupy
                        (Trener)</h1>
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

                        if (training.owner === userInfo.id) {
                            return (
                                <div key={idx} style={{minWidth: '250px'}} className="col-md-3 mb-2 flex">
                                    <div className="h-100 card m-1 shadow">
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
                                                                           style={{fontSize:'15px'}}
                                                                           key={id}>{type.type}</p>)
                                                            }
                                                        }
                                                    })}
                                                </div>
                                                <p className="card-text"> Poziom: {training.difficulty}</p>
                                                <p className="card-text text-center"> Trener:</p>
                                                <p className="card-text text-center">{userInfo.first_name} {userInfo.last_name}</p>
                                                <Link className='btn' to={{
                                                    pathname: '/strefa_trenera_treningi',
                                                    state: {
                                                        groupId: training.id
                                                    }
                                                }}>Szczegóły Grupy {training.id}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
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

export default TrainingGroupShowTrainerTrainings;