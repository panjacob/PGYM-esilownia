import React, {useEffect, useState} from "react";
import {Carousel} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { registerLocale, setDefaultLocale } from  "react-datepicker";
import pl from 'date-fns/locale/pl';
registerLocale('pl', pl)

function Dashboard_data_userday() {

    const [startDate, setStartDate] = useState(new Date());

    const [userDayData, setUserDayData] = useState([])

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
                        setUserDayData([])
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
                        setUserDayData([])
                    }
                }
            });;
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
            {(userDayData.length === 0) ? (
                <div className="col-md-8 mx-auto mt-3">

                    <div className="card mb-3 bg-light">
                        <div className="card-body">
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Data</h6>
                                </div>

                                <div className="col-sm-9 text-secondary">
                                   0
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Waga</h6>
                                </div>

                                <div className="col-sm-9 text-secondary">
                                    0
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Spalone Kalorie</h6>
                                </div>

                                <div className="col-sm-9 text-secondary">
                                    0
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Spożyte Kalorie</h6>
                                </div>

                                <div className="col-sm-9 text-secondary">
                                    0
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Początek Snu</h6>
                                </div>

                                <div className="col-sm-9 text-secondary">
                                    0
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Koniec Snu</h6>
                                </div>

                                <div className="col-sm-9 text-secondary">
                                    0
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Kroki</h6>
                                </div>

                                <div className="col-sm-9 text-secondary">
                                    0
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            ) : (
                <div className="col-md-8 mx-auto mt-3">

                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Data</h6>
                                </div>

                                <div className="col-sm-9 text-secondary">
                                    {userDayData.date}
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Waga</h6>
                                </div>

                                <div className="col-sm-9 text-secondary">
                                    {userDayData.weight}
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Spalone Kalorie</h6>
                                </div>

                                <div className="col-sm-9 text-secondary">
                                    {userDayData.calories_burned}
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Spożyte Kalorie</h6>
                                </div>

                                <div className="col-sm-9 text-secondary">
                                    {userDayData.calories_eaten}
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Początek Snu</h6>
                                </div>

                                <div className="col-sm-9 text-secondary">
                                    {userDayData.sleep_start}
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Koniec Snu</h6>
                                </div>

                                <div className="col-sm-9 text-secondary">
                                    {userDayData.sleep_end}
                                </div>

                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-3">
                                    <h6 className="mb-0">Kroki</h6>
                                </div>

                                <div className="col-sm-9 text-secondary">
                                    {userDayData.steps}
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