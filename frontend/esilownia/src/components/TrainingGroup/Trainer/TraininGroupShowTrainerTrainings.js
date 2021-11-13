import React, {useEffect, useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import Photo from "../../../imgs/gymcoin.png";
import {Link} from "react-router-dom";
import useCollapse from "react-collapsed";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";


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
        if(e.target.value !== "none") {
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

        fetch("http://127.0.0.1:8000/training/group/edit", requestOptions)
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
                <div className="row">
                    {/*<div className="col-md-3 border text-center">*/}
                    {/*    Filtowanie*/}
                    {/*</div>*/}
                    <div className="col-md-12 border text-center inline-block">
                        <div id="offer_container" className="row justify-content-center">
                            <div className="row">
                                {trainingGroupAll.map((training, idx) => {
                                    if (training.owner === userInfo.id) {
                                        return (
                                            <div key={idx} style={{minWidth: '250px'}} className="col-md-4 mb-2 flex">
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
                                                            <p className="card-text text-center"> Trener: </p>
                                                            <p className="card-text"> Imie: {userInfo.first_name}</p>
                                                            <p className="card-text"> Naziwsko: {userInfo.last_name}</p>
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
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="container"  >
                <div className="col-md-12 inline-block" >
                    <div className="text-center">
                        <hr></hr>
                        <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4" ref={titleRef}>Edytuj Grupę</h1>
                        <hr></hr>
                    </div>
                    <div id="offer_container" className="row justify-content-center" >
                        <div className="row border mt-4">
                            <div className="col-md-5 justify-content-center">
                                <button block size="lg" className="btn btn-lg" id="btn-login" {...getToggleProps()} >
                                    {isExpanded ? 'Zamknij Edycję' : 'Edytuj Grupę'}
                                </button>
                            </div>
                            <div className="col-md-5 my-auto">
                                <label>Wybierz grupę</label>
                                <select className='text-center' style={{width: '100%', height: '30px'}} onChange={groupChosen}>
                                    <option value="none">-</option>
                                    {trainingGroupAll.map((training, idx) => {
                                        if (training.owner === userInfo.id) {
                                            return (
                                                <option key={idx} value={training.id}>{training.title}</option>

                                            )
                                        }
                                    })}
                                </select>
                            </div>
                            <div className="container" {...getCollapseProps()}>
                                <Form className="border p-4" onSubmit={handleSubmit}>
                                    <Form.Group size="lg" controlId="text">
                                        <Form.Label>Stopień Zaawansowania</Form.Label>
                                        <div onChange={selectedDifficulty.bind(this)}>
                                            <div className="mx-2">
                                                {(groupToEdit.difficulty === "0") ? (
                                                    <input type="radio" value="0"
                                                           name="application_role"
                                                           defaultChecked
                                                    />

                                                ):(
                                                    <input type="radio" value="0"
                                                           name="application_role"
                                                    />
                                                )
                                                }
                                                <label>Łatwy</label>
                                            </div>
                                            <div className="mx-2">
                                                {(groupToEdit.difficulty === "1") ? (
                                                    <input type="radio" value="1"
                                                           name="application_role"
                                                           defaultChecked
                                                    />

                                                ):(
                                                    <input type="radio" value="1"
                                                           name="application_role"
                                                    />
                                                )
                                                }
                                                <label> Średni</label>
                                            </div>
                                            <div className="mx-2">
                                                {(groupToEdit.difficulty === "2") ? (
                                                    <input type="radio" value="2"
                                                           name="application_role"
                                                           defaultChecked
                                                    />

                                                ):(
                                                    <input type="radio" value="2"
                                                           name="application_role"
                                                    />
                                                )
                                                }
                                                <label> Zaawansowany</label>
                                            </div>
                                            <div className="mx-2">
                                                {(groupToEdit.difficulty === "3") ? (
                                                    <input type="radio" value="3"
                                                           name="application_role"
                                                           defaultChecked
                                                    />

                                                ):(
                                                    <input type="radio" value="3"
                                                           name="application_role"
                                                    />
                                                )
                                                }
                                                <label> Armagedon</label>
                                            </div>
                                        </div>
                                    </Form.Group>
                                    <Form.Group size="lg" controlId="text">
                                        <Form.Label>Tytuł</Form.Label>
                                        <br/>
                                        <label>Wpisz nowy tytuł:</label>
                                        <Form.Control
                                            type="text"
                                            value={title}
                                            placeholder={groupToEdit.title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group size="lg" controlId="text">
                                        <Form.Label>Opis</Form.Label>
                                        <br/>
                                        <label>Wpisz nowy opis:</label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            type="text"
                                            value={description}
                                            placeholder={groupToEdit.description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group size="lg" controlId="text">
                                        {/*Do sprawdzenia jaki jest aktualnie zaznaczony*/}
                                        <Form.Label>Typ</Form.Label>
                                        {type.map((types) => (
                                            <div key={`inline-checkbox-${types.id}`} className="mb-3">
                                                <Form.Check
                                                    inline
                                                    name={types.id}
                                                    type="checkbox"
                                                    onChange={typesChecked.bind(this)}
                                                    id={`inline-checkbox-${types.id}`}
                                                /> {types.type}
                                            </div>
                                        ))}

                                        {/*{(groupToEdit.type).includes(type) ? (*/}
                                        {/*    {type.map((types) => (*/}
                                        {/*            <div key={`inline-checkbox-${types.id}`} className="mb-3">*/}
                                        {/*                <Form.Check*/}
                                        {/*                    inline*/}
                                        {/*                    name={types.id}*/}
                                        {/*                    type="checkbox"*/}
                                        {/*                    onChange={typesChecked.bind(this)}*/}
                                        {/*                    id={`inline-checkbox-${types.id}`}*/}
                                        {/*                    defaultChecked*/}
                                        {/*                /> {types.type}*/}
                                        {/*            </div>*/}
                                        {/*        ))}*/}
                                        {/*):(*/}
                                        {/*    {type.map((types) => (*/}
                                        {/*            <div key={`inline-checkbox-${types.id}`} className="mb-3">*/}
                                        {/*                <Form.Check*/}
                                        {/*                    inline*/}
                                        {/*                    name={types.id}*/}
                                        {/*                    type="checkbox"*/}
                                        {/*                    onChange={typesChecked.bind(this)}*/}
                                        {/*                    id={`inline-checkbox-${types.id}`}*/}
                                        {/*                /> {types.type}*/}
                                        {/*            </div>*/}
                                        {/*        ))}*/}
                                        {/*)}*/}
                                    </Form.Group>
                                    <Form.Group size="lg" controlId="text">
                                        <Form.Label>Ceny</Form.Label>
                                        <div className="row justify-content-center">
                                            <div className="col-md-3">
                                                <Form.Label>Jedne Zajecia</Form.Label>
                                                <br/>
                                                <label>Aktualna cena: {groupToEdit.price_day}</label>
                                                <br/>
                                                <label>Nowa cena:</label>
                                                <Form.Control
                                                    type="number"
                                                    value={pricePractice}
                                                    placeholder={groupToEdit.price_day}
                                                    onChange={(e) => setPricePractice(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <Form.Label>Tydzień</Form.Label>
                                                <br/>
                                                <label>Aktualna cena: {groupToEdit.price_week}</label>
                                                <br/>
                                                <label>Nowa cena:</label>
                                                <Form.Control
                                                    type="number"
                                                    value={priceWeek}
                                                    placeholder={groupToEdit.price_week}
                                                    onChange={(e) => setPriceWeek(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <Form.Label>Miesiąc</Form.Label>
                                                <br/>
                                                <label>Aktualna cena: {groupToEdit.price_month}</label>
                                                <br/>
                                                <label>Nowa cena:</label>
                                                <Form.Control
                                                    type="number"
                                                    value={priceMonth}
                                                    placeholder={groupToEdit.price_month}
                                                    onChange={(e) => setPriceMonth(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </Form.Group>
                                    <Button onClick={handleSubmit} block size="lg" className="btn btn-lg" id="btn-login">
                                        Zatwierdź Edycję
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default TrainingGroupShowTrainerTrainings;