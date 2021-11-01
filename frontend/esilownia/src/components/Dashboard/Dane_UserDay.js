import React, {useEffect, useState} from "react";
import {Carousel} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/axios";

function Dane_UserDay() {

    const [UserDays, setUserDays] = useState([]);

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {

        axiosInstance
            .get(`/dashboard/user_day/get_all`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                //console.log(res)
                //console.log(res.data)
                setUserDays(res.data);

            });

    }, []);

    //console.log(UserDays)

    const listItems = UserDays.map((id) =>
        <Carousel.Item key={id.id}>
            <div className="col-md-8 mx-auto mt-3">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Data</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {id.date}
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Waga</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {id.weight}
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Spalone Kalorie</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {id.calories_burned}
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Spożyte Kalorie</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {id.calories_eaten}
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Początek Snu</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {id.sleep_start}
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Koniec Snu</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {id.sleep_end}
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Kroki</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {id.steps}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Carousel.Item>
    );

    return (
        <div className="dane_konto">

            <div className="text-center">
                <hr></hr>
                <h3 className="display-1 font-weight-light mb-4">Dane twoich treningów</h3>
                <hr></hr>
            </div>

            {
                UserDays.length === 0 ?
                    <Carousel className="m-3" activeIndex={index} onSelect={handleSelect}>
                        <Carousel.Item>
                            <div className="col-md-8 mx-auto mt-3">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="row justify-content-center">
                                            Brak danych.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                    </Carousel>

                    : ""
            }

            <Carousel className="m-3" activeIndex={index} onSelect={handleSelect}>
                {listItems}
            </Carousel>

        </div>
    );
}

export default Dane_UserDay;