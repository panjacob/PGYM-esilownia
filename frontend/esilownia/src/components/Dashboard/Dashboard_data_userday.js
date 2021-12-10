import React, {useEffect, useState} from "react";
import {Carousel} from "react-bootstrap";
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

    const [newWaga, setNewWaga] = useState('0')
    const [newSpaloneKalorie, setNewSpaloneKalorie] = useState('0')
    const [newSpozyteKalorie, setNewSpozyteKalorie] = useState('0')
    const [newPoczatekSnu, setNewPoczatekSnu] = useState('2021-10-16 08:18:12')
    const [newKoniecSnu, setNewKoniecSnu] = useState('2021-10-16 08:18:12')
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
            })
            .catch(function (error) {
                if (error.response) {
                    if(error.response.status === 400) {
                        setUserDayData({'weight':0,'calories_burned':0,'calories_eaten':0,'sleep_start':0,'sleep_end':0,'steps':0})
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

        axiosInstance
            .post(`/dashboard/user_day/get`, { date: convert( date )},{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setUserDayData(res.data)
            })
            .catch(function (error) {
                if (error.response) {
                    if(error.response.status === 400) {
                        setUserDayData({'weight':0,'calories_burned':0,'calories_eaten':0,'sleep_start':0,'sleep_end':0,'steps':0})
                    }
                }
            });;
    }

    const editShowHide = (e) => {
        e.preventDefault();
        //console.log(e.target.name)
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

        if(newPoczatekSnu !== '0'){
            urlencoded.append("sleep_start", newPoczatekSnu);
        }else{
            urlencoded.append("sleep_start", userDayData.sleep_start);
        }

        if(newKoniecSnu !== '0'){
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

            <div className='row justify-content-center' style={{minHeight:'200px'}}>
                <div className='col-4 justify-content-center text-center'>
                <DatePicker locale="pl" className='text-center justify-content-center' dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => selectedDate(date)} inline showPopperArrow={false} />
                </div>
            </div>

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

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Waga</h6>
                                </div>

                                <div className="col-sm-3 text-secondary">
                                    {userDayData.weight} kg
                                </div>

                                <div className='col-sm-6'>
                                    <div id={`editUserStat-1`} style={{display:'none'}}>
                                        <input type="text" className="form-control form-control-sm"
                                               onChange={(e) => setNewWaga(e.target.value)}/>
                                    </div>
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Spalone Kalorie</h6>
                                </div>

                                <div className="col-sm-3 text-secondary">
                                    {userDayData.calories_burned} kcal
                                </div>

                                <div className='col-sm-6'>
                                    <div id={`editUserStat-2`} style={{display:'none'}}>
                                        <input type="text" className="form-control form-control-sm"
                                               onChange={(e) => setNewSpaloneKalorie(e.target.value)}/>
                                    </div>
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Spożyte Kalorie</h6>
                                </div>

                                <div className="col-sm-3 text-secondary">
                                    {userDayData.calories_eaten} kcal
                                </div>

                                <div className='col-sm-6'>
                                    <div id={`editUserStat-3`} style={{display:'none'}}>
                                        <input type="text" className="form-control form-control-sm"
                                               onChange={(e) => setNewSpozyteKalorie(e.target.value)}/>
                                    </div>
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Początek Snu</h6>
                                </div>

                                <div className="col-sm-3 text-secondary">
                                    {userDayData.sleep_start}
                                </div>

                                <div className='col-sm-6'>
                                    <div id={`editUserStat-4`} style={{display:'none'}}>
                                        <input type="text" className="form-control form-control-sm"
                                               onChange={(e) => setNewPoczatekSnu(e.target.value)}/>
                                    </div>
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Koniec Snu</h6>
                                </div>

                                <div className="col-sm-3 text-secondary">
                                    {userDayData.sleep_end}
                                </div>

                                <div className='col-sm-6'>
                                    <div id={`editUserStat-5`} style={{display:'none'}}>
                                        <input type="text" className="form-control form-control-sm"
                                               onChange={(e) => setNewKoniecSnu(e.target.value)}/>
                                    </div>
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Kroki</h6>
                                </div>

                                <div className="col-sm-3 text-secondary">
                                    {userDayData.steps}
                                </div>

                                <div className='col-sm-6'>
                                    <div id={`editUserStat-6`} style={{display:'none'}}>
                                        <input type="text" className="form-control form-control-sm"
                                               onChange={(e) => setNewKroki(e.target.value)}/>
                                    </div>
                                </div>

                            </div>

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

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Waga</h6>
                                </div>

                                <div className="col-sm-3 text-secondary">
                                    {userDayData.weight} kg
                                </div>

                                <div className='col-sm-6'>
                                    <div id={`editUserStat-1`} style={{display:'none'}}>
                                        <input type="text" className="form-control form-control-sm"
                                               onChange={(e) => setNewWaga(e.target.value)}/>
                                    </div>
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Spalone Kalorie</h6>
                                </div>

                                <div className="col-sm-3 text-secondary">
                                    {userDayData.calories_burned} kcal
                                </div>

                                <div className='col-sm-6'>
                                    <div id={`editUserStat-2`} style={{display:'none'}}>
                                        <input type="text" className="form-control form-control-sm"
                                               onChange={(e) => setNewSpaloneKalorie(e.target.value)}/>
                                    </div>
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Spożyte Kalorie</h6>
                                </div>

                                <div className="col-sm-3 text-secondary">
                                    {userDayData.calories_eaten} kcal
                                </div>

                                <div className='col-sm-6'>
                                    <div id={`editUserStat-3`} style={{display:'none'}}>
                                        <input type="text" className="form-control form-control-sm"
                                               onChange={(e) => setNewSpozyteKalorie(e.target.value)}/>
                                    </div>
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Początek Snu</h6>
                                </div>

                                <div className="col-sm-3 text-secondary">
                                    {userDayData.sleep_start}
                                </div>

                                <div className='col-sm-6'>
                                    <div id={`editUserStat-4`} style={{display:'none'}}>
                                        <input type="text" className="form-control form-control-sm"
                                               onChange={(e) => setNewPoczatekSnu(e.target.value)}/>
                                    </div>
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Koniec Snu</h6>
                                </div>

                                <div className="col-sm-3 text-secondary">
                                    {userDayData.sleep_end}
                                </div>

                                <div className='col-sm-6'>
                                    <div id={`editUserStat-5`} style={{display:'none'}}>
                                        <input type="text" className="form-control form-control-sm"
                                               onChange={(e) => setNewKoniecSnu(e.target.value)}/>
                                    </div>
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Kroki</h6>
                                </div>

                                <div className="col-sm-3 text-secondary">
                                    {userDayData.steps}
                                </div>

                                <div className='col-sm-6'>
                                    <div id={`editUserStat-6`} style={{display:'none'}}>
                                        <input type="text" className="form-control form-control-sm"
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
    );
}

export default Dashboard_data_userday;