import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../components/Axios/axios";

function Konto() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [joindate, setJoindate] = useState("");

    useEffect(() => {

        axiosInstance
            .get(`users/info/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                console.log(res)
                console.log(res.data)

                setEmail(res.data.email)
                setUsername(res.data.username)
                setFirstname(res.data.first_name)
                setLastname(res.data.last_name)
                setJoindate(res.data.start_date.slice(0,10))

            });

    },[]);

    return (
        <div className="konto">
            <div className="container">

                <div className="col-md-8 mx-auto mt-3">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Username</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {username}
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Imie</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {firstname}
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Nazwisko</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {lastname}
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Mail</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {email}
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Data dołaczenia</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {joindate}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Konto;