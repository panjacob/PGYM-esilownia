import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import Photo from '../../../imgs/gymcoin.png';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


function TrainingGroupGetAll() {

    const [trainingGroupAll, setTrainingGroupAll] = useState([]);
    const [trainingGroupTypeAll, setTrainingGroupTypeAll] = useState([]);
    const [typeSelected, setTypeSelected] = useState([]);
    const [trainingFilter, setTrainingFilter] = useState([]);
    const [trainingGroup, setTrainingGroup] = useState([]);
    const [show, setShow] = useState(false);
    const [treinerInfo, setTreinerInfo] = useState([]);
    const [trainingDetailsAll, setTrainingDetailsAll] = useState([]);
    const [userId, setUserId] = useState("");

    const handleChange = (e) => {
        let cleanArray = []
        if (typeSelected.length === 0) {

            cleanArray = trainingGroupAll;
        } else {

            trainingGroupAll.map(function (training) {

                for (let j = 0; j < training.type.length; j++) {

                    for (let i = 0; i < typeSelected.length; i++) {

                        if (training.type[j].toString() === typeSelected[i]) {

                            cleanArray.push(training)

                        }
                    }
                }
            })
        }

        function uniqBy(a, key) {
            var seen = {};
            return a.filter(function (item) {
                var k = key(item);
                return seen.hasOwnProperty(k) ? false : (seen[k] = true);
            })
        }

        setTrainingFilter(uniqBy(cleanArray, JSON.stringify));

    }

    const handleShowMore = (groupId) => (e) => {
        e.preventDefault();
        axiosInstance
            .post(`training/group/get`, {id: groupId}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setTrainingGroup(res.data)
                console.log(res.data)
                axiosInstance
                    .post(`/users/get/`, {id: res.data.owner}, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                        }
                    })
                    .then((res2) => {
                        setTreinerInfo(res2.data)

                    });
            });
        handleShow();
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const typesChecked = (e) => {

        if (typeSelected.indexOf(e.target.name) !== -1) {
            let name = e.target.name;
            setTypeSelected(typeSelected.filter((e) => (e !== name)))
        } else {
            let name = e.target.name;
            setTypeSelected([...typeSelected, name]);
        }

    }

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
                setTrainingFilter(res.data)
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

    }, []);

    return (
        <div className="trainingGroupGetAll">

            <div className="text-center">
                <hr></hr>
                <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Wszystkie grupy</h1>
                <hr></hr>
            </div>


            <div className="row">

                <div className="col-md-3 border text-center">
                    <h5 className="font-weight-light mt-1">Typ Treningu:</h5>

                    <Form>
                        <hr width={'90%'} color={'black'}/>
                        <ul className="list-inline" style={{display: 'table', margin: '0 auto'}}>
                            {trainingGroupTypeAll.map((types) => (
                                <li className="m-1" key={`inline-checkbox-${types.id}`}>
                                    <div className="row">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input switch_1 align-text-bottom"
                                                type="checkbox"
                                                onChange={typesChecked.bind(this)}
                                                name={types.id}
                                                id={`inline-checkbox-${types.id}`}
                                            />
                                            <label className="form-check-label ml-4 align-text-bottom"
                                                   htmlFor="defaultCheck1">
                                                <b>{types.type.charAt(0).toUpperCase() + types.type.slice(1)}</b>
                                            </label>
                                        </div>
                                    </div>
                                    <hr color={'black'} className="m-1"/>
                                </li>
                            ))}
                        </ul>
                        <hr width={'90%'} color={'black'}/>
                        <div className="col">
                            <Button onClick={handleChange}>Filtruj</Button>
                        </div>
                    </Form>

                </div>

                <div className="col-md-9 border text-center inline-block">
                    <div id="offer_container" className="row justify-content-center">
                        {trainingFilter.map(function (cValue, idx) {

                            if (cValue.difficulty === "0") {
                                cValue.difficulty = "Łatwy"
                            }
                            if (cValue.difficulty === "1") {
                                cValue.difficulty = "Średni"
                            }
                            if (cValue.difficulty === "2") {
                                cValue.difficulty = "Trudny"
                            }
                            if (cValue.difficulty === "3") {
                                cValue.difficulty = "Armagedon"
                            }

                            return (
                                <div key={idx} style={{minWidth: '250px'}} className="col-md-4 mb-2 flex">
                                    <div className="h-100 card m-1" key={idx}>
                                        <img src={Photo} width="100%" height="width"
                                             className="card-img-top rounded-circle"
                                             alt="..."/>
                                        <div className="card-body">
                                            <div>
                                                <h5 className="card-title">{cValue.title}</h5>
                                                <div className="card-subtitle"
                                                     style={{overflow: 'auto', height: '100px'}}>
                                                    {trainingGroupTypeAll.map(function (type, id) {
                                                        for (let i = 0; i < cValue.type.length; i++) {
                                                            if (cValue.type.includes(type.id)) {
                                                                return (<p className="m-0" key={id}>{type.type}</p>)
                                                            }
                                                        }
                                                    })}
                                                </div>
                                                <p className="card-text"> Poziom: {cValue.difficulty}</p>
                                                <button className="btn btn-lg mb-4" data-toggle="modal"
                                                        data-target="#popupModal"
                                                        onClick={handleShowMore(cValue.id)}>Pokaż
                                                    więcej
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Modal size="lg"
                                               aria-labelledby="contained-modal-title-vcenter"
                                               centered
                                               show={show}
                                               onHide={handleClose}
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title>{trainingGroup.title}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>

                                                <p>Trener : {treinerInfo.first_name + " " + treinerInfo.last_name}</p>
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

                                            </Modal.Body>
                                            <Modal.Footer>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                </div>
                            )
                        })}
                        {(trainingFilter.length % 3 === 0) ? (
                            <div style={{minWidth: '250px'}} className="col-md-4"></div>
                        ) : (
                            ''
                        )}
                        {(trainingFilter.length % 3 === 1) ? (
                            <div style={{minWidth: '250px'}} className="col-md-4"></div>
                        ) : (
                            ''
                        )}
                        {(trainingFilter.length % 3 === 1) ? (
                            <div style={{minWidth: '250px'}} className="col-md-4"></div>
                        ) : (
                            ''
                        )}
                        {(trainingFilter.length % 3 === 2) ? (
                            <div style={{minWidth: '250px'}} className="col-md-4"></div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>

            <div className="text-center">
                <hr></hr>
                <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Twoje Grupy</h1>
                <hr></hr>
            </div>
            <div className="row">
                <div className="col-md-3 border text-center">
                    Filter
                </div>
                <div className="col-md-9 border text-center inline-block">
                    <div id="offer_container" className="row justify-content-center">
                        {trainingDetailsAll.map(function (training) {
                            if (training.participant.length !== 0) {
                                for(let i = 0 ; i<training.participant.length ; i++) {
                                    if (training.participant[i].name === userId) {

                                        return (
                                            <div style={{minWidth: '250px'}} className="col-md-4 mb-2 flex">
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

                                    }
                                }
                            }

                        })}

                    </div>
                </div>
            </div>


        </div>
    );
}

export default TrainingGroupGetAll;