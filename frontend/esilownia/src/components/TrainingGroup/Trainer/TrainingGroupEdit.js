import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import Photo from "../../../imgs/gymcoin.png";
import {Link} from "react-router-dom";
import useCollapse from "react-collapsed";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";


function TrainingGroupEdit() {

    const [trainingGroupAll, setTrainingGroupAll] = useState([]);
    const [trainingGroupTypeAll, setTrainingGroupTypeAll] = useState([]);
    const [userInfo, setUserInfo] = useState("");
    const [groupToEditId, setGroupToEditId] = useState('none')
    const [difficulty, setDifficulty] = useState('');
    const [difficultyNew, setDifficultyNew] = useState('')
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [pricePractice, setPricePractice] = useState(0);
    const [priceWeek, setPriceWeek] = useState(0);
    const [priceMonth, setPriceMonth] = useState(0);
    const [typeSelectedNew, setTypeSelectedNew] = useState([]);
    const [typeSelectedOld, setTypeSelectedOld] = useState([])

    const [diffAll, setDiffAll] = useState([
        {
            id: '0',
            stopien: 'Łatwy'
        }, {
            id: '1',
            stopien: 'Średni'
        }, {
            id: '2',
            stopien: 'Trudny'
        }, {
            id: '3',
            stopien: 'Armagedon'
        }
    ])

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

    }, []);

    const {getCollapseProps, getToggleProps, isExpanded} = useCollapse()


    const groupChosen = (e) => {
        setGroupToEditId(e.target.value)
        if (e.target.value !== 'none') {
            axiosInstance
                .post(`/training/group/get`, {id: e.target.value}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                    }
                })
                .then((res) => {
                    setGroupToEditId(res.data.id)
                    setDifficulty(res.data.difficulty)
                    setTitle(res.data.title)
                    setDescription(res.data.description)
                    setPricePractice(res.data.price_day)
                    setPriceWeek(res.data.price_week)
                    setPriceMonth(res.data.price_month)
                    setTypeSelectedOld(res.data.type)
                });
        } else {
            setGroupToEditId('')
            setDifficulty('')
            setTitle('')
            setDescription('')
            setPricePractice('')
            setPriceWeek('')
            setPriceMonth('')
            setTypeSelectedOld([])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        var urlencoded = new URLSearchParams();
        urlencoded.append("id", groupToEditId);

        if(difficultyNew === '') {
            urlencoded.append("difficulty", difficulty);
        } else {
            urlencoded.append("difficulty", difficultyNew);
        }

        urlencoded.append("title", title);
        urlencoded.append("description", description);

        if(typeSelectedNew.length > 0 ) {
            for (let i = 0; i < typeSelectedNew.length; i++) {
                urlencoded.append("type", typeSelectedNew[i]);
            }
        } else {
            for (let i = 0; i < typeSelectedOld.length; i++) {
                urlencoded.append("type", typeSelectedOld[i]);
            }
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
        setDifficultyNew(e.target.value)
    }

    const typesChecked = (e) => {

        if (typeSelectedNew.indexOf(e.target.name) !== -1) {
            let name = e.target.name;
            setTypeSelectedNew(typeSelectedNew.filter((e) => (e !== name)))
        } else {
            let name = e.target.name;
            setTypeSelectedNew([...typeSelectedNew, name]);
        }

    }


    return (
        <div className="trainingGroupEdit">
            <div className="container">

                <div className="text-center">
                    <hr></hr>
                    <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Edytuj Grupę</h1>
                    <hr></hr>
                </div>

                <div className="container">

                    <div className='row mx-auto ml-0 mr-0 justify-content-center'>
                        <div className='row border p-4'>
                            <div className="col-md-6 text-center my-auto" style={{minWidth: '230px'}}>
                                <p>Wybierz grupę</p>
                                <select className='text-center mx-auto' style={{width: '200px', height: '30px'}}
                                        onChange={groupChosen}>
                                    <option value='none'>-</option>
                                    {trainingGroupAll.map((training, idx) => {
                                        if (training.owner === userInfo.id) {
                                            return (
                                                <option key={idx} value={training.id}>{training.title}</option>

                                            )
                                        }
                                    })}
                                </select>
                            </div>
                            <div className="col-md-5 text-center my-auto" style={{minWidth: '200px'}}>
                                <button block size="lg" className="btn btn-lg" id="btn-login"
                                        {...getToggleProps()}
                                        disabled={groupToEditId === 'none'}>
                                    {(isExpanded) ? 'Zamknij Edycję' : 'Edytuj Grupę'}
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="row mt-4">
                        <div className="container" {...getCollapseProps()}>
                            <Form className="border p-4" onSubmit={handleSubmit}>
                                <Form.Group size="lg" controlId="text">
                                    <Form.Label>Aktualny stopień zaawansowania :
                                        <ul>
                                        {diffAll.map((dif) => {
                                            if(difficulty === dif.id) {
                                                return (<li>{dif.stopien}</li>)
                                            }
                                        })}
                                        </ul>
                                    </Form.Label><br/>
                                    <Form.Label>Nowy stopień zaawansowania : </Form.Label>
                                    <div onChange={selectedDifficulty.bind(this)}>

                                        {diffAll.map(function (dif) {
                                                return (
                                                    <div className="mx-2">
                                                        <input type="radio" value={dif.id}
                                                               name="application_role"
                                                        />
                                                        <label>{dif.stopien}</label>
                                                    </div>
                                                )
                                        })}
                                    </div>
                                </Form.Group>
                                <Form.Group size="lg" controlId="text">
                                    <Form.Label>Tytuł</Form.Label>
                                    <br/>
                                    <label>Wpisz nowy tytuł:</label>
                                    <Form.Control
                                        type="text"
                                        value={title}
                                        placeholder={title}
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
                                        placeholder={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group size="lg" controlId="text">
                                    {/*Do sprawdzenia jaki jest aktualnie zaznaczony*/}
                                    <Form.Label>Aktualnie typy grupy :
                                        <ul>
                                        {trainingGroupTypeAll.map(function (type, id) {
                                            for (let i = 0; i < typeSelectedOld.length; i++) {
                                                if (typeSelectedOld.includes(type.id)) {
                                                    return (<li className="m-0" key={id}>{type.type.charAt(0).toUpperCase() + type.type.slice(1)}</li>)
                                                }
                                            }
                                        })}
                                        </ul>
                                        </Form.Label><br/>
                                    <Form.Label>Nowe typy grupy : </Form.Label>
                                    {trainingGroupTypeAll.map((types) => (
                                        <div key={`inline-checkbox-${types.id}`} className="mb-3">
                                            <Form.Check
                                                inline
                                                name={types.id}
                                                type="checkbox"
                                                onChange={typesChecked.bind(this)}
                                                id={`inline-checkbox-${types.id}`}
                                            /> {types.type.charAt(0).toUpperCase() + types.type.slice(1)}
                                        </div>
                                    ))}
                                </Form.Group>
                                <Form.Group size="lg" controlId="text">
                                    <Form.Label>Ceny</Form.Label>
                                    <div className="row justify-content-center">
                                        <div className="col-md-3">
                                            <Form.Label>Jedne Zajecia</Form.Label>

                                            <Form.Control
                                                type="number"
                                                value={pricePractice}
                                                onChange={(e) => setPricePractice(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <Form.Label>Tydzień</Form.Label>

                                            <Form.Control
                                                type="number"
                                                value={priceWeek}
                                                onChange={(e) => setPriceWeek(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <Form.Label>Miesiąc</Form.Label>

                                            <Form.Control
                                                type="number"
                                                value={priceMonth}
                                                onChange={(e) => setPriceMonth(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </Form.Group>
                                <Button onClick={handleSubmit} block size="lg" className="btn btn-lg"
                                        id="btn-login">
                                    Zatwierdź Edycję
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default TrainingGroupEdit;