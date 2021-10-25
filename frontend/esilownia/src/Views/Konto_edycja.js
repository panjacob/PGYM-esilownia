import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../components/Axios/axios";
import Button from "react-bootstrap/Button";

function Konto() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmitData = (e) => {
        e.preventDefault();
        console.log(username)
        console.log(firstname)
        console.log(lastname)
        console.log(email)

        axiosInstance
            .post(`users/edit/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer' + " " + localStorage.getItem('access_token')
                },
                username: username,
                first_name: firstname,
                last_name: lastname,
                email: email

            })
            .then((res) => {
                console.log(res)
                console.log(res.data)

                setEmail(res.data.email)
                setUsername(res.data.username)
                setFirstname(res.data.first_name)
                setLastname(res.data.last_name)

            });
    };

    const handleSubmitPass = (e) => {
        e.preventDefault();
        console.log(password)
    };

    useEffect(() => {

        axiosInstance
            .get(`users/info/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer' + " " + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                console.log(res)
                console.log(res.data)

                setEmail(res.data.email)
                setUsername(res.data.username)
                setFirstname(res.data.first_name)
                setLastname(res.data.last_name)

            });



    },[]);

    return (
        <div className="konto">
            <div class="container">

                <div className="col-md-8 mx-auto mt-3">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Username</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="text" className="form-control form-control-sm" placeholder={username}
                                           onChange={(e) => setUsername(e.target.value)}/>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Imie</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="text" className="form-control form-control-sm" placeholder={firstname}
                                           onChange={(e) => setFirstname(e.target.value)}/>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Nazwisko</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="text" className="form-control form-control-sm" placeholder={lastname}
                                           onChange={(e) => setLastname(e.target.value)}/>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Mail</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="text" className="form-control form-control-sm" placeholder={email}
                                           onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-sm-3">
                                    <Button onClick={handleSubmitData} variant="primary" size="sm">Zapisz</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-8 mx-auto mt-3">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Hasło</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="password" className="form-control form-control-sm"
                                           onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-sm-3">
                                    <Button onClick={handleSubmitPass} variant="primary" size="sm">Zapisz</Button>
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