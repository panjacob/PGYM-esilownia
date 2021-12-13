import React, {useEffect, useState} from "react";
import {Carousel, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { registerLocale, setDefaultLocale } from  "react-datepicker";
import pl from 'date-fns/locale/pl';
import {AiFillEdit} from "react-icons/ai";
import Button from "react-bootstrap/Button";
import axios_variebles from "../Axios/Axios_variebles";
registerLocale('pl', pl)

function Dashboard_data_userday() {

    const [startDate, setStartDate] = useState(new Date());

    const [userDayData, setUserDayData] = useState([])
    const [sleepStart, setSleepStart] = useState('0')
    const [sleepEnd, setSleepEnd] = useState('0')


    const [newWaga, setNewWaga] = useState('0')
    const [newSpaloneKalorie, setNewSpaloneKalorie] = useState('0')
    const [newSpozyteKalorie, setNewSpozyteKalorie] = useState('0')
    const [newPoczatekSnu, setNewPoczatekSnu] = useState('')
    const [newKoniecSnu, setNewKoniecSnu] = useState('')
    const [newKroki, setNewKroki] = useState('0')


    useEffect(() => {

        axiosInstance
            .post(`/dashboard/user_day/get`, { date: convert( startDate )},{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setUserDayData(res.data)
                if(res.data.sleep_start === null){
                    setSleepStart('0')
                } else {
                    setSleepStart(res.data.sleep_start)
                }
                if(res.data.sleep_end === null){
                    setSleepEnd('0')
                } else {
                    setSleepEnd(res.data.sleep_end)
                }
            })
            .catch(function (error) {
                if (error.response) {
                    if(error.response.status === 400) {
                        setUserDayData({'weight':0,'calories_burned':0,'calories_eaten':0,'sleep_start':0,'sleep_end':0,'steps':0})
                        setSleepStart('0')
                        setSleepEnd('0')
                    }
                }
            });

    }, []);

    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    function selectedDate(date) {
        //console.log(convert( date ))
        setStartDate(date)

        var x = document.getElementById(`editUserStat-1`);
        x.style.display = "none"
        var x = document.getElementById(`editUserStat-2`);
        x.style.display = "none"
        var x = document.getElementById(`editUserStat-3`);
        x.style.display = "none"
        var x = document.getElementById(`editUserStat-4`);
        x.style.display = "none"
        var x = document.getElementById(`editUserStat-5`);
        x.style.display = "none"
        var x = document.getElementById(`editUserStat-6`);
        x.style.display = "none"
        var x = document.getElementById(`editUserStat-7`);
        x.style.display = "none"

        axiosInstance
            .post(`/dashboard/user_day/get`, { date: convert( date )},{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setUserDayData(res.data)
                if(res.data.sleep_start === null){
                    setSleepStart('0')
                } else {
                    setSleepStart(res.data.sleep_start)
                }
                if(res.data.sleep_end === null){
                    setSleepEnd('0')
                } else {
                    setSleepEnd(res.data.sleep_end)
                }
            })
            .catch(function (error) {
                if (error.response) {
                    if(error.response.status === 400) {
                        setUserDayData({'weight':0,'calories_burned':0,'calories_eaten':0,'sleep_start':0,'sleep_end':0,'steps':0})
                        setSleepStart('0')
                        setSleepEnd('0')
                    }
                }
            });;
    }

    const editShowHide = (e) => {
        e.preventDefault();
        var x = document.getElementById(`editUserStat-1`);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        var x = document.getElementById(`editUserStat-2`);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        var x = document.getElementById(`editUserStat-3`);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        var x = document.getElementById(`editUserStat-4`);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        var x = document.getElementById(`editUserStat-5`);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        var x = document.getElementById(`editUserStat-6`);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        var x = document.getElementById(`editUserStat-7`);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    const sumbitEdit = (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("date", convert(startDate));

        if(newSpaloneKalorie !== '0'){
            urlencoded.append("calories_burned", newSpaloneKalorie);
        }else{
            urlencoded.append("calories_burned", userDayData.calories_burned);
        }

        if(newSpozyteKalorie !== '0'){
            urlencoded.append("calories_eaten", newSpozyteKalorie);
        }else{
            urlencoded.append("calories_eaten", userDayData.calories_eaten);
        }

        if(newKroki !== '0'){
            urlencoded.append("steps", newKroki);
        }else{
            urlencoded.append("steps", userDayData.steps);
        }

        if(newPoczatekSnu !== ''){
            urlencoded.append("sleep_start", newPoczatekSnu);
        }else{
            urlencoded.append("sleep_start", userDayData.sleep_start);
        }

        if(newKoniecSnu !== ''){
            urlencoded.append("sleep_end", newKoniecSnu);
        }else{
            urlencoded.append("sleep_end", userDayData.sleep_end);
        }

        if(newWaga !== '0'){
            urlencoded.append("weight", newWaga);
        }else{
            urlencoded.append("weight", userDayData.weight);
        }


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "dashboard/user_day/create", requestOptions)
            .then(response => response.text())
            .then(result => {
                window.location.reload()
            })
            .catch(error => console.log('error', error));

    }

    return (
        <div className="dashboard_data_userday">

            <div className="text-center">
                <hr></hr>
                <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Dane twoich treningów</h1>
                <hr></hr>
            </div>
            <div className="row">
                <div className="col-lg-4 justify-content-center text-center">
                    <div className='row' style={{minHeight:'200px'}}>
                        <div className='col-4 mt-3'>
                            <div className="card bg-light" style={{minWidth:"353px"}}>
                                <div className="card-body">
                                    <div className="container" style={{minHeight:'190px'}}>
                                        <h1 style={{"fontSize": "3rem"}} className="display-1 font-weight-light mb-4">Wybierz Datę</h1>
                                    </div>
                                </div>
                            </div>
                            <DatePicker
                                locale="pl"
                                className='react-datepicker'
                                dateFormat="dd/MM/yyyy"
                                selected={startDate}
                                onChange={(date) => selectedDate(date)} inline showPopperArrow={false} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 justify-content-center">
                    <div>
                        {(JSON.stringify(userDayData) === JSON.stringify({'weight':0,'calories_burned':0,'calories_eaten':0,'sleep_start':0,'sleep_end':0,'steps':0})) ? (
                            <div className="col-md-11 mx-auto mt-3">

                                <div className="card mb-3 bg-light">
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Data</h6>
                                            </div>

                                            <div className="col-sm-9 text-secondary">
                                                {convert(startDate)}
                                            </div>

                                        </div>
                                        <hr></hr>
                                        <div className="row">

                                            <div className="col-sm-3 mb-3">
                                                <h6 className="mb-0">Waga</h6>
                                            </div>

                                            <div className="col-sm-3 text-secondary">
                                                {userDayData.weight} kg
                                            </div>

                                            <div className='col-sm-6'>
                                                <div id={`editUserStat-1`} style={{display:'none'}}>
                                                    <input type="number" className="form-control form-control-sm"
                                                           max="300"
                                                           min="0"
                                                           onChange={(e) => setNewWaga(e.target.value)}/>
                                                </div>
                                            </div>

                                        </div>
                                        <hr></hr>
                                        <div className="row">

                                            <div className="col-sm-3 mb-3">
                                                <h6 className="mb-0">Spalone Kalorie</h6>
                                            </div>

                                            <div className="col-sm-3 text-secondary">
                                                {userDayData.calories_burned} kcal
                                            </div>

                                            <div className='col-sm-6'>
                                                <div id={`editUserStat-2`} style={{display:'none'}}>
                                                    <input type="number" className="form-control form-control-sm"
                                                           min="0"
                                                           max="20000"
                                                           onChange={(e) => setNewSpaloneKalorie(e.target.value)}/>
                                                </div>
                                            </div>

                                        </div>
                                        <hr></hr>
                                        <div className="row">

                                            <div className="col-sm-3 mb-3">
                                                <h6 className="mb-0">Spożyte Kalorie</h6>
                                            </div>

                                            <div className="col-sm-3 text-secondary">
                                                {userDayData.calories_eaten} kcal
                                            </div>

                                            <div className='col-sm-6'>
                                                <div id={`editUserStat-3`} style={{display:'none'}}>
                                                    <input type="number" className="form-control form-control-sm"
                                                           min="0"
                                                           max="20000"
                                                           onChange={(e) => setNewSpozyteKalorie(e.target.value)}/>
                                                </div>
                                            </div>

                                        </div>
                                        <hr></hr>
                                        <div className="row">

                                            <div className="col-sm-3 mb-4">
                                                <h6 className="mb-0">Początek Snu</h6>
                                            </div>

                                            <div className="col-sm-3 text-secondary">
                                                {sleepStart.replace('T', " ").replace('Z', "")}
                                            </div>

                                            <div className='col-sm-6'>
                                                <div id={`editUserStat-4`} style={{display:'none'}}>
                                                    <Form.Control
                                                        type="datetime-local"
                                                        value={newPoczatekSnu}
                                                        onChange={(e) => setNewPoczatekSnu(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        <hr></hr>
                                        <div className="row">

                                            <div className="col-sm-3 mb-4">
                                                <h6 className="mb-0">Koniec Snu</h6>
                                            </div>

                                            <div className="col-sm-3 text-secondary">
                                                {sleepEnd.replace('T', " ").replace('Z', "")}
                                            </div>

                                            <div className='col-sm-6'>
                                                <div id={`editUserStat-5`} style={{display:'none'}}>
                                                    <Form.Control
                                                        type="datetime-local"
                                                        value={newKoniecSnu}
                                                        onChange={(e) => setNewKoniecSnu(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        <hr></hr>
                                        <div className="row">

                                            <div className="col-sm-3 mb-3">
                                                <h6 className="mb-0">Kroki</h6>
                                            </div>

                                            <div className="col-sm-3 text-secondary">
                                                {userDayData.steps}
                                            </div>

                                            <div className='col-sm-6'>
                                                <div id={`editUserStat-6`} style={{display:'none'}}>
                                                    <input type="number" className="form-control form-control-sm"
                                                           min="0"
                                                           max="73000"
                                                           onChange={(e) => setNewKroki(e.target.value)}/>
                                                </div>
                                            </div>

                                        </div>
                                        <hr/>
                                        <div className='row p-1'>
                                            <div className='col-sm-6'>
                                                <Button onClick={editShowHide} variant="btn" size="md">Edytuj</Button>
                                            </div>
                                            <div className='col-sm-6' id={`editUserStat-7`} style={{display:'none'}}>
                                                <Button onClick={sumbitEdit} variant="btn" size="md">Zapisz</Button>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        ) : (
                            <div className="col-md-11 mx-auto mt-3">

                                <div className="card mb-3 bg-light">
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Data</h6>
                                            </div>

                                            <div className="col-sm-3 text-secondary">
                                                {userDayData.date}
                                            </div>

                                        </div>
                                        <hr></hr>
                                        <div className="row">

                                            <div className="col-sm-3 mb-3">
                                                <h6 className="mb-0">Waga</h6>
                                            </div>

                                            <div className="col-sm-3 text-secondary">
                                                {userDayData.weight} kg
                                            </div>

                                            <div className='col-sm-6'>
                                                <div id={`editUserStat-1`} style={{display:'none'}}>
                                                    <input type="number" className="form-control form-control-sm"
                                                           max="300"
                                                           min="0"
                                                           onChange={(e) => setNewWaga(e.target.value)}/>
                                                </div>
                                            </div>

                                        </div>
                                        <hr></hr>
                                        <div className="row">

                                            <div className="col-sm-3 mb-3">
                                                <h6 className="mb-0">Spalone Kalorie</h6>
                                            </div>

                                            <div className="col-sm-3 text-secondary">
                                                {userDayData.calories_burned} kcal
                                            </div>

                                            <div className='col-sm-6'>
                                                <div id={`editUserStat-2`} style={{display:'none'}}>
                                                    <input type="number" className="form-control form-control-sm"
                                                           min="0"
                                                           max="20000"
                                                           onChange={(e) => setNewSpaloneKalorie(e.target.value)}/>
                                                </div>
                                            </div>

                                        </div>
                                        <hr></hr>
                                        <div className="row">

                                            <div className="col-sm-3 mb-3">
                                                <h6 className="mb-0">Spożyte Kalorie</h6>
                                            </div>

                                            <div className="col-sm-3 text-secondary">
                                                {userDayData.calories_eaten} kcal
                                            </div>

                                            <div className='col-sm-6'>
                                                <div id={`editUserStat-3`} style={{display:'none'}}>
                                                    <input type="number" className="form-control form-control-sm"
                                                           min="0"
                                                           max="20000"
                                                           onChange={(e) => setNewSpozyteKalorie(e.target.value)}/>
                                                </div>
                                            </div>

                                        </div>
                                        <hr></hr>
                                        <div className="row">

                                            <div className="col-sm-3 mb-4">
                                                <h6 className="mb-0">Początek Snu</h6>
                                            </div>

                                            <div className="col-sm-3 text-secondary">
                                                {sleepStart.replace('T', " ").replace('Z', "")}
                                            </div>

                                            <div className='col-sm-6'>
                                                <div id={`editUserStat-4`} style={{display:'none'}}>
                                                    <Form.Control
                                                        type="datetime-local"
                                                        value={newPoczatekSnu}
                                                        onChange={(e) => setNewPoczatekSnu(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        <hr></hr>
                                        <div className="row">

                                            <div className="col-sm-3 mb-4">
                                                <h6 className="mb-0">Koniec Snu</h6>
                                            </div>

                                            <div className="col-sm-3 text-secondary">
                                                {sleepEnd.replace('T', " ").replace('Z', "")}
                                            </div>

                                            <div className='col-sm-6'>
                                                <div id={`editUserStat-5`} style={{display:'none'}}>
                                                    <Form.Control
                                                        type="datetime-local"
                                                        value={newKoniecSnu}
                                                        onChange={(e) => setNewKoniecSnu(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        <hr></hr>
                                        <div className="row">

                                            <div className="col-sm-3 mb-3">
                                                <h6 className="mb-0">Kroki</h6>
                                            </div>

                                            <div className="col-sm-3 text-secondary">
                                                {userDayData.steps}
                                            </div>

                                            <div className='col-sm-6'>
                                                <div id={`editUserStat-6`} style={{display:'none'}}>
                                                    <input type="number" className="form-control form-control-sm"
                                                           min="0"
                                                           max="73000"
                                                           onChange={(e) => setNewKroki(e.target.value)}/>
                                                </div>
                                            </div>

                                        </div>
                                        <hr/>
                                        <div className='row p-1 mt-2'>
                                            <div className='col-sm-6'>
                                                <Button onClick={editShowHide} variant="btn" size="md">Edytuj</Button>
                                            </div>
                                            <div className='col-sm-6' id={`editUserStat-7`} style={{display:'none'}}>
                                                <Button onClick={sumbitEdit} variant="btn" size="md">Zapisz</Button>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>




        </div>
    );
}

export default Dashboard_data_userday;