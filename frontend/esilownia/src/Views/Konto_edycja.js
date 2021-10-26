import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../components/Axios/axios";
import Button from "react-bootstrap/Button";

function KontoEdycja() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [oldpassword, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return response.json();
    }

    const handleSubmitData = (e) => {
        e.preventDefault();
        //console.log(username)
        //console.log(firstname)
        //console.log(lastname)
        //console.log(email)

        postData('http://127.0.0.1:8000/users/edit/', {
                    username: username,
                    first_name: firstname,
                    last_name: lastname,
                    email: email })
            .then(data => {
                //console.log(data);
                window.location.reload();
            });




        // AXIOS KOD 401 UNAUTHORIZED - POWOD NIEWIADOMY

        // axiosInstance
        //     .post(`auth/token/`, {
        //         grant_type: 'refresh_token',
        //         refresh_token : localStorage.getItem('refresh_token'),
        //         client_id: 'TUz2wd25Z9hfRbOUr9z3CFEKAc42hJrjsz57sMt6',
        //         client_secret:
        //             'QpMCaevBW6VRJ42wtJ1Cgqitz0aVuBMJRQFgULMTGYievg572RVlcQoTD6xtaVf4mL6K38Df6tcazzfsxMfaDTEjzbH343kFCItJfJKEa2bcjL0ukufLOsfQCAFx3hTR',
        //
        //     })
        //     .then((res) => {
        //         console.log(res)
        //         console.log(res.data)
        //
        //         localStorage.setItem('access_token', res.data.access_token);
        //         localStorage.setItem('refresh_token', res.data.refresh_token);
        //
        //     });
        //
        // const dataToSend = { username: username,
        //                 first_name: firstname,
        //                 last_name: lastname,
        //                 email: email };
        // axiosInstance
        //     .post(`users/edit/`, {
        //                 method: 'POST',
        //                 mode: 'cors',
        //                 cache: 'no-cache',
        //                 credentials: 'same-origin',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     'Authorization': 'Bearer' + " " + localStorage.getItem('access_token')
        //                 },
        //                 redirect: 'follow',
        //                 referrerPolicy: 'no-referrer',
        //                 body: JSON.stringify(dataToSend)
        //
        //     })
        //     .then((res) => {
        //         console.log(res)
        //         console.log(res.data)
        //
        //         setEmail(res.data.email)
        //         setUsername(res.data.username)
        //         setFirstname(res.data.first_name)
        //         setLastname(res.data.last_name)
        //
        //     });
    };

    const handleSubmitPass = (e) => {
        e.preventDefault();
        //console.log(oldpassword)
        //console.log(newpassword)

        postData('http://127.0.0.1:8000/users/change_password/', {
            old_password: oldpassword,
            new_password: newpassword })
            .then(data => {
                //console.log(data);
                //window.location.reload();
            });
    };

    useEffect(() => {

        axiosInstance
            .get(`users/info/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                //console.log(res)
                //console.log(res.data)

                setEmail(res.data.email)
                setUsername(res.data.username)
                setFirstname(res.data.first_name)
                setLastname(res.data.last_name)

            });



    },[]);

    return (
        <div className="konto_edycja">
            <div className="container">

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
                                    <h6 className="mb-0">Stare hasło</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="password" className="form-control form-control-sm"
                                           onChange={(e) => setOldPassword(e.target.value)}/>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Nowe Hasło</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="password" className="form-control form-control-sm"
                                           onChange={(e) => setNewPassword(e.target.value)}/>
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

export default KontoEdycja;